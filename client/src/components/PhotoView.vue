<template>
  <div class="photoView">
    <img
      class="photo-view__image"
      :src="src"
      :alt="alt"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  src: string,
  alt: string,
}>();
</script>

<style scoped>

.photo-view__image {
  height: 100%;
  width: auto;
}

</style>
