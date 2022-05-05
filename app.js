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

    // 通过检查用户微信服务器的session是否有效来判断是否登录
    // 如果已经登录，根据本地储存的信息，设置全局变量，渲染页面
    wx.checkSession({
      success: (res) => {
        let oldValue = getApp().store.getState().user
        let newValue = wx.getStorageSync('user') || {}
        newValue['state'] = 1
        getApp().store.setState({
          user: utils.updateObject(oldValue, newValue)
        })
        // console.log(getApp().store.getState().user);
        // wx.getUserInfo({
        //   withCredentials: true,
        //   lang: "zh_CN",
        //   success: (res) => {
        //     console.log("success");
        //     data.token = wx.getStorageSync('accessToken')
        //     data.encryptedData = res.encryptedData
        //     data.iv = res.iv
        //   }
        // })
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  initUiGlobal(){
    const { statusBarHeight, screenHeight, screenWidth, windowWidth, windowHeight } = wx.getSystemInfoSync()
    const capsule = wx.getMenuButtonBoundingClientRect()
    //计算胶囊按钮的高度，作为头部内容区高度
    const CustomBarHeight = capsule.bottom + capsule.top - statusBarHeight
    store.setState({
      ui: {
        statusBarHeight,
        screenWidth,
        screenHeight,
        windowWidth,
        windowHeight,
        CustomBarHeight
      }
    })
  },
  globalData: {
    userInfo: null
  },
  store:store
})
