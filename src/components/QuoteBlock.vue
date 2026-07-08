<template>
  <section class="quote-section">
    <div class="quote-wrap">
      <blockquote class="quote-text">
        {{ quote }}
      </blockquote>
      <div class="quote-divider" />
      <p class="quote-attribution">{{ attribution }}</p>
    </div>
  </section>
</template>

<script setup>
defineProps({
  quote: {
    type: String,
    required: true,
  },

  attribution: {
    type: String,
    default: '',
  },
})
</script>

<style scoped lang="scss">
.quote-section {
  width: 100%;
  // background: $primary;
  padding: 5rem 1.5rem; // py-28 px-6
}

.quote-wrap {
  max-width: 48rem; //
  margin: 0 auto;
  text-align: center;
}

.quote-text {
  font-family: $typography-font-family;
  font-style: italic;
  font-size: 1.5rem; // text-2xl
  line-height: 1.375; // leading-snug
  margin: 0 0 2rem; // mb-8
  text-wrap: balance;

  @media (min-width: 768px) {
    font-size: 2.25rem; // md:text-4xl
  }
}

.quote-divider {
  width: 3rem; // w-12
  height: 1px; // h-px
  background: $accent-soft;
  margin: 0 auto 1.5rem; // mx-auto mb-6
}

.quote-attribution {
  font-size: 0.625rem; // text-[10px]
  text-transform: uppercase;
  letter-spacing: 0.3em; // tracking-[0.3em]
  color: $earth-60;
  margin: 0;
}
</style>
