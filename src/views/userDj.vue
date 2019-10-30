<template>
  <div class="Dj">
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

    <mu-circular-progress :size="40" class="center" v-if="isLoading"/>
    <div class="Dj_slider" ref="Dj">
    <div id="slider">
      <swiper :options="swiperOption">
        <swiper-slide v-for="item in bannerList" :key="item.imageUrl"><img :src="item.imageUrl" class="banner-item"  alt=""></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="options" v-if="show_title">
      <div>
      <el-button  icon="el-icon-menu" circle plain type="success" ></el-button>
        <span style="display: block">电台分类</span>
      </div>
      <div>
        <el-button  icon="el-icon-tickets" circle plain type="success"></el-button>
        <span style="display: block">电台排行</span>
      </div>
      <div>
        <el-button  icon="el-icon-present" circle plain type="success"></el-button>
        <span style="display: block">付费精品</span>
      </div>
      <div>
        <el-button  icon="el-icon-star-off" circle plain type="success"></el-button>
        <span style="display: block">音乐课堂</span>
      </div>
    </div>
    <mu-divider v-if="show_title"></mu-divider>

    <div class="Dj_content">
      <div class="recommend">
        <div class="title" v-if="show_title">推荐电台<router-link :to="{path: ''}" class="more">更多></router-link></div>
        <mu-flexbox wrap="wrap" justify="space-around">
          <mu-flexbox-item basis="30%" v-for="(item,index) in djRecommendList" :key="index" class="recommend_item">
             <router-link :to="{name:'djDetail',params:{id:item.id,pic:item.picUrl,desc:item.desc,recmdText:item.recmdText,name:item.name,category:item.category}}">
               <img :src="item.picUrl" style="width: 100%;height: 119px">
               <div>{{item.name}}</div>
             </router-link>
          </mu-flexbox-item>
        </mu-flexbox>
      </div>

      <div class="payGift">
        <div class="title" v-if="show_title">付费电台<router-link :to="{path: ''}" class="more">更多></router-link></div>
        <mu-flexbox wrap="wrap" justify="space-around">
          <mu-flexbox-item basis="30%" v-for="(item,index) in djPayList" :key="index" class="payGift_item">
            <router-link :to="{name:'djDetail',params:{id:item.id,name:item.name,picUrl:item.picUrl,rcmdText:item.rcmdText}}">
              <img :src="item.picUrl" style="width: 100%;height: 119px">
              <div>{{item.name}}</div>
            </router-link>
          </mu-flexbox-item>
        </mu-flexbox>
      </div>
      <div class="dailyList">
        <div class="title" v-if="show_title">今日优选<router-link :to="{path: ''}" class="more">更多></router-link></div>
        <mu-flexbox wrap="wrap" justify="space-around">
          <mu-flexbox-item basis="30%" v-for="(item,index) in djDaildy" :key="index" class="dailyList_item">
            <router-link :to="{name:'djDetail',params:{id:item.id,name:item.name,picUrl:item.picUrl,rcmdText:item.rcmdText}}">
              <img :src="item.picUrl" style="width: 100%;height: 119px">
              <div>{{item.name}}</div>
            </router-link>
          </mu-flexbox-item>
        </mu-flexbox>
      </div>

    </div>
  </div>
 </div>
</template>

<script>
  import api from '../api'
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import {mapState} from 'vuex'
  import MuFlexboxItem from 'muse-ui/src/flexbox/flexboxItem'
  import MuFlexbox from 'muse-ui/src/flexbox/flexbox'
  import Request from '../api/request'

  export default {
    name: 'userDj',
    components: {
      MuFlexbox,
      MuFlexboxItem,
      swiper,
      swiperSlide
    },
    data () {
      return {
        swiperOption: { // 轮播参数选项
          pagination: '.swiper-pagination',
          paginationClickable: true
        },
        djRecommendList: [],
        djDaildy: [],
        djPayList: [],
        bannerList: [],
        scroll: '',
        isLoading: false,
        show_title: false
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    updated () {
    },
    mounted () {
      this.loadDjInfo()
    },
    methods: {
      loadDjInfo () {
        this.isLoading = true
        let Banner = Request(api.getBannerList())
        let DjRecommend = Request(api.getRecommendDj())
        let DjDaildy = Request(api.getDjDaildyPrefect())
        let DjPay = Request(api.getPayDjInfo(6, 0))
        Promise.all([Banner, DjRecommend, DjDaildy, DjPay]).then((data) => {
          this.bannerList = data[0].banners
          this.djRecommendList = data[1].djRadios.length > 6 ? data[1].djRadios.splice(0, 6) : data[1].djRadios
          this.djDaildy = data[2].data.length > 6 ? data[2].data.splice(0, 6) : data[2].data
          this.djPayList = data[3].data.list.length > 6 ? data[3].data.list.splice(0, 6) : data[3].data.list
          this.isLoading = false
          this.show_title = true
        })
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
  .Dj
    width: 100%;
    .center
      display: block!important;
      margin: 10% auto 0;
    .banner-item
      width: 100%;
      height: 7.4rem;
      background: url('../../static/banner-item-load.png') no-repeat;
      background-size: cover;
    .options
      text-align: center;
      margin: 15px 0px;
      div
        width 20%
        display inline-block
        margin-right: 5px;
        font-size: 12px;
        span
          padding-top:5px
    .Dj_content
      .recommend
        .recommend_item
          height 166px
          margin-left 8px!important
          margin-right 4px!important
      .payGift
        .payGift_item
          height 166px
          margin-left 8px!important
          margin-right 4px!important
      .dailyList
        .dailyList_item
          height 166px
          margin-left 8px!important
          margin-right 4px!important
      .title
        margin: .5rem;
        padding-left: 0.5rem;
        border-left: 4px solid #27df98
        .more
          float: right;
          font-size: 13px;
          margin-top: 4px;
          color: gray
</style>
