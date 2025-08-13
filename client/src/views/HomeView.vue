<template>
  <div class="home-view">
    <div
      class="content"
      :class="{ background: loading }"
    >
      <spinner v-if="loading" />
      <photo-carousel
        v-else
        :photos="photos"
        @change-set="handleChangeSet"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import { useStore } from 'vuex'
import PhotoCarousel from '@/components/PhotoCarousel.vue'
import Spinner from '@/components/Spinner.vue'
import type { Photo, PhotoSet } from '@/types'

const emit = defineEmits<{
  (event: 'change-set', newTitle: string): void;
}>();

const store = useStore();

const loading: Ref<boolean> = ref(false);
const setIdx: Ref<number> = ref(0);

const photos: ComputedRef<Photo[]> = computed(() => store.state.photos.currentSet);
const setList: ComputedRef<PhotoSet[]> = computed(() => store.state.photos.setList);

onMounted(async () => {
  loading.value = true;
  try {
    await store.dispatch('photos/getSetList');
    await store.dispatch('photos/getPhotos');
  } catch (error) {
    console.error(error);
    store.commit('toast/setToast', {
      message: error,
      type: 'error',
    });
  } finally {
    loading.value = false;
  }
});

const handleChangeSet = async (direction: string) => {
  loading.value = true;
  if (direction === 'up') {
    setIdx.value = (setIdx.value - 1 + setList.value.length) % setList.value.length;
  } else if (direction === 'down') {
    setIdx.value = (setIdx.value + 1) % setList.value.length;
  }
  // Update the set title
  emit('change-set', setList.value[setIdx.value].title);

  await store.dispatch('photos/getPhotos', setList.value[setIdx.value].id);
  loading.value = false;
};
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

  @media (max-width: 768px) {
    .content {
      max-width: 100%;
      min-width: auto;
      min-height: 576px;
    }
  }

</style>
