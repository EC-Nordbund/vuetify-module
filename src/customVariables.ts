import { Options } from "./options";

export function customVariables(options: Options, addStyles: any[]) {
  addStyles.push(...options.customVariables.map((path) => `@import '${path}'`));
}
