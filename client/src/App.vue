<template>
  <div class="layout">
    <header>
      <nav>
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
    </header>

    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import BaseText from '@/components/BaseText.vue';
</script>

<style scoped>

.layout {
  display: flex;
  flex-direction: row;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.link {
  margin: 0;
}

nav {
  width: 100%;
  margin-top: var(--spacing-400);
  margin-right: var(--spacing-300);
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

@media (min-width: 1024px) {
  header {
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
}
</style>
