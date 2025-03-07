import { Editor, EditorOptions } from "mt-block-editor-block";
import { Settings as TinyMCESettings } from "tinymce";

export type ApplyOptions = Partial<EditorOptions> & {
  tinyMCEDefaultSettings?: Partial<TinyMCESettings>;
};

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

function buildTinyMCEDefaultSettings(): Partial<TinyMCESettings> {
  return {
    convert_urls: false,

    entities: "160,nbsp",
    entity_encoding: "named",

    valid_children:
      "+a[video|ul|time|table|svg|style|section|ruby|progress|pre|output|ol|noscript|nav|meter|meta|menu|mark|link|keygen|hr|hgroup|header|h6|h5|h4|h3|h2|h1|form|footer|figure|fieldset|embed|dl|div|dialog|details|datalist|command|canvas|blockquote|audio|aside|article|address|area]",
  };
}

export function apply(opts: ApplyOptions): Promise<Editor> {
  function setDirty({ editor }): void {
    if (window.setDirty) {
      window.setDirty(true);
    }
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
        resolver: async ({ url, maxwidth, maxheight }) => {
          const data = await (
            await fetch(
              window.CMSScriptURI +
                "?" +
                new URLSearchParams({
                  __mode: "mt_be_oembed",
                  url: url,
                  maxwidth: maxwidth || "",
                  maxheight: maxheight || "",
                })
            )
          ).json();
          if (data.error?.message) {
            throw new Error(data.error.message);
          }
          return data;
        },
      },
    },
  };

  const tinyMCEDefaultSettings =
    "tinyMCEDefaultSettings" in opts ? opts.tinyMCEDefaultSettings : buildTinyMCEDefaultSettings();

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

    const scriptElm = document.getElementById("mt-block-editor-loader");
    const iframeBaseUrl = scriptElm?.dataset?.mtBlockEditorIframeBaseUrl;
    if (iframeBaseUrl) {
      ed.on("beforeRenderIframePreview", (ev) => {
        const base = document.createElement("base");
        base.href = iframeBaseUrl;
        ev.head = base.outerHTML + ev.head;
      });
    }
    return ed;
  });
}

export function isSupportedEnvironment(): boolean {
  return window.MTBlockEditor && window.MTBlockEditor.isSupportedEnvironment();
}

export function unload(opt: { id: string }): Promise<void> {
  return window.MTBlockEditor ? window.MTBlockEditor.unload(opt) : Promise.resolve();
}
