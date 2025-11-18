<template>
  <div class="layout">
    <header class="header">
      <base-text
        class="title"
        tag="h2"
        type="subheading"
      >
        {{ title }}
      </base-text>
    </header>
    <div class="content">
      <nav class="nav">
        <RouterLink to="/">
          <base-text
            class="link"
            tag="p"
            type="caption"
          >
            Home
          </base-text>
        </RouterLink>
        <RouterLink to="/about">
          <base-text
            class="link"
            tag="p"
            type="caption"
          >
            About
          </base-text>
        </RouterLink>
      </nav>
  
      <RouterView
        @change-cat="handleChangeCat"
      />

    </div>
  </div>
  <base-toast />
</template>

<script setup lang="ts">
import {
  ref,
  watch,
  type Ref,
} from 'vue';
import { useRoute, RouterLink, RouterView } from 'vue-router'
import BaseToast from '@/components/BaseToast.vue';
import BaseText from '@/components/BaseText.vue';

const route = useRoute();

const title: Ref<string> = ref('Recents');

watch(route, () => {
  if (route.name === 'home') {
    title.value = 'Recents';
  } else if (route.name === 'about') {
    title.value = 'About';
  }
});

const handleChangeCat = (newTitle: string): void => {
  title.value = newTitle;
};

</script>

<style scoped>

.layout {
  display: flex;
  flex-direction: column;
}

.header {
  line-height: 1.5;
  margin-left: 4.5rem
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.link {
  margin: 0;
}

.content {
  display: flex;
  flex-direction: row;
}

.nav {
  margin-right: var(--spacing-400);
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

@media (max-width: 768px) {
  .layout {
    flex-direction: column;
    gap: var(--spacing-100);
  }

  .content {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-200);
  }

  .header {
    margin-left: 0;
    margin-bottom: 0;
  }

  .nav {
    margin-right: var(--spacing-600);
  }
}
</style>
