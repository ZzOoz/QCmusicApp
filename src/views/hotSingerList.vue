<template>
    <div class="hotSinger">
        <mu-appbar class="hotSinger_header" :style="'opacity:' + opacity">
          <div class="back" slot="left">
            <mu-icon-button flat color="white" @click="back">
              <mu-icon left value="arrow_back"></mu-icon>
            </mu-icon-button>
          </div>
          <div slot>歌手信息</div>
          <mu-icon-button icon="home" slot="right" @click="Login">
          </mu-icon-button>
        </mu-appbar>
      <mu-circular-progress :size="40" class="center" v-if="isLoading" />
      <div>
        <img v-lazy="this.singerInfo.img1v1Url" style=" width: 100%;height: 370px" class="hotSinger_image">
      </div>
      <div class="hotSinger_content">
        <div class="title">歌手单曲</div>
        <mu-list>
          <div v-for="(item,index) in singerSongList" :key="index">
            <mu-list-item :title="item.name" :describeText="item.ar[0].name" @click="playSong(item)">
                <span slot="left" class="index">{{index+1}}</span>
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
  export default {
    name: 'hotSingerList',
    data () {
      return {
        isLoading: false,
        singerSongList: [],
        singerInfo: {},
        opacity: 0.3
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (parseInt(vm.id) !== parseInt(to.params.id)) {
          vm.getSingerSong()
        }
        window.scroll = function () {
          var opa = window.pageYOffset / 150
          if (opa > 0.5) {
            vm.opacity = 0
          }
        }
      })
    },
    methods: {
      getSingerSong () {
        this.isLoading = true
        Axios.get(api.getSingerSong(this.$route.params.id)).then((data) => {
          this.singerSongList = data.hotSongs
          this.singerInfo = data.artist
          console.log(this.singerSongList)
          this.isLoading = false
        })
      },
      playSong (song) {
        var audio = {}
        audio.singer = song.ar[0].name // 演唱者
        audio.albumPic = song.al.picUrl
        audio.name = song.name
        audio.id = song.id
        this.$store.commit('addToList', audio)
        this.$store.dispatch('getSong', audio.id)
      },
      Login () {
        this.$router.push({path: '/login'})
      },
      back () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .center
      display: block!important;
      margin: 10% auto 0;
    .hotSinger_header
      position: fixed
      background: black
    .hotSinger_content
      .title
        margin: .3rem 0 .2rem .4rem;
        padding-left: .2rem;
        border-left: .2rem solid  #27df98;
      .index
        padding-left: 10px;
        font-size: 18px;
        font-weight: bolder;
</style>
