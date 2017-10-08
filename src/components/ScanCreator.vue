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
      <image-picker v-model="scan.photos"></image-picker>
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
      </div>
    </v-form>
  </div>
</template>

<script>
  /* eslint-disable quotes */

  import rules from './common/rules'
  import ImagePicker from './ImagePicker'

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
          photos: []
        },
        rules
      }
    },
    components: {
      ImagePicker
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
          this.scan.photos.forEach(function (f) {
            formData.append("files", f.file)
          })

          this.$store.dispatch('scans/add', formData).then(() => {
            this.creating = false
            this.$router.go(-1)
          }).catch(() => {
            this.creating = false
          })
        }
      }
    }
  }
</script>

<style scoped>
</style>
