<template>
    <div class="hotSinger">
        <div class="title">热门歌手</div>
        <mu-circular-progress :size="40" class="center" v-if="isLoading"/>
        <mu-list>
          <div v-for="(item,index) in hotSingerList" :key="index" class="singer-item">
            <router-link :to="{name:'hotSingerList',params:{id:item.id}}">
              <mu-list-item :title="item.name" :describeText="'专辑数:'+ item.albumSize + ' ' + '歌曲:' + item.musicSize" >
                <img v-lazy="item.img1v1Url" class="singer-image" slot="left">
              </mu-list-item>
            </router-link>
            <mu-divider inset></mu-divider>
          </div>
        </mu-list>
    </div>
</template>
<style lang="stylus" scoped>
  .hotSinger
    .center
      display: block!important;
      margin: 10% auto 0;
    .title
      margin: .3rem 0 .2rem .4rem;
      padding-left: .2rem;
      border-left: .2rem solid  #27df98;
    .singer-item
      height: 55px;
      margin: 10px
      .clear
        width 10px;
        height 55px
        margin-right 5px
        padding-right 5px
      .singer-image
        width 50px;
        height 50px;
        border-radius 50%
        line-height:55px
</style>
<script>
  // import Axios from 'axios'
  import Request from '../api/request'
  import api from '../api'
  export default {
    name: 'hotSinger',
    data () {
      return {
        hotSingerList: [],
        isLoading: true,
        offset: 0,
        scroller: ''
      }
    },
    mounted () {
      this.scroller = this.$el
      this.getHotSingerList()
    },
    methods: {
      // getHotSingerList () {
      //   this.isLoading = true
      //   Axios.get(api.getHotSingerList(50)).then((data) => {
      //     this.hotSingerList = data.artists
      //     console.log(this.hotSingerList)
      //     this.isLoading = false
      //   })
      // }
      getHotSingerList () {
        this.isLoading = true
        Request(api.getHotSingerList(50)).then((data) => {
          this.hotSingerList = data.artists
          console.log(this.hotSingerList)
          this.isLoading = false
        })
      }
    }
  }
</script>
