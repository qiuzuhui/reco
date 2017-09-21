<template>
  <v-menu
    offset-y
    :close-on-content-click="false"
    :nudge-width="200"
    class="mr-2 user-menu"
  >
    <div slot="activator" class="light-blue" >
      <v-avatar size="40px">
        <img src="/static/john.jpg" alt="John">
      </v-avatar>
      <div style="display: inline-block;color: white;padding: 5px;">John Leider</div>
    </div>

    <v-card>
      <v-list>
        <v-list-tile >
          <v-list-tile-title>LogOut</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-card>
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
    }
  }
</script>
