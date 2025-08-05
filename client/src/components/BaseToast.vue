<template>
  <div
    class="base-toast"
    :class="{ visible: toast.isVisible }"
  >
    <base-text
      class="base-toast__text"
      :class="toast.type"
      type="body"
    >
      {{ toast.message }}
    </base-text>
  </div>
</template>

<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';
import { useStore } from 'vuex';
import type { Toast } from '@/types/index';
import BaseText from '@/components/BaseText.vue';

const store = useStore();

const toast: ComputedRef<Toast> = computed(() => store.getters['toast/getToast']);

</script>

<style scoped scss>
.base-toast {
  position: absolute;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: var(--spacing-500);
  opacity:0;
  transition:opacity 250ms linear;

  &.visible {
    opacity: 1;
  }
}

.base-toast__text {
  background: var(--color-primary-50);
  padding: var(--spacing-300) var(--spacing-400);
  border-radius: var(--spacing-300);

  &.success {
    background: var(--color-success-50);
  }
  
  &.alert {
    background: var(--color-alert-50);
  }
  
  &.warning {
    background: var(--color-warning-50);
  }
  
  &.error {
    background: var(--color-error-50);
  }
}

</style>
