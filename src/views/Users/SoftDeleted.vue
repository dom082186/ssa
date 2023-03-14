<template>
  <div class="users-soft-deleted pa-6">
    <h1>Soft Deleted Users</h1>
    <Notification v-if="showNotification" type="success" :text="notificationText" />
    <v-data-table :headers="headers" :items="getSoftDeletedUsers">
      <template v-slot:item.actions="{ item }">
        <v-icon class="btn-action mr-3" @click="removeSoftDeletedUsersHandler(item)"
            >mdi-restore</v-icon
          >
          <v-icon
            class="btn-action"
            @click="showDeleteDialogHandler(true, item)"
            >mdi-delete</v-icon
          >
      </template>
    </v-data-table>
    <v-dialog v-model="showDeleteDialog" width="450">
      <v-card class="pa-6">
        <v-card-text>
          <h1 class="text-center mb-5">Delete User</h1>
          <h2 class="font-weight-regular">
            Are you sure you want to delete {{ userToBeDeleted.firstname }}
            {{ userToBeDeleted.lastname }}?
          </h2>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="deleteUserHandler(userToBeDeleted)">Delete</v-btn>
          <v-btn @click="showDeleteDialogHandler(false, {})">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Notification from '../../components/atoms/Notification.vue'

export default {
  components: {
    Notification
  },
  data () {
    return {
      headers: [
        { text: 'First Name', value: 'firstname' },
        { text: 'Last Name', value: 'lastname' },
        { text: 'Username', value: 'username' },
        { text: 'Email', value: 'email' },
        { text: 'Actions', value: 'actions', align: 'center' }
      ],
      showDeleteDialog: false,
      userToBeDeleted: {},
      showNotification: false
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
      removeSoftDeletedUsers: 'users/removeSoftDeletedUsers',
      deleteUser: 'users/deleteUser'
    }),
    showDeleteDialogHandler (show, item) {
      this.showDeleteDialog = show
      this.userToBeDeleted = item
    },
    async deleteUserHandler (user) {
      this.removeSoftDeletedUsers(user)
      try {
        await this.deleteUser(user)
        this.showDeleteDialogHandler(false, {})
        this.notificationText = 'User deleted successfully.'
        this.showNotification = true
      } catch (error) {

      } finally {
        this.hideNotificationHandler()
      }
    },
    removeSoftDeletedUsersHandler (user) {
      try {
        this.removeSoftDeletedUsers(user)
        this.notificationText = 'User activated successfully'
        this.showNotification = true
      } catch (error) {

      } finally {
        this.hideNotificationHandler()
      }
    },
    hideNotificationHandler () {
      setTimeout(() => {
        this.showNotification = false
      }, 3000)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
