<template>
    <div>
      <div class="loading-wrapper" v-if="isloading" >
          <div class="loading"></div>
          <div class="loading-txt">正在加载中</div>
      </div>
      <div class="container" v-show="!isloading">
      <div id="slider">
        <swiper :options="swiperOption">
          <swiper-slide v-for="item in bannerList" :key="item.imageUrl"><img :src="item.imageUrl" class="banner-item"  alt=""></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="options">
        <mu-flexbox wrap="wrap" justify="space-around">
          <mu-flexbox-item :basis="10">
            <div>
              <el-button icon="el-icon-date" circle type="success" plain class="button" @click="getRecommend"></el-button>
              <span class="button-name">推荐</span>
            </div>
          </mu-flexbox-item>
          <mu-flexbox-item :basis="10">
            <div>
              <el-button icon="el-icon-notebook-2" circle type="success" plain class="button"></el-button>
              <span class="button-name">歌单</span>
            </div>
          </mu-flexbox-item>
          <mu-flexbox-item :basis="10">
            <div>
              <el-button icon="el-icon-headset" circle type="success" plain class="button" @click="goRankList"></el-button>
              <span class="button-name">排行</span>
            </div>
          </mu-flexbox-item>
          <mu-flexbox-item :basis="10">
            <div>
              <el-button icon="el-icon-camera" circle type="success" plain class="button" @click="goDj"></el-button>
              <span class="button-name">电台</span>
            </div>
          </mu-flexbox-item>
          <mu-flexbox-item :basis="10">
            <div>
              <el-button icon="el-icon-video-camera" circle type="success" plain class="button"></el-button>
              <span class="button-name">直播</span>
            </div>
          </mu-flexbox-item>
        </mu-flexbox>
      </div>
      <div class="wrapper">
      <div class="g-title song-list">推荐歌单 <router-link :to="{path: '/index/songList'}">更多</router-link></div>
      <mu-flexbox wrap="wrap" justify="space-around" class="box" :gutter="0">
        <mu-flexbox-item basis="28%" class="item" :key="item.id" v-for="item in playList">
          <router-link :to="{name: 'playListDetail',params: { id: item.id, name: item.name, coverImg: item.picUrl, creator: item.copywriter, count: item.playCount, desc: item.description }}">
          <div class="bar">{{item.playCount | formatCount}}</div>
          <img class="item-img img-response" :src="item.picUrl" lazy="loading">
          <div class="item-name">{{item.name}}</div>
          </router-link>
        </mu-flexbox-item>
      </mu-flexbox>
        <div class="g-title mv">推荐MV <router-link :to="{path:'/index/mvList'}">更多</router-link></div>
        <mu-flexbox wrap="wrap" justify="space-between" class="box" :gutter="0">
          <mu-flexbox-item basis="48%" class="mv-item" v-for="item in mvList" :key="item.artistId">
            <router-link :to="{name:'mvDetail',params:{id:item.id,name:item.name,count: item.playCount}}">
            <img class="img-response" :src="item.picUrl">
            <div class="mv-name">{{item.name}}</div>
            <div class="mv-author">{{item.artistName}}</div>
            </router-link>
          </mu-flexbox-item>
        </mu-flexbox>
      </div>
      </div>
    </div>
</template>
<style lang="less" scoped>
  .img-response {
    max-width: 100%;
    height: auto;
  }
  .wrapper {
    padding: 0 5px;
  }
  // 通用的标题样式
  .g-title {
    padding-left: 25px;
    color: #333;
    height: 35px;
    line-height: 35px;
    font-size: 16px;
    a {
      float: right;
      font-size: 12px;
      color: #666;
    }
  }
  // banner样式
  .banner-item {
    width: 100%;
    height: 7.4rem;
    background: url('../../static/banner-item-load.png') no-repeat;
    background-size: cover;
  }
  .options{
    .el-button{
      margin: 8px 0 0 10px;
    }
    .button-name{
      overflow : hidden;
      font-size: 12px;
      height: 1.7rem;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      padding: 2px 0px 0px 18px;
      height: 20px;
    }
  }
  // 推荐歌单
  .song-list {
    background: url("../../static/aei.png") no-repeat left center;
    background-size: 20px 20px;
  }
  .item {
    position: relative;
    margin: 0 5px 5px 10px;
    height: 100%;
    a {
      color: rgba(0, 0, 0, 0.87);
    }
    .bar {
      position: absolute;
      top: 0;
      left: 0;
      color: #fff;
      width: 100%;
      text-align: right;
      padding: 2px 5px;
      background-color: rgba(0,0,0,.2);
    }

    &-img {
      min-width:5rem;
      min-height: 5rem;
    }

    &-img[lazy=loading] {
      background: url('../../static/default_cover.png') no-repeat;
      background-size: cover;
    }

    &-name {
      overflow : hidden;
      font-size: 12px;
      height: 1.7rem;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  .mv {
    background: url("../../static/aee.png") no-repeat left center;
    background-size: 20px 20px;
    &-name {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    &-item {
      position: relative;
      margin: 0 5px 5px 10px;
    }
    &-author {
      font-size: 12px;
      color: #666;
    }
  }
  .loading {
    position: absolute;
    top: 0;
    left: 50%;
    background: #fff;
    width: 2.5rem;
    height: 2.5rem;
    margin-top: 70%;
    margin-left: -1.25rem;
    background: url('../../static/rage_loading.png') no-repeat;
    background-size: cover;
    -webkit-animation: rotating 5s  linear infinite;
    animation: rotating 5s linear infinite;
  }
  .loading-txt {
    position: absolute;
    top:0;
    color: #4a4a4a;
    margin-top: 87%;
    width: 100%;
    text-align:center;
  }
  .mv-name {
    width: 100%;
    height: 21px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: black;
  }

  @keyframes rotating {
      0%{
        transform: rotate(0deg);
      }
      100%{
        transform: rotate(360deg);
      }
  }
</style>
<script>
import {mapState} from 'vuex'
import Request from '../api/request'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import api from '../api'
import MuFlexbox from 'muse-ui/src/flexbox/flexbox'
import MuFlexboxItem from 'muse-ui/src/flexbox/flexboxItem'
export default {
  data () {
    return {
      swiperOption: { // 轮播参数选项
        pagination: '.swiper-pagination',
        paginationClickable: true
      },
      isloading: true,
      bannerList: [],
      playList: [],
      mvList: []
    }
  },
  computed: {
    ...mapState(['DailySongList', 'userInfo'])
  },
  components: {
    MuFlexboxItem,
    MuFlexbox,
    swiper,
    swiperSlide
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData () {
      let personSongList = Request(api.getPersonalized())
      let bannerList = Request(api.getBannerList())
      let personMVList = Request(api.getPersonalizedMV())
      Promise.all([personSongList, bannerList, personMVList]).then(data => {
        this.playList = data[0].result.length > 6 && data[0].result.slice(0, 6)  // 从已有数组返回指定数组
        this.bannerList = data[1].banners
        this.mvList = data[2].result.length > 6 ? data[2].result.slice(0, 6) : data[2].result
        this.isloading = false
      })
    },
    getRecommend () {
      if (this.userInfo.code === 200) {
        this.$router.push('/recommend')
      } else {
        this.$message({
          type: 'warning',
          message: '只有登录才能享有'
        })
      }
    },
    goRankList () {
      this.$router.push('/rankList')
    },
    goDj () {
      this.$router.push('/userDj')
    }
  },
  filters: {
    formatCount (v) {
      if (v < 9999) {
        return v
      } else {
        return (v / 10000).toFixed(0) + '万'
      }
    }
  }
}
</script>
