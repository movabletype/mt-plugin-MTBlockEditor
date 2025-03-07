type method = () => void;

interface JQuery {
  modal: (action: string) => void;
  mtModal: {
    open: (uri: string, opts: Record<string, unknown>) => void;
  };
  mtValidate(type: string);
}

interface JQueryStatic {
  _data: (elm: HTMLElement, key: string) => Record<string, unknown>;
  mtValidateAddRules: (
    rules:
      | Record<string, (JQuery) => boolean>
      | Record<"error" | "errstr", boolean | string>
  ) => void;
  mtValidateAddMessages: (messages: Record<string, string>) => void;
  mtValidateMessages: Record<string, string>;
  mtCheckbox(): void;
}

interface EditorDisplayOptions {
  content_css_list?: string[];
  body_class_list?: string[];
}

interface Window {
  MT: {
    Util: {
      isMobileView: () => boolean;
    };
    Editor: {
      defaultCommonOptions: EditorDisplayOptions;
    } | null;
  };
  ScriptURI: string;
  CMSScriptURI: string;
  uploadFiles: (files: File[]) => void;
  setDirty: (status: boolean) => void;
  app: { getIndirectMethod: (name: string) => method } | null;
  trans: (msgId: string, ...params: string[]) => string;
  jQuery: typeof jQuery;
}
