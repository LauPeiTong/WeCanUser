export default {

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - App to achieve zero hunger',
    title: 'WeCan',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/WeCanLogo.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/client.js', ssr: false },
    { src: '~/plugins/google-maps.js' },
    '~/plugins/vuetify.js',
    '~/plugins/filter.js',
    '~/plugins/currency.js',
    '~/plugins/discount.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // entirely optional

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Set your API key here
    baseURL: '/',
    headers: {
      common: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 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'
      }
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    optionsPath: '~/plugins/vuetify.js',
    treeShake: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
