<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <h4>充值/退款</h4>
      </v-flex>
      <v-flex xs12 md6>
        <v-select v-model="data.memberId" label="会员"></v-select>
      </v-flex>
      <v-flex md6 hidden-sm-and-down></v-flex>
      <v-flex xs12 md6>
        <v-select v-model="data.transType" label="操作类型"></v-select>
      </v-flex>
      <v-flex md6 hidden-sm-and-down></v-flex>
      <v-flex xs12 md6>
        <v-text-field label="当前余额" v-model="balance" readonly></v-text-field>
      </v-flex>
      <v-flex md6 hidden-sm-and-down></v-flex>
      <v-flex xs12 md6>
        <v-text-field v-model="data.amount" label="金额"></v-text-field>
      </v-flex>
      <v-flex md6 hidden-sm-and-down></v-flex>
      <v-flex xs12 md6>
        <v-text-field v-model="data.remark" label="备注"></v-text-field>
      </v-flex>
      <v-flex md6 hidden-sm-and-down></v-flex>
      <v-flex xs12>
        <v-btn primary @click.native="charge()">确定</v-btn>
        <v-btn @click.native="reset()">取消</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import api from '../api'

  export default {
    data: function () {
      return {
        balance: 0,
        data: {
          memberId: '',
          transType: '1',
          amount: 0,
          remark: ''
        }
      }
    },
    methods: {
      reset () {

      },
      charge () {
        api.balance.recharge()
      }
    }
  }
</script>
