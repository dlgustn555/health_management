const pkg = require('./package')

module.exports = {
  mode: 'universal',

  srcDir: 'src/',
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/health.png' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['swiper/dist/css/swiper.css'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/vue-rx', ssr: false },
    { src: '@/plugins/vue-awesome-swiper', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: ['@nuxtjs/axios', 'nuxt-device-detect'],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true
  },

  proxy: {
    '/exercise': {
      target: 'http://local-health.lhs.com:1702',
      changeOrigin: true
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: '스케줄 달력 조회 화면',
        path: '*',
        component: '~/pages/calendarPage.vue'
      })
    }
  }
}
