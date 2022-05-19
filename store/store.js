import utils from "../utils/util"
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
      userId: -1,
      state: 0, // 0 未登录 1 已登录
      nickName: 'Leisure',
      avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
      libraryBooks: 0,
      driftBooks: 0,
      pickBooks: 0,
      warnBooks: 0,
      province: "请登录"
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
      console.log('登录');
      wx.login({
        success: (res) => {
          // wx.login 根据code 换取 openid 和 session_key
          wx.request({
            url: getApp().store.getState().settings.baseUrl + '/user/login',
            method: "POST",
            data: res,
            success:(loginRes) => {
              wx.setStorageSync('accessToken', loginRes.data.accessToken)
              let oldValue = getApp().store.getState().user
              let newValue = wx.getStorageSync('user') || {}
              getApp().store.setState({
                user: utils.updateObject(oldValue, newValue)
              })
            }
          })
        }
      })
    },
    gobalGetUserInfo(func=()=>{}){
      this.gobalLogin()
      console.log('获取信息');
      wx.getUserProfile({
        lang: "zh_CN",
        desc: "test",
        success: (res) => {
          let data = {}
          data.accessToken = wx.getStorageSync('accessToken')
          data.encryptedData = res.encryptedData
          data.iv = res.iv
          console.log(data);
          // 获取用户信息
          wx.request({
            url: getApp().store.getState().settings.baseUrl + '/user/getuserprofile',
            method: "POST",
            data: data,
            success:(profileRes) => {
              if(profileRes.statusCode == 200){
                getApp().store.setState({
                  user: utils.updateObject(getApp().store.getState().user, profileRes.data.userinfo)
                })
                // console.log(getApp().store.getState().user);
                wx.setStorageSync("user", getApp().store.getState().user)
                getApp().store.setState({
                  ['user.state']: 1
                })
                func()
              }else{
                wx.showToast({
                  title: '出现错误惹！',
                  icon: 'error'
                })
              }
            }
          })
        },
        fail: (res) => {
          console.log(res);
          wx.showToast({
            title: '请先登录！',
            icon: 'error'
          })
        },
        complete: (res) => {},
      })
      
    },
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