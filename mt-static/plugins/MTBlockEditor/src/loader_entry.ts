import $ from "jquery";
import { Editor } from "mt-block-editor-block";
import { apply, unload, isSupportedEnvironment, ApplyOptions } from "./block-editor";
import {
  assignBlockTypeOptions,
  assignCommonApplyOptions,
  initButton,
  SerializeMethod,
} from "./loader/common";
import { waitFor } from "./util";

interface MTRichTextEditor {
  save(): Promise<void>;
}

declare global {
  interface Window {
    MTRichTextEditor?: MTRichTextEditor;
  }
}

const serializeMethods: SerializeMethod[] = [];

async function initSelectElms(selectElms: NodeListOf<HTMLSelectElement>): Promise<void> {
  const targets = [
    ...document.querySelectorAll("#editor-input-content, #editor-input-extended"),
  ] as HTMLInputElement[]; // convert to array in order to invoke targets.map

  let lastValue = "";

  const handlers = targets.map((target: HTMLInputElement) => {
    let editor: Editor | null = null;

    const inputElm = document.createElement("textarea");
    inputElm.id = target.id + "-mt-be";
    const wrap = document.createElement("div");
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

    return async (nextValue: string) => {
      const oldLastValue = lastValue;
      lastValue = nextValue;

      if (nextValue === "block_editor") {
        await waitFor(() => target.closest(".mt-editor-manager-wrap"));

        if ("MTRichTextEditor" in window) {
          await (window.MTRichTextEditor as MTRichTextEditor).save();
        }

        inputElm.value = target.value;
        target.closest(".mt-editor-manager-wrap")?.appendChild(wrap);

        const fieldName =
          (
            document.querySelector(
              `#editor-header .tab[mt\\:command="set-editor-${target.id.replace(/.*-/, "")}"] a`
            ) as HTMLElement
          ).textContent || "";
        const opts: ApplyOptions = {
          id: inputElm.id,
          mode: "composition",
          rootAttributes: {
            "data-field-name": fieldName,
          },
        };

        const blockDisplayOptionId = (document.getElementById("text-be_config") as HTMLInputElement)
          .value;
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

        if ("MTRichTextEditor" in window) {
          setTimeout(() => {
            const wrap = target.closest(".mt-editor-manager-wrap") as HTMLElement;
            (wrap.childNodes as NodeListOf<HTMLElement>).forEach((child) => {
              if (!child.classList.contains("mt-block-editor-wrap-entry")) {
                child.classList.add("d-none");
              }
            });
          });
        } else {
          await waitFor(() =>
            target.closest(".mt-editor-manager-wrap")?.querySelector(".tox-tinymce")
          );

          target
            .closest(".mt-editor-manager-wrap")
            ?.querySelector(".tox-tinymce")
            ?.classList.add("d-none");
        }

        return;
      } else if (oldLastValue === "block_editor") {
        await unload({
          id: inputElm.id,
        });

        editor = null;
        target.value = inputElm.value;
        wrap.remove();

        if ("MTRichTextEditor" in window) {
          const wrap = target.closest(".mt-editor-manager-wrap") as HTMLElement;
          (wrap.childNodes as NodeListOf<HTMLElement>).forEach((child) => {
            child.classList.remove("d-none");
          });
        } else {
          target
            .closest(".mt-editor-manager-wrap")
            ?.querySelector(".tox-tinymce")
            ?.classList.remove("d-none");
        }
      }
    };
  });

  selectElms.forEach((select) => {
    select.addEventListener("change", (ev) => {
      if (!ev.isTrusted) {
        return;
      }

      ev.stopImmediatePropagation();
      ev.stopPropagation();
      ev.preventDefault();

      Promise.all(handlers.map((f) => f(select.value))).then(() => {
        $(select).trigger("change");
      });
    });
  });

  handlers.forEach((f) => f(selectElms[0].value));
}

(async () => {
  const selectElms = document.querySelectorAll<HTMLSelectElement>(
    "#convert_breaks, #convert_breaks_for_mobile"
  );

  initSelectElms(selectElms);
  selectElms[0].form?.querySelectorAll('button[type="submit"]').forEach((elm) => {
    initButton(elm as HTMLElement, serializeMethods);
  });
})();
