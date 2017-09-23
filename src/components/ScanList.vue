<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 md4 lg3 class="pa-1" v-for="i in 30" :key="i">
      <v-card class="scan-card">
        <v-card-media src="/static/images/desert.jpg" height="200px">
        </v-card-media>
        <v-card-actions>
          <span>黄昏时的沙漠</span>
          <v-spacer></v-spacer>
          <v-btn icon @click.native.stop="preview(i)">
            <v-icon>fullscreen</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>share</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-dialog v-model="previewing" fullscreen transition="dialog-bottom-transition" :overlay=false >
      <div style="background: white;height: 100%;">
        <v-toolbar dark  class="indigo" fixed>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="previewing = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <iframe src="http://47.91.198.40/view.html?id=3da9e0a7-6608-476d-b5c8-91a01a7e9320" frameborder="0" style="height: 100%;width: 100%;padding-top: 64px;"></iframe>
      </div>
    </v-dialog>

  </v-layout>
</template>

<script>
  export default {
    name: 'ScanList',
    data () {
      return {
        previewing: 0
      }
    },
    methods: {
      preview (i) {
        this.previewing = true
        // set scanId
      }
    }
  }
</script>

<style scoped>
  .scan-card {
    /*width: 300px;*/
    /*margin: auto;*/
  }
</style>
