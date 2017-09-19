<template>
  <v-app light >
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
          v-for="(item, i) in items"
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
      <!--<v-btn-->
        <!--icon-->
        <!--light-->
        <!--@click.stop="miniVariant = !miniVariant"-->
      <!--&gt;-->
        <!--<v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>-->
      <!--</v-btn>-->
      <v-toolbar-title v-text="title" style="color:white;"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu
        offset-y
        :close-on-content-click="false"
        :nudge-width="200"
        v-model="menu"
        style="margin-right: 20px;"
      >
        <v-avatar slot="activator">
          <img src="/static/john.jpg" alt="John">
        </v-avatar>
        <v-list>
          <v-list-tile >
            <v-list-tile-title>LogOut</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>


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
  import VMenu from '../node_modules/vuetify/src/components/VMenu/VMenu'
  export default {
    components: {VMenu},
    data () {
      return {
        clipped: true,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'bubble_chart', title: 'Inspire' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'RECO'
      }
    }
  }
</script>
