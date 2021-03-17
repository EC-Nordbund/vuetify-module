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

  extra[0] += 'import { createSimpleFunctional } from "vuetify/util/helpers"\n'

  folders.forEach((f) => {
    const file = readFileSync(f, "utf8");

    var re = /const (V[a-zA-Z]*) = createSimpleFunctional\((.*)\)'/g;

    var m;

    do {
      m = re.exec(file);
      if (m) {
        // extra[0] += `import {${m[1]}} from ${JSON.stringify(f)}\n`;
        extra[1] += `Vue.component('${m[1]}', createSimpleFunctional(${m[2]}))\n`;

        extraComponents.push([f, m[1]]);
      }
    } while (m);
  });

  const basePath2 = dirname(require.resolve("vuetify/lib/directives"));

  const f = readdirSync(basePath2)
    .filter((v) => !v.includes("."))
    .map((f) => {
      return [
        join(basePath2, f, "index.js"),
        f
          .split("-")
          .map((v) => `${v[0].toUpperCase()}${v.slice(1)}`)
          .join(""),
      ] as [string, string];
    })
    .forEach(([file, name]) => {
      extra[0] += `import {${name}} from ${JSON.stringify(file)}\n`;
      extra[1] += `Vue.directive(${JSON.stringify(name)}, ${name})\n`;
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
