<template>
<!--  全局引入在App.vue-->
  <div class="foot">
    <div class="player-mini">
      <div class="mini-content">
        <audio :src="audio.location" @timeupdate="updateTime" @canplay="canPlaySong" @error="loadError" @ended="next" id="audioPlay" />

        <div class="cover" @click="showDetail">
          <mu-circular-progress v-show="loading" :size="30"/>
          <img class="xmplogo" :src="audio.albumPic + '?param=100y100'" v-show="!loading" :alt="audio.name">
        </div>
        <div class="info">
          <div class="name xmpname">{{audio.name}}</div>
          <div class="artist xmpartist">{{audio.singer}}</div>
        </div>
        <div class="control">
          <mu-icon-button class="mini-btn player-list" @click="showList"/>
          <mu-icon-button class="mini-btn player" :class="{pause: playing}" @click="toggleStatus"/>
          <mu-icon-button class="mini-btn next" @click="next"/>
        </div>
        <div class="pro">
          <div class="pro-load proload" :style="{'-webkit-transform':'translateX(' + prBufferedTime +'%)' }"></div>
          <div class="pro-play proplay" :style="{'-webkit-transform':'translateX(' + prCurrentTime +'%)' }"></div> </div>
      </div>
    </div>
    <BottomSheet ref="bottomSheet"></BottomSheet>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import BottomSheet from '../components/list'
export default {
  data () {
    return {
      loadedTime: 0,
      playerTime: 0
    }
  },
  components: {
    BottomSheet
  },
  methods: {
    showDetail () {
      this.$router.push({name: 'playerDetail', params: {id: this.audio.id}})
      this.$store.commit('toggleDetail')
    },
    showList () {
      this.$refs.bottomSheet.show()
    },
    ...mapMutations([
      'play',
      'pause',
      'playNext'
    ]),
    canPlaySong () {
      this.$store.commit('closeLoading')
      this.$store.commit('play')
      document.getElementById('audioPlay').play()
    },
    toggleStatus () {  // 播放按钮
      if (this.playing) {
        document.getElementById('audioPlay').pause()
        this.$store.commit('pause')
      } else {
        document.getElementById('audioPlay').play()
        this.$store.commit('play')
      }
    },
    // 文件加载出错
    loadError () {
      // 判断是第一次打开程序还是后来程序加载的路径有错根据src是否为空  currentSrc：熟悉返回当前音频/视频的 URL。
      if (document.getElementById('audioPlay').currentSrc) {
        // this.$refs.toast.show('歌曲路径加载出错')
        this.loading = false
        this.$store.commit('closeLoading')
      } else {
        console.log('APP 程序第一次加载')
      }
    },
    next () {
      this.toggleStatus()
      this.$store.commit('playNext')
    },
    // 更新进度条事件
    updateTime () {
      var vm = this
      var myaudio = document.getElementById('audioPlay')
      // currentTime 属性设置或返回音频/视频播放的当前位置（以秒计）。
      var time = parseInt(myaudio.currentTime)
      // 防止在未加载完成时，切歌出现的错误
      // Failed to execute 'end' on 'TimeRanges':
      // 由onprogress 更改为 onsuspend事件。参考：http://www.cnblogs.com/tianma3798/p/6038908.html
      myaudio.onsuspend = function () {  // onsuspend事件：在媒介数据完全加载之前不论何种原因终止取回媒介数据时运行的脚本。
        var timeRange = myaudio.buffered
        if (timeRange.length > 0 && myaudio.duration > 0) {
          // buffered 属性返回 TimeRanges 对象。
          // TimeRanges 对象表示音频的缓冲区间。
          // 缓冲范围指的是已缓冲音视频的时间范围。如果用户在音视频中跳跃播放，会得到多个缓冲范围。
          // start(index)  获得某个已缓冲范围的开始位置
          // end(index)  获得某个已缓冲范围的结束位置
          // 下面的代码表示触发mutation中的updateBufferedTime,给一个已经获得的最后缓存位置作为参数
          vm.$store.commit('updateBufferedTime', parseInt(myaudio.buffered.end(0)))
        }
      }
      // duration 属性返回当前音频的长度
      vm.$store.commit('updateDurationTime', parseInt(myaudio.duration))
      if (this.change) {  // 如果在时间轴上跳跃播放则触发setChange并且改变当前时间
        myaudio.currentTime = this.tmpCurrentTime
        this.$store.commit('setChange', false)
      } else {
        this.$store.commit('updateCurrentTime', time)
      }
    }
  },
  computed: {
    ...mapGetters([
      'djProgram',
      'audio',
      'change',
      'playing',
      'loading',
      'currentTime',
      'prBufferedTime',
      'tmpCurrentTime',
      'prCurrentTime'
    ])
  }
}
</script>
<style lang="less" scoped>
  @import "../assets/theme.less";
  .foot {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 998;
  }
  .player-mini {
    width: 100%;
    height: 2.3rem;
    position: relative;
    background-color: rgba(255,255,255,.9);
    color: #333333;
  }
  .player-mini .mini-content .cover {
    width: 2rem;
    height: 2rem;
    overflow: hidden;
    float: left;
    padding-left: 0.2rem;
    padding-top: 0.2rem;
    background: ur('../../static/player-bar.png') no-repeat;
    background-size: cover;
  }
  .player-mini .mini-content .cover img {
    width: 100%;
    height: 100%;
  }
  .player-mini .mini-content .info {
    overflow: hidden;
    position: relative;
    width: 7rem;
    float: left;
    padding-top: 0.2rem;
    padding-left: .3rem;
  }
  .player-mini .mini-content .info .name {
    font-size: .7rem;
    line-height: 1rem;
  }
  .player-mini .mini-content .info .name, .player-mini .mini-content .info .artist {
    overflow: hidden;
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .player-mini .mini-content .info .artist {
    color: #8a8a8a;
    font-size: .6rem;
  }
  .player-mini .mini-content .info .name, .player-mini .mini-content .info .artist {
    overflow: hidden;
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .player-mini .mini-content .info .xmpartist {

  }
  /*按钮*/
  .control {
    float: right;
  }
  .control .mini-btn {
    width: 2rem;
    height: 2rem;
  }
  .player-mini .mini-content .info .control {
    position: absolute;
    height: 100%;
    top: 50%;
    margin-top: -1rem;
    right: 0;
  }

  /*列表按钮*/
  .player-list {
    background: url("../../static/playbar_btn_playlist.png") no-repeat!important;
    background-size: cover!important;
  }
  .player {
    background: url("../../static/playbar_btn_play.png") no-repeat!important;
    background-size: cover!important;
  }
  .pause {
    background: url("../../static/playbar_btn_pause.png") no-repeat!important;
    background-size: cover!important;
  }
  .next {
    background: url("../../static/playbar_btn_next.png") no-repeat!important;
    background-size: cover!important;
  }


  /*进度条*/
  .player-mini .mini-content .pro {
    width: 100%;
    height: .1rem;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: rgba(255,255,255,.5);
  }
  .player-mini .mini-content .pro-load, .player-mini .mini-content .pro-play {
    width: 100%;
    height: .1rem;
    position: absolute;
    left: -100%;
  }
  .player-mini .mini-content .pro-load {
    background-color: rgba(220, 217, 217, 0.4);
  }
  .player-mini .mini-content .pro-play {
    background-color:  @primaryColor;
  }
  .songlist {
    height: 260px;
    overflow: auto;
  }
  .songlist-title {
    position: fixed;
    background: #fff;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgba(0,0,0,.12);
    text-align: center;
  }
</style>
