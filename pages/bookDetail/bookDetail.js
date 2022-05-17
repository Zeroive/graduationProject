// pages/bookDetail/bookDetail.js
const app = getApp()

App.Page({

  useStore: true,
  /**
   * 页面的初始数据
   */
  data: {
    bookInfo:{
      author: "亚历山大 (L.G. Alexander)",
      bookId: 525148,
      bookName: "朗文外研社-新概念英语2新版",
      borrowerAvatarUrl: null,
      borrowerId: -1,
      borrowerName: null,
      charge: "免费",
      createTime: "2022-05-16 22:20:36",
      driftId: 38,
      driftTime: "一季度",
      lenderAvatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/8O7wCx1X6Whpk5CWDmyUstgJCicHTOn2MfHy6nvAR6FchO0ib9onlQwibKlTMDzB2icDvdI10bqSiaqRibnqMgFBMziaw/132",
      lenderId: 1,
      lenderName: "╰⋛⋋⊱⋋⋌⊰⋌⋚╯",
      newold: "旧",
      note: "无",
      ownerId: 1,
      price: "38.9",
      publisher: "外语教学与研究出版社",
      state: 0,
      thumbUrl: "http://image31.bookschina.com/2009/20091104/B2898616.jpg",
      libraryName: "个人图书馆",
      borrowerAvatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/8O7wCx1X6Whpk5CWDmyUstgJCicHTOn2MfHy6nvAR6FchO0ib9onlQwibKlTMDzB2icDvdI10bqSiaqRibnqMgFBMziaw/132"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that = this
    const eventChannel = this.getOpenerEventChannel()
    if(eventChannel.on){
      eventChannel.on('acceptDataFromOpenerPage', function(data) {
        // console.log(data)
        that.setData({
          bookInfo: data
        })
      })
    }
  },

  onClickCancel(){
    wx.navigateBack()
  },

  onAcceptDrift(){
    if(app.store.getState().user.state == 0){
      this.gobalGetUserInfo()
    }
    else{
      wx.request({
        url: app.store.getState().settings.baseUrl+'/bookdrift/borrow',
        method: 'POST',
        data:{
          userId: app.store.getState().user.userId,
          driftId: this.data.bookInfo.driftId
        },
        success: (res) => {
          if(res.statusCode == 200){
            wx.navigateBack()
            wx.showToast({
              title: '成功捞起',
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})