<template>
  <v-app light>
    <main>
      <v-container fill-height fluid style="background: url(/static/images/login-background.jpg) center no-repeat;">
        <v-layout row wrap align-center>
          <v-flex class="flex xs12 offset-sm3 sm6 md4 lg3 offset-md4  text-xs-center">
            <v-card class="white elevation-30">
              <v-card-title class="headline blue" style="color: white;line-height: 60px !important;">登陆
              </v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="user.tel"
                  placeholder="用户名"
                  :rules="[rules.required]"
                ></v-text-field>
                <v-text-field
                  v-model="user.password"
                  placeholder="密码"
                  type="password"
                  :rules="[rules.required]"
                ></v-text-field>
                <v-btn class="blue" style="color:white;" large block @click="login()">登录</v-btn>
                <v-layout row>
                  <v-flex xs6 text-xs-left>
                    <v-btn flat primary>忘记密码</v-btn>
                  </v-flex>
                  <v-flex xs6 text-xs-right>
                    <v-btn flat primary @click.stop="linkTo('/register.html')">注册</v-btn>
                  </v-flex>
                </v-layout>
                <div class="spr" style="padding: 0 0 5px;">
              <span
                style=" position: relative; top: 12px; background: white; padding: 0px 10px; color: gray; ">第三方登录</span>
                  <hr>
                </div>
              </v-card-text>
              <v-card-actions style="padding-bottom: 20px;">
                <v-layout>
                  <v-flex xs4>
                    <v-avatar><img src="/static/images/QQ@3x.png" alt=""></v-avatar>
                  </v-flex>
                  <v-flex xs4>
                    <v-avatar><img src="/static/images/wechat@3x.png" alt=""></v-avatar>
                  </v-flex>
                  <v-flex xs4>
                    <v-avatar><img src="/static/images/weibo@3x.png" alt=""></v-avatar>
                  </v-flex>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
  </v-app>
</template>

<script>
  import VAvatar from '../../node_modules/vuetify/src/components/VAvatar/VAvatar'
  import rules from '../components/common/rules'

  export default {
    components: {VAvatar},
    data () {
      return {
        rules,
        user: {
          tel: '',
          password: ''
        }
      }
    },
    methods: {
      login () {
        this.$store.dispatch('users/login', this.user).then(function () {
          location.href = 'index.html'
        }).catch((err) => {
          this.$store.commit('notifications/add', 'error', err.message)
        })
      },
      linkTo (href) {
        location.href = href
      }
    }
  }
</script>
<style scoped>
  input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill{
    background: none !important;
  }
</style>
