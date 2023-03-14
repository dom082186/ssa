<template>
  <div class="user-form">
    <Notification :text="notificationText" type="success" v-if="showNotification" />
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
        <FormButton label="Submit" color="primary" :loading="isSubmitting" :disabled="isSubmitting" @click="submitHandler()" />
        <FormButton class="ml-3" label="Cancel" color="error" @click="$router.push('/users')" />
      </div>
    </v-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FormInput from '../../../atoms/Forms/FormInput.vue'
import FormButton from '../../../atoms/Forms/FormButton.vue'
import Notification from '../../../atoms/Notification.vue'

export default {
  name: 'UserForm',
  components: {
    FormInput,
    FormButton,
    Notification
  },
  data () {
    return {
      form: {
        id: null,
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: ''
      },
      rules: {
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'You entered an invalid email'
        }
      },
      isSubmitting: false,
      showNotification: false,
      notificationText: null,
      notificationInterval: null
    }
  },
  computed: {
    ...mapGetters({
      getUsers: 'users/getUsers'
    })
  },
  methods: {
    ...mapActions({
      addUser: 'users/addUser',
      updateUser: 'users/updateUser'
    }),
    async addUserHandler () {
      if (this.$refs.userFormEl.validate()) {
        this.isSubmitting = true
        try {
          if (this.getUsers.length) {
            let lastId = this.getUsers.length + 1
            this.form.id = lastId++
          } else {
            this.form.id = 1
          }
          const params = this.form
          await this.addUser(params)
          this.notificationText = 'User added successfully.'
          this.showNotification = true
        } catch (error) {
          console.log(error)
        } finally {
          this.hideNotificationHandler()
        }
      }
    },
    async updateUserHandler () {
      if (this.$refs.userFormEl.validate()) {
        this.isSubmitting = true
        try {
          const params = this.form
          await this.updateUser(params)
          this.notificationText = 'User updated successfully.'
          this.showNotification = true
        } catch (error) {
          console.log(error)
        } finally {
          this.hideNotificationHandler()
        }
      }
    },
    submitHandler () {
      if (this.$route.name === 'UsersAdd') this.addUserHandler()
      if (this.$route.name === 'UsersUpdate') this.updateUserHandler()
    },
    async fetchUserDetails () {
      try {
        const userDetails = this.getUsers.filter(user => user?.id === parseInt(this.$route.params.id))
        this.form = userDetails[0]
      } catch (error) {

      }
    },
    hideNotificationHandler () {
      this.notificationInterval = setTimeout(() => {
        this.showNotification = false
        this.$router.push({
          path: '/users'
        })
        this.isSubmitting = false
      }, 3000)
    }
  },
  mounted () {
    if (this.$route.name === 'UsersUpdate') this.fetchUserDetails()
  }
}
</script>

<style lang="scss" scoped>

</style>
