import { ModuleThis } from "@nuxt/types/config/module";
import { Options } from "./options";

export function customVariables(
  this: ModuleThis,
  options: Options,
  addStyles: any[]
) {
  addStyles.push(...options.customVariables.map((path) => `@import '${path}'`));
}
