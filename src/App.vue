<template>
  <v-app light >
    <div>
      <v-alert success value="true">
        This is a success alert.
      </v-alert>
    </div>
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
    <v-toolbar fixed class="light-blue">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" dark></v-toolbar-side-icon>
      <v-toolbar-title v-text="title" style="color:white;"></v-toolbar-title>
      <v-spacer></v-spacer>
      <user-menu></user-menu>

    </v-toolbar>
    <main>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <v-layout column align-center>
            <img src="/static/v.png" alt="Vuetify.js" class="mb-5">
            <blockquote>
              &#8220;First, solve the problem. Then, write the code.&#8221;
              <footer>
                <small>
                  <em>&mdash;John Johnson</em>
                </small>
              </footer>
            </blockquote>
          </v-layout>
        </v-slide-y-transition>
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
          { icon: 'bubble_chart', title: '场景' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'RECO'
      }
    }
  }
</script>
