import $ from "jquery";
import {
  showAlert,
  serializeBlockPreferences,
  unserializeBlockPreferences,
} from "./util";
import JSON from "./util/JSON";
import { apply, unload } from "./block-editor";

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
          "You can upload image files of size {{_1}} or less.",
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
  form.querySelectorAll("button").forEach((elm) => {
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

  function serializeBlock(form): Record<string, unknown> {
    const data: Record<string, unknown> = {};

    [
      "class_name",
      "html",
      "icon",
      "identifier",
      "label",
      "preview_header",
      "can_remove_block",
      "wrap_root_block",
    ].forEach((k) => {
      const e = form[k];
      data[k] = e.type === "checkbox" ? e.checked : e.value;
    });

    const blockDisplayOptions: MTBlockEditor.Export.BlockDisplayOptions = {};
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

    return data;
  }

  function unserializeBlock(form, data): void {
    [
      "class_name",
      "html",
      "icon",
      "identifier",
      "label",
      "preview_header",
      "can_remove_block",
      "wrap_root_block",
    ].forEach((k) => {
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

  document
    .getElementById("import-block-form")
    ?.addEventListener("submit", async function (ev) {
      ev.preventDefault();

      const identifierValue = (document.getElementById(
        "identifier"
      ) as HTMLInputElement).value;
      if (identifierValue !== "") {
        window.confirm(window.trans("Are you sure you want to overwrite it?"));
      }

      const fileInputElm = (ev.target as HTMLFormElement).file;
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

      await unload({
        id: "html",
      });

      unserializeBlock(document.getElementById("block-form"), data);

      unserializeBlockPreferences();
      await applyBlockEditorForSetup();
      document
        .querySelectorAll("#icon, #wrap_root_block, #can_remove_block")
        .forEach((elm) => {
          elm.dispatchEvent(new Event("change"));
          if (
            elm instanceof HTMLInputElement &&
            elm.type === "checkbox" &&
            elm.dataset.toggle === "collapse" &&
            elm.dataset.target
          ) {
            const target = document.querySelector(
              elm.dataset.target
            ) as HTMLElement;
            target.classList.toggle("show", elm.checked);
          }
        });

      $("#import-block-modal").modal("hide");
      fileInputElm.value = "";
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
