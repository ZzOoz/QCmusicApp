<template>
  <div class="search_container">
    <mu-appbar style="position: fixed;">
      <div class="back" slot="left">
        <mu-icon-button flat color="white" @click="back">
          <mu-icon left value="arrow_back"></mu-icon>
        </mu-icon-button>
      </div>
      <div slot>青草音乐</div>
      <mu-icon-button icon="home" slot="right" @click="Login">
      </mu-icon-button>
    </mu-appbar>

    <div class="noResult" v-if="!isResult">
      <mu-flexbox>
        <div class="search">
          <i class="icon-search"></i>
          <el-input v-model="keyword" icon="el-icon-search" placeholder="搜索歌手、歌曲、专辑、mv"></el-input>
          <el-button type="success" icon="el-icon-search" @click="getSearchInfo(keyword)">搜索</el-button>
        </div>
      </mu-flexbox>

      <mu-flexbox wrap="wrap" :gutter="1">
          <mu-flexbox-item class="recommend" basis="100%">
            <div class="hot">热门推荐</div>
              <div class="content">
                <el-button size="small"  class="demo-chip" @click="HotKeyword(item)" v-for="(item,index) in hotKeyword"
                  :key="index" plain >{{item}}</el-button>
              </div>
        </mu-flexbox-item>
      </mu-flexbox>

      <mu-list :value="hotSearchList">
        <div class="hotSearch">热搜榜</div>
        <mu-circular-progress :size="40" class="center" v-if="loading"/>
        <div  v-for="(item,index) in hotSearchList" :key="item.id">
              <mu-list-item  :disableRipple="true" :title="item.searchWord" :describeText="item.content+ ' ' +item.score" @click="getSearchInfo(item.searchWord)">
                <el-link type="danger" slot="left" style="text-align: center;color:#27df98">{{index+1}}</el-link>
              </mu-list-item>
              <mu-divider inset></mu-divider>
          </div>
      </mu-list>
    </div>
    <div class="haveResult" v-else>
      <el-card :body-style="{ padding: '0px' }">
        <img src="https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg" class="image">
      </el-card>
      <div class="result">
        <div class="song">单曲</div>
        <mu-list>
          <div v-for="(item,index) in searchList" >
              <mu-list-item :title="item.name" :describeText="item.artists[0].name" @click="playSong(item)">
                  <span slot="left" class="left">{{index}}</span>
              </mu-list-item>
            <mu-divider inset></mu-divider>
          </div>
        </mu-list>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
  .score
    justify-content right
  .search_container
    width: 100%;
    height: 1300px;
    .search
      padding-top: 60px;
      margin: 5px auto
      .el-input
        width 220px;
    .recommend
      position: relative;
      top:15px
      .hot
        margin: .3rem 0 .2rem .4rem;
        padding-left: .2rem;
        border-left: .2rem solid  #27df98;
      .demo-chip
        margin: 5px;
    .mu-list
      position relative
      top: 15px
      .hotSearch
        margin: .3rem 0 .2rem .4rem;
        padding-left: .2rem;
        border-left: .2rem solid  #27df98;

    .haveResult
      margin 0 auto
      .result
        .song
          padding-left: 0.4rem;
          margin: .6rem .1rem 0 .4rem;
          border-left: 5px solid #27df98;
      .el-card
        .image
          width 100%;
          height 200px
      .clearfix:before,
      .clearfix:after {
        display: table;
        content: "";
      }
    .center {
      display: block!important;
      margin: 10% auto 0;
    }
</style>

<script>
  import Axios from 'axios'
  import api from '../api'
  import MuFlexbox from 'muse-ui/src/flexbox/flexbox'
  import MuFlexboxItem from 'muse-ui/src/flexbox/flexboxItem'
  export default {
    name: 'search',
    components: {MuFlexboxItem, MuFlexbox},
    data () {
      return {
        keyword: '', // 输入的关键词
        labelPosition: 'top',
        hotSearchList: [], // 热搜榜
        isResult: false, // 是否有结果 实现切换
        searchList: [],
        loading: false,
        hotKeyword: ['周杰伦', '林俊杰', '陈奕迅', '伟大的渺小', '不为谁而作的歌', '失落沙洲', '张杰', '华晨宇', '热门']
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.getHotSearchList()   // 进入路由时触发getHotSearchList
      })
    },
    beforeRouteLeave (to, from, next) {
      this.searchList = []
      next()
    },
    methods: {
      playSong (song) {
        var audio = {}
        audio.id = song.id  // id
        audio.singer = song.artists[0].name // 演唱者
        audio.albumPic = song.artists[0].img1v1Url
        audio.name = song.name
        this.$store.commit('addToList', audio)
        this.$store.dispatch('getSong', audio.id)
      },
      Login () {
        this.isResult = false
        this.keyword = ''
        this.$router.push({path: '/login'})
      },
      back () {
        this.isResult = false
        this.keyword = ''
        this.$router.go(-1)
      },
      HotKeyword (val) {
        this.keyword = val
      },
      getSearchInfo (keywords) {
        if (keywords != null) {
          Axios.get(api.getSearch(keywords)).then((data) => {
            console.log(data)
            if (data.code === 200) {
              this.isResult = true
              var search = data.result.songs
              for (let i = 0; i < search.length; i++) {
                this.searchList.push(search[i])
              }
              console.log(this.searchList)
            } else {
              this.$message({
                type: 'error',
                message: '搜索出错'
              })
            }
          })
        } else {
          this.$message({
            type: 'error',
            info: '搜索不能为空'
          })
        }
      },
      getHotSearchList () {  // 获取热搜排行榜信息
        Axios.get(api.getHotSearchList()).then((data) => {
          console.log(data)
          var hotList = data.data
          for (let i = 0; i < hotList.length; i++) {
            this.hotSearchList.push(hotList[i])
          }
        })
      }
    }
  }
</script>
