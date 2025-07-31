<template>
  <div
    class="about-view"
    main
  >
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
    width: 825px;
    height: 550px;
  }

  .about-view__title {
    margin-bottom: var(--spacing-300);
  }

  .about-view__body {
    line-height: 1.5rem;
  }

  @media (max-width: 768px) {
    .about-view {
      width: 100%;
      height: 100%;
    }
  }

</style>
