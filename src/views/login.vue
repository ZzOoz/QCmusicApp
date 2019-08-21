<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">青草音乐</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay = true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @sumbit.prevent="login">
          <div :class="{on:loginWay}" >
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phoneLogin.phone">   <!-- 将phone变量设为动态绑定  -->
            </section>
            <section class="login_verification">
              <input type="text" maxlength="20" placeholder="密码" v-if="showPassword" v-model="phoneLogin.password">    <!-- 绑定数据showPassword和pwd  -->
              <input type="password" maxlength="20" placeholder="密码" v-else v-model="phoneLogin.password">   <!-- 绑定数据showPassword和pwd  -->
              <div class="switch_button" @click="showPassword=!showPassword" :class="showPassword ? 'on':'off'">  <!-- 监听事件showPassword 绑定  判断showPassword是否为true 是则加on样式为白色 否则加绿色样式-->
                <div class="switch_circle" :class="{right:showPassword }"></div>
                <span class="switch_text" >{{showPassword ? '显示':''}}</span>
              </div>
            </section>
            <section class="login_hint">
              温馨提示：未注册帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="20" placeholder="邮箱" v-model="email">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="20" placeholder="密码" v-if="showPassword" v-model="phoneLogin.password">    <!-- 绑定数据showPassword和pwd  -->
                <input type="password" maxlength="20" placeholder="密码" v-else v-model="phoneLogin.password">   <!-- 绑定数据showPassword和pwd  -->
                <div class="switch_button" @click="showPassword=!showPassword" :class="showPassword ? 'on':'off'">  <!-- 监听事件showPassword 绑定  判断showPassword是否为true 是则加on样式为白色 否则加绿色样式-->
                  <div class="switch_circle" :class="{right:showPassword }"></div>
                  <span class="switch_text" >{{showPassword ? '显示':''}}</span>
                </div>
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <router-link href="javascript:" class="go_back" to="/msite">
        <i class="iconfont icon-jiantou2"></i>
      </router-link>
    </div>
    <!--    <AlertTip @closeTip="closeTip" :alertText="alertText" v-show="alertShow"></AlertTip>-->
  </section>

</template>

<style lang="stylus">
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 30px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          margin: 20px;
          font-size 40px
          font-weight bold
          color  #27df98
          text-align center
        .login_header_title
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color  #27df98
              font-weight 700
              border-bottom 2px solid  #27df98
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid  #27df98
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                color #fff
                height: 18px;
                line-height: 18px;
                position: absolute;
                top: 18px;
                right: 5px;
                width: 40px;
                transform translateY(-50% )
                                      background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background  #27df98
                >.switch_circle
                  //transform translateX(27px)
                  width 18px
                  height 18px
                  position absolute
                  top -1px
                  left -1px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)     /*观察showPassword的状态 改版right是否加入*/
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color  #27df98
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background  #27df98
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'login',
    data () {
      return {
        loginWay: true, // true为短信验证 false为密码验证
        phoneLogin: {
          phone: '', // 手机号
          password: '' // 密码
        },
        showPassword: false, // 监听是否显示密码
        email: '', // 邮箱
        alertShow: false, // 显示提示框
        alertText: '', // 提示文本
        rightPhone: false
      }
    },
    beforeRouteLeave (to, from, next) {
      this.phoneLogin = {}
      next()
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      login () {
        this.$store.dispatch('getPhoneUserInfo', {phone: this.phoneLogin.phone, password: this.phoneLogin.password})
        if (this.userInfo.code === 200) {
          this.$message({
            type: 'success',
            message: '欢迎'
          })
          this.$router.replace({path: '/index/rage'})
        }
      }
    }
  }
</script>


