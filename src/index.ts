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
import consola from "consola";

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
};

const mod: Module<Options> = function (moduleOptions: Options) {
  const options: Options = merge.all([
    defaults,
    this.options.vuetify || {},
    moduleOptions || {},
  ]);

  // validate options
  if (
    options.iconInjector &&
    options.iconFont &&
    process.env.NODE_ENV !== "production"
  ) {
    consola.warn(
      `You use the iconFont option AND the iconInjector this is not recomended.`
    );

    if (options.iconFont === "mdi") {
      consola.warn(`You use iconFont = 'mdi' so you import the full icon-font.
You can set iconInjector = false and no change in behavior is expected.
In > 90% of cases iconInjector can "treeshake" the icons so your users
dont load the full font. For this you can remove the iconFont option.
Please checkout the drawbacks of the iconinjector!`);
    }
  }

  if (this.nuxt.options.component) {
    registerComponents();
  } else {
    throw "[Vuetify-Module] You have to set components: true in your nuxt.config.js for vuetify-module to work!";
  }

  if (options.iconInjector) {
    iconInjector(options);
  }

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
