<template>
  <main>
    <div>
      <photo-view
        v-for="photo in photos"
        :key="photo.id"
        :src="photo.url"
        :alt="photo.title"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import type { Ref } from 'vue'
  import PhotoView from '../components/PhotoView.vue'
  import Photos from '@/util/api/photos'
  import type { Photo } from '@/types'


  const photos: Ref<Photo[]> = ref([]);

  onMounted(async () => {
    try {
      photos.value = await Photos.getPhotos();
    } catch (error) {
      console.error(error);
    }


  })
</script>
