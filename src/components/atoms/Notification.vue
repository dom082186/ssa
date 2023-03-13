<template>
  <div class="notification mb-9">
    <v-alert :type="type" transition="fade-transition">{{ text }}</v-alert>
  </div>
</template>

<script>
export default {
  props: {
    text: { type: String, default: '' },
    type: { type: String, default: '' }
  }
}
</script>

<style lang="scss" scoped>

</style>
