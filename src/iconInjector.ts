import { getIconInjector } from "@ec-nordbund/vuetify-icon-injector";
import { Options } from "./options";

export function iconInjector(options: Options) {
  if (!options.iconInjector)
    return;

  const injector = getIconInjector(
    options.iconInjector.icons ?? {},
    options.iconInjector.components ?? {}
  );

  this.options.build!.loaders!.vue = {
    compilerOptions: {
      modules: [injector],
    },
  };
}
