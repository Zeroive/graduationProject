// app.js
import store from "./store/store"

App({
  onLaunch() {
    this.initUiGlobal()
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
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
