<template>
  <q-item clickable v-bind="linkProps">
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
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },

  caption: {
    type: String,
    default: '',
  },

  to: [String, Object],

  href: {
    type: String,
    default: '',
  },

  icon: {
    type: String,
    default: '',
  },
})
const external = computed(() => !!props.href)
const linkProps = computed(() =>
  external.value
    ? { href: props.href, target: '_blank', rel: 'noopener noreferrer' }
    : { to: props.to },
)
</script>
