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

  folders.forEach((f) => {
    const file = readFileSync(f, "utf8");

    var re = /const (V[a-zA-Z]*) = createSimpleFunctional\('/g;

    var m;

    do {
      m = re.exec(file);
      if (m) {
        extraComponents.push([f, m[1]]);
      }
    } while (m);
  });

  extraComponents.forEach(([file, name]) => {
    this.addTemplate({
      filename: `vuetify/extra-components/${name}.js`,
      src: resolve(__dirname, "../templates/base-component.js"),
      options: {
        file: file.split("node_modules")[1].slice(1),
        name,
      },
    });
  });

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
