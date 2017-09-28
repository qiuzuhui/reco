<template>
  <div>
    <v-form ref="dataForm" v-model="valid">
      <v-layout row>
        <v-flex xs12 md4>
          <v-text-field
            label="场景名称"
            v-model="scan.title"
            :rules="[rules.required]"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 md4>
          <v-select
            :items="scanTypes"
            label="照片类型"
            item-value="value"
            item-text="label"
            v-model="scan.type"
            :rules="[rules.required]"
            @input="onChangeScanType()"
          ></v-select>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 md4>
          <v-text-field
            label="单点张数"
            :disabled="scan.type == '1'"
            v-model="scan.number"
            :rules="[rules.required,rules.number]"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap style="border: 1px dotted lightgray; padding: 5px;" class="mt-4">
        <v-flex xs12 sm6 md4 lg3 class="pa-1" v-for="(photo,index) in sortedPhotos" :key="photo.name">
          <v-card class="photo-card">
            <v-card-media :src="photo.dataUrl" v-show="photo.dataUrl" height="200px">
            </v-card-media>
            <v-card-text class="text-xs-center" v-show="!photo.dataUrl" style="line-height: 168px;">
              <v-progress-circular indeterminate class="primary--text"></v-progress-circular>
            </v-card-text>
            <v-card-actions>
              <span>{{photo.name}}</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="removeFile(photo)">
                <v-icon>delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 md4 lg3 class="pa-1">
          <v-card class="photo-card" style="cursor: pointer;" @click.stop="chooseFiles()">
            <v-card-text class="text-xs-center">
              <div style="height: 220px;">
                <i data-v-50239e73="" class="material-icons icon"
                   style=" font-size: 220px; color: #b9b7b7; ">note_add</i>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <div class="text-xs-center text-md-right pt-4">
        <v-btn
          :loading="creating"
          @click.native.stop="createScan()"
          :disabled="creating"
          primary
        >
          创建
          <v-icon right dark>cloud_upload</v-icon>
        </v-btn>
        <v-btn
          @click.native="$router.back()"
        >
          取消
        </v-btn>
        <input type="file" style="display: none;" @change='addFiles()' multiple="true" ref="uploadFiles"/>
      </div>
    </v-form>
  </div>
</template>

<script>
  /* eslint-disable quotes */

  import rules from './common/rules'
  import Utils from './common/Utils'
  import Memory from '../api/Memory'

  export default {
    name: 'ScanCreator',
    data () {
      return {
        creating: false,
        valid: false,
        scanTypes: [
          {label: '平面照片', value: '0'},
          {label: '全景照片', value: '1'}
        ],
        scan: {
          title: '',
          type: '1',
          number: 1,
          photos: new Memory({
            data: [],
            idProperty: 'name'
          })
        },
        rules
      }
    },
    methods: {
      onChangeScanType () {
        if (this.scan.type === 1) {
          console.log(this.scan.type)
          this.scan.number = 1
        }
      },
      createScan () {
        if (this.$refs.dataForm.validate()) {
          this.creating = true

          let formData = new FormData()
          formData.append("title", this.scan.title)
          formData.append("number", this.scan.number)
          this.scan.photos.data.forEach(function (f) {
            formData.append("files", f.file)
          })

          this.$store.dispatch('scans/add', formData).then(() => {
            this.creating = false
          }).catch(() => {
            this.creating = false
          })
        }
      },
      chooseFiles () {
        this.$refs.uploadFiles.value = null
        this.$refs.uploadFiles.click()
      },
      removeFile (item) {
        this.scan.photos.remove(item.name)
      },
      async addFiles () {
        [].forEach.call(this.$refs.uploadFiles.files, (file) => {
          let item = {
            name: file.name,
            dataUrl: '',
            file: file
          }
          this.scan.photos.add(item)
          Utils.readAsDataURL(file).then((dataUrl) => {
            item.dataUrl = dataUrl
          })
        })
      }
    },
    computed: {
      sortedPhotos () {
        return this.scan.photos.data.sort((item1, item2) => {
          return item1.name > item2.name ? 1 : -1
        })
      }
    }
  }
</script>

<style scoped>
</style>
