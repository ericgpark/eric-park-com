<template>
  <div class="home-view">
    <base-text
      class="set-title"
      tag="h2"
      type="subheading"
    >
      Recents
    </base-text>
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
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import type { Ref, ComputedRef } from 'vue'
  import { useStore } from 'vuex'
  import BaseText from '@/components/BaseText.vue'
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
  .home-view {
    display: flex;
    flex-direction: column;
  }

  .set-title {
    margin-bottom: var(--spacing-100);
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 825px;
    min-height: 550px;
    border-radius: 0.5%;
  }

  .background {
    background: #999;
  }

</style>
