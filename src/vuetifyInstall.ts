import { ModuleThis } from "@nuxt/types/config/module";
import { resolve } from "path";
import { Options } from "./options";

export function vuetifyInstall(this: ModuleThis, options: Options) {
  ;(this.options.build!.transpile! as string[]).push('vuetify/lib')
  
  const cleanOptions = { ...options };
  delete cleanOptions.iconInjector;
  delete cleanOptions.iconInjector;
  delete cleanOptions.customVariables;
  delete cleanOptions.iconFont;
  delete cleanOptions.font;

  this.addTemplate({
    fileName: `vuetify/options.js`,
    src: resolve(__dirname, "../templates/options.js"),
    options: cleanOptions,
  });

  this.addPlugin({
    fileName: "vuetify/plugin.js",
    src: resolve(__dirname, "../templates/plugin.js"),
  });
}
