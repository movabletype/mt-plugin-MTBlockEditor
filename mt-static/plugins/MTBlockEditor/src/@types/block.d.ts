declare namespace MTBlockEditor {
  namespace Serialize {
    export interface Block {
      class_name: string;
      html: string;
      icon: string;
      identifier: string;
      label: string;
      preview_header: string;
      can_remove_block: boolean;
      wrap_root_block: boolean;
      show_preview: boolean;
      block_display_options: BlockDisplayOptions;
    }

    interface BlockDisplayOptions {
      [key: string]: BlockDisplayOption;
    }

    interface BlockDisplayOption {
      order: number;
      panel: boolean;
      shortcut: boolean;
    }
  }
}
