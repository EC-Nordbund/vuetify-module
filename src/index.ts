import dartSass from "sass";
import { Module } from "@nuxt/types";
import { Framework } from "vuetify";
import merge from "deepmerge";
import { registerComponents } from "./registerComponents";
import { iconInjector } from "./iconInjector";
import { vuetifyInstall } from "./vuetifyInstall";
import { setFont } from "./setFont";
import { customVariables } from "./customVariables";
import { iconFont } from "./iconFont";
import { Options } from "./options";

interface SassOptions {
  implementation?: any;
  additionalData?: string;
}

const defaults: Options = {
  customVariables: [],
  iconInjector: {
    icons: {},
    components: {},
  },
  iconFont: false,
};

const mod: Module<Options> = function (moduleOptions: Options) {
  const options: Options = merge.all([
    defaults,
    this.options.vuetify || {},
    moduleOptions || {},
  ]);

  if (options.iconInjector) {
    iconInjector(options);
  }

  registerComponents();

  vuetifyInstall(options);

  const addStyles = [];

  const { sass, scss } = this.options.build!.loaders! as {
    sass: SassOptions;
    scss: SassOptions;
  };

  // Use Dart Sass
  sass.implementation = scss.implementation = dartSass;

  if (options.font) {
    setFont(options, addStyles);
  }

  // Custom variables
  if (options.customVariables) {
    customVariables(options, addStyles);
  }

  if (options.iconFont) {
    iconFont(options);
  }

  if (addStyles.length > 0) {
    sass.additionalData = `${addStyles.join("\n")}\n${
      sass.additionalData ?? ""
    }`;
    scss.additionalData = `${addStyles.join(";\n")};\n${
      scss.additionalData ?? ""
    }`;
  }
};

declare module "@nuxt/types" {
  interface Context {
    $vuetify: Framework;
  }

  interface NuxtOptions {
    vuetify?: Options;
  }
}

export default mod;

module.exports.meta = require("../package.json");
