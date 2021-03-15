<p align="center">
  <a href="https://npmjs.com/package/@ec-nordbund/vuetify-module"><img src="https://img.shields.io/npm/v/@ec-nordbund/vuetify-module.svg?style=flat-square" alt="npm downloads"></a>
  <a href="https://npmjs.com/package/@ec-nordbund/vuetify-module"><img src="https://img.shields.io/npm/dt/@ec-nordbund/vuetify-module.svg?style=flat-square" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/@ec-nordbund/vuetify-module"><img src="https://img.shields.io/npm/l/@ec-nordbund/vuetify-module.svg?style=flat-square" alt="License"></a>
</p>

> [Vuetify 2](https://vuetifyjs.com) module for [Nuxt.js](https://nuxtjs.org)
> Inspired by https://github.com/nuxt-community/vuetify-module/

## Setup

1. Add `@ec-nordbund/vuetify-module` dependency and `vuetify` to your project

```bash
yarn add --dev @ec-nordbund/vuetify-module vuetify # or npm install --save-dev @ec-nordbund/vuetify-module vuetify
```

2. Add `@ec-nordbund/vuetify-module` to the `buildModules` section of `nuxt.config.js`

```js
{
  buildModules: [
    // Simple usage
    '@ec-nordbund/vuetify-module',

    // With options
    ['@ec-nordbund/vuetify-module', { /* module options */ }]
  ]
}
```

> This module is only tested for nuxt 2.15

### Using top level options

```js
{
  buildModules: [
    '@ec-nordbund/vuetify-module'
  ],
  vuetify: {
    /* module options */
  }
}
```

## Options

All options of Vuetify can be set.

Additional the following options can be used.


### `customVariables`

- Type: `string[]`
- Default: `[]`

Provide a way to customize Vuetify SASS variables.  

Usage example : 

```scss
// assets/variables.scss

// Variables you want to modify
$btn-border-radius: 0px;

// If you need to extend Vuetify SASS lists
$material-light: ( cards: blue );
```

```js
// nuxt.config.js
export default {
  vuetify: {
    customVariables: ['~/assets/variables.scss']
  }
}
```

> The list of customizable variables can be found by looking at the files [here](https://github.com/vuetifyjs/vuetify/tree/master/packages/vuetify/src/styles/settings).


### `iconInjector`
- Type: `false | {icons: { [name: string]: string }, components: { [name: string]: string[] }}`
- Default: `{icons: {}, components: {}}`

I (@mathe42) wrote a vue-template-compiler plugins that analyses the AST of your template and replaces all `mdi-*` strings with the corosponding svg path.

But there are some limitations:

It is only enabled in the following cases:

#### `v-icon`
```html
<v-icon>mdi-*</v-icon>
<v-icon v-html="mdi-*"></v-icon>
<v-icon v-text="mdi-*"></v-icon>
<v-icon>{{ a ? 'mdi-*' : 'mdi-*' }}</v-icon>
```
Basic js-expressions are allowed (see below)!

#### in props
```html
<v-some-compnent icon="mdi-*"></v-some-compnent>
<v-some-compnent :icon="'mdi-*'"></v-some-compnent>
<v-some-compnent v-bind:icon="'mdi-*'"></v-some-compnent>
<v-some-compnent :icon="a ? 'mdi-*' : 'mdi-*'"></v-some-compnent>
<v-some-compnent v-bind:icon="a ? 'mdi-*' : 'mdi-*'"></v-some-compnent>
```
Basic js-expressions are allowed (see below)! For a prop to be checked it has to be registered all (as far as I know) vuetify specific props are registered. For the full list you can look here: https://github.com/EC-Nordbund/vuetify-icon-injector/blob/dev/src/vuetifyIconProps.ts

If some prop is missing please create a issue there.

You can add your own components to the list. If you want your compoenent `my-component` to be registered with the props `my-prop-a` and `my-prop-b` you can set the components option to `{components: {'my-component': ['my-prop-a', 'my-prop-b']}}`. So it is quite simple.

#### Basic js-expressions
As long as the complete 'mdi-*' strings stay together you can write ANY js code in the props! So dont join your icon names together use the full icon names.

#### own icons
Also you can add your custom svg icons. The icon has to be a SINGLE path. You can give it any name. USE A DIFFERENT PREFIX then mdi! So is your path `abc` and you want your icon to be called `my-cool-icon` set the icon option to `{icons: {'my-cool-icon': abc}}`.

#### Limitations
This tool does not look at your scripts in your SFCs so if you want to use the icons there import them from @mdi/js one by one!


### `iconFont`
- Type: `'mdi', 'md', 'fa' 'fa4'`
- Default: `undefined`

Load one of the predefined iconFonts into your page.

If you don't want to use `mdi` as iconFont disable `iconInjector` and specify the `iconFont`.
If you want to use `mdi` please consider useing the default enabled `iconInjector` wich can 'treeshake' the font. But be aware of the limitations of that useage.


### `font`
- Type: `string | { family?: string | string[], size?: number }`
- Default: `undefined`

Set a google-web-font and a font-size as default. If nuxt-webfontloader is installed it uses it to load it. Otherwise it justs add a link to the corresponding stylesheet.

> It is recomended to NOT use this option. Just serve a copy of the font with your webpage. This results in better loadtime!

## TypeScript

If you're using TypeScript, you'll need to add `@ec-nordbund/vuetify-module` in your `compilerOptions` of your `tsconfig.json` :

```json
{
  "compilerOptions": {
    "types": [
      "@types/node",
      "@nuxt/vue-app",
      "@ec-nordbund/vuetify-module"
    ]
  }
}
```

You'll then be able to have autocompletion in Context (`ctx.$vuetify`) and Vue instances (`this.$vuetify`).

## Development

- Clone this repository
- Install dependencies using `yarn`

## License

[MIT License](./LICENSE)

Copyright (c) S. Krüger
