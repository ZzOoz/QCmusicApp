<template>
    <div>
      <mu-appbar class="header">
        <div class="back" slot="left">
          <mu-icon-button flat color="white" @click="back">
            <mu-icon left value="arrow_back"></mu-icon>
          </mu-icon-button>
        </div>
        <div slot>青草音乐</div>
        <mu-icon-button icon="home" slot="right" @click="Login">
        </mu-icon-button>
      </mu-appbar>

      <mu-circular-progress :size="40" class="center" v-if="isLoading"></mu-circular-progress>
      <div class="myVideo" >
<!--          <video id="myVideo" class="video-js">-->
<!--            <source :src="this.mvUrl" type="video/mp4">-->
<!--          </video>-->
          <video class="video" ref="video" controls autoplay loop :src="mvUrl"></video>
          <span class="mv-title">{{name}}--{{artistName}}</span>
          <mu-divider style="margin-top: 5px"></mu-divider>
          <div class="mv-comment">
            <i class="el-icon-star-off el-icon"></i>
            <i class="el-icon-position el-icon"></i>
            <i class="el-icon-chat-line-square el-icon"></i>
            <i class="el-icon-folder-add el-icon"></i>
          </div>
          <div class="mv-other">
            <p>相关视频</p>
            <mu-circular-progress :size="40" class="center" v-if="isLoading"></mu-circular-progress>
            <mu-flexbox wrap="wrap" justify="space-around">
                <mu-flexbox-item basis="100%" v-for="(item,index) in mvRelateListInfo" :key="index">
                  <router-link :to="{name:'mvDetail',params:{id:item.vid,name:item.title,cover:item.coverUrl,artistName:item.creator[0].username}}">
                      <img :src="item.coverUrl" style="width: 100%">
                      <div class="mv-relate">{{item.title}}</div>
                    </router-link>
                </mu-flexbox-item>
            </mu-flexbox>
            <mu-divider></mu-divider>
          </div>
          <div class="mv_info">
          </div>
      </div>
    </div>
</template>

<script>
  import Axios from 'axios'
  import api from '../api'
  import MuFlexbox from 'muse-ui/src/flexbox/flexbox'
  import MuFlexboxItem from 'muse-ui/src/flexbox/flexboxItem'
  export default {
    name: 'mvDetail',
    components: {MuFlexboxItem, MuFlexbox},
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (parseInt(to.params.id) !== parseInt(vm.id)) {
          vm.mvRelateListInfo = []
          vm.getMvUrl()
          vm.getRelateMvInfo()
        }
        if (to.params.cover) {
          // 获取mvList传入的数据
          vm.cover = vm.$route.params.cover
          vm.name = vm.$route.params.name
          vm.description = vm.$route.params.desc
          vm.playCount = vm.$route.params.count
          vm.id = vm.$route.params.id
          vm.artistName = vm.$route.params.artistName
        }
      })
    },
    beforeRouteUpdate (to, from, next) {
      next(vm => {
        if (parseInt(to.params.id) !== parseInt(vm.id)) {
          vm.mvRelateListInfo = []
          vm.mvUrl = ''
          vm.getMvUrl()
          this.$refs.video.src = this.mvUrl
        }
      })
    },
    data () {
      return {
        mvInfo: {},
        isLoading: false,
        mvUrl: '',
        name: '',
        artistName: '',
        mvRelateListInfo: []
      }
    },
    // mounted () {
    //   // eslint-di sable-next-line no-unused-vars
    //   var player = this.$video('#myVideo', {
    //     controls: true
    //   })
    // },
    methods: {
      getMvUrl () {
        this.isLoading = true
        Axios.get(api.getMvDate(this.$route.params.id)).then((data) => {
          this.mvInfo = data.data
          this.mvUrl = this.mvInfo.url
          console.log(this.mvUrl)
        })
        this.isLoading = false
      },  // 获取单只mv的播放地址
      getRelateMvInfo () {
        this.isLoading = true  // isloading
        Axios.get(api.getRelateMv(this.$route.params.id)).then((data) => {
          console.log(data)
          var list = data.data
          for (let i = 0; i < list.length; i++) {
            this.mvRelateListInfo.push(list[i])
          }
          this.isLoading = false
        })
      }, // 获取mv信息
      Login () {
        this.$router.push({path: '/login'})
      },
      back () {
        this.$router.push({path: '/index/mvList'})
      },
      playMv () {
        this.$store.commit('play')
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .header
      position: fixed
    .center
      display block!important
      margin: 10% auto 0;
    .myVideo
      width 100%
      padding-top: 56px;
      .video
        width 100%
        display: block
      .mv-title
        display: block;
        margin: 0 auto;
        padding: 10px 0 0 10px;
        font-size: 13px;
      .mv-comment
        margin: 15px 10px;
        .el-icon
          font-size: 25px;
          display: inline-block;
          width: 24%;
          text-align: center;
        .el-icon:hover
          color:#27df98
        .el-icon:link
          color:#27df98
      .mv-other
        p
          margin-left: 5px;
          padding-left: 5px;
          border-left: 5px solid #27df98;
        .mv-relate
          font-size: 14px;
          margin: 8px 10px;
</style>
