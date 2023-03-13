<template>
  <div class="form-button">
    <v-btn :color="color" :loading="loading" :disabled="disabled" @click="$emit('click', $event)">{{ label }}</v-btn>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, default: '' },
    color: { type: String, default: '' },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss" scoped>

</style>
