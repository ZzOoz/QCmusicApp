import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import api from '../api'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {},
    DailySongList: {},
    audio: {
      'id': 0,
      'name': '歌曲名称',
      'singer': '演唱者',
      'albumPic': '../static/placeholder_disk_play_program.png',
      'location': '',
      'album': ''
    }, // 当前播放歌曲对象信息
    lyric: '',
    currentIndex: 0, // 当前播放的歌曲位置
    playing: false, // 是否正在播放
    loading: false, // 是否正在加载中
    showDetail: false,
    songList: [],    // 播放列表
    currentTime: 0, // 当前时间
    tmpCurrentTime: 0,  // 跳跃当前时间
    durationTime: 0, // 音频长度
    bufferedTime: 0, // 缓存时间
    change: false   // 判断是更改的时间还是播放的时间
  },

// 类似与计算属性，只有当state发生改变后才会重新计算
  getters: {
    userInfo: state => state.userInfo,
    djProgram: state => state.djProgram,
    DailySongList: state => state.DailySongList,
    mv: state => state.mv,
    audio: state => state.audio,
    playing: state => state.playing,
    loading: state => state.loading,
    showDetail: state => state.showDetail,
    durationTime: state => state.durationTime,
    currentIndex: state => state.currentIndex,
    bufferedTime: state => state.bufferedTime,
    tmpCurrentTime: state => state.tmpCurrentTime,
    songList: state => state.songList,
    change: state => state.change,
    currentTime: state => state.currentTime,
    prCurrentTime: state => {
      return state.currentTime / state.durationTime * 100
    },
    prBufferedTime: state => {
      return state.bufferedTime / state.durationTime * 100
    }
  },
  mutations: {
    recordUserInfo (state, {userInfo}) {  // 记录用户数据
      state.userInfo = userInfo
    },
    DailySongList (state, {DailySongList}) {
      state.DailySongList = DailySongList
    },
    play (state) {
      state.playing = true
    },
    pause (state) {
      state.playing = false
    },
    toggleDetail (state) {
      state.showDetail = !state.showDetail
    },
    setAudio (state) {
      state.audio = state.songList[state.currentIndex - 1]
    },
    setDj (state) {
      state.Dj = state.songList[state.currentIndex - 1]
    },
    setAudioIndex (state, index) {
      state.audio = state.songList[index]
      state.currentIndex = index + 1
    },
    removeAudio (state, index) {
      state.songList.splice(index, 1)  // 删除本条歌曲
      console.log(index)
      if (index === state.songList.length) {
        index--
        console.log(index)
      }
      state.audio = state.songList[index]
      console.log(state.audio)
      state.currentIndex = index + 1
      if (state.songList.length === 0) {
        state.audio = {
          'id': 0,
          'name': '歌曲名称',
          'singer': '演唱者',
          'albumPic': '/static/player-bar.png',
          'location': '',
          'album': ''
        }
        state.playing = false
      }
    },
    setChange (state, flag) {
      state.change = flag
    },
    setLocation (state, location) {
      state.audio.location = location
    },
    setDjLocation (state, location) {
      state.djProgram.location = location
    },
    updateCurrentTime (state, time) {
      state.currentTime = time
    },
    updateDurationTime (state, time) {
      state.durationTime = time
    },
    updateBufferedTime (state, time) {
      state.bufferedTime = time
    },
    changeTime (state, time) {
      state.tmpCurrentTime = time
    },
    openLoading (state) {
      state.loading = true
    },
    closeLoading (state) {
      state.loading = false
    },
    resetAudio (state) {
      state.currentTime = 0
    },
    playNext (state) { // 播放下一曲
      state.currentIndex++
      if (state.currentIndex > state.songList.length) { // 当下标超出歌曲列表的时候会回到第一首
        state.currentIndex = 1
      }
      state.audio = state.songList[state.currentIndex - 1]
    },
    playPrev (state) { // 播放上一曲
      state.currentIndex--
      if (state.currentIndex < 1) { // 当下标在第一首的时候再次点击上一首歌会到达列表中最后一首歌曲的位置
        state.currentIndex = state.songList.length
      }
      state.audio = state.songList[state.currentIndex - 1]
    },
    addToList (state, songs) {
      var items = Array.prototype.concat.call(songs)  // 合并歌曲数组，改变指向
      items.forEach(item => {
        var flag = false
        state.songList.forEach(function (element, index) { // 检测歌曲重复
          if (element.id === item.id) {  // 如果重复了就将当前的播放的歌曲位置currentIndex加1跳过
            flag = true
            state.currentIndex = index + 1
          }
        })
        if (!flag) {  // 如果不充分则push
          state.songList.push(item)
          state.currentIndex = state.songList.length
        }
      })
    },
    setLrc (state, lrc) {
      state.lyric = lrc
    }
  },
  // 异步的数据操作
  actions: {
    // 获取用户信息
    // getPhoneUserInfo: function ({commit, state}, {phone, password}) {
    //   Axios.get(api.phoneLogin({phone, password})).then((data) => {
    //     const userInfo = data
    //     commit('recordUserInfo', {userInfo})
    //   }).catch((error) => {
    //     if (error.response) {
    //       // The request was made and the server responded with a status code
    //       // that falls out of the range of 2xx
    //       // console.log(error.response.data)
    //       // console.log(error.response.status)
    //       // console.log(error.response.headers)
    //       if (error.response.status === 502) {
    //         window.alert('密码错误')
    //       } else if (error.response.status === 501) {
    //         window.alert('账号错误')
    //       } else {
    //         window.alert('404请求出错')
    //       }
    //     } else if (error.request) {
    //       // The request was made but no response was received
    //       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //       // http.ClientRequest in node.js
    //       console.log(error.request)
    //     } else {
    //       // Something happened in setting up the request that triggered an Error
    //       console.log('Error', error.message)
    //     }
    //     console.log(error.config)
    //   })
    // },
    getPhoneUserInfo: function ({commit, state}, {phone, password}) {
      Axios.post(api.phoneLogin2(), {phone: phone, password: password}).then((data) => {
        console.log('post请求成功')
        const userInfo = data
        commit('recordUserInfo', {userInfo})
      }).catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          // console.log(error.response.data)
          // console.log(error.response.status)
          // console.log(error.response.headers)
          if (error.response.status === 502) {
            window.alert('密码错误')
          } else if (error.response.status === 501) {
            window.alert('账号错误')
          } else {
            window.alert('404请求出错')
          }
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
        }
        console.log(error.config)
      })
    },
    getSong ({commit, state}, id) { // 拿到歌曲的信息 主要是地址进行播放
      // 使用 CancelToken 退出一个Axios事件，当歌曲被选择时请求还没有得到响应时切换下一首歌曲时触发
      var CancelToken = Axios.CancelToken
      var source = CancelToken.source()
      if (state.loading && state.songList.length > 0) {  // 第一次无法触发if语句 只有当commit('openLoading')之后没有及时响应数据再次点击歌曲后才会触发
        console.log('cancel')
        source.cancel()
      }
      commit('openLoading')
      Axios.get(api.getSong(id)).then(data => {
        // 统一数据模型，方便后台接口的改变
        var url = data.data[0].url
        commit('setAudio')
        commit('setLocation', url)  // 传一个url给location
      })
      .catch((error) => {     // 错误处理
        console.log(error)
        window.alert('获取歌曲信息出错！')
      })
    },
    getDj ({commit, state}, id) {
      var CancelToken = Axios.CancelToken
      var source = CancelToken.source()
      if (state.loading && state.songList.length > 0) {
        console.log('cancel')
        source.cancel()
      }
      commit('openLoading')
      Axios.get(api.getDj(id)).then((data) => {
        var Djurl = data.data[0].url
        commit('setAudio')
        commit('setLocation', Djurl)  // 传一个url给location
      }).catch((error) => {
        console.log(error)
      })
    },
    getDailyRecommendSong ({commit, state}) {
      Axios.get(api.getDailyRecommendSong()).then((data) => {
        const DailySongList = data.recommend
        commit('DailySongList', {DailySongList})
      })
    }
  }
})
export default store
