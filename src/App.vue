<template>
  <v-app light>
    <div class="alert-list" :class="$vuetify.breakpoint.xsOnly? 'xs-list':''" row wrap align-center>
      <transition-group name="alert-list">
        <v-alert
          v-for="item in notifications"
          :class="item.type"
          :key="item.id"
          value="true"
          dismissible
          @input="removeNotification(item.id)"
          transition="scale-transition"
        >
          {{item.msg}}
        </v-alert>
      </transition-group>
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
          @click.stop="$router.push(item.path)"
          v-show="item.permit"
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
  </v-app>
</template>

<script>
  import UserMenu from './components/UserMenu'
  import VAlert from 'vuetify/src/components/VAlert'
  import { mapGetters } from 'vuex'

  export default {
    components: {VAlert, UserMenu},
    data () {
      console.log('data')
      return {
        clipped: true,
        drawer: true,
        fixed: false,
        navItems: [
          {icon: 'bubble_chart', title: '场景处理', path: '/scans', permit: true},
          {icon: 'attach_money', title: '充值/退款', path: '/admin/recharge', permit: true},
          {icon: 'monochrome_photos', title: '2D处理', path: '/panorama', permit: true}
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'RECO'
      }
    },
    created () {
      console.log('created')
      this.$store.dispatch('users/current').then(() => {
        let checkPermission = this.$store.getters['users/checkPermission']
        this.navItems = [
          {
            icon: 'bubble_chart',
            title: '场景处理',
            path: '/scans',
            permit: true
          },
          {
            icon: 'attach_money',
            title: '充值/退款',
            path: '/admin/recharge',
            permit: checkPermission('/menu/admin/recharge')
          },
          {
            icon: 'monochrome_photos',
            title: '2D处理',
            path: '/admin/panorama',
            permit: checkPermission('/menu/admin/panorama')
          }
        ]
      }).catch((err) => {
        console.log(err)
        location.href = 'login.html'
      })
      this.$store.dispatch('scans/reFetch')
    },
    methods: {
      removeNotification (id) {
        this.$store.commit('notifications/remove', id)
      }
    },
    computed: {
      ...mapGetters({
        notifications: 'notifications/all'
      })
    }
  }
</script>

<style>
  .alert-list-enter-active, .alert-list-leave-active {
    transition: all 1s;
  }

  .alert-list-enter, .alert-list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .alert-list {
    position: fixed;
    z-index: 999999;
    width: 50%;
    left: 25%;
  }

  .alert-list.xs-list {
    width: 80%;
    left: 10%;
  }

  .alert-list .alert .alert__dismissible > .icon,
  .alert-list .alert .alert__icon.icon {
    color: white;
  }
</style>
