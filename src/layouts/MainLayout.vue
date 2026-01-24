<template>
  <q-layout view="hhh Lpr lFf">
    <q-header elevated class="text-black" style="background-color: primary">
      <q-toolbar class="header-toolbar">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <div class="absolute-center">
          <EssentialLink to="/" class="header-image">
            <img
              alt="Vedic numerology / Ank Jyotish calculator"
              src="/icons/vedic_numerology_stretched.png"
            />
          </EssentialLink>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered overlay>
      <q-list>
        <EssentialLink title="Home" to="/" exact />
        <EssentialLink title="About" to="/yantra-info" />
        <EssentialLink title="9 Cycles of Time" to="/cycle-info" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const leftDrawerOpen = ref(false)
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style scoped>
.header-toolbar {
  height: clamp(5rem, 10vw, 10rem);
}

.header-image img {
  height: clamp(5rem, 10vw, 10rem);
}
</style>
