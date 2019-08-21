<template>
    <div class="rank">
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

      <div class="title">官方榜</div>
        <mu-circular-progress :size="40" class="center" v-if="isLoading"/>
      <div class="rankList_content">
        <ul class="rankList_ui">
            <router-link :to="{name:'',params:{}}" tag="li" v-for="(item,index) in rankList" :key="index" class="item">
              <div>
                  <img :src="item.coverImgUrl">
              </div>
              <div class="description">
                <span class="name">{{item.name}}</span>
                <el-link  class="little_description">{{item.description}}</el-link>
                <el-link  class="update" type="warning">{{item.updateFrequency}}</el-link>
              </div>
            </router-link>
          <mu-divider inset></mu-divider>
        </ul>
      </div>
    </div>
</template>

<style lang="stylus" scoped>
  .center {
    display: block!important;
    margin: 10% auto 0;
  }
  .rank
    .title
      padding: .2rem 0 0 .3rem;
      margin: 0.4rem;
      border-left: 8px solid #27df98;
  .rankList_content
      position relative
      top: 10px;
      .rankList_ui
        padding-left: 10px
      .item
        list-style-type none
        display flex
        .description
          display flex
          flex-direction column
          margin-left: 6px
          .name
            font-size 18px;
            margin-bottom: 30px;
          .el-link
            text-decoration none
          .little_description
            font-size 12px
            text-decoration none
          .update
            justify-content right
            text-decoration none

    img
        width 150px
</style>

<script>
  import Axios from 'axios'
  import api from '../api'
  export default {
    name: 'rankList',
    components: {},
    data () {
      return {
        rankList: [], // 排行榜信息
        isLoading: false,
        rankListDetail: [] // 排行榜详细信息
      }
    },
    // beforeRouteEnter (to, from, next) {
    //   next(vm => {
    //     if (!vm.rankList) {
    //       vm.getRankList()
    //       vm.getRankListDetail()
    //     }
    //   })
    // },
    mounted () {
      this.getRankList()
      this.getRankListDetail()
    },
    methods: {
      getRankListDetail () {
        for (let i = 0; i < 10; i++) {
          Axios.get(api.getRankListDetail(i)).then((data) => {
            const listDetail = data.playlist
            this.rankListDetail.push(listDetail[i])
          })
        }
      },
      getRankList () {
        this.isLoading = true
        Axios.get(api.getRankList()).then((data) => {
          console.log(data)
          const list = data.list
          for (let i = 0; i < 10; i++) {
            this.rankList.push(list[i])
          }
          this.isLoading = false
          console.log(this.rankList)
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


