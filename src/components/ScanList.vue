<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg6>
          <div class="title-btn">
            <v-btn primary>新建</v-btn>
          </div>
        </v-flex>
        <v-flex xs12 sm6 md4 lg3>
          <div class="title-btn">
            <v-btn flat primary>全部</v-btn>
          </div>
          <div class="title-btn">
            <v-btn flat primary>已完成</v-btn>
          </div>
          <div class="title-btn">
            <v-btn flat primary>处理中</v-btn>
          </div>
        </v-flex>
        <v-flex xs12 sm6 md4 lg3>
          <v-text-field
            placeholder="搜索"
            append-icon="search"
            class="search-box"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12>
    </v-flex>
    <v-flex xs12 sm6 md4 lg3 class="pa-1" v-for="(scan,index) in scans" :key="index">
      <v-card class="scan-card">
        <v-card-media :src="scan.thumbnail" height="200px" @click.native.stop="preview(scan.reviewId)">
        </v-card-media>
        <v-card-actions>
          <span>{{scan.title}}</span>
          <v-spacer></v-spacer>
          <v-btn icon @click.native.stop="preview(scan)">
            <v-icon>fullscreen</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>share</v-icon>
          </v-btn>
          <v-btn icon @click.native.stop="removeScan(scan)">
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
        previewUrl: '',
        fab: false
      }
    },
    components: {
      LetterCube
    },
    methods: {
      preview (scan) {
        this.previewing = true
        this.loadingPreview = true
        this.previewUrl = 'https://beta.benaco.com/embed/' + scan.reviewId
      },
      stopPreview () {
        this.previewing = false
        this.previewUrl = ''
        this.loadingPreview = false
      },
      removeScan (scan) {
        this.$store.dispatch('scans/remove', scan.id)
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
  .title-btn{
    display: inline-block;
  }
  .search-box{
    padding-top: 10px;
  }
  .scan-card {
  }
  .scan-list-toolbar.toolbar{
    box-shadow: none;
    background: none;
  }
  .card__media {
    cursor: pointer;
  }

  iframe {
    height: 100%;
    width: 100%;
  }
</style>
