<template>
  <spinner v-if="loading" />
  <div v-else ref="photoView">
    <!-- Only render PhotoView when we have at least one active photo -->
    <PhotoView
      v-if="activePhotos.length > 0 && activePhotos[cur]"
      class="photo-view"
      :key="activePhotos[cur]?.id"
      :src="(activePhotos[cur]?.src ?? '').replace('/public', '')"
      :alt="activePhotos[cur]?.id"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch, type Ref } from 'vue';
import PhotoView from './PhotoView.vue';
import Spinner from '@/components/Spinner.vue';
import type { Photo } from '@/types';
import { categories } from '@/enums/categories';
import { useSwipe } from '@vueuse/core';

// Template ref for the photo view element
const photoView = ref<HTMLElement | null>(null);
const { isSwiping, direction } = useSwipe(photoView);

// Capture emit so we can call it later
const emit = defineEmits<{
  (e: 'changeCat', newTitle: string): void
}>();

const loading: Ref<boolean> = ref(true);
const photos: Ref<Photo[]> = ref([]);
const cur = ref(0);
const curCat = ref(0);

const activePhotos = computed(() => {
  randomize();
  return photos.value.filter((photo) => photo.categories.includes(categories[curCat.value].id));
});

const randomize = () => {
  photos.value = photos.value.sort(() => Math.random() - 0.5);
};

onMounted(async () => {
  // Load photos
  try {
    // Use Vite's BASE_URL so the path works when the app is deployed to a subpath.
    const url = `${import.meta.env.BASE_URL}photos.json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    photos.value = await res.json();
    randomize();

    // Preload images
    photos.value.forEach(photo => {
      const img = new Image();
      img.src = photo.src; // this starts the browser download
    });
  } catch (err) {
    // Log any error so it's visible in the console (was likely failing silently before)
    console.error('Error loading photos.json:', err);
  } finally {
    loading.value = false;
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      cur.value = (cur.value + 1) % activePhotos.value.length;
    } else if (e.key === 'ArrowLeft') {
      cur.value = (cur.value - 1) % activePhotos.value.length;
      } else if (e.key === 'ArrowUp') {
      // Emit an event to change the set
      curCat.value = (curCat.value + 1) % categories.length;
        emit('changeCat', categories[curCat.value].name);
      cur.value = 0;
    } else if (e.key === 'ArrowDown') {
      // Emit an event to change the set
      curCat.value = (curCat.value - 1 + categories.length) % categories.length;
        emit('changeCat', categories[curCat.value].name);
      cur.value = 0;
    }
  });
});

// Ensure `cur` is always a valid index into activePhotos when the set changes
watch(activePhotos, (list) => {
  if (!list || list.length === 0) {
    cur.value = 0;
    return;
  }
  if (cur.value >= list.length) {
    cur.value = 0;
  }
});

watch(isSwiping, (swiping) => {
  if (swiping) {
    if (direction.value === 'left') {
      cur.value = (cur.value + 1) % activePhotos.value.length;
    } else if (direction.value === 'right') {
      cur.value = (cur.value - 1 + activePhotos.value.length) % activePhotos.value.length;
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
