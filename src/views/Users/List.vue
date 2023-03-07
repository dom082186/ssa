<template>
  <div class="users-list pa-6">
    <div class="d-flex justify-end mb-5">
      <FormButton
        label="Add User"
        color="primary"
        @click="$router.push('/users/add')"
      />
    </div>
    <v-data-table :headers="headers" :items="users">
      <template v-slot:item.actions="{ item }">
        <template v-if="hasSoftDeleteHandler(item)">
          <v-icon class="btn-action mr-3" @click="removeSoftDeletedUsers(item)"
            >mdi-restore</v-icon
          >
          <v-icon
            class="btn-action"
            @click="showDeleteDialogHandler(true, item)"
            >mdi-delete</v-icon
          >
        </template>
        <template v-else>
          <v-icon class="btn-action mr-3" @click="updateUserHandler(item)">
            mdi-pencil
          </v-icon>
          <v-icon class="btn-action" @click="setSoftDeletedUsers(item)">
            mdi-close
          </v-icon>
        </template>
      </template>
    </v-data-table>
    <v-dialog v-model="showDeleteDialog" width="450">
      <v-card class="pa-6">
        <v-card-text>
          <h1 class="text-center mb-5">Delete User</h1>
          <h2 class="font-weight-regular">
            Are you sure you want to delete {{ userToBeDeleted.firstName }}
            {{ userToBeDeleted.lastName }}?
          </h2>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary">Delete</v-btn>
          <v-btn @click="showDeleteDialogHandler(false, {})">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FormButton from '../../components/atoms/Forms/FormButton.vue'
import users from '../../assets/json/users.json'

export default {
  name: 'UsersList',
  components: {
    FormButton
  },
  data () {
    return {
      headers: [
        { text: 'First Name', value: 'firstName' },
        { text: 'Last Name', value: 'lastName' },
        { text: 'Username', value: 'username' },
        { text: 'Email', value: 'email' },
        { text: 'Actions', value: 'actions', align: 'center' }
      ],
      users,
      showDeleteDialog: false,
      userToBeDeleted: {}
    }
  },
  computed: {
    ...mapGetters({
      getSoftDeletedUsers: 'users/getSoftDeletedUsers'
    })
  },
  methods: {
    ...mapActions({
      setSoftDeletedUsers: 'users/setSoftDeletedUsers',
      removeSoftDeletedUsers: 'users/removeSoftDeletedUsers'
    }),
    async loginHandler () {
      try {
        const params = {
          username: 'janesmith',
          password: 'Jane@8799'
        }
        const result = await this.axios.post('login', params)
        console.log(result)
      } catch (error) {
        console.log(error)
      }
    },
    updateUserHandler (item) {
      const id = item?.id
      this.$router.push({
        path: `/users/update/${id}`
      })
    },
    hasSoftDeleteHandler (user) {
      const hasData = this.getSoftDeletedUsers.filter(
        softDeletedUser => softDeletedUser.id === user?.id
      )
      if (hasData.length) return true
      return false
    },
    showDeleteDialogHandler (show, item) {
      this.showDeleteDialog = show
      this.userToBeDeleted = item
    }
  },
  mounted () {
    this.loginHandler()
  }
}
</script>

<style lang="scss" scoped>
.users-list {
  .btn-action {
    cursor: pointer;
  }
}
</style>
