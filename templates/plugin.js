// @ts-check
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import options from './options'

Vue.use(Vuetify)

// @ts-expect-error options is not correct typed.
const vuetify = new Vuetify(options)

/**
 * @type {import('@nuxt/types').Plugin}
 */
export default (ctx) => {
  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}

