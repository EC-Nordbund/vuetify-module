import { resolve, dirname, join } from "path";
import { readdirSync, readFileSync } from "fs";
import { ModuleThis } from "@nuxt/types/config/module";

export function registerComponents(this: ModuleThis) {
  const extraComponents: [string, string][] = [];

  // Scan some dir...
  const basePath = dirname(require.resolve("vuetify/lib/components"));

  const folders = readdirSync(basePath)
    .filter((v) => v[0] == "V")
    .map((p) => join(basePath, p, "index.js"));

  const extra = ['import Vue from "vue";\n', ""];

  folders.forEach((f) => {
    const file = readFileSync(f, "utf8");

    var re = /const (V[a-zA-Z]*) = createSimpleFunctional\('/g;

    var m;

    do {
      m = re.exec(file);
      if (m) {
        extra[0] += `import {${m[1]}} from '${f}'\n`;
        extra[1] += `Vue.component('${m[1]}', ${m[1]})\n`;

        extraComponents.push([f, m[1]]);
      }
    } while (m);
  });

  // extraComponents.forEach(([file, name]) => {
  this.addTemplate({
    filename: `vuetify/extra-components.js`,
    src: resolve(__dirname, "../templates/extra-components.js"),
    options: {
      cmps: extra.join("\n"),
    },
  });
  // });

  this.nuxt.hook("components:dirs", (dirs: any[]) => {
    dirs.push({
      path: "vuetify/lib/components",
      pattern: "**/V*.js",
      pathPrefix: false,
      watch: false,
    });

    dirs.push({
      path: join(this.nuxt.options.buildDir, "vuetify/extra-components"),
      pattern: "**/V*.js",
      pathPrefix: false,
      watch: false,
    });
  });
}
