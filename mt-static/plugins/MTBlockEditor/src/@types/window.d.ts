type method = () => void;

interface Window {
  jQuery: typeof jQuery;
  uploadFiles: (files: File[]) => void;
  setDirty: (status: boolean) => void;
  app: { getIndirectMethod: (name: string) => method } | null;
}
