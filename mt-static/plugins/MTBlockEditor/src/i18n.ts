import i18n from "mt-block-editor-block/i18n";
import { locales } from "../../../../i18next-parser.config";

i18n.on("initialized", () => {
  locales.forEach((lang) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const l = require(`./locales/${lang}/translation.json`);
    i18n.addResourceBundle(lang, "translation", l, true, false);
  });
});

export function t(
  args: string | string[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>
): string {
  return i18n.t(args, params);
}
