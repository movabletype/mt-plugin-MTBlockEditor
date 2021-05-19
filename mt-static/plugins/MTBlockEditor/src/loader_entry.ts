import $ from "jquery";
import { Editor } from "mt-block-editor-block";
import {
  apply,
  unload,
  isSupportedEnvironment,
  ApplyOptions,
} from "./block-editor";
import {
  assignBlockTypeOptions,
  assignCommonApplyOptions,
  initButton,
  SerializeMethod,
} from "./loader/common";
import { waitFor } from "./util";

const serializeMethods: SerializeMethod[] = [];

async function initSelect(select): Promise<void> {
  const targets = [
    ...document.querySelectorAll(
      "#editor-input-content, #editor-input-extended"
    ),
  ] as HTMLInputElement[]; // convert to array in order to invoke targets.map

  const handlers = targets.map((target: HTMLInputElement) => {
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
        await waitFor(() => target.closest(".mt-editor-manager-wrap"));

        inputElm.value = target.value;
        target.closest(".mt-editor-manager-wrap")?.appendChild(wrap);

        const fieldLabel = (document.querySelector(
          `#editor-header .tab[mt\\:command="set-editor-${target.id.replace(
            /.*-/,
            ""
          )}"] a`
        ) as HTMLElement).textContent;
        const opts: ApplyOptions = {
          id: inputElm.id,
          rootAttributes: {
            "data-field-label": fieldLabel,
          },
        };

        const blockDisplayOptionId = (document.getElementById(
          "text-be_config"
        ) as HTMLInputElement).value;
        assignBlockTypeOptions(blockDisplayOptionId, opts);
        assignCommonApplyOptions(opts);

        if (isSupportedEnvironment()) {
          editor = await apply(opts);
        } else {
          wrap.innerHTML = `
          <div class="card m-5"><div class="card-body">
          ${window.trans(
            "This format does not support this web browser. Please switch to another format."
          )}
          </div></div>
          `;
        }

        await waitFor(() =>
          target
            .closest(".mt-editor-manager-wrap")
            ?.querySelector(".tox-tinymce")
        );

        target
          .closest(".mt-editor-manager-wrap")
          ?.querySelector(".tox-tinymce")
          ?.classList.add("d-none");

        return;
      } else if (oldLastValue === "block_editor") {
        await unload({
          id: inputElm.id,
        });

        editor = null;
        target.value = inputElm.value;
        wrap.remove();
        target
          .closest(".mt-editor-manager-wrap")
          ?.querySelector(".tox-tinymce")
          ?.classList.remove("d-none");
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
      $(select).trigger("change");
    });
  });

  handlers.forEach((f) => f());
}

(async () => {
  const select = document.getElementById("convert_breaks") as HTMLSelectElement;
  const form = select.form as HTMLFormElement;

  initSelect(select);
  form.querySelectorAll("button").forEach((elm) => {
    initButton(elm, serializeMethods);
  });
})();
