<template>
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
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import BaseText from '@/components/BaseText.vue';
</script>

<style scoped>
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
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    position: absolute;
    left: 20vw;
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
