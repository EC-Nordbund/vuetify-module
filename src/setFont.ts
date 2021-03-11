import { ModuleThis } from "@nuxt/types/config/module";
import { Options } from "./options";

export function setFont(this: ModuleThis, options: Options, addStyles: any[]) {
  if (typeof options.font === "string") {
    options.font = {
      family: options.font,
    };
  }

  const font = (typeof options.font === "string"
    ? options.font
    : options.font.family)!;

  const family = `${font}:100,300,400,500,700,900&display=swap`;

  if (this.options.modules!.some((mod) => mod === "nuxt-webfontloader")) {
    (this.options.head! as any).link!.push({
      rel: "stylesheet",
      type: "text/css",
      href: `https://fonts.googleapis.com/css?family=${family}`,
    });
  }

  // Add font-family custom variable (only if not Roboto, cause already default in Vuetify styles)
  if (font !== "Roboto") {
    const userFontFamily =
      typeof font === "string" ? `'${font}'` : `${font.join(", ")}`;

    addStyles.push(`$body-font-family: ${userFontFamily}, sans-serif`);
  }

  // Add font-size custom variable
  if (options.font.size) {
    addStyles.push(`$font-size-root: ${options.size}px`);
  }
}
