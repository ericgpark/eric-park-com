<template>
  <main>
    <div class="content">
      <spinner v-if="loading" />
      <photo-carousel
        v-else
        :photos="photos" />
    </div>
  </main>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import type { Ref } from 'vue'
  import PhotoCarousel from '@/components/PhotoCarousel.vue'
  import Spinner from '@/components/Spinner.vue'
  import Photos from '@/util/api/photos'
  import type { Photo } from '@/types'

  const loading: Ref<boolean> = ref(false);
  const photos: Ref<Photo[]> = ref([]);

  onMounted(async () => {
    loading.value = true;
    try {
      photos.value = await Photos.getPhotos();
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  })
</script>

<style scoped>
  main {
    display: flex;
  }

  .content {
    aspect-ratio: 3 / 2;
    height: 92%;
  }

</style>
