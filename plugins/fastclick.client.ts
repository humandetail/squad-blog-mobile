import { defineNuxtPlugin } from '#app'
import attachFastClick from 'fastclick'

export default defineNuxtPlugin(() => {
  if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', () => {
      attachFastClick(document.body)
    }, false)
  }
})
