import $ from "jquery";
import {
  JSONStringify,
  serializeBlockPreferences,
  unserializeBlockPreferences,
} from "./util";
import { isSupportedEnvironment, apply, unload } from "./block-editor";

let editor;
async function applyBlockEditorForSetup() {
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

(() => {
  const $icon = $("#icon");
  const $iconImage = $("#icon-image");
  const $iconFile = $("#icon-file");
  const $resetIconImage = $("#reset-icon-image");
  const maxIconSize = $iconFile.data("maxIconSize");

  $icon
    .on("change", () => {
      const value = String($icon.val());
      if (!value) {
        $iconImage.addClass("d-none");
        $resetIconImage.addClass("d-none");
        $iconFile.removeClass("d-none");
        return;
      }

      $iconImage.attr("src", value).removeClass("d-none");
      $resetIconImage.removeClass("d-none");
      $iconFile.addClass("d-none");
    })
    .triggerHandler("change");

  $resetIconImage.on("click", (ev) => {
    ev.preventDefault();
    try {
      $iconFile.val("");
    } catch (e) {
      // ignore
    }
    $icon.val("").triggerHandler("change");
  });

  $iconFile.on("change", (ev) => {
    const files = (ev.target as HTMLInputElement).files;
    const file = files && files[0];
    if (!file) {
      return;
    }

    if (!/^image/.test(file.type) || file.size > maxIconSize) {
      try {
        $iconFile.val("");
      } catch (e) {
        // ignore
      }

      alert(
        `You can upload image files of size ${Math.round(
          maxIconSize / 1024
        )} KB or less.`
      );

      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result;
      $icon
        .val(typeof result === "string" ? result : "")
        .triggerHandler("change");
    };

    reader.readAsDataURL(file);
  });
})();

(async () => {
  await applyBlockEditorForSetup();

  const htmlElm = document.querySelector("#html") as HTMLInputElement;

  let doClick = false;
  [...htmlElm.form!.querySelectorAll("button")].forEach((elm) => {
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

(() => {
  async function readAsText(file: File) {
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
    }).catch((e) => {
      return;
    });
  }

  function serializeBlock(form) {
    const data: any = {};

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

    data.block_display_options = {};
    const blockDisplayOptions = JSON.parse(form.block_display_options.value);
    blockDisplayOptions.common.forEach((b) => {
      data["block_display_options"][b.typeId] = {
        order: b.index,
        panel: !!b.panel,
        shortcut: !!b.shortcut,
      };
    });

    return data;
  }

  function unserializeBlock(form, data) {
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
    form.block_display_options.value = JSONStringify({
      common: blockDisplayOptions,
    });
  }

  document.getElementById("export-block")?.addEventListener("click", (ev) => {
    ev.preventDefault();
    window.MTBlockEditor?.serialize().then(function () {
      const data = serializeBlock(document.getElementById("block-form"));

      const a = document.createElement("a");
      a.href = URL.createObjectURL(
        new Blob([JSONStringify(data)], {
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
      const confirmation =
        identifierValue === ""
          ? Promise.resolve() // No need to confirm
          : Promise.resolve(); // FIXME: need to confirm
      await confirmation;

      const json = await readAsText(
        (ev.target as HTMLFormElement).file.files[0]
      );
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
        alert("Failed to read the file.");
        return;
      }

      await unload({
        id: "html",
      });

      unserializeBlock(document.getElementById("block-form"), data);

      unserializeBlockPreferences();
      await applyBlockEditorForSetup();
      $("#icon, #wrap_root_block, #can_remove_block").each((i, elm) => {
        $(elm).triggerHandler("change");
      });

      $("#import-block-modal").modal("hide");
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
$("#block_display_options-list :input").on("change", serializeBlockPreferences);
