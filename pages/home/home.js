// pages/home/home.js
import utils from "../../utils/util"

const citySelector = requirePlugin('citySelector');
const app = getApp()

App.Page({

  /**
   * 页面的初始数据
   */
  useStore: true,
  data: {
    sacnCode: "扫码",
    isLoadingShow: false
  },

  // 隐藏加载框
  onHideLoading(){
    this.setData({
      isLoadingShow: false
    })
  },

  scanCodeEvent(){
    const that = this
    // 设置加载 页面
    this.setData({
      isLoadingShow: true
    })
    wx.scanCode({
      scanType: [],
      success: (result) => {
        // result: "9787560013473", scanType: "EAN_13", charSet: "ISO8859-1"
        // result: "/bookdrift/borrow?driftid=3", scanType: "QR_CODE", charSet: "ISO8859-1"
        console.log(result);
        // that.setData({
        //   sacnCode: result.result
        // })
        if(result.scanType == "QR_CODE"){// 转漂二维码
          wx.request({
            url: app.store.getState().settings.baseUrl + result.result,
            method: "POST",
            data:{
              userId: app.store.getState().user.userId
            },
            success: (res)=>{
              // console.log(res);
              if(res.statusCode == 200){
                // 成功后跳转页面
                wx.navigateTo({
                  url: '/pages/bookDetail/bookDetail',
                  // 可以从打开的页面触发
                  events: {},
                  success: function(pageres) {
                    // 触发打开的页面的方法
                    pageres.eventChannel.emit('acceptDataFromOpenerPage', res.data)
                  }
                })
              }
            },
            complete: (res)=>{
              this.onHideLoading()
            }
          })
        }
        else if(result.scanType == "EAN_13"){// ISBN码
          // request：根据识别的isbn请求书籍信息
          wx.request({
            url: app.store.getState().settings.baseUrl + '/book/findbook',
            method: 'POST',
            data: {
              isbn: result.result
            },
            success: (bookInfoRes) => {
              if(bookInfoRes.statusCode == 200){
                bookInfoRes = bookInfoRes.data.bookInfo
                if(bookInfoRes == null || bookInfoRes == {} ||  bookInfoRes == undefined){
                  wx.showToast({
                    title: '该书正在添加中！',
                    icon: 'error'
                  })
                }else{
                  // 成功后跳转页面
                  wx.navigateTo({
                    url: '/pages/scan/scan',
                    // 可以从打开的页面触发
                    events: {
                      // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
                      // acceptDataFromOpenedPage: function(data) {
                      //   console.log(data)
                      // },
                    },
                    success: function(res) {
                      // 触发打开的页面的方法
                      res.eventChannel.emit('acceptDataFromOpenerPage', bookInfoRes)
                    }
                  })
                }
              }else{
                wx.showToast({
                  title: '网络错误',
                  icon: 'error'
                })
              }
              this.onHideLoading()
            },
            fail: (res) => {
              this.onHideLoading()
              wx.showToast({
                title: '请检查网络！',
                icon: 'error'
              })
            }
          })
        }
        
      },
      fail: (res) => {
      },
      complete: (res) => {
      },
    })
  },

  goUserLibrary(){
    // 判断登录状态
    if(app.store.getState().user.state == 0){

      this.gobalGetUserInfo(()=>{
        wx.navigateTo({
          url: '/pages/profile/profile',
          
        })
      })
      
    }else{
      wx.navigateTo({
        url: '/pages/profile/profile',
      })
    }
  },

  getUserProfile(e){
    // 判断登录状态
    if(app.store.getState().user.state == 0){
      this.gobalGetUserInfo()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.store.setState({
      // currentPage: getCurrentPageUrl()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const selectedCity = citySelector.getCity(); // 选择城市后返回城市信息对象，若未选择返回null
    console.log(selectedCity);
    if(selectedCity != null){
      app.store.setState({
        ["user.province"]: selectedCity.name
      })
      console.log(app.store.getState());
      if(app.store.getState().user.state){
        wx.request({
          url: app.store.getState().settings.baseUrl + '/user/updateaddress',
          method: 'POST',
          data: utils.updateObject(selectedCity, {accessToken: wx.getStorageSync('accessToken')}),
          success: (res) => {
          }
        })
      }
    }
    // wx.showToast({
    //   title: app.store.getState().map.userMapInfo.name
    // })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // 页面卸载时清空插件数据，防止再次进入页面，getCity返回的是上次的结果
    citySelector.clearCity();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})