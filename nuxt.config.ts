import { defineNuxtConfig } from 'nuxt3'
import externalGlobals from 'rollup-plugin-external-globals'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  server: {
    port: 3001,
    host: '0.0.0.0'
  },

  modules: [
    '@nuxtjs/eslint-module',
    '@vueuse/nuxt'
  ],

  publicRuntimeConfig: {
    API_BASE_URL: 'http://localhost:7001/api/frontend-service'
  },

  meta: {
    link: [
      { rel: 'stylesheet', href: 'https://unpkg.com/animate.css@4.1.1/animate.css' },
      { rel: 'stylesheet', href: 'https://unpkg.com/swiper@8.1.1/swiper-bundle.min.css' }
    ],

    script: [
      { type: 'text/javascript', src: 'https://unpkg.com/@highlightjs/cdn-assets@11.5.1/highlight.min.js' },
      { type: 'text/javascript', src: 'https://unpkg.com/swiper@8.1.1/swiper-bundle.min.js' },
      // { type: 'text/javascript', src: 'https://unpkg.com/browse/uslug@1.0.4/lib/uslug.js' },
      { type: 'text/javascript', src: 'https://cdn.bootcdn.net/ajax/libs/markdown-it/12.3.2/markdown-it.min.js' }
    ]
  },

  css: [
    '@/assets/styles/reset.scss',
    '@/assets/styles/border.css',
    '@/assets/iconfont/iconfont.css'
  ],

  vite: {
    build: {
      rollupOptions: {
        external: ['highlight.js', 'Swiper', 'markdownit'],
        plugins: [
          externalGlobals({
            'highlight.js': 'hljs',
            Swiper: 'swiper',
            // uslug: 'uslug',
            markdownit: 'MarkdownIt'
          })
        ]
      }
    }
  }
})
