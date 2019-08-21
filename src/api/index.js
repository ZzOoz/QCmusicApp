const _baseUrl = 'http://localhost:3000'
const _baseUrl2 = 'https://api.imjad.cn/cloudmusic/'
export default {
  /***
   * 手机登录
   */
  phoneLogin ({phone, password}) {
    return `${_baseUrl}/login/cellphone?phone=${phone}&password=${password}`
  },
  /**
   * 获取首页Banner图片数据
   */
  getBannerList () {
    return `${_baseUrl}/banner`
  },
  /**
   * 获取推荐歌单
   */
  getPersonalized () {
    return `${_baseUrl}/personalized`
  },
  /**
   * 获取推荐 mv
   */
  getPersonalizedMV () {
    return `${_baseUrl}/personalized/mv`
  },
  /***
   * 获取相关mv
   */
  getRelateMv (id) {
    return `${_baseUrl}/related/allvideo?id=${id}`
  },
  /**
    获取最新mv
   **/
  getNewMv (limit) {
    return `${_baseUrl}/mv/first/limit=${limit}`
  },
  /**
   *
   * @param {*} cat
   * @param {*} order
   * @param {*} offset
   * @param {*} total
   * @param {*} limit
   */
  getPlayListByWhere (offset, limit) {
    return `${_baseUrl}/top/playlist?limit=${limit}&order=hot&offset=${offset}`
  },
  /**
   * 获取歌词API
   * @param {Number} id
   */
  getLrc (id) {
    return `${_baseUrl}/lyric?id=${id}`
  },
  /**
   * 获取歌曲 播放URL
   * @param {Number} id
   */
  getSong (id) {
    return `${_baseUrl}/song/url?id=${id}`
  },
  /***
   * 获取每日推荐歌曲
   * 需要登录
   */
  getDailyRecommendSong () {
    return `${_baseUrl}/recommend/songs`
  },
  /**
   * 获取歌单详情
   * @param {Number} id
   */
  getPlayListDetail (id) {
    return `${_baseUrl}/playlist/detail?id=${id}`
  },
  /***
   * 搜索列表
   */
  getSearch (keywords) {
    return `${_baseUrl}/search?keywords=${keywords}`
  },
  /***
   * 获取排行榜排名信息
   */
  getRankList () {
    return `${_baseUrl}/toplist`
  },
  /***
   * 获取单个排行榜榜单信息
   *
   */
  getRankListDetail (idx) {
    return `${_baseUrl}/top/list?idx=${idx}`
  },
  /***
   * 热搜列表
   * @param id
   * @returns {string}
   */
  getHotSearchList () {
    return `${_baseUrl}/search/hot/detail`
  },
  getMv (id) {
    return _baseUrl2 + '?type=mv&id=' + id
  },
  /**
   * 获取mv排行
   */
  getMvList (limit) {
    return `${_baseUrl}/top/mv?limit=${limit}`
  },
  /***
   * 获取mv地址
   */
  getMvDate (mvid) {
    return `${_baseUrl}/mv/url?id=${mvid}`
  },
  /***
   * 获取单个电台中的节目
   */
  getDj (id) {
    return `${_baseUrl}/song/url?id=${id}`
  },
  /**
   * 获取电台今日优选
   */
  getDjDaildyPrefect () {
    return `${_baseUrl}/dj/today/perfered`
  },
  /***
   *获取电台推荐
   */
  getRecommendDj () {
    return `${_baseUrl}/dj/recommend`
  },
  /***
   *获取电台分类
   */
  getCateListDj () {
    return `${_baseUrl}/dj/catelist`
  },
  /**
   *获取电台订阅
   */
  getCateListRecommendDj (type) {
    return `${_baseUrl}/dj/recommend/type${type}`
  },
  /**
   * 获取电台付费精选
   */
  getPayDjInfo (limit, offset) {
    return `${_baseUrl}/dj/paygift?limit=${limit}&offset=${offset}`
  },
  /**
   * 获取电台详情
   */
  getDjDetail (rid) {
    return `${_baseUrl}/dj/detail?rid=${rid}`
  },
  /**
   *获取热门歌手列表
   */
  getHotSingerList (limit) {
    return `${_baseUrl}/top/artists?offset=0&limit=${limit}`
  },
  /**
   *获取歌手单曲
   */
  getSingerSong (sinngerId) {
    return `${_baseUrl}/artists?id=${sinngerId}`
  },
  search (words) {
    return _baseUrl2 + '?type=search&s=' + words
  }
}
