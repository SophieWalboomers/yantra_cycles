<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="text-black" style="background-color: white">
      <q-toolbar style="height: 6rem">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> Yantra cycle calculator </q-toolbar-title>
        <div class="absolute-center">
          <EssentialLink to="/">
            <img
              alt="Shri Yantra"
              src="~assets/sri_yantra_image.webp"
              style="width: 5rem; height: auto"
            />
          </EssentialLink>
        </div>
        <div>By Sophie Walboomers</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Information per cycle number </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
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

const linksList = Array.from({ length: 9 }, (_, i) => {
  const n = i + 1
  return {
    title: `${n}-cycle`,
    to: `/cycle-${n}`,
  }
})

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
