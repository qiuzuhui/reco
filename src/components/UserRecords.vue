<template>
  <v-container class="userRecords">
    <v-data-table
      ref="dataTable"
      v-bind:headers="headers"
      :items="items"
      hide-actions
      class="elevation-1"
      no-data-text="没有消费记录"
    >
      <template slot="items" scope="props">
        <td>{{ new Date(props.item.createTime) | formatDate }}</td>
        <td>{{ props.item.description }}</td>
        <td>{{ props.item.goodsNum }}</td>
        <td>{{ props.item.goodsActualPrice }}</td>
        <td>{{ props.item.actualAmount }}</td>
        <td>{{ statusMsg[props.item.status]}}</td>
      </template>
      <template slot="footer">
        <td></td>
        <td></td>
        <td></td>
        <td style="padding: 0 24px;font-weight: bolder;">合计</td>
        <td style="padding: 0 24px;font-weight: bolder;">{{consumeAmount}}</td>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
  import api from '../api'
  export default {
    data () {
      return {
        statusMsg: ['处理中', '处理中', '完成', '完成'],
        headers: [
          {text: '时间', align: 'left', value: 'createTime'},
          {text: '商品名/场景名', align: 'left', value: 'description'},
          {text: '数量', align: 'left', value: 'goodsNum'},
          {text: '单价 （元）', align: 'left', value: 'goodsActualPrice'},
          {text: '总价 （元）', align: 'left', value: 'actualAmount'},
          {status: '处理状态', align: 'left', value: 'status'}
        ],
        items: []
      }
    },
    created () {
      api.users.findRecordsConsumption().then((data) => {
        this.items = data
        this.consumeAmount = data.reduce((result, item) => {
          return result + item.actualAmount
        }, 0)
      })
    }
  }

</script>
<style>
  .userRecords table.table thead th{
    font-weight: bolder;
    font-size: 14px;
  }
</style>
