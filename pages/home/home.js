// pages/home/home.js
const citySelector = requirePlugin('citySelector');
const app = getApp()

App.Page({

  /**
   * 页面的初始数据
   */
  data: {
    sacnCode: "扫码"
  },

  scanCodeEvent(){
    const that = this
    wx.scanCode({
      scanType: [],
      success: (result) => {
        console.log(result);
        // that.setData({
        //   sacnCode: result.result
        // })
        wx.navigateTo({
          url: '/pages/scan/scan',
          events: {
            // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
            acceptDataFromOpenedPage: function(data) {
              console.log(data)
            },
          },
          success: function(res) {
            res.eventChannel.emit('acceptDataFromOpenerPage', {data: result.result})
          }
        })
      },
      fail: (res) => {},
      complete: (res) => {},
    })
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
    // console.log(selectedCity);
    app.store.setState({
      ["state.map.userMapInfo"]: selectedCity
    })
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