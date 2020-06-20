import MTImage from "./Block/MTImage";
import MTFile from "./Block/MTFile";

window.MTBlockEditor.registerBlockType(MTImage);
window.MTBlockEditor.registerBlockType(MTFile);

const scriptElm = document.getElementById(
  "mt-block-editor-script"
) as HTMLScriptElement;
const blockTypes = JSON.parse(scriptElm.dataset.mtBlockTypes || "[]");
const blockTypeIds = JSON.parse(scriptElm.dataset.mtBlockTypeIds || "[]");

blockTypes
  .filter((bt) => !bt.is_default_block)
  .forEach((bt) => {
    const panelBlockTypeIds: string[] = Array.from(blockTypeIds);
    const shortcutBlockTypeIds: string[] = Array.from(blockTypeIds);

    const block = {
      typeId: bt.type_id,
      className: bt.class_name,
      label: bt.label,
      icon: bt.icon,
      html: bt.html,
      canRemoveBlock: !!bt.can_remove_block,
      rootBlock: bt.root_block,
      previewHeader: bt.preview_header,
      shouldBeCompiled: bt.should_be_compiled,
      addableBlockTypesData: JSON.parse(bt.addable_block_types),
    };

    (block.addableBlockTypesData.common || [])
      .filter((d) => !d.panel)
      .map((d) => d.typeId)
      .concat([block.typeId])
      .forEach((typeId) => {
        const index = panelBlockTypeIds.indexOf(typeId);
        if (index !== -1) {
          panelBlockTypeIds.splice(index, 1);
        }
      });
    (block.addableBlockTypesData.common || [])
      .filter((d) => !d.shortcut)
      .map((d) => d.typeId)
      .concat([block.typeId])
      .forEach((typeId) => {
        const index = shortcutBlockTypeIds.indexOf(typeId);
        if (index !== -1) {
          shortcutBlockTypeIds.splice(index, 1);
        }
      });

    window.MTBlockEditor.registerBlockType(
      window.MTBlockEditor.createBoilerplateBlock(
        Object.assign(block, {
          panelBlockTypes: panelBlockTypeIds,
          shortcutBlockTypes: shortcutBlockTypeIds,
        })
      )
    );
  });
