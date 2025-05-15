import { Block, Editor } from "mt-block-editor-block";

function buildEditData(block, template): Record<string, unknown> {
  const data = {};
  Object.keys(template).forEach((k) => {
    data[k] = block[k];
  });
  return data;
}

const editHandlers = {
  id: (Symbol ? Symbol("update block") : "update block") as symbol, // avoid error on IE
  merge(a, b) {
    return Object.keys(a.data.last).every((k) => a.data.last[k] === b.data.last[k]) ? a : null;
  },
  undo(hist, { setFocusedIds }) {
    const block = hist.block;
    const data = hist.data;

    data.cur = data.cur || buildEditData(block, data.last);
    Object.assign(block, data.last);
    setFocusedIds([block.id], { forceUpdate: true });
  },
  redo(hist, { setFocusedIds }) {
    const block = hist.block;
    const data = hist.data;

    Object.assign(block, data.cur);
    setFocusedIds([block.id], { forceUpdate: true });
  },
};

export function addEditUpdateBlock(
  editor: Editor,
  block: Block,
  template: Record<string, unknown>
): void {
  editor.editManager.add({
    block,
    data: {
      last: buildEditData(block, template),
    },
    handlers: editHandlers,
  });
}
