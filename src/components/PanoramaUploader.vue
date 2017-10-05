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
  export default {
    data () {
      return {
        valid: false,
        loading: false,
        data: {
          orderId: ''
        }
      }
    },
    methods: {
      upload () {
        this.loading = true
      }
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
