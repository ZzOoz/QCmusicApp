<template>
  <div class="Dj_Detail">
    <div class="fixed-title" :style="{'background':'rgba(206, 61, 62,'+ opacity +')'}" style="transition: opacity .1s">
    <mu-appbar>
      <div class="back" slot="left">
        <mu-icon-button flat color="white" @click="back">
          <mu-icon left value="arrow_back"></mu-icon>
        </mu-icon-button>
      </div>
      <div slot>电台</div>
      <mu-icon-button icon="home" slot="right" @click="Login">
      </mu-icon-button>
    </mu-appbar>
    </div>

    <div class="playlist-info">
      <div class="info-wrapper">
        <div class="info-gallery">
          <img :src="this.DjDetailInfo.picUrl + '?param=300y300'" alt="">
        </div>
        <div class="info-title">
          <p class="titile">{{name}}</p>
          <p class="author" v-if="this.DjDetailInfo.picUrl">
            <mu-avatar slot="left"  :src="this.DjDetailInfo.picUrl + '?param=50y50'" :size="30" :iconSize="20"/>
            <span>{{this.DjDetailInfo.name}}</span>
            <span style="text-overflow: ellipsis;">{{this.DjDetailInfo.desc}}</span>
          </p>
        </div>
      </div>
      <div class="bg-mask"></div>
      <div class="bg-player" id="backImg" :style="{'background-image':'url(' + this.DjDetailInfo.picUrl + '?param=300y300)'}" ></div>
    </div>
    <div class="Dj_Detail_content">
      <div class="add-all">
        <mu-flat-button label="播放全部" class="demo-flat-button" icon="add_circle_outline" @click=""/>
        <mu-divider/>
      </div>
      <mu-list>
        <div v-for="(item,index) in DjDetailInfo.commentDatas" :key="index" @click="playDj(item)">
          <mu-list-item :title="item.programName" class="Dj_Detail_item">
            <span slot="left" class="index" style="font-size: 17px;font-weight: bold;">{{index}}</span>
          </mu-list-item>
          <mu-divider inset></mu-divider>

        </div>
      </mu-list>
    </div>

  </div>
</template>

<script>
  import Axios from 'axios'
  import api from '../api'
  import Tabs from '../components/Tabs'
  export default {
    name: 'djDetail',
    components: {Tabs},
    data () {
      return {
        picUrl: '',
        name: '',
        DjDetailInfo: {},
        activeName: 'first',
        fname: '电台',
        opacity: 0
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.getDjDetail()

        if (to.params.picUrl) {
          vm.name = vm.$route.params.name
          vm.picUrl = vm.$route.params.picUrl
          vm.rcmdText = vm.$route.params.rcmdText
          vm.id = vm.$route.params.id
        }
        window.scroll = () => {
          var opa = window.pageYOffset / 150
          if (opa > 0.5) {
            vm.fname = vm.name
          } else {
            vm.name = '电台'
          }
        }
      })
    },
    methods: {
      getDjDetail () {
        Axios.get(api.getDjDetail(this.$route.params.id)).then(data => {
          this.DjDetailInfo = data.djRadio
        })
      },
      Login () {
        this.$router.push({path: '/login'})
      },
      back () {
        this.$router.go(-1)
      },
      playDj (item) {
        var Dj = {}
        Dj.id = item.programId
        Dj.name = item.name
        Dj.pic = item.picUrl
        this.$store.commit('addToList', Dj)
        this.$store.dispatch('getDj', Dj.id)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .Dj_Detail
    .fixed-title
        position: fixed;
        top: 0;
        width: 100%;
        height: 56px;
        left: 0;
        z-index: 15;
  .playlist-info
    position: relative;
    padding: 60px .5rem 0 ;
    height: 9rem;
  .info-wrapper
    position: relative;
    z-index: 10;
    color: #fff;
    .info-gallery
      position: relative;
      float: left;
      width: 6rem;
      overflow: hidden;
      span
        position: absolute;
        display: block;
        padding-right: 5px;
        width: 100%;
        left: 0;
        top: 0;
        font-size: 12px;
        text-align: right;
        background: rgba(0,0,0,.35);
        z-index: 11;
      img
        max-width: 100%;
        height: auto;
    .info-title
      float: left;
      width: 7.5rem;
      margin-left: 1rem;
      .title
        font-size: 16px;
        word-wrap: wrapper;
      .author
        span
          overflow: hidden;
          display: inline-block;
          height: 30px;
          text-overflow: ellipsis;
          width: 5.4rem;
          white-space: nowrap;
          font-size: 14px;
          vertical-align: top;
          line-height: 30px;
  .bg-player
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom right;
    filter: blur(40px);
    -webkit-filter: blur(40px);
    z-index: 1;
  .bg-mask
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    opacity 0.5
    .Dj_Detail_content
    .Dj_image
        width: 100%;
        margin-top: 30px;
        height: 350px;
      .Dj_Detail_item
        width 100%;
        padding 10px
</style>
