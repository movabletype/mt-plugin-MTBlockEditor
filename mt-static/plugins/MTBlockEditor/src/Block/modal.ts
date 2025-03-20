import { waitFor } from "../util";

export interface MTAssetBlock {
  assetId: string;
  files: File[];
}

export async function initModal({
  block,
  blogId,
  dummyFieldId,
}: {
  block: MTAssetBlock;
  blogId: string;
  dummyFieldId: string;
}): Promise<void> {
  const dialogIframe = document.querySelector("#mt-dialog-iframe") as HTMLIFrameElement;
  await waitFor(
    () =>
      // new dialog page has been loaded
      dialogIframe.contentWindow?.uploadFiles &&
      // content has been loaded
      dialogIframe.contentWindow?.document.readyState !== "loading" &&
      // jQuery(initFunc) has been finished
      dialogIframe.contentWindow?.jQuery &&
      new Promise((resolve) => dialogIframe.contentWindow?.jQuery(resolve))
  );
  const win = dialogIframe.contentWindow as Window;

  if (block.files && block.files.length >= 1) {
    // drag and drop

    const uploadForm = win.document.querySelector("#upload") as HTMLElement;

    win.uploadFiles(block.files);
    uploadForm.style.setProperty("display", "none", "important");

    block.files = [];
  } else if (block.assetId) {
    // already selected

    const doc = win.document as Document;
    (doc.querySelector(`[data-panel-id="#list-asset-panel"]`) as HTMLInputElement).click();
    const search = doc.querySelector("#search") as HTMLInputElement;
    await waitFor(() => !search.disabled);

    const assetTableBody = doc.querySelector("#asset-table tbody") as HTMLElement;
    let assetRow = doc.querySelector(`#asset-${block.assetId}`);
    if (!assetRow) {
      // This asset is not included in recent items, so we need to lookup.

      win.jQuery(".indicator, #listing-table-overlay").show();
      win.jQuery("#asset-table tbody, #actions-bar .page-item").hide();

      const template = doc.createElement("template");

      const params = {
        __mode: "dialog_list_asset",
        _type: "asset",
        edit_field: dummyFieldId,
        blog_id: blogId,
        dialog_view: "1",
        dialog: "1",
        json: "1",
        can_multi: "0",
        filter: "id",
        filter_val: block.assetId,
      };
      const assetRowHtml = await fetch(window.CMSScriptURI + "?" + new URLSearchParams(params), {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      })
        .then((res) => res.json())
        .then((res) => res.html.replace(/^\s*<tbody>|<\/tbody>\s*$/g, ""))
        .catch(() => "");

      if (assetRowHtml) {
        template.innerHTML = assetRowHtml;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        assetRow = template.content as any as Element;
      }

      win.jQuery(".indicator, #listing-table-overlay").hide();
      win.jQuery("#asset-table tbody, #actions-bar .page-item").show();
    }

    if (assetRow) {
      // move to first
      assetTableBody.prepend(assetRow);
      // DOM tree has been updated and we need to find from top level again
      (doc.querySelector(`#asset-${block.assetId} input[name="id"]`) as HTMLInputElement).click();
    }
  }
}

export async function waitForInsertOptionsForm(): Promise<HTMLFormElement> {
  const win = (document.querySelector("#mt-dialog-iframe") as HTMLIFrameElement)
    .contentWindow as Window;

  return new Promise((resolve) => {
    win.document.querySelector(".modal-footer button.primary")?.addEventListener("click", () => {
      (
        waitFor(() =>
          win.document.querySelector("#asset-detail-panel-form")
        ) as Promise<HTMLFormElement>
      ).then(resolve);
    });
  });
}
