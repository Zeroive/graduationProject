// app.js
import store from "./store/store"
import utils from "./utils/util"

App({
  onLaunch() {
    const that = this
    let data = {}
    this.initUiGlobal()
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log(wx.getStorageSync('user'));
    // console.log(wx.getStorageSync('accessToken'));
    // console.log(wx.getStorageSync('map'));
    // 通过检查用户微信服务器的session是否有效来判断是否登录
    // 如果已经登录，根据本地储存的信息，设置全局变量，渲染页面
    // wx.login({
    //   success: (res) => {
    //     wx.request({
    //       url: getApp().store.getState().settings.baseUrl + '/user/login',
    //       method: "POST",
    //       data: res,
    //       success: (loginRes)=>{
    //         console.log(loginRes);
    //         wx.setStorageSync('accessToken', loginRes.data.accessToken)
    //         let oldValue = getApp().store.getState().user
    //         let newValue = wx.getStorageSync('user') || {}
    //         getApp().store.setState({
    //           user: utils.updateObject(oldValue, newValue)
    //         })
    //       }
    //     })
    //   }
    // })
    // wx.checkSession({
    //   success: (res) => {
        
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // });
  },
  initUiGlobal(){
    const { statusBarHeight, screenHeight, screenWidth, windowWidth, windowHeight, } = wx.getSystemInfoSync()
    const capsule = wx.getMenuButtonBoundingClientRect()
    // 导航栏高度
    const navigationBarHeight = capsule.height + (capsule.top - statusBarHeight) * 2
    // 总体高度
    const navHeight = navigationBarHeight + statusBarHeight
    //计算胶囊按钮的高度，作为头部内容区高度, 总体高度
    const CustomBarHeight = capsule.bottom + capsule.top - statusBarHeight
    store.setState({
      ui: {
        statusBarHeight,
        screenWidth,
        screenHeight,
        windowWidth,
        windowHeight,
        CustomBarHeight,
        navigationBarHeight,
        navHeight
      }
    })
  },
  globalData: {
    userInfo: null
  },
  store:store
})
