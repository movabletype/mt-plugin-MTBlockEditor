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

const serializeMethods: SerializeMethod[] = [];

async function initSelect(select): Promise<void> {
  let editor: Editor | null = null;
  let lastValue = "";
  const target = document.getElementById(
    select.dataset.target
  ) as HTMLInputElement;
  const inputElm = document.createElement("INPUT") as HTMLInputElement;
  inputElm.id = select.dataset.target + "-mt-be";
  const wrap = document.createElement("DIV");
  wrap.classList.add("mt-block-editor-wrap");
  wrap.appendChild(inputElm);

  serializeMethods.push(async () => {
    if (!editor) {
      return;
    }
    return editor.serialize().then(() => {
      target.value = inputElm.value;
    });
  });

  async function handleSelect(): Promise<void> {
    const oldLastValue = lastValue;
    lastValue = select.value;

    if (select.value === "block_editor") {
      inputElm.value = target.value;
      select.closest(".mt-contentblock").appendChild(wrap);

      const opts: ApplyOptions = {
        id: inputElm.id,
      };

      const fieldId = select.id.match(/(\d+)$/)[1];
      const blockDisplayOptionId = (document.getElementById(
        `content-field-${fieldId}-be_config`
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

      select
        .closest(".mt-contentblock")
        .querySelector(".editor-content")
        .classList.add("d-none");

      return;
    } else if (oldLastValue === "block_editor") {
      return unload({
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
  }

  select.addEventListener("change", (ev) => {
    if (!ev.isTrusted) {
      return;
    }

    ev.stopImmediatePropagation();
    ev.stopPropagation();
    ev.preventDefault();

    handleSelect().then(() => {
      const changeEv = new Event("change");
      select.dispatchEvent(changeEv);
    });
  });
  handleSelect();
}

(() => {
  const selects = document.querySelectorAll(
    ".custom-select.convert_breaks"
  ) as NodeListOf<HTMLSelectElement>;

  if (selects.length === 0) {
    return;
  }

  const form = selects[0].form as HTMLFormElement;

  selects.forEach(initSelect);
  form.querySelectorAll("button").forEach((elm) => {
    initButton(elm, serializeMethods);
  });
})();
