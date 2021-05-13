import { Editor, EditorOptions } from "mt-block-editor-block";
import { Settings as TinyMCESettings } from "tinymce";

const GLOBAL_ATTRIBUTES = [
  "id",
  "class",
  "style",
  "title",
  "accesskey",
  "tabindex",
  "lang",
  "dir",
  "draggable",
  "dropzone",
  "contextmenu",
  "hidden",
].join("|");

const ALLOWED_EVENT_ATTRIBUTES = ["onclick"].join("|");

export function apply(
  opts: Partial<EditorOptions> & {
    tinyMCEDefaultSettings?: Partial<TinyMCESettings>;
  }
): Promise<Editor> {
  function setDirty({ editor }): void {
    window.setDirty(true);
    if (window.app) {
      window.app.getIndirectMethod("setDirty")();
    }
    editor.off("change", setDirty);
  }

  const defaults = {
    i18n: {
      lng: document.querySelector("html")?.getAttribute("lang"),
    },
    block: {
      "sixapart-oembed": {
        resolver: ({ url, maxwidth, maxheight }) => {
          return fetch(
            window.CMSScriptURI +
              "?" +
              new URLSearchParams({
                __mode: "mt_be_oembed",
                url: url,
                maxwidth: maxwidth || "",
                maxheight: maxheight || "",
              })
          ).then((res) => res.json());
        },
      },
    },
  };

  const tinyMCEDefaultSettings =
    "tinyMCEDefaultSettings" in opts ? opts.tinyMCEDefaultSettings : {};

  // deep merge
  const block = Object.assign({}, defaults.block, opts.block || {});

  // options for apply
  const applyOpts = Object.assign({}, defaults, opts, {
    block,
  }) as EditorOptions;

  applyOpts.stylesheets = applyOpts.stylesheets || [];
  return window.MTBlockEditor?.apply(applyOpts).then((ed) => {
    ed.on("buildTinyMCESettings", ({ settings }) => {
      Object.assign(settings, tinyMCEDefaultSettings);

      settings.extended_valid_elements = [
        // we embed 'a[onclick]' by inserting image with popup
        `a[${GLOBAL_ATTRIBUTES}|${ALLOWED_EVENT_ATTRIBUTES}|href|target|name]`,
        // allow SPAN element without attributes
        `span[${GLOBAL_ATTRIBUTES}|${ALLOWED_EVENT_ATTRIBUTES}]`,
        // allow SCRIPT element
        "script[id|name|type|src|integrity|crossorigin]",
      ].join(",");
    });
    ed.on("change", setDirty);

    return ed;
  });
}

export function isSupportedEnvironment(): boolean {
  return window.MTBlockEditor && window.MTBlockEditor.isSupportedEnvironment();
}

export function unload(opt: { id: string }): Promise<void> {
  return window.MTBlockEditor
    ? window.MTBlockEditor.unload(opt)
    : Promise.resolve();
}
