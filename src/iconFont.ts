const iconFonts = {
  mdi:
    "https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css",
  md: "https://fonts.googleapis.com/css?family=Material+Icons",
  fa:
    "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@latest/css/all.min.css",
  fa4:
    "https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css",
};

import { ModuleThis } from "@nuxt/types/config/module";
import { Options } from "./options";

export function iconFont(this: ModuleThis, options: Options) {
  const url =
    iconFonts[options.iconFont as keyof typeof iconFonts] ?? options.iconFont;

  (this.options.head! as any).link!.push({
    rel: "stylesheet",
    type: "text/css",
    href: url,
  });
}
