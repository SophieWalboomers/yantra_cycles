<template>
  <q-page class="column items-center">
    <q-separator class="q-my-lg" />
    <div class="text-body1">Calculate your Yantra cycles!</div>

    <q-separator class="q-my-lg" />

    <q-card flat class="q-pa-md">
      <div class="text-subtitle2 q-mb-sm">Select your birthday</div>
      <q-date v-model="birthday" mask="YYYY-MM-DD" minimal />
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
const birthday = ref('')
</script>
