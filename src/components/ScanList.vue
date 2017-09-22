<template>
  <v-layout row wrap>
    <v-flex xs6 sm4 md3 class="pa-2" v-for="i in 30" :key="i" style="width: 300px;" ju>
      <v-card >
        <v-card-media src="/static/images/desert.jpg" height="200px"></v-card-media>
        <v-card-title primary-title>
          Located two hours south
        </v-card-title>
        <v-card-actions>
          <v-btn flat class="orange--text">Share</v-btn>
          <v-btn flat class="orange--text">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'ScanList',
    data () {
      return {

      }
    }
  }
</script>

<style scoped>
</style>
