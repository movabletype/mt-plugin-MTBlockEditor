import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  addEditUpdateBlock: vi.fn(),
  assetUploaderOpen: vi.fn(),
  editor: {},
}));

vi.mock("mt-block-editor-block/React", () => ({
  default: window.MTBlockEditor.React,
  useRef: (initialValue) => ({ current: initialValue }),
  useState: (initialValue) => [initialValue, vi.fn()],
}));

vi.mock("mt-block-editor-block/decorator", () => ({
  blockProperty: (component) => component,
}));

vi.mock("mt-block-editor-block/Context", () => ({
  useEditorContext: () => ({ editor: mocks.editor }),
}));

vi.mock("mt-block-editor-block/Hook", () => ({
  useCommands: vi.fn(),
}));

vi.mock("./edit", () => ({
  addEditUpdateBlock: mocks.addEditUpdateBlock,
}));

import MTImage from "./MTImage";

interface AssetUploaderOptions {
  initialSelectedData: Record<string, unknown>[];
  insert: (selectedData: Record<string, unknown>[]) => void;
}

const openAssetUploader = (block: MTImage): AssetUploaderOptions => {
  block.showModal = true;

  const element = block.editor({ focus: true });
  const Editor = element.type as (props: Record<string, unknown>) => unknown;
  Editor(element.props);

  expect(mocks.assetUploaderOpen).toHaveBeenCalledOnce();
  return mocks.assetUploaderOpen.mock.calls[0][0];
};

describe("MTImage - AssetUploader", () => {
  beforeEach(() => {
    mocks.addEditUpdateBlock.mockReset();
    mocks.assetUploaderOpen.mockReset();
    window.trans = (message) => message;
    window.MT = {
      AssetUploader: {
        open: mocks.assetUploaderOpen,
      },
    } as unknown as Window["MT"];
  });

  it.each([
    ["the original asset", "https://example.com/image.jpg", true],
    ["an external URL", "https://example.com/page.html", false],
  ])("passes whether the image links to %s", (_description, linkUrl, expected) => {
    const block = new MTImage({
      assetId: "123",
      assetUrl: "https://example.com/image.jpg",
      linkUrl,
      imageWidth: "640",
      alternativeText: "Alternative text",
      caption: "Caption",
      alignment: "center",
    });

    const options = openAssetUploader(block);

    expect(options.initialSelectedData).toEqual([
      {
        id: "123",
        imageWidth: "640",
        alternativeText: "Alternative text",
        caption: "Caption",
        align: "center",
        linkToOriginal: expected,
      },
    ]);
  });

  it("sets the link URL to the selected original asset", () => {
    const block = new MTImage({
      assetUrl: "https://example.com/old.jpg",
      linkUrl: "https://example.com/page.html",
    });
    const options = openAssetUploader(block);

    options.insert([
      {
        assetId: "456",
        assetUrl: "https://example.com/new.jpg",
        assetThumbnailUrl: "https://example.com/new-thumbnail.jpg",
        assetThumbnailWidth: "320",
        assetThumbnailHeight: "240",
        align: "none",
        alternativeText: "New alternative text",
        caption: "New caption",
        linkToOriginal: true,
      },
    ]);

    expect(mocks.addEditUpdateBlock).toHaveBeenCalledWith(
      mocks.editor,
      block,
      expect.objectContaining({
        assetUrl: "https://example.com/new.jpg",
        linkUrl: "https://example.com/new.jpg",
      })
    );
    expect(block.linkUrl).toBe("https://example.com/new.jpg");
  });

  it("clears a previous link to the original asset when it is unchecked", () => {
    const block = new MTImage({
      assetUrl: "https://example.com/old.jpg",
      linkUrl: "https://example.com/old.jpg",
    });
    const options = openAssetUploader(block);

    options.insert([
      {
        assetUrl: "https://example.com/new.jpg",
        linkToOriginal: false,
      },
    ]);

    expect(mocks.addEditUpdateBlock).toHaveBeenCalledWith(
      mocks.editor,
      block,
      expect.objectContaining({ linkUrl: "" })
    );
    expect(block.linkUrl).toBe("");
  });

  it("preserves an external link when link to original is unchecked", () => {
    const block = new MTImage({
      assetUrl: "https://example.com/old.jpg",
      linkUrl: "https://example.com/page.html",
    });
    const options = openAssetUploader(block);

    options.insert([
      {
        assetUrl: "https://example.com/new.jpg",
        linkToOriginal: false,
      },
    ]);

    const newData = mocks.addEditUpdateBlock.mock.calls[0][2];
    expect(newData).not.toHaveProperty("linkUrl");
    expect(block.linkUrl).toBe("https://example.com/page.html");
  });
});
