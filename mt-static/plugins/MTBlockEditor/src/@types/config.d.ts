declare namespace MTBlockEditor {
  namespace Export {
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
