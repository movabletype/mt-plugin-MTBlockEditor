import { Editor } from "mt-block-editor-block";
import { apply, unload } from "./block-editor";

type SerializeMethod = () => Promise<void>;

const serializeMethods: SerializeMethod[] = [];

async function initSelect(select) {
  let editor: Editor | null = null;
  let lastValue = "";
  const target = document.getElementById(
    select.dataset.target
  ) as HTMLInputElement;
  const inputElm = document.createElement("INPUT") as HTMLInputElement;
  inputElm.id = select.dataset.target + "-mt-be";
  const wrap = document.createElement("DIV");
  wrap.appendChild(inputElm);
  wrap.style.marginTop = "20px";

  serializeMethods.push(async () => {
    if (!editor) {
      return;
    }
    return editor.serialize().then(() => {
      target.value = inputElm.value;
    });
  });

  async function handleSelect() {
    if (select.value === "block_editor") {
      inputElm.value = target.value;
      select.closest(".mt-contentblock").appendChild(wrap);

      const scriptElm = document.getElementById("mt-block-editor-loader");
      const dataset = scriptElm ? scriptElm.dataset : null;
      if (!dataset) {
        return;
      }

      let panelBlockTypes: string[] = [];
      let shortcutBlockTypes: string[] = [];
      if (dataset.mtBlockDisplayOptions) {
        const blockDisplayOptions = JSON.parse(dataset.mtBlockDisplayOptions);
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

      editor = await apply({
        id: inputElm.id,
        shortcutBlockTypes,
        panelBlockTypes,
      });

      select
        .closest(".mt-contentblock")
        .querySelector(".editor-content")
        .classList.add("d-none");
    } else if (lastValue === "block_editor") {
      window.MTBlockEditor.unload({
        id: inputElm.id,
      }).then(() => {
        editor = null;
        target.value = inputElm.value;
        wrap.remove();
        select
          .closest(".mt-contentblock")
          .querySelector(".editor-content")
          .classList.remove("d-none");
      });
    }

    lastValue = select.value;
  }

  select.addEventListener("change", handleSelect);
  handleSelect();
}

function initButton(elm) {
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

(() => {
  const selects = [
    ...document.querySelectorAll(".custom-select.convert_breaks"),
  ] as HTMLSelectElement[];

  if (selects.length === 0) {
    return;
  }

  const form = selects[0].form as HTMLFormElement;

  selects.forEach(initSelect);
  [...form.querySelectorAll("button")].forEach(initButton);
})();
