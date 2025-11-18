<template>
  <div class="home-view">
    <div
      class="content"
    >
      <photo-carousel
        @change-cat="emit('changeCat', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PhotoCarousel from '@/components/PhotoCarousel.vue'

// Define and expose emits so we can forward events to the parent
const emit = defineEmits<{
  (e: 'changeCat', payload?: unknown): void
}>()

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
