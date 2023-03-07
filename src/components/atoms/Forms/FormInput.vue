<template>
  <div class="form-input">
    <v-text-field :value="value" :type="type" :label="label" :placeholder="placeholder" :rules="rules" outlined @input="$emit('input', $event)"></v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: String, default: '' },
    type: { type: String, default: 'text' },
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    rules: { type: Array, default: () => [] }
  }
}
</script>

<style lang="scss" scoped>

</style>
