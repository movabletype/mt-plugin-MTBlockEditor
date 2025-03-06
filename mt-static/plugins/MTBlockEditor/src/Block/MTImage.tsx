import $ from "jquery";
import { nl2br } from "mt-block-editor-block/util";
import { Editor as MTBlockEditor } from "mt-block-editor-block";
import React, { useState, useRef } from "mt-block-editor-block/React";
import { blockProperty } from "mt-block-editor-block/decorator";
import {
  BlockToolbar,
  BlockToolbarButton,
  BlockSetupCommon,
  BlockLabel,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "mt-block-editor-block/Component";
import Block, {
  Metadata,
  NewFromHtmlOptions,
  EditorOptions,
} from "mt-block-editor-block/Block";
import { useCommands } from "mt-block-editor-block/Hook";
import { useEditorContext } from "mt-block-editor-block/Context";
import { edit as editIcon, link as linkIcon } from "mt-block-editor-block/icon";
import i18n from "mt-block-editor-block/i18n";

import imageIcon from "../img/icon/image.svg";
import { waitFor } from "../util";
import { addEditUpdateBlock } from "./edit";
import { initModal, waitForInsertOptionsForm } from "./modal";

interface EditorProps {
  focus: boolean;
  block: MTImage;
}

interface HtmlProps {
  block: MTImage;
}

const getDecodedMultiLineTextContent = (
  element: HTMLElement | null
): string => {
  if (!element) {
    return "";
  }
  const decoder = document.createElement("div");
  return element.innerHTML
    .split(/<br[^>]*>/)
    .map((str) => {
      decoder.innerHTML = str;
      return decoder.textContent;
    })
    .join("\n");
};

const Editor: React.FC<EditorProps> = blockProperty(({ focus, block }) => {
  const { editor } = useEditorContext();
  const [, setBlock] = useState(Object.assign({}, block));
  const [modalActive, setModalActive] = useState(false);
  const [isLinkDialogOpen, setLinkDialogOpen] = useState(false);
  const formRef = useRef(null);
  const blankMessage = window.trans("Please select an image");

  useCommands(
    {
      block,
      commands: [
        {
          command: "core-insertLink",
          callback: () => {
            setLinkDialogOpen(true);
          },
        },
      ],
    },
    []
  );

  if (!focus && !block.url && editor.opts.mode === "setup") {
    return <p>{blankMessage}</p>;
  }

  async function showModal(): Promise<void> {
    setModalActive(true);

    const newData: Partial<MTImage> = {};

    const blogId = (document.querySelector(
      "[name=blog_id]"
    ) as HTMLInputElement).value;
    const dummyFieldId = `mt-block-editor-${block.id}-${new Date().getTime()}`;
    const $div = $("<div/>", { id: dummyFieldId });
    $div.appendTo("body").data("mt-editor", {
      currentEditor: {
        insertContent(html) {
          const template = document.createElement("template");
          template.innerHTML = html;
          const img = template.content.querySelector("img") as HTMLImageElement;

          Object.assign(newData, {
            assetUrl: img.dataset.url,
            url: img.src,
            imageHeight: newData.imageWidth
              ? Math.round(
                  (parseInt(newData.imageWidth) / img.width) * img.height
                ) + ""
              : "",
            alignment: img.className?.replace(/^mt-image-/, ""),
            hasCaption: (newData.caption || "") !== "",
          });

          if (!newData.linkUrl && newData.linkToOriginal) {
            newData.linkUrl = newData.assetUrl;
          }

          addEditUpdateBlock(editor, block, newData);

          Object.assign(block, newData);
          setBlock(Object.assign({}, block));
          setModalActive(false);

          $div.remove();
        },
      },
    });
    $.fn.mtModal.open(
      window.ScriptURI +
        "?" +
        new URLSearchParams({
          __mode: "dialog_asset_modal",
          _type: "asset",
          edit_field: dummyFieldId,
          blog_id: blogId,
          dialog_view: "1",
          filter: "class",
          filter_val: "image",
        } as Record<string, string>),
      { large: true }
    );

    await initModal({ block, blogId, dummyFieldId });

    // handle insert options
    waitForInsertOptionsForm().then(async (form: HTMLFormElement) => {
      const assetIdElm = (await waitFor(() =>
        form.querySelector("[data-asset-id]")
      )) as HTMLElement;
      newData["assetId"] = assetIdElm.dataset.assetId;

      const doc = form.ownerDocument;

      // hide unused elements
      const style = doc.createElement("style") as HTMLStyleElement;
      doc.head.appendChild(style);
      style.sheet?.insertRule(
        `
[id^="display_asset_prefs-"],
[id^="link_to_popup-"] .custom-radio,
.icon-align-left,
.icon-align-right {
  display: none !important;
}
      `
      );

      // fallback to "none" if an element unavailable in the MTBlockEditor is checked
      const unavailableAlignElm = doc.querySelector(
        "[id^=align-left-]:checked, [id^=align-right-]:checked"
      ) as HTMLInputElement | null;
      if (unavailableAlignElm) {
        unavailableAlignElm.checked = false;
        const fallbackElm = doc.querySelector(
          "[id^=align-none-]"
        ) as HTMLInputElement;
        fallbackElm.checked = true;
      }

      // extra fields
      const placeholder = doc.querySelector(
        "[id^=include_prefs-]"
      ) as HTMLInputElement;
      const extraFields = doc.createElement("template");
      extraFields.innerHTML = `
<div class="row">
<div class="col-md-6">

<div class="form-group">
  <label class="form-control-label">${window.trans("Alternative Text")}</label>
  <input type="text" id="alternativeText" class="form-control">
</div>

<div class="form-group">
  <label class="form-control-label">${window.trans("Caption")}</label>
  <textarea id="caption" class="form-control" rows="2"></textarea>
</div>

<div class="form-group">
  <label class="form-control-label">${window.trans("Width")}</label>
  <input type="number" id="imageWidth" class="form-control">
</div>

</div>
</div>
`;
      placeholder.parentElement?.insertBefore(extraFields.content, placeholder);

      ["alternativeText", "caption", "imageWidth"].forEach((k) => {
        const elm = doc.querySelector(`#${k}`) as HTMLInputElement;
        newData[k] = elm.value = block[k];
        elm.addEventListener("input", () => {
          newData[k] = elm.value;
        });
      });

      // thumbnail
      const createThumbnail = doc.querySelector(
        `input[id^="create_thumbnail-"]`
      ) as HTMLInputElement;
      createThumbnail.checked = block.useThumbnail;
      createThumbnail.addEventListener("change", () => {
        block.useThumbnail = createThumbnail.checked;
      });

      // image and thumbnail width
      const thumbWidth = doc.querySelector(
        `input[id^="thumb_width-"]`
      ) as HTMLInputElement;
      thumbWidth.parentElement?.classList.add("d-none");
      const imageWidth = doc.querySelector("#imageWidth") as HTMLInputElement;
      if (!imageWidth.value) {
        imageWidth.value = thumbWidth.value;
      }
      imageWidth.addEventListener("input", () => {
        thumbWidth.value = imageWidth.value;
      });
      imageWidth.dispatchEvent(new Event("input"));

      // link to original asset
      const linkToOriginal = doc.querySelector(
        "input[id^=link_to_popup-]"
      ) as HTMLInputElement;
      linkToOriginal.name = ""; // Do not send this value to the backend
      newData.linkToOriginal = linkToOriginal.checked = block.linkToOriginal;
      linkToOriginal.addEventListener("change", () => {
        newData.linkToOriginal = linkToOriginal.checked;
      });
    });
  }

  if (block.showModal) {
    block.showModal = false;
    showModal();
  }

  const src = block.url;

  return (
    <div data-mt-block-editor-keep-focus={modalActive ? "1" : "0"}>
      <BlockSetupCommon block={block} />
      <BlockLabel block={block}>
        {src ? (
          block.hasCaption ? (
            <figure
              style={
                block.alignment === "none" ? { display: "inline-block" } : {}
              }
            >
              <img
                src={src}
                alt={block.alternativeText}
                width={block.imageWidth}
                height={block.imageHeight}
                style={Object.assign(
                  { maxWidth: "100%", height: "auto" },
                  block.alignment === "center"
                    ? {
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }
                    : {}
                )}
              />
              <figcaption>
                {focus ? (
                  <textarea
                    className="mt-be-input"
                    data-property-name="caption"
                    data-min-rows="1"
                    style={{ width: "100%" }}
                  />
                ) : (
                  nl2br(block.caption)
                )}
              </figcaption>
            </figure>
          ) : (
            <p>
              <img
                src={src}
                alt={block.alternativeText}
                width={block.imageWidth}
                height={block.imageHeight}
                style={Object.assign(
                  { maxWidth: "100%", height: "auto" },
                  block.alignment === "center"
                    ? {
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }
                    : { display: "block" }
                )}
              />
            </p>
          )
        ) : (
          <button
            type="button"
            className="mt-be-btn-default"
            onClick={showModal}
          >
            {blankMessage}
          </button>
        )}
      </BlockLabel>
      {focus && (
        <>
          <BlockToolbar>
            <BlockToolbarButton
              icon={editIcon}
              label={window.trans("Edit")}
              onClick={showModal}
            />
            <BlockToolbarButton
              icon={linkIcon}
              label={window.trans("Insert Link")}
              onClick={() => setLinkDialogOpen(true)}
            />
          </BlockToolbar>
          <Dialog
            open={isLinkDialogOpen}
            onClose={() => setLinkDialogOpen(false)}
          >
            <DialogHeader>
              <h4 className="mt-be-dialog-title">{i18n.t("Insert Link")}</h4>
            </DialogHeader>
            <form ref={formRef}>
              <DialogBody>
                <label className="mt-be-label-name">
                  <div className="mt-be-label-block">{i18n.t("Link URL")}</div>
                  <input
                    type="url"
                    className="mt-be-input"
                    name="linkUrl"
                    defaultValue={block.linkUrl}
                    data-mt-block-editor-focus-default
                  />
                </label>
                <label className="mt-be-label-name">
                  <div className="mt-be-label-block">{i18n.t("Title")}</div>
                  <input
                    className="mt-be-input"
                    name="linkTitle"
                    defaultValue={block.linkTitle}
                  />
                </label>
                <label className="mt-be-label-name">
                  <div className="mt-be-label-block">
                    {i18n.t("Target Attribute")}
                  </div>
                  <select
                    name="linkTarget"
                    className="mt-be-input"
                    defaultValue={block.linkTarget}
                  >
                    <option value="_self">{i18n.t("None")}</option>
                    <option value="_blank">{i18n.t("New window")}</option>
                  </select>
                </label>
              </DialogBody>

              <DialogFooter>
                <button
                  type="button"
                  className="mt-be-btn-default"
                  onClick={() => {
                    setLinkDialogOpen(false);
                  }}
                >
                  {i18n.t("Close")}
                </button>
                <button
                  type="button"
                  className="mt-be-btn-primary"
                  onClick={() => {
                    const form = formRef.current;
                    if (!form) {
                      return;
                    }

                    const keys = [
                      "linkUrl",
                      "linkTitle",
                      "linkTarget",
                    ] as const;
                    keys.forEach((name) => {
                      block[name] = (form[name] as HTMLInputElement).value;
                    });

                    setLinkDialogOpen(false);
                  }}
                >
                  {i18n.t("Save")}
                </button>
              </DialogFooter>
            </form>
          </Dialog>
        </>
      )}
    </div>
  );
});

const Html: React.FC<HtmlProps> = ({ block }: HtmlProps) => {
  const imageClassName =
    "asset asset-image" +
    (block.alignment === "center" ? " mt-image-center" : "");

  let img = block.caption ? (
    <img
      src={block.url}
      alt={block.alternativeText}
      width={block.imageWidth}
      height={block.imageHeight}
      className={imageClassName}
      style={Object.assign(
        { maxWidth: "100%", height: "auto" },
        block.alignment === "center"
          ? {
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }
          : {}
      )}
    />
  ) : (
    <img
      src={block.url}
      alt={block.alternativeText}
      width={block.imageWidth}
      height={block.imageHeight}
      className={imageClassName}
      style={Object.assign(
        { maxWidth: "100%", height: "auto" },
        block.alignment === "center"
          ? {
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }
          : { display: "block" }
      )}
    />
  );
  if (block.linkUrl) {
    img = (
      <a
        href={block.linkUrl}
        target={block.linkTarget}
        title={block.linkTitle || undefined}
      >
        {img}
      </a>
    );
  }

  return block.caption ? (
    <figure
      className={
        "mt-figure" + (block.alignment === "center" ? " mt-figure-center" : "")
      }
      style={block.alignment === "none" ? { display: "inline-block" } : {}}
    >
      {img}
      <figcaption>{nl2br(block.caption)}</figcaption>
    </figure>
  ) : (
    <p>{img}</p>
  );
};

class MTImage extends Block {
  public static typeId = "mt-image";
  public static selectable = true;
  public static icon = imageIcon;
  public static get label(): string {
    return window.trans("MTImage");
  }

  public assetId: string;
  public assetUrl: string;
  public url: string;
  public imageWidth: string;
  public imageHeight: string;
  public alternativeText: string;
  public caption: string;
  public alignment: string;
  public showModal: boolean;
  public hasCaption: boolean;
  public useThumbnail: boolean;
  public files?: File[];
  public linkToOriginal: boolean;
  public linkUrl: string;
  public linkTarget = "_self";
  public linkTitle: string;

  public constructor(init?: Partial<MTImage>) {
    super();

    this.assetId = "";
    this.assetUrl = "";
    this.url = "";
    this.imageWidth = "";
    this.imageHeight = "";
    this.alternativeText = "";
    this.caption = "";
    this.linkToOriginal = false;
    this.alignment = "";
    this.useThumbnail = false;
    this.showModal = false;
    this.linkUrl = "";
    this.linkTitle = "";

    if (init) {
      Object.assign(this, init);
    }

    this.hasCaption = this.caption !== "";
  }

  public metadata(): Metadata | null {
    return this.metadataByOwnKeys({
      keys: ["assetId", "alignment", "useThumbnail"],
    });
  }

  public editor({ focus }: EditorOptions): JSX.Element {
    return <Editor key={this.id} focus={focus} block={this} />;
  }

  public html(): JSX.Element {
    return <Html block={this} />;
  }

  static async new({ editor }: { editor: MTBlockEditor }): Promise<MTImage> {
    const opts = editor.opts.block["mt-image"] || {};
    const showModal =
      typeof opts.showModalOnNew === "boolean" ? opts.showModalOnNew : true;
    return new this({ showModal: showModal });
  }

  static async newFromHtml({
    html,
    meta,
  }: NewFromHtmlOptions): Promise<MTImage> {
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(html, "text/html");
    const img = doc.querySelector("img");
    const figCaption = doc.querySelector("figcaption");
    const a = doc.querySelector("a");

    const props: Partial<MTImage> = {
      url: img?.getAttribute("src") || "",
      imageWidth: (img?.width || "").toString(),
      imageHeight: (img?.height || "").toString(),
      alternativeText: img?.alt || "",
      caption: getDecodedMultiLineTextContent(figCaption),
      assetUrl: a?.getAttribute("href") || "",
      linkToOriginal: !!(a && !a.getAttribute("target")),
    };
    if (a) {
      if (a.getAttribute("target")) {
        props.linkUrl = a.getAttribute("href") || "";
        props.linkTitle = a.getAttribute("title") || "";
        props.linkTarget = a.target;
      } else {
        props.linkUrl = a.href;
      }
    }
    return new MTImage(Object.assign(props, meta));
  }

  static canNewFromFile({ file }: { file: File }): boolean {
    return /^image\//.test(file.type);
  }

  static async newFromFile({ file }: { file: File }): Promise<MTImage> {
    return new MTImage({ files: [file], showModal: true });
  }
}

export default MTImage;
