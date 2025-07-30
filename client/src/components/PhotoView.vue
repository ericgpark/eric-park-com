<template>
  <img
    class="photo-view__image"
    :src="src"
    :alt="alt"
  />
</template>

<script setup lang="ts">
defineProps<{
  src?: string,
  alt?: string,
}>();
</script>

<style scoped>

.photo-view {
  border-radius: var(--spacing-100);
}

</style>
