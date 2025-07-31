<template>
  <photo-view
    class="photo-view"
    :key="photo.id"
    :src="photo.url"
    :alt="photo.title"
  />
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import PhotoView from '../components/PhotoView.vue'
import type { Photo } from '@/types'

const props = defineProps<{
  photos: Photo[],
}>();

const cur = ref(0);

const photo = computed(() => {
  return props.photos[cur.value] ?? {};
});

onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      cur.value = (cur.value + 1) % props.photos.length;
    } else if (e.key === 'ArrowLeft') {
      cur.value = (cur.value - 1 + props.photos.length) % props.photos.length;
    }
  });
});

</script>

<style scoped>
.photo-view {
  max-width: 825px;
  max-height: 550px;
  transition: opacity 50ms ease-in, visibility 0ms ease-in 50ms;
}

</style>
