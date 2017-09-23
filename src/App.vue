<template>
  <v-app light>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in navItems"
          :key="i"
          @click.stop="$router.push(item.path)"
        >
          <v-list-tile-action>
            <v-icon light v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="indigo" dark fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" dark></v-toolbar-side-icon>
      <v-toolbar-title v-text="title" style="color:white;"></v-toolbar-title>
      <v-spacer></v-spacer>
      <user-menu></user-menu>
    </v-toolbar>
    <main>
      <v-container fluid>
        <v-slide-x-transition mode="out-in">
          <router-view></router-view>
        </v-slide-x-transition>
      </v-container>
    </main>
    <v-footer :fixed="fixed">
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import UserMenu from './components/UserMenu'
  import VAlert from 'vuetify/src/components/VAlert'

  export default {
    components: {VAlert, UserMenu},
    data () {
      return {
        clipped: true,
        drawer: true,
        fixed: false,
        navItems: [
          {icon: 'bubble_chart', title: '场景', path: 'scans'}
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'RECO'
      }
    },
    created () {
      this.$store.dispatch('scans/reFetch')
    },
    methods: {
    }
  }
</script>
