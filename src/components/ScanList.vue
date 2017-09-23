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
    <v-dialog v-model="previewing" fullscreen transition="dialog-bottom-transition" :overlay=false>
      <div style="background: white;height: 100%;overflow: hidden;">
        <v-toolbar dark class="indigo" fixed>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="stopPreview()" dark>
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <main style="height: 100%;width: 100%;">
          <v-container fill-height v-show="loadingPreview">
            <v-layout align-center>
              <v-flex class="text-xs-center">
                <div style="display: inline-block;">
                  <letter-cube size="60px"></letter-cube>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
          <iframe v-show="!loadingPreview" :src="previewUrl" frameborder="0" @load="loadingPreview = false">loading</iframe>
        </main>
      </div>
    </v-dialog>

  </v-layout>
</template>

<script>
  import { LetterCube } from 'vue-loading-spinner'

  export default {
    name: 'ScanList',
    data () {
      return {
        previewing: 0,
        loadingPreview: false
      }
    },
    components: {
      LetterCube
    },
    methods: {
      preview (i) {
        this.previewing = true
        this.loadingPreview = true
        this.previewUrl = 'https://beta.benaco.com/embed/0674cf4f-2155-45d9-858c-4ef1502c5d69'
      },
      stopPreview () {
        this.previewing = false
        this.previewUrl = '#'
        this.loadingPreview = false
      }
    }
  }
</script>

<style scoped>
  .scan-card {
  }

  iframe {
    height: 100%;
    width: 100%;
  }
</style>
