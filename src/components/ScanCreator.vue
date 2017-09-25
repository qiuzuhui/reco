<template>
  <v-container fluid>
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
    <v-container>

    </v-container>
  </v-container>
</template>

<script>
  import rules from './common/rules'
  export default {
    name: 'ScanCreator',
    data () {
      return {
        scan: {
          title: '',
          type: '',
          number: ''
        },
        rules
      }
    }
  }
</script>

<style scoped>
</style>
