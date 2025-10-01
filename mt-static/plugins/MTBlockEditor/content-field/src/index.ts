import MultiLineText from "./MultiLineText.svelte";
import type { CustomContentFieldMountFunction } from "@sixapart/mt-toolkit/contenttype";
import type { MultiLineTextOptions } from "./type";

if (typeof ContentTypeEditor !== "undefined") {
  const mountMultiLineTextSvelte: CustomContentFieldMountFunction<MultiLineTextOptions> = function (
    props,
    target
  ) {
    const multiLineTextSvelte = new MultiLineText({
      props: props,
      target: target,
    });
    return {
      component: multiLineTextSvelte,
      destroy: () => {
        multiLineTextSvelte.$destroy();
      },
    };
  };

  ContentTypeEditor.registerCustomType("multi-line-text", mountMultiLineTextSvelte);
}
