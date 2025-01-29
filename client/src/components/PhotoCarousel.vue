<template>
  <photo-view
    v-for="(photo, idx) in photos"
    class="photo-view"
    :class="{ show: cur === idx }"
    :key="photo.id"
    :src="photo.url"
    :alt="photo.title"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PhotoView from '../components/PhotoView.vue'
import type { Photo } from '@/types'

const props = defineProps<{
  photos: Photo[],
}>();

const cur = ref(0);

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
  visibility: hidden;
  opacity: 0;
  transition: opacity 50ms ease-in, visibility 0ms ease-in 50ms;
}

.photo-view.show {
  visibility: visible;
  opacity: 1;
  transition-delay: 0ms;
}
</style>
