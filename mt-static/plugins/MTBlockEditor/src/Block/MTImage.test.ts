import { describe, expect, it } from "vitest";
import type { NewFromHtmlOptions } from "mt-block-editor-block/Block";
import MTImage from "./MTImage";

const baseOptions: NewFromHtmlOptions = {
  html: "",
  node: document.createElement("div"),
  factory: {},
  meta: {},
};

describe("MTImage", () => {
  describe("newFromHtml", () => {
    it("only image", async () => {
      const block = await MTImage.newFromHtml({
        ...baseOptions,
        html: `<p>
      <img src="test.jpg" alt="alt-text" width="3648" height="5472" class="asset asset-image" style="max-width:100%;height:auto;display:block"/>
      </p>`,
      });
      expect(block.url).toBe("test.jpg");
      expect(block.imageWidth).toBe("3648");
      expect(block.imageHeight).toBe("5472");
      expect(block.alternativeText).toBe("alt-text");
    });

    it("link to original", async () => {
      const block = await MTImage.newFromHtml({
        ...baseOptions,
        html: `<a href="http://example.com/test.jpg">
        <img src="thumbnail.jpg" alt="" width="364" height="547" class="asset asset-image" style="max-width:100%;height:auto"/>
        </a>`,
      });
      expect(block.url).toBe("thumbnail.jpg");
      expect(block.imageWidth).toBe("364");
      expect(block.imageHeight).toBe("547");
      expect(block.alternativeText).toBe("");
      expect(block.caption).toBe("");
      expect(block.linkToOriginal).toBe(true);
      expect(block.linkUrl).toBe("http://example.com/test.jpg");
    });

    it("link to external", async () => {
      const block = await MTImage.newFromHtml({
        ...baseOptions,
        html: `<a href="http://example.com/test.jpg" target="_blank" title="image-title">
        <img src="thumbnail.jpg" alt="" width="364" height="547" class="asset asset-image" style="max-width:100%;height:auto"/>
        </a>`,
      });
      expect(block.url).toBe("thumbnail.jpg");
      expect(block.imageWidth).toBe("364");
      expect(block.imageHeight).toBe("547");
      expect(block.alternativeText).toBe("");
      expect(block.caption).toBe("");
      expect(block.linkToOriginal).toBe(false);
      expect(block.linkUrl).toBe("http://example.com/test.jpg");
      expect(block.linkTitle).toBe("image-title");
      expect(block.linkTarget).toBe("_blank");
    });

    it("with caption", async () => {
      const block = await MTImage.newFromHtml({
        ...baseOptions,
        html: `
        <figure class="mt-figure" style="display:inline-block">
          <a href="http://example.com/IMG_2197.jpg" target="_self">
            <img src="http://example.com/thumbnail.jpg" alt="代替テキスト" width="3648" height="5472" class="asset asset-image" style="max-width:100%;height:auto"/>
          </a>
          <figcaption>キャプション</figcaption>
        </figure>`,
      });
      expect(block.url).toBe("http://example.com/thumbnail.jpg");
      expect(block.imageWidth).toBe("3648");
      expect(block.imageHeight).toBe("5472");
      expect(block.alternativeText).toBe("代替テキスト");
      expect(block.caption).toBe("キャプション");
      expect(block.linkToOriginal).toBe(false);
      expect(block.linkUrl).toBe("http://example.com/IMG_2197.jpg");
      expect(block.linkTitle).toBe("");
      expect(block.linkTarget).toBe("_self");
    });

    it("with multiline caption", async () => {
      const block = await MTImage.newFromHtml({
        ...baseOptions,
        html: `
        <figure class="mt-figure" style="display:inline-block">
          <a href="http://example.com/IMG_2197.jpg" target="_self">
            <img src="http://example.com/thumbnail.jpg" alt="代替テキスト" width="3648" height="5472" class="asset asset-image" style="max-width:100%;height:auto"/>
          </a>
          <figcaption>a &amp; b<br>キャプション<br>&lt;c&gt;</figcaption>
        </figure>`,
      });
      expect(block.url).toBe("http://example.com/thumbnail.jpg");
      expect(block.imageWidth).toBe("3648");
      expect(block.imageHeight).toBe("5472");
      expect(block.alternativeText).toBe("代替テキスト");
      expect(block.caption).toBe("a & b\nキャプション\n<c>");
      expect(block.linkToOriginal).toBe(false);
      expect(block.linkUrl).toBe("http://example.com/IMG_2197.jpg");
      expect(block.linkTitle).toBe("");
      expect(block.linkTarget).toBe("_self");
    });
  });
});
