<template>
  <v-app light class="white">
    <v-container grid-list-md>
      <div style="text-align: center">
        <h4 style="width: 100%;">企业注册</h4>
      </div>
      <v-stepper v-model="e1">
        <v-stepper-header style="box-shadow: none;" class="pt-4">
          <v-stepper-step step="1" :complete="e1 > 1">填写信息</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2">注册完成</v-stepper-step>
        </v-stepper-header>
        <v-stepper-content step="1">
          <v-card flat>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs12 sm8 offset-sm2>
                  <v-text-field
                    label="用户名"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm4 offset-sm2>
                  <v-text-field
                    label="联系人姓名"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm4 >
                  <v-text-field
                    label="手机号码"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm4 offset-sm2>
                  <v-text-field
                    label="输入密码"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <v-text-field
                    label="确认密码"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm8 offset-sm2>
                  <v-text-field
                    label="企业名称"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm8 offset-sm2>
                  <v-select
                    label="行业"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm4 offset-sm2>
                  <v-select
                    label="省份"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm4>
                  <v-select
                    label="城市"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm8 offset-sm2>
                  <v-text-field
                    label="详细地址"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm8 offset-sm2>
                  <v-text-field
                    label="邮箱"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions >
              <v-layout>
                <v-flex xs12 text-xs-center>
                  <v-btn primary @click.native="e1 = 2">注册</v-btn>
                </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-card >
            <v-card-text style="height:300px;">

            </v-card-text>
            <v-card-actions >
              <v-layout>
                <v-flex xs12 text-xs-center>
                  <v-btn primary >完成</v-btn>
                </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
      </v-stepper>
    </v-container>
  </v-app>
</template>


<script>
  import VSelect from '../../node_modules/vuetify/src/components/VSelect/VSelect'
  export default {
    components: {VSelect},
    data () {
      return {
        e1: 0
      }
    }
  }
</script>
