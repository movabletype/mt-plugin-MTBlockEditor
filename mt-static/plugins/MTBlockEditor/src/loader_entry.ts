import { Editor } from "mt-block-editor-block";
import { apply, unload } from "./block-editor";
import { waitFor } from "./util";

type SerializeMethod = () => Promise<void>;

const serializeMethods: SerializeMethod[] = [];

async function initSelect(select) {
  const targets = [
    ...document.querySelectorAll(
      "#editor-input-content, #editor-input-extended"
    ),
  ];

  const handlers = targets.map((target) => {
    let editor: Editor | null = null;
    let lastValue = "";

    const inputElm = document.createElement("INPUT") as HTMLInputElement;
    inputElm.id = target.id + "-mt-be";
    const wrap = document.createElement("DIV");
    wrap.classList.add("mt-block-editor-wrap-entry");
    wrap.appendChild(inputElm);

    serializeMethods.push(async () => {
      if (!editor) {
        return;
      }
      return editor.serialize().then(() => {
        target.value = inputElm.value;
      });
    });

    return async () => {
      const oldLastValue = lastValue;
      lastValue = select.value;

      if (select.value === "block_editor") {
        await waitFor(() => !!target.closest(".mt-editor-manager-wrap"));

        inputElm.value = target.value;
        target.closest(".mt-editor-manager-wrap").appendChild(wrap);

        const scriptElm = document.getElementById("mt-block-editor-loader");
        const dataset = scriptElm ? scriptElm.dataset : null;
        if (!dataset) {
          return;
        }

        const blockDisplayOptionId = (document.getElementById(
          "text-be_config"
        ) as HTMLInputElement).value;
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

        editor = await apply({
          id: inputElm.id,
          shortcutBlockTypes,
          panelBlockTypes,
        });

        await waitFor(
          () =>
            !!target
              .closest(".mt-editor-manager-wrap")
              .querySelector(".tox-tinymce")
        );

        target
          .closest(".mt-editor-manager-wrap")
          .querySelector(".tox-tinymce")
          .classList.add("d-none");

        return;
      } else if (oldLastValue === "block_editor") {
        return window.MTBlockEditor.unload({
          id: inputElm.id,
        }).then(() => {
          editor = null;
          target.value = inputElm.value;
          wrap.remove();
          target
            .closest(".mt-editor-manager-wrap")
            .querySelector(".tox-tinymce")
            .classList.remove("d-none");
        });
      }
    };
  });

  select.addEventListener("change", (ev) => {
    if (!ev.isTrusted) {
      return;
    }

    ev.stopImmediatePropagation();
    ev.stopPropagation();
    ev.preventDefault();

    Promise.all(handlers.map((f) => f())).then(() => {
      const changeEv = new Event("change");
      select.dispatchEvent(changeEv);
    });
  });

  handlers.forEach((f) => f());
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

(async () => {
  const select = document.getElementById("convert_breaks") as HTMLSelectElement;
  const form = select.form as HTMLFormElement;

  initSelect(select);
  [...form.querySelectorAll("button")].forEach(initButton);
})();
