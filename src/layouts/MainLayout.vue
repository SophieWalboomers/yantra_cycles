<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="text-black" style="background-color: white">
      <q-toolbar style="height: 6rem">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Yantra cycle calculator </q-toolbar-title>
        <div class="absolute-center">
          <img
            alt="Shri Yantra"
            src="~assets/sri_yantra_image.webp"
            style="width: 5rem; height: auto"
          />
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

const linksList = [
  {
    title: '1-cycle',
    // caption: 'quasar.dev',
    // icon: '',
    link: '',
  },
  {
    title: '2-cycle',
    // caption: 'github.com/quasarframework',
    // icon: 'code',
    link: '',
  },
  {
    title: '3-cycle',
    // caption: 'chat.quasar.dev',
    // icon: 'chat',
    link: '',
  },
  {
    title: '4-cycle',
    // caption: 'forum.quasar.dev',
    // icon: 'record_voice_over',
    link: '',
  },
  {
    title: '5-cycle',
    // caption: '@quasarframework',
    // icon: 'rss_feed',
    link: '',
  },
  {
    title: '6-cycle',
    // caption: '@QuasarFramework',
    // icon: 'public',
    link: '',
  },
  {
    title: '7-cycle',
    // caption: 'Community Quasar projects',
    // icon: 'favorite',
    link: '',
  },
  {
    title: '8-cycle',
    link: '',
  },
  {
    title: '9-cycle',
    link: '',
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
