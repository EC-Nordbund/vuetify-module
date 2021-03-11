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
### `iconFont`
- Type: `'mdi', 'md', 'fa' 'fa4'`
- Default: `undefined`
### `font`
- Type: `string`
- Default: `undefined`



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