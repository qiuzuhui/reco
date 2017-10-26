<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg6 hidden-sm-and-down>
          <div class="title-btn">
            <v-btn primary @click.native.stop="$router.push('/scans/new')">新建</v-btn>
          </div>
        </v-flex>
        <v-flex xs12 sm6 md4 lg3>
          <div class="title-btn" @click.stop="filterStatus = '0'">
            <v-btn flat primary :outline="filterStatus == '0'">全部</v-btn>
          </div>
          <div class="title-btn" @click.stop="filterStatus = '2'">
            <v-btn flat primary :outline="filterStatus == '2'">已完成</v-btn>
          </div>
          <div class="title-btn" @click.stop="filterStatus = '1'">
            <v-btn flat primary :outline="filterStatus == '1'">处理中</v-btn>
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
        <v-card-media :src="scan.thumbnail" height="200px" @click.native.stop="preview(scan)">
          <circle9 style="margin: auto;" size="60px" v-show="scan.status == '0' || scan.status == '1' "></circle9>
          <v-icon x-large style="color:red;margin: auto;" v-show="scan.status == '3'">info</v-icon>
        </v-card-media>
        <v-card-actions>
          <span>{{scan.title}}</span>
          <v-spacer></v-spacer>
          <v-btn icon @click.native.stop="preview(scan)">
            <v-icon>fullscreen</v-icon>
          </v-btn>
          <v-btn icon @click.native.stop="openShareDialog(scan)">
            <v-icon>share</v-icon>
          </v-btn>
          <v-btn icon @click.native.stop="confirmRemove(scan)">
            <v-icon>delete</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-dialog v-model="previewing" fullscreen transition="dialog-bottom-transition" :overlay=false>
      <div style="background: white;height: 100%;overflow: hidden;">
        <v-toolbar dark class="indigo" fixed>
          <v-spacer></v-spacer>
          <v-btn icon @click.native.stop="openShareDialog(previewScan)">
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
    <v-dialog v-model="removing" style="z-index: 9999;">
      <v-card>
        <v-card-title class="headline">是否确定删除此场景?</v-card-title>
        <v-card-text>
          删除场景后，数据将无法找回
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="green--text darken-1" flat="flat" primary @click.native="removeScan()">确定</v-btn>
          <v-btn class="green--text darken-1" flat="flat" @click.native="closeDeleteDialog()">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="shareing" ref="shareDialog">
      <v-card>
        <v-icon style="float: right;cursor: pointer;" @click.stop="closeShareDialog()">close</v-icon>
        <v-card-text @click.stop="openShareLink()" style="cursor: pointer;">
          <qr-code :text="shareLink"></qr-code>
        </v-card-text>
        <v-card-actions style="text-align: center;display: block;">扫描二维码，分享至朋友圈</v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import { LetterCube, Circle9 } from 'vue-loading-spinner'
  import QRCode from 'vue-qrcode-component'
  export default {
    name: 'ScanList',
    data () {
      return {
        previewing: false,
        removing: false,
        loadingPreview: false,
        shareing: false,
        shareLink: '',
        filterStatus: '0',
        previewUrl: '',
        fab: false
      }
    },
    components: {
      Circle9,
      LetterCube,
      'qr-code': QRCode
    },
    methods: {
      preview (scan) {
        if (scan.status !== '2') {
          return
        }
        this.previewing = true
        this.loadingPreview = true
        this.previewScan = scan
        this.previewUrl = 'https://beta.benaco.com/embed/' + scan.reviewId
      },
      openShareDialog (scan) {
        this.$refs.shareDialog.$refs.content.style.zIndex = 999
        this.shareing = true
        this.shareLink = 'http://' + location.host + '/static/view.html?id=' + scan.reviewId
      },
      closeShareDialog () {
        this.shareing = false
        this.shareLink = ''
      },
      stopPreview () {
        this.previewing = false
        this.previewUrl = ''
        this.previewScan = null
        this.loadingPreview = false
      },
      confirmRemove (scan) {
        this.removing = true
        this.removeingScanId = scan.id
      },
      closeDeleteDialog () {
        this.removing = false
        this.removeingScanId = null
      },
      removeScan (scan) {
        this.$store.dispatch('scans/remove', this.removeingScanId).then(() => {
          this.closeDeleteDialog()
        })
      },
      copyShareLink () {
      },
      openShareLink () {
        window.open(this.shareLink)
      }

    },
    computed: {
      scans () {
        return this.$store.getters['scans/all'].filter((item) => {
          if (this.filterStatus === '0') {
            return true
          } else if (this.filterStatus === '1') {
            return item.status === '0' || item.status === '1'
          } else {
            return item.status === '2' || item.status === '3'
          }
        }).sort(function (item1, item2) {
          return item2.createTime - item1.createTime
        })
      }
    }
  }
</script>

<style scoped>
  .title-btn {
    display: inline-block;
  }

  .search-box {
    padding-top: 10px;
  }

  .scan-card {
  }

  .scan-list-toolbar.toolbar {
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
