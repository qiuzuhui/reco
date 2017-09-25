<template>
  <v-menu
    offset-y
    :close-on-content-click="false"
    :nudge-width="150"
  >
    <div slot="activator" class="mr-2">
      <v-avatar size="40px">
        <img src="/static/demo-data/john.jpg" alt="John">
      </v-avatar>
      <div style="display: inline-block;color: white;padding: 5px;">沙漠之鹰</div>
    </div>
    <v-list>
      <v-list-tile >
        <v-list-tile-title>余额：30000元</v-list-tile-title>
      </v-list-tile>
      <v-divider ></v-divider>
      <v-list-tile @click="logout()" >
        <v-list-tile-title>注销</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
  import VMenu from 'vuetify/src/components/VMenu/VMenu'
  export default {
    components: {VMenu},
    name: 'UserMenu',
    data () {
      return {
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('users/logout')
      }
    }
  }
</script>

<style scoped>
</style>
