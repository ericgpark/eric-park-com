<template>
  <main>
    <base-text
      tag="h1"
      type="heading"
    >
      About
    </base-text>
    <base-text
      tag="p"
      type="body"
    >
      Hi. My name is Eric Park, and I like creating images. I made this website to showcase my work and to share my thoughts on photography and art.
      Try interacting with the website using the arrow keys. I hope you enjoy browsing through my photos.

      For business inquiries, please reach me at <a href="mailto:ericparkmusic@gmail.com">ericparkmusic@gmail.com</a>
    </base-text>
  </main>
</template>

<script setup lang="ts">
import BaseText from '@/components/BaseText.vue';
</script>

<style scoped>
  main {
    padding: 2rem;
  }
</style>
