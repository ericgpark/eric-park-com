<template>
  <component
    class="base-text"
    :class="type"
    :is="tag"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">

defineProps<{
  tag: 'h1' | 'h2' | 'h3' | 'p' | 'span',
  type: 'heading' | 'subheading' | 'body' | 'caption',
}>();

</script>

<style scoped>

.base-text {
  font-family: var(--font-family);
  color: var(--text-color);
  margin: 0;

  &.heading {
    font-size: var(--font-size-heading);
  }

  &.subheading {
    font-size: var(--font-size-subheading);
  }

  &.paragraph {
    font-size: var(--font-size-paragraph);
  }

  &.caption {
    font-size: var(--font-size-caption);
  }
}

</style>
