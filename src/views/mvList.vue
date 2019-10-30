<template>
    <div class="warpper mv">
      <div class="content">
        <div class="title">Mv推荐</div>
        <mu-circular-progress :size="20" class="center" v-if="isloading"/>
        <mu-flexbox wrap="wrap" justify="space-around" class="box" :gutter="0">
            <mu-flexbox-item basis="100%" class="list-item" v-for="(item,index) in mvListInfo" :key="index">
              <router-link :to="{name:'mvDetail',params:{id:item.id,name:item.name,playCount:item.playCount,cover:item.cover,artistName:item.artistName}}">
                <div class="list-bar">{{item.playCount}}</div>
                <img class="list-img" :src="item.cover">
                <div class="list-name">{{item.name}} ----{{item.artistName}}</div>
              </router-link>
            </mu-flexbox-item>
          </mu-flexbox>
        </div>
    </div>
</template>
<style lang="less" scoped>
  @import "../assets/theme.less";
  .title {
    margin: .2rem 0 .3rem .4rem;
    padding-left: .2rem;
    border-left: .15rem solid @primaryColor;
  }
  .center {
    display: block!important;
    margin: 10% auto 0;
  }
  .list {
    &-bar {
       position: absolute;
       top: 0;
       left: 0;
       color: #fff;
       width: 100%;
       text-align: right;
       padding: 2px 5px;
       background-color: rgba(0,0,0,.2);
     }
    &-item {
       position: relative;
       margin: 0 5px 5px 10px;
    a {
      color:rgba(0,0,0,.87);
    }
    }
    &-img {
       width:100%;

     }
    &-img[lazy=loading] {
       background: url('../../static/default_cover.png') no-repeat;
       background-size: cover;
     }

    &-name {
       overflow: hidden;
       text-overflow: ellipsis;
       display: -webkit-box;
       -webkit-line-clamp: 1;
       -webkit-box-orient: vertical;
     }
  }

</style>
<script>
import Request from '../api/request'
import api from '../api'
import MuFlexbox from 'muse-ui/src/flexbox/flexbox'
import MuFlexboxItem from 'muse-ui/src/flexbox/flexboxItem'
export default {
  name: 'mvList',
  components: {MuFlexboxItem, MuFlexbox},
  data () {
    return {
      mvListInfo: [],
      loading: false, // 滚动标志
      scroller: null,
      isloading: false
    }
  },
  // beforeRouteEnter (to, from, next) {
  //   next(vm => {
  //     vm.getMvInfo()
  //   })
  // },
  created () {
    this.getMvInfo()
  },
  // mounted () {
  //   this.scroller = this.$el
  // },
  methods: {
    getMvInfo () {
      this.isloading = true  // isloading
      Request(api.getNewMv(30)).then((data) => {
        console.log(data)
        var list = data.data
        for (let i = 0; i < list.length; i++) {
          this.mvListInfo.push(list[i])
        }
        this.isloading = false
      })
    }
    // loadMore () {
    //   this.getMvInfo()
    // }
  },
  filters: {
    formatCount (time) {
      if (time < 100000) {
        return time
      } else {
        return (time / 10000).toFixed(0) + '万'
      }
    }
  }
}
</script>
