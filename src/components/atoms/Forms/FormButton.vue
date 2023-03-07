<template>
  <div class="form-button">
    <v-btn :color="color" @click="$emit('click', $event)">{{ label }}</v-btn>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, default: '' },
    color: { type: String, default: '' }
  }
}
</script>

<style lang="scss" scoped>

</style>
