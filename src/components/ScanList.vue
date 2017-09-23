<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 md4 lg3 class="pa-1" v-for="(scan,index) in scans" :key="index">
      <v-card class="scan-card">
        <v-card-media :src="scan.thumbnail" height="200px"  @click.native.stop="preview(scan.reviewId)" >
        </v-card-media>
        <v-card-actions>
          <span>{{scan.title}}</span>
          <v-spacer></v-spacer>
          <v-btn icon @click.native.stop="preview(scan.reviewId)">
            <v-icon>fullscreen</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>share</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>delete</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-dialog v-model="previewing" fullscreen transition="dialog-bottom-transition" :overlay=false>
      <div style="background: white;height: 100%;overflow: hidden;">
        <v-toolbar dark class="indigo" fixed>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>share</v-icon>
          </v-btn>
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
          <iframe v-show="!loadingPreview" :src="previewUrl" frameborder="0" @load="loadingPreview = false">loading
          </iframe>
        </main>
      </div>
    </v-dialog>

  </v-layout>
</template>

<script>
  import { LetterCube } from 'vue-loading-spinner'
  import { mapGetters } from 'vuex'

  export default {
    name: 'ScanList',
    data () {
      return {
        previewing: 0,
        loadingPreview: false,
        previewUrl: ''
      }
    },
    components: {
      LetterCube
    },
    methods: {
      preview (reviewId) {
        this.previewing = true
        this.loadingPreview = true
        this.previewUrl = 'https://beta.benaco.com/embed/' + reviewId
      },
      stopPreview () {
        this.previewing = false
        this.previewUrl = ''
        this.loadingPreview = false
      },
      removeScan (id) {
        this.$store.dispatch('scans/remove', id)
      }
    },
    computed: {
      ...mapGetters({
        scans: 'scans/all'
      })
    }
  }
</script>

<style scoped>
  .scan-card {
  }
  .card__media{
    cursor: pointer;
  }
  iframe {
    height: 100%;
    width: 100%;
  }
</style>
