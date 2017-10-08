<template>
  <v-form ref="dataForm" v-model="valid">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
          <h4>2D 合成</h4>
        </v-flex>
        <v-flex xs12 md6>
          <v-select v-model="data.orderId"
                    label="场景"
                    :items="allScans"
                    item-text="label"
                    item-value="id"
          ></v-select>
          <image-picker v-model="data.photos"></image-picker>
          <v-btn :loading="loading" @click.native.stop="upload()" :disabled="loading" primary>
            上传
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>
<script>
  import _ from 'lodash'
  import ImagePicker from './ImagePicker'
  import api from '../api'

  export default {
    data () {
      return {
        valid: false,
        loading: false,
        data: {
          orderId: '',
          photos: []
        }
      }
    },
    methods: {
      upload () {
        this.loading = true
        // TODO
        let formData = new FormData()
        formData.append('orderId', this.data.orderId)
        this.data.photos.forEach(function (f) {
          formData.append('files', f.file)
        })
        api.scans.addPhotos(formData).then(() => {
          this.loading = false
          this.$store.commit('notifications/add', {
            type: 'info',
            msg: '上传成功'
          })
          this.data = {
            orderId: '',
            photos: []
          }
        }).catch((err) => {
          this.loading = false
          this.$store.commit('notifications/add', {
            type: 'error',
            msg: '上传失败：' + err.message
          })
        })
      }
    },
    components: {
      ImagePicker
    },
    computed: {
      allScans () {
        return this.$store.getters['scans/all'].map((item) => {
          item = _.clone(item)
          item.label = `${item.title} (id: ${item.id})`
          return item
        })
      }
    }
  }
</script>
