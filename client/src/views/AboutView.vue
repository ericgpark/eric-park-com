<template>
  <div
    class="about-view"
    main
  >
    <base-text
      class="about-view__title"
      tag="h1"
      type="heading"
    >
      About
    </base-text>
    <base-text
      class="about-view__body"
      tag="p"
      type="body"
    >
      Hi. My name is Eric Park, and I like creating images. I made this website to showcase my work and to share my thoughts on photography and art.
      Try interacting with the website using the arrow keys. I hope you enjoy browsing through my photos.

      For business inquiries, please reach me at <a href="mailto:ericparkmusic@gmail.com">ericparkmusic@gmail.com</a>
    </base-text>
  </div>
</template>

<script setup lang="ts">
import BaseText from '@/components/BaseText.vue';
</script>

<style scoped>
  .about-view {
    width: calc(830px - var(--spacing-400) * 2);
    height: 554px;
    padding: 0 var(--spacing-400);

  }

  .about-view__title {
    margin-bottom: var(--spacing-300);
  }

  .about-view__body {
    line-height: 1.5rem;
  }
</style>
