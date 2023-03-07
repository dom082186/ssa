<template>
  <div class="user-form">
    <v-form ref="userFormEl">
      <div class="mb-3">
        <FormInput v-model="form.firstname" label="First Name" placeholder="Enter first name" :rules="[v => !!v || 'First name field is required']" />
      </div>
      <div class="mb-3">
        <FormInput v-model="form.lastname" label="Last Name" placeholder="Enter last name" :rules="[v => !!v || 'Last name field is required']" />
      </div>
      <div class="mb-3">
        <FormInput v-model="form.username" label="Username" placeholder="Enter username" :rules="[v => !!v || 'Username field is required']" />
      </div>
      <div class="mb-3">
        <FormInput v-model="form.email" label="Email" placeholder="Enter email" :rules="[v => !!v || 'Email field is required', rules.email]" />
      </div>
      <div class="mb-5">
        <FormInput v-model="form.password" type="password" label="Password" placeholder="Enter password" :rules="[v => !!v || 'Password field is required']" />
      </div>
      <div class="d-flex justify-end">
        <FormButton label="Submit" color="primary" @click="submitHandler()" />
        <FormButton class="ml-3" label="Cancel" color="error" @click="$router.push('/users')" />
      </div>
    </v-form>
  </div>
</template>

<script>
import FormInput from '../../../atoms/Forms/FormInput.vue'
import FormButton from '../../../atoms/Forms/FormButton.vue'

export default {
  name: 'UserForm',
  components: {
    FormInput,
    FormButton
  },
  data () {
    return {
      form: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        photo: null
      },
      rules: {
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'You entered an invalid email'
        }
      }
    }
  },
  methods: {
    async addUserHandler () {
      if (this.$refs.userFormEl.validate()) {
        try {
          const params = this.form
          await this.axios.post('user/tests', params)
        } catch (error) {
          console.log(error)
        }
      }
    },
    async updateUserHandler () {
      if (this.$refs.userFormEl.validate()) {
        try {
          const params = this.form
          await this.axios.post('user/tests', params)
        } catch (error) {
          console.log(error)
        }
      }
    },
    submitHandler () {
      if (this.$route.name === 'UsersAdd') this.addUserHandler()
      if (this.$route.name === 'UsersUpdate') this.updateUserHandler()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
