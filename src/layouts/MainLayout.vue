<template>
  <q-layout view="hhh Lpr lFf">
    <q-header elevated class="text-black" style="background-color: primary">
      <q-toolbar style="height: 6rem">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>Vedic Numerology / Ank Jyotish Calculator</q-toolbar-title>
        <div class="absolute-center">
          <EssentialLink to="/">
            <img alt="Shri Yantra" src="/icons/sri-yantra.png" style="width: 5rem; height: auto" />
          </EssentialLink>
        </div>
        <div>By Sophie Walboomers</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered overlay>
      <q-list>
        <EssentialLink title="Home" to="/" exact />
        <EssentialLink title="About" to="yantra-info" />
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
