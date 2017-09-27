<template>
  <v-app light>
    <main>
      <v-container fill-height fluid style="background: url(/static/images/login-background.jpg) center no-repeat;">
        <v-layout row wrap align-center>
          <v-flex class="flex xs12 offset-sm3 sm6 md4 offset-md4 text-xs-center">
            <v-card class="white elevation-30">
              <v-card-title class="headline" style="background: #3f51b5;color: white;line-height: 60px !important;">登陆
              </v-card-title>
              <v-card-text>
                <v-text-field
                  placeholder="用户名"
                ></v-text-field>
                <v-text-field
                  placeholder="密码"
                  type="password"
                ></v-text-field>
                <v-btn style="background: #3f51b5;color:white;" large block>登录</v-btn>
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
  export default {
    components: {VAvatar},
    data () {
      return {}
    },
    methods: {
      linkTo (href) {
        location.href = href
      }
    }
  }
</script>
