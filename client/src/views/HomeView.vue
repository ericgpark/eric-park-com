<template>
  <div
    class="content"
    :class="{ background: loading }"
  >
    <spinner v-if="loading" />
    <photo-carousel
      v-else
      :photos="photos"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import type { Ref, ComputedRef } from 'vue'
  import { useStore } from 'vuex'
  import PhotoCarousel from '@/components/PhotoCarousel.vue'
  import Spinner from '@/components/Spinner.vue'
  import type { Photo } from '@/types'

  const store = useStore();

  const loading: Ref<boolean> = ref(false);

  const photos: ComputedRef<Photo[]> = computed(() => store.state.photos.recents);

  onMounted(async () => {
    loading.value = true;
    try {
      await store.dispatch('photos/fetchRecents');
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  })
</script>

<style scoped>
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 830px;
    min-height: 554px;
    border-radius: 0.5%;
  }

  .background {
    background: #999;
  }

</style>
