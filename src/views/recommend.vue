<template>
    <div class="recommend">
      <mu-appbar>
        <div class="back" slot="left">
          <mu-icon-button flat color="white" @click="back">
            <mu-icon left value="arrow_back"></mu-icon>
          </mu-icon-button>
        </div>
        <div slot>青草音乐</div>
        <mu-icon-button icon="home" slot="right" @click="Login">
        </mu-icon-button>
      </mu-appbar>
      <mu-flexbox class="header" wrap="wrap" justify="space-around">
        <mu-flexbox-item basis="100" >
          <img src="../../static/recommend.png" class="image">
        </mu-flexbox-item>
      </mu-flexbox>
      <div class="add-all">
        <mu-flat-button label="播放全部" class="demo-flat-button" icon="add_circle_outline" @click="playAll"/>
        <mu-divider/>
      </div>
      <mu-circular-progress :size="40" class="center" v-if="isLoading"></mu-circular-progress>
      <mu-list class="content">
        <div v-for="(item,index) in DailySongList" :key="index">
          <mu-list-item  class="item">
            <span class="item_title">{{item.name}}</span>
            <span class="item_description">{{item.artists[0].name}}</span>
            <div slot="left" class="item_image" style="margin: 15px 0">
              <img :src="item.album.picUrl" >
            </div>
          </mu-list-item>
          <mu-divider inset></mu-divider>
        </div>
      </mu-list>
      <div class="footer">加载完毕</div>
    </div>
</template>

<style lang="stylus" scoped>
  .center {
    display: block!important;
    margin: 10% auto 0;
  }
  .recommend
    .header
      .image
        width 100%
    .content
      .item
        height 80px
        .item_description
          position: absolute;
          top: 50px;
          left: 110px;
        .item_title
          position: relative;
          left: 35px;
          font-size: 16px;
      .item_image
        width: 80px;
        height: 80px;
        margin-right: 10px;
        img
          width: 80px;
          height: 80px;
          margin-bottom: 20px
          margin-right: 35px
  .footer
    text-align: center
    height 30px;
    line-height 30px;
    font-size 15px

</style>

<script>
  import {mapState} from 'vuex'
  import MuFlexbox from 'muse-ui/src/flexbox/flexbox'
  import MuFlexboxItem from 'muse-ui/src/flexbox/flexboxItem'
  export default {
    name: 'recommend',
    components: {MuFlexboxItem, MuFlexbox},
    data () {
      return {
        recommendList: [], // 每日推荐列表
        isLoading: false
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.getRecommend()
      })
    },
    computed: {
      ...mapState(['DailySongList'])
    },
    methods: {
      playAll () {

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
      getRecommend () {
        this.isLoading = true
        this.$store.dispatch('getDailyRecommendSong')
        this.isLoading = false
      }
    }
  }
</script>


