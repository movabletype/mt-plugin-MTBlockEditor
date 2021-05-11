import $ from "jquery";
import { t } from "../i18n";
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

import fileIcon from "../img/icon/file.svg";
import { addEditUpdateBlock } from "./edit";
import { initModal, waitForInsertOptionsForm } from "./modal";

interface EditorProps {
  focus: boolean;
  block: MTFile;
}

interface HtmlProps {
  block: MTFile;
}

const Editor: React.FC<EditorProps> = blockProperty(({ focus, block }) => {
  const { editor } = useEditorContext();
  const [, setBlock] = useState(Object.assign({}, block));
  const [modalActive, setModalActive] = useState(false);
  const blankMessage = t("Please select an file");

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
          const a = template.content.querySelector("a");

          Object.assign(newData, {
            assetUrl: a.href,
            text: a.textContent,
          });

          addEditUpdateBlock(editor, block, newData);

          Object.assign(block, newData);
          setBlock(Object.assign({}, block));
          setModalActive(false);
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
        }),
      { large: true }
    );

    await initModal(block);

    // handle insert options
    waitForInsertOptionsForm().then((form) => {
      newData["assetId"] = form.querySelector(
        "[data-asset-id]"
      ).dataset.assetId;
    });
  }

  if (block.showModal) {
    block.showModal = false;
    showModal();
  }

  return (
    <div data-mt-block-editor-keep-focus={modalActive ? "1" : "0"}>
      <BlockSetupCommon block={block} />
      <BlockLabel block={block}>
        {block.assetUrl ? (
          focus ? (
            <div>
              <label className="mt-be-label-name">
                <div>{t("Link URL")}</div>
                <a
                  className="mt-be-input--static"
                  href={block.assetUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {block.assetUrl}
                </a>
              </label>
              <label className="mt-be-label-name">
                <div>{t("Text to display")}</div>
                <input name="text" style={{ width: "100%" }} />
              </label>
            </div>
          ) : (
            <a href="javascript: void(0)">{block.text}</a>
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
  return (
    <div>
      <a href={block.assetUrl}>{block.text}</a>
    </div>
  );
};

class MTFile extends Block {
  public static typeId = "mt-file";
  public static selectable = true;
  public static icon = fileIcon;
  public static get label(): string {
    return t("MTFile");
  }

  public assetId: string;
  public assetUrl: string;
  public text: string;
  public showModal: boolean;
  public files?: File[];

  public constructor(init?: Partial<MTFile>) {
    super();

    this.assetId = "";
    this.assetUrl = "";
    this.text = "";
    this.showModal = false;

    if (init) {
      Object.assign(this, init);
    }
  }

  public metadata(): Metadata | null {
    return this.metadataByOwnKeys({ keys: ["assetId"] });
  }

  public editor({ focus, focusBlock }: EditorOptions): JSX.Element {
    return <Editor key={this.id} focus={focus} block={this} />;
  }

  public html(): JSX.Element {
    return <Html block={this} />;
  }

  static async new({ editor }): Promise<MTFile> {
    const opts = editor.opts.block["mt-file"] || {};
    const showModal =
      typeof opts.showModalOnNew === "boolean" ? opts.showModalOnNew : true;
    return new this({ showModal: showModal });
  }

  static async newFromHtml({
    node,
    html,
    meta,
  }: NewFromHtmlOptions): Promise<MTFile> {
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(html, "text/html");
    const a = doc.querySelector("A") as HTMLAnchorElement;

    return new MTFile(
      Object.assign(
        {
          assetUrl: a?.href || "",
          text: a?.textContent || "",
        },
        meta
      )
    );
  }

  static canNewFromFile({ file }: { file: File }): boolean {
    return !/^image\//.test(file.type || "");
  }

  static async newFromFile({ file }: { file: File }): Promise<MTFile> {
    return new MTFile({ files: [file], showModal: true });
  }
}

export default MTFile;
