<template>
  <div ref="photoView">
    <PhotoView
      class="photo-view"
      :key="photo.id"
      :src="photo.url"
      :alt="photo.title"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue';
import PhotoView from '../components/PhotoView.vue';
import type { Photo } from '@/types';
import { useSwipe } from '@vueuse/core';
import { useTemplateRef } from 'vue';

const photoView = useTemplateRef('photoView');
const { isSwiping, direction } = useSwipe(photoView);

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

watch(isSwiping, (swiping) => {
  if (swiping) {
    if (direction.value === 'left') {
      cur.value = (cur.value + 1) % props.photos.length;
    } else if (direction.value === 'right') {
      cur.value = (cur.value - 1 + props.photos.length) % props.photos.length;
    }
  }
});

</script>

<style scoped>
  .photo-view {
    max-width: 825px;
    max-height: 550px;
    transition: opacity 50ms ease-in, visibility 0ms ease-in 50ms;
  }

  @media (max-width: 768px) {
    .photo-view {
      max-width: 100%;
      max-height: 100%;
    }
  }

</style>
