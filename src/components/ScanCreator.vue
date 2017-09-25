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
            v-bind:items="['2D','3D']"
            label="照片类型"
            item-value="text"
            v-model="scan.type"
            :rules="[rules.required]"
          ></v-select>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 md4>
          <v-text-field
            label="单点张数"
            v-model="scan.number"
            :rules="[rules.required,rules.number]"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap style="border: 1px dotted lightgray; padding: 5px;" class="mt-4">
        <v-flex xs12 sm6 md4 lg3 class="pa-1" v-for="(photo,index) in scan.photos" :key="index">
          <v-card class="photo-card">
            <v-card-media :src="photo.path" height="200px">
            </v-card-media>
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
  import rules from './common/rules'
  import Utils from './common/Utils'
  import _ from 'lodash'

  export default {
    name: 'ScanCreator',
    data () {
      return {
        creating: false,
        valid: false,
        scan: {
          title: '',
          type: '',
          number: '',
          photos: []
        },
        rules
      }
    },
    methods: {
      createScan () {
        if (this.$refs.dataForm.validate()) {
          this.creating = true
          this.$store.dispatch('scans/add', this.scan).then(() => {
            this.creating = false
          })
        }
      },
      chooseFiles () {
        this.$refs.uploadFiles.click()
      },
      removeFile (item) {
        console.log('remove', item)
        _.remove(this.scan.photos, (photo) => {
          return photo.name === item.name
        })
      },
      async addFiles () {
        console.log(Date.now())
        var data = await Utils.readAsDataURLs(this.$refs.uploadFiles.files)
        console.log(Date.now())
        data.forEach((item) => {
          this.scan.photos.push({
            name: item.name,
            path: item.dataUrl
          })
        })
      }
    }
  }
</script>

<style scoped>
</style>
