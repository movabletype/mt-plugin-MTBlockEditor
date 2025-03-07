import $ from "jquery";
import Ajv from "ajv";

import {
  showAlert,
  dismissAlert,
  serializeBlockPreferences,
  unserializeBlockPreferences,
} from "./util";
import JSON from "./util/JSON";
import { apply, unload } from "./block-editor";
import { initMtValidate } from "./form";

import blockSchema from "./schemas/block.json";

let editor;
async function applyBlockEditorForSetup(): Promise<void> {
  editor = await apply({
    id: "html",
    mode: "setup",
    panelBlockTypes: JSON.parse(
      document.getElementById("html")?.dataset.mtBlockTypeIds || "[]"
    ),
    block: {
      "mt-image": {
        showModalOnNew: false,
      },
      "mt-file": {
        showModalOnNew: false,
      },
    },
  });
  return;
}

function updateFormState(): void {
  document
    .querySelectorAll<HTMLInputElement>(
      "#icon, #wrap_root_block, #can_remove_block"
    )
    .forEach((elm) => {
      elm.dispatchEvent(new Event("change"));
      const datasetToggle = elm.dataset.bsToggle || elm.dataset.toggle;
      const datasetTarget = elm.dataset.bsTarget || elm.dataset.target;
      if (
        elm.type === "checkbox" &&
        datasetToggle === "collapse" &&
        datasetTarget
      ) {
        const target = document.querySelector<HTMLElement>(datasetTarget);
        target?.classList.toggle("show", elm.checked);
      }
    });
}

// icon
(() => {
  const icon = document.querySelector("#icon") as HTMLInputElement;
  const iconImage = document.querySelector("#icon-image") as HTMLInputElement;
  const iconFile = document.querySelector("#icon-file") as HTMLInputElement;
  const resetIconImage = document.querySelector(
    "#reset-icon-image"
  ) as HTMLAnchorElement;
  const maxIconSize = parseInt(iconFile.dataset.mtMaxIconSize || "0");

  icon.addEventListener("change", () => {
    const value = icon.value;
    if (!value) {
      iconImage.classList.add("d-none");
      resetIconImage.classList.add("d-none");
      iconFile.classList.remove("d-none");
      return;
    }

    iconImage.src = value;
    iconImage.classList.remove("d-none");
    resetIconImage.classList.remove("d-none");
    iconFile.classList.add("d-none");
    iconFile.value = "";
  });
  icon.dispatchEvent(new Event("change"));

  resetIconImage.addEventListener("click", (ev) => {
    ev.preventDefault();
    try {
      iconFile.value = "";
    } catch (e) {
      // ignore
    }
    icon.value = "";
    icon.dispatchEvent(new Event("change"));
  });

  iconFile.addEventListener("change", (ev) => {
    const files = (ev.target as HTMLInputElement).files;
    const file = files && files[0];
    if (!file) {
      return;
    }

    if (!/^image/.test(file.type) || file.size > maxIconSize) {
      try {
        iconFile.value = "";
      } catch (e) {
        // ignore
      }

      showAlert({
        msg: window.trans(
          "You can upload image files of size [_1] or less.",
          `${Math.round(maxIconSize / 1024)}KB`
        ),
      });

      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result;
      icon.value = typeof result === "string" ? result : "";
      icon.dispatchEvent(new Event("change"));
      dismissAlert();
    };

    reader.readAsDataURL(file);
  });
})();

// serialize before saving
(async () => {
  await applyBlockEditorForSetup();

  const htmlElm = document.querySelector("#html") as HTMLInputElement;
  const form = htmlElm.form as HTMLFormElement;

  let doClick = false;
  form
    .querySelectorAll<HTMLButtonElement>(`button[type="submit"]`)
    .forEach((elm) => {
      elm.addEventListener("click", (ev) => {
        if (doClick) {
          doClick = false;
          return;
        }

        ev.stopImmediatePropagation();
        ev.stopPropagation();
        ev.preventDefault();

        editor.serialize().then(() => {
          doClick = true;
          elm.click();
        });
      });
    });
})();

// export and import
(() => {
  async function readAsText(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (!file) {
        reject();
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result ?? "";
        resolve(typeof result === "string" ? result : "");
      };

      reader.onerror = () => {
        reject();
      };

      reader.readAsText(file);
    }).catch(() => {
      return "";
    });
  }

  function serializeBlock(form): MTBlockEditor.Serialize.Block {
    const data: Partial<MTBlockEditor.Serialize.Block> = {};

    [
      "class_name",
      "html",
      "icon",
      "identifier",
      "label",
      "preview_header",
      "can_remove_block",
      "wrap_root_block",
      "show_preview",
    ].forEach((k) => {
      const e = form[k];
      data[k] = e.type === "checkbox" ? e.checked : e.value;
    });

    const blockDisplayOptions: MTBlockEditor.Serialize.BlockDisplayOptions = {};
    const blockDisplayOptionsData = JSON.parse(
      form.block_display_options.value
    );
    blockDisplayOptionsData.common.forEach((b) => {
      blockDisplayOptions[b.typeId] = {
        order: b.index,
        panel: !!b.panel,
        shortcut: !!b.shortcut,
      };
    });
    data["block_display_options"] = blockDisplayOptions;

    return data as MTBlockEditor.Serialize.Block;
  }

  function unserializeBlock(form, data: MTBlockEditor.Serialize.Block): void {
    [
      "class_name",
      "html",
      "icon",
      "identifier",
      "label",
      "preview_header",
      "can_remove_block",
      "wrap_root_block",
      "show_preview",
    ].forEach((k) => {
      if (!(k in data)) {
        return;
      }

      const e = form[k];
      if (e.type === "checkbox") {
        e.checked = !!data[k];
      } else {
        e.value = data[k];
      }
    });

    const blockDisplayOptions = Object.keys(data["block_display_options"] || {})
      .map((k) => {
        const b = data["block_display_options"][k];
        return {
          typeId: k,
          index: b.order,
          panel: !!b.panel,
          shortcut: !!b.shortcut,
        };
      })
      .sort((a, b) => a.index - b.index);
    form.block_display_options.value = JSON.stringify({
      common: blockDisplayOptions,
    });
  }

  async function importBlock(fileInputElm): Promise<void> {
    const identifierValue = (document.getElementById(
      "identifier"
    ) as HTMLInputElement).value;
    if (identifierValue !== "") {
      window.confirm(window.trans("Are you sure you want to overwrite it?"));
    }

    const json = await readAsText(fileInputElm.files[0]);
    const data = json
      ? (() => {
          try {
            return JSON.parse(json);
          } catch (e) {
            return null;
          }
        })()
      : null;

    if (!json || !data) {
      showAlert({ msg: window.trans("Failed to read the file.") });
      return;
    }

    const validateSchema = new Ajv().compile(blockSchema);
    if (!validateSchema(data)) {
      showAlert({ msg: window.trans("Invalid file format.") });
      return;
    }

    await unload({
      id: "html",
    });

    unserializeBlock(document.getElementById("block-form"), data);

    unserializeBlockPreferences();
    await applyBlockEditorForSetup();
    updateFormState();

    dismissAlert();
  }

  document.getElementById("export-block")?.addEventListener("click", (ev) => {
    ev.preventDefault();
    window.MTBlockEditor?.serialize().then(function () {
      const data = serializeBlock(document.getElementById("block-form"));

      const a = document.createElement("a");
      a.href = URL.createObjectURL(
        new Blob([JSON.stringify(data)], {
          type: "application/json",
        })
      );
      a.setAttribute("download", (data.identifier || "custom-block") + ".json");
      a.dispatchEvent(new MouseEvent("click"));
    });
  });

  const importModalElm = document.querySelector(
    "#import-block-modal"
  ) as HTMLElement;
  document
    .getElementById("import-block-form")
    ?.addEventListener("submit", async function (ev) {
      ev.preventDefault();
      const fileInputElm = (ev.target as HTMLFormElement).file;
      await importBlock(fileInputElm);

      $(importModalElm).modal("hide");
      fileInputElm.value = "";
    });
  importModalElm
    .querySelectorAll(".btn-close, .mt-close-dialog")
    .forEach((elm) => {
      elm.addEventListener("click", () => {
        $(importModalElm).modal("hide");
      });
    });
})();

$("#block_display_options-list").sortable({
  items: ".sort-enabled",
  placeholder: "placeholder",
  distance: 3,
  opacity: 0.8,
  cursor: "move",
  forcePlaceholderSize: true,
  handle: window.MT.Util.isMobileView() ? ".col-auto:first-child" : false,
  update: serializeBlockPreferences,
});

unserializeBlockPreferences();
serializeBlockPreferences();
document
  .querySelectorAll("#block_display_options-list input")
  .forEach((elm) => elm.addEventListener("change", serializeBlockPreferences));

jQuery("#block-form").on("submit", () => {
  return jQuery(`#block-form input[type="text"]`).mtValidate("simple");
});
initMtValidate();

window.addEventListener("load", () => {
  updateFormState();
});
