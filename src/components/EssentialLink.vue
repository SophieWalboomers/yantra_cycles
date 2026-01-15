<template>
  <q-item clickable :to="props.to">
    <template v-if="$slots.default">
      <slot />
    </template>

    <template v-else>
      <q-item-section v-if="props.icon" avatar>
        <q-icon :name="props.icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ props.title }}</q-item-label>
        <q-item-label caption>{{ props.caption }}</q-item-label>
      </q-item-section>
    </template>
  </q-item>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  caption: {
    type: String,
    default: '',
  },

  to: [String, Object],

  link: {
    type: String,
    default: '#',
  },

  icon: {
    type: String,
    default: '',
  },
})
</script>
