import $ from "jquery";
import { t } from "../i18n";
import { waitFor } from "../util";
import { nl2br } from "mt-block-editor-block/util";
import React, { useState } from "mt-block-editor-block/React";
import { blockProperty } from "mt-block-editor-block/decorator";
import {
  BlockToolbar,
  BlockToolbarButton,
  BlockSetupCommon,
  BlockLabel,
} from "mt-block-editor-block/Component";
import Block, {
  Metadata,
  NewFromHtmlOptions,
  EditorOptions,
  SerializeOptions,
} from "mt-block-editor-block/Block";
import { useEditorContext } from "mt-block-editor-block/Context";
import { edit as editIcon } from "mt-block-editor-block/icon";

import imageIcon from "../img/icon/image.svg";
import { addEditUpdateBlock } from "./edit";
import { initModal, waitForInsertOptionsForm } from "./modal";

interface EditorProps {
  focus: boolean;
  block: MTImage;
}

interface HtmlProps {
  block: MTImage;
}

const Editor: React.FC<EditorProps> = blockProperty(({ focus, block }) => {
  const { editor } = useEditorContext();
  const [, setBlock] = useState(Object.assign({}, block));
  const [modalActive, setModalActive] = useState(false);
  const blankMessage = t("Please select an image");

  if (!focus && !block.url && editor.opts.mode === "setup") {
    return <p>{blankMessage}</p>;
  }

  async function showModal() {
    setModalActive(true);

    const newData = {};

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
          const img = template.content.querySelector("img");

          Object.assign(newData, {
            assetUrl: img.dataset.url,
            url: img.src,
            imageHeight:
              Math.round((newData["imageWidth"] / img.width) * img.height) + "",
            alignment: img.className?.replace(/^mt-image-/, ""),
            hasCaption: (newData["caption"] || "") !== "",
          });

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
          dialog_view: 1,
          filter: "class",
          filter_val: "image",
        }),
      { large: true }
    );

    await initModal(block);

    // handle insert options
    waitForInsertOptionsForm().then((form) => {
      newData["assetId"] = form.querySelector(
        "[data-asset-id]"
      ).dataset.assetId;

      const doc = form.ownerDocument.document;

      // hide unused elements
      const style = doc.createElement("style");
      doc.head.appendChild(style);
      style.sheet.insertRule(
        `
[id^="display_asset_prefs-"],
[id^="link_to_popup-"] .custom-radio,
.icon-align-left,
.icon-align-right {
  display: none !important;
}
      `
      );

      // extra fields
      const placeholder = doc.querySelector("[id^=include_prefs-]");
      const extraFields = doc.createElement("template");
      extraFields.innerHTML = `
<div class="row">
<div class="col-md-6">

<div class="form-group">
  <label class="form-control-label">${t("Alternative Text")}</label>
  <input type="text" id="alternativeText" class="form-control">
</div>

<div class="form-group">
  <label class="form-control-label">${t("Caption")}</label>
  <textarea id="caption" class="form-control" rows="2"></textarea>
</div>

<div class="form-group">
  <label class="form-control-label">${t("Width")}</label>
  <input type="number" id="imageWidth" class="form-control">
</div>

</div>
</div>
`;
      placeholder.parentElement.insertBefore(extraFields.content, placeholder);

      ["alternativeText", "caption", "imageWidth"].forEach((k) => {
        const elm = doc.querySelector(`#${k}`);
        newData[k] = elm.value = block[k];
        elm.addEventListener("input", () => {
          newData[k] = elm.value;
        });
      });

      // thumbnail
      const createThumbnail = doc.querySelector(
        `input[id^="create_thumbnail-"]`
      );
      createThumbnail.checked = block.useThumbnail;
      createThumbnail.addEventListener("change", () => {
        block.useThumbnail = createThumbnail.checked;
      });

      // image and thumbnail width
      const thumbWidth = doc.querySelector(`input[id^="thumb_width-"]`);
      thumbWidth.parentElement.classList.add("d-none");
      const imageWidth = doc.querySelector("#imageWidth");
      if (!imageWidth.value) {
        imageWidth.value = thumbWidth.value;
      }
      imageWidth.addEventListener("input", () => {
        thumbWidth.value = imageWidth.value;
      });
      imageWidth.dispatchEvent(new Event("input"));

      // link to original asset
      const linkToOriginal = doc.querySelector("input[id^=link_to_popup-]");
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
                    name="caption"
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
        <BlockToolbar>
          <BlockToolbarButton
            icon={editIcon}
            label={t("Edit")}
            onClick={showModal}
          />
        </BlockToolbar>
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
  if (block.linkToOriginal) {
    img = <a href={block.assetUrl}>{img}</a>;
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
    return t("MTImage");
  }

  public assetId: string;
  public assetUrl: string;
  public url: string;
  public imageWidth: string;
  public imageHeight: string;
  public alternativeText: string;
  public caption: string;
  public linkToOriginal: boolean;
  public alignment: string;
  public showModal: boolean;
  public hasCaption: boolean;
  public useThumbnail: boolean;
  public files?: File[];

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

  public editor({ focus, focusBlock }: EditorOptions): JSX.Element {
    return <Editor key={this.id} focus={focus} block={this} />;
  }

  public html(): JSX.Element {
    return <Html block={this} />;
  }

  static async new({ editor }): Promise<MTImage> {
    const opts = editor.opts.block["mt-image"] || {};
    const showModal =
      typeof opts.showModalOnNew === "boolean" ? opts.showModalOnNew : true;
    return new this({ showModal: showModal });
  }

  static async newFromHtml({
    node,
    html,
    meta,
  }: NewFromHtmlOptions): Promise<MTImage> {
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(html, "text/html");
    const img = doc.querySelector("IMG") as HTMLImageElement;
    const figCaption = doc.querySelector("FIGCAPTION") as HTMLElement;
    const a = doc.querySelector("A") as HTMLAnchorElement;

    return new MTImage(
      Object.assign(
        {
          url: img?.getAttribute("src") || "",
          imageWidth: img?.width || "",
          imageHeight: img?.height || "",
          alternativeText: img?.alt || "",
          caption: figCaption?.innerHTML.replace(/<br[^>]*>/g, "\n") || "",
          assetUrl: a?.href || "",
          linkToOriginal: !!a,
        },
        meta
      ) as Partial<MTImage>
    );
  }

  static canNewFromFile({ file }: { file: File }): boolean {
    return /^image\//.test(file.type);
  }

  static async newFromFile({ file }: { file: File }): Promise<MTImage> {
    return new MTImage({ files: [file], showModal: true });
  }
}

export default MTImage;
