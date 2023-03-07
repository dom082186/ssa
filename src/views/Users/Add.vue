<template>
  <div class="users-add pa-6">
    <h1>Add User</h1>
    <v-divider class="mt-5 mb-10"></v-divider>
    <UserForm />
  </div>
</template>

<script>
import UserForm from '../../components/organisms/Pages/Users/UserForm.vue'

export default {
  components: { UserForm }
}
</script>

<style lang="scss" scoped>

</style>
