<template>
  <photo-view
    v-if="photos.length"
    :key="photos[cur].id"
    :src="photos[cur].url"
    :alt="photos[cur].title"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PhotoView from '../components/PhotoView.vue'
import type { Photo } from '@/types'

defineProps<{
  photos: Photo[],
}>();

const cur = ref(0);

</script>
