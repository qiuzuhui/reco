<template>
  <v-app light class="blue">
    <v-container grid-list-md>
      <div style="text-align: center;padding-top: 30px;">
        <h4 style="width: 100%;color: white;">找回密码</h4>
      </div>
      <v-stepper v-model="paneState">
        <v-stepper-header style="box-shadow: none;" class="pt-4">
          <v-stepper-step step="1" :complete="paneState > 1">账号信息</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2">安全验证</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3">密码重置</v-stepper-step>
        </v-stepper-header>
        <v-stepper-content step="1">
          <div style="width: 400px;margin: auto;">
            <v-card flat>
              <v-card-text>
                <div class="title mb-2">请填写您需要找回密码的账号</div>
                <v-text-field
                  label="邮箱或者手机号码"
                  v-model="telOrMail"
                ></v-text-field>
                <v-btn
                  block primary
                  @click="verfiyAccount"
                >
                  下一步
                </v-btn>
              </v-card-text>
            </v-card>
          </div>
        </v-stepper-content>
        <v-stepper-content step="2">
          <div style="width: 400px;margin: auto;">
            <v-card flat>
              <v-card-text>
                <div class="title mb-2">为了您的账户安全，请进行安全验证</div>
                <div class="subheading" style="color: gray;">验证方式: {{telOrMail}}</div>
                <div>
                  <div style="display: inline-block;width: 250px;margin-right: 10px;">
                    <v-text-field
                      label="验证码"
                    ></v-text-field>
                  </div>
                  <v-btn style="display: inline-block;margin: 0;">发送验证码</v-btn>
                </div>
                <v-btn
                  block primary
                  @click="verifyAccount()"
                >
                  下一步
                </v-btn>
              </v-card-text>
            </v-card>
          </div>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-form ref="dataForm">
            <v-card flat>
              <v-card-text>
                <v-layout wrap row>
                  <v-flex xs12 md6 offset-md3>
                    <v-text-field
                      label="新密码"
                      v-model="user.password"
                      type="password"
                      :rules="[rules.required]"
                      @change="$refs.verifyPwd.validate()"
                    ></v-text-field>
                    <v-text-field
                      ref="verifyPwd"
                      label="确认密码"
                      v-model="temp.verifyPwd"
                      type="password"
                      :rules="[rules.required,verifyPwd]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-layout>
                  <v-flex xs12 text-xs-center>
                    <v-btn
                      :loading="changingPwd"
                      @click.native.stop="register()"
                      :disabled="changingPwd"
                      primary
                    >
                      确定
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-stepper-content>
      </v-stepper>
    </v-container>
  </v-app>
</template>


<script>
  import rules from '../components/common/rules'
  import VSubheader from '../../node_modules/vuetify/src/components/VSubheader/VSubheader'
  import VBtn from '../../node_modules/vuetify/src/components/VBtn/VBtn'

  export default {
    components: {
      VBtn,
      VSubheader
    },
    data () {
      return {
        paneState: 2,
        rules: rules,
        changingPwd: false,
        temp: {
          verifyPwd: ''
        },
        telOrMail: 'sampe@q.com',
        user: {
          password: ''
        },
        verifyPwd: (val) => {
          return val === this.user.password || '两次输入的密码不一致'
        }
      }
    },
    methods: {
      verifyAccount () {

      }
    }
  }

</script>
<style>

</style>
