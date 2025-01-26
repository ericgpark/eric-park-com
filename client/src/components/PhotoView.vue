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
}>()
</script>

<style scoped>

.photo-view__image {
  width: 100%;
  height: auto;
}

</style>
