import { ApplyOptions } from "../block-editor";

export type SerializeMethod = () => Promise<void>;

export function assignBlockTypeOptions(
  blockDisplayOptionId: string,
  opts: ApplyOptions
): void {
  const scriptElm = document.getElementById("mt-block-editor-loader");
  const dataset = scriptElm?.dataset;
  if (!dataset) {
    return;
  }

  const blockDisplayOptionsJSON =
    JSON.parse(dataset.mtBlockDisplayOptionsMap || "{}")[
      blockDisplayOptionId
    ] || null;

  let panelBlockTypes: string[] = [];
  let shortcutBlockTypes: string[] = [];
  if (blockDisplayOptionsJSON) {
    const blockDisplayOptions = JSON.parse(blockDisplayOptionsJSON);
    const typeIds = JSON.parse(dataset.mtBlockTypeIds || "[]");
    blockDisplayOptions["common"].forEach((bt) => {
      const i = typeIds.indexOf(bt.typeId);
      if (i !== -1) {
        typeIds.splice(i, 1);
      }
      if (bt.shortcut) {
        shortcutBlockTypes.push(bt.typeId);
      }
      if (bt.panel) {
        panelBlockTypes.push(bt.typeId);
      }
    });
    panelBlockTypes.push(...typeIds);
  } else {
    panelBlockTypes = JSON.parse(dataset.mtBlockTypeIds || "[]");
    shortcutBlockTypes = panelBlockTypes.slice(
      0,
      parseInt(dataset.mtBlockEditorShortcutCountDefault || "", 10)
    );
  }

  Object.assign(opts, {
    panelBlockTypes,
    shortcutBlockTypes,
  });
}

export function assignCommonApplyOptions(opts: ApplyOptions): void {
  const editorCommonOptions = window.MT?.Editor?.defaultCommonOptions || {};
  if (editorCommonOptions["content_css_list"]) {
    opts.stylesheets = editorCommonOptions["content_css_list"];
  }
  if (editorCommonOptions["body_class_list"]) {
    const list = editorCommonOptions["body_class_list"].filter(
      (c) => c !== "wysiwyg"
    );
    opts.rootClassName = list.join(" ");
  }
}

export function initButton(
  elm: HTMLElement,
  serializeMethods: SerializeMethod[]
): void {
  let doClick = false;
  elm.addEventListener("click", (ev) => {
    if (doClick) {
      doClick = false;
      return;
    }

    ev.stopImmediatePropagation();
    ev.stopPropagation();
    ev.preventDefault();

    Promise.all(serializeMethods.map((f) => f())).then(() => {
      doClick = true;
      elm.click();
    });
  });
}
