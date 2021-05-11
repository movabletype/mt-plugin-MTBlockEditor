import { waitFor } from "../util";

export async function initModal(block) {
  const dialogIframe = document.querySelector("#mt-dialog-iframe");
  await waitFor(
    () =>
      // new dialog page has been loaded
      dialogIframe.contentWindow.uploadFiles &&
      // content has been loaded
      dialogIframe.contentWindow.document.readyState !== "loading" &&
      // jQuery(initFunc) has been finished
      dialogIframe.contentWindow.jQuery &&
      new Promise((resolve) => dialogIframe.contentWindow.jQuery(resolve))
  );

  if (block.files && block.files.length >= 1) {
    // drag and drop

    const win = dialogIframe.contentWindow;
    const uploadForm = win.document.querySelector("#upload");

    win.uploadFiles(block.files);
    uploadForm.style.setProperty("display", "none", "important");

    block.files = [];
  } else if (block.assetId) {
    // already selected

    const doc = dialogIframe.contentWindow.document;
    doc.querySelector(`[data-panel-id="#list-asset-panel"]`).click();
    const search = doc.querySelector("#search");
    await waitFor(() => !search.disabled);

    const assetTableBody = doc.querySelector("#asset-table tbody");
    let assetRow = doc.querySelector(`#asset-${block.assetId}`);
    if (!assetRow) {
      // This asset is not included in recent items, so we need to lookup.

      const win = dialogIframe.contentWindow;
      win.jQuery(".indicator, #listing-table-overlay").show();
      win.jQuery("#asset-table tbody, #actions-bar .page-item").hide();

      const template = doc.createElement("template");

      const params = {
        __mode: "dialog_list_asset",
        _type: "asset",
        edit_field: dummyFieldId,
        blog_id: blogId,
        dialog_view: 1,
        dialog: 1,
        json: 1,
        can_multi: 0,
        filter: "id",
        filter_val: block.assetId,
      };
      template.innerHTML = await fetch(
        window.CMSScriptURI + "?" + new URLSearchParams(params),
        {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      )
        .then((res) => res.json())
        .then((res) => res.html.replace(/^\s*<tbody>|<\/tbody>\s*$/g, ""));
      assetRow = template.content;

      win.jQuery(".indicator, #listing-table-overlay").hide();
      win.jQuery("#asset-table tbody, #actions-bar .page-item").show();
    }

    // move to first
    assetTableBody.prepend(assetRow);
    // DOM tree has been updated and we need to find from top level again
    doc.querySelector(`#asset-${block.assetId} input[name="id"]`).click();
  }
}

export async function waitForInsertOptionsForm() {
  const dialogIframe = document.querySelector("#mt-dialog-iframe");

  return new Promise((resolve) => {
    dialogIframe.contentWindow.document
      .querySelector(".modal-footer button.primary")
      .addEventListener("click", () => {
        waitFor(() =>
          dialogIframe.contentWindow.document.querySelector(
            "#asset-detail-panel-form"
          )
        ).then(resolve);
      });
  });
}
