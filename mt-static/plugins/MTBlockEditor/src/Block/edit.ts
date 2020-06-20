function buildEditData(block, template) {
  const data = {};
  Object.keys(template).forEach((k) => {
    data[k] = block[k];
  });
  return data;
}

const editHandlers = {
  id: Symbol ? Symbol("update block") : "update block", // avoid error on IE
  merge(a, b) {
    return Object.keys(a.data.last).every(
      (k) => a.data.last[k] === b.data.last[k]
    )
      ? a
      : null;
  },
  undo(hist, { setFocusedId }) {
    const block = hist.block;
    const data = hist.data;

    data.cur = data.cur || buildEditData(block, data.last);
    Object.assign(block, data.last);
    setFocusedId(block.id, { forceUpdate: true });
  },
  redo(hist, { setFocusedId }) {
    const block = hist.block;
    const data = hist.data;

    Object.assign(block, data.cur);
    setFocusedId(block.id, { forceUpdate: true });
  },
};

export function addEditUpdateBlock(editor, block, template) {
  editor.editManager.add({
    block,
    data: {
      last: buildEditData(block, template),
    },
    handlers: editHandlers,
  });
}
