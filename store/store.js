const Store = require('wxministore');

let store = new Store({
  state: {
    //以下为自定义的全局状态，用法和页面中的data: {...} 一致。
    ui:{},//在app.js里面设置
    map:{
      setting: {//地图配置
        key: 'WMWBZ-N2OKX-LZM4N-7D5H6-RV2OV-EUFNG', // 使用在腾讯位置服务申请的key
        referer: 'wechat_map', // 调用插件的app的名称
        hotCitys: '' // 用户自定义的的热门城市
      },
      userMapInfo:{
        id: '',
        name: '泰州',
        fullname: '',
        pinyin: [],
        location: {}
      }
    },
    msg: 'Mini Store 是一个基于微信小程序的全局状态库。\n能够在Page，Component，template中任意wxml文件内使用全局状态。\n且全局的状态完全同步。',
    user: {
      state: 0, // 0 未登录 1 已登录
      name: 'Leisure',
      avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
    },
    currentPage: "",
    settings:{
      baseUrl: "http://127.0.0.1:5000"
    }
  },
  methods: {
    goAnyWhere(e) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    },
    gobalLogin(){
      wx.login({
        success: (loginRes) => {
          // wx.login 根据code 换取 openid 和 session_key
          wx.request({
            url: getApp().store.getState().settings.baseUrl + '/user/login',
            method: "POST",
            data: loginRes,
            success:(res) => {
              wx.setStorageSync('accessToken', res.data.accessToken)
            }
          })
        }
      })
    }
  },
  pageListener: {
    onLoad(options) {
      // store.setState({
      //   currentPage: this.route
      // })
      // console.log('我在' + this.route, '参数为', options);
      // console.log(this.currentPage);
    },
    onHide() {
      console.log('onHide')
    },
    onShareAppMessage(res) {
      return {
        title: '全局分享',
        path: '/index/index?id=123'
      }
    }
  },
  // 开启了局部模式
  openPart: true
})

export default store