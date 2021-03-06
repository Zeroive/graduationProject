// pages/scan/scan.js
// import { getCurrentPageUrl } from "../../utils/util"
const app = getApp()
App.Page({

  /**
   * 页面的初始数据
   */
  useStore: true,
  data: {
    bookISBN: "9787560013473",
    bookInfo: {
      name: "Spring实战-(第4版)",
      thumbUrl: "https://image12.bookschina.com/2016/20160531/s7146469.jpg",
      author: "沃尔斯",
      publisher: "人民邮电出版社",
      price: "69"
    },
    bookDrift:{
      popupShow: false,
      base64img: ""
    }
  },

  onHidePopup(){
    console.log(111);
    this.setData({
      bookDrift:{
        ['bookDrift.popupShow']: false
      }
    })
  },

  onAddBookCollection(){
    if(app.store.getState().user.state){
      wx.showModal({
        title: "是否加入馆藏？",
        success: (res) => {
          if(res.confirm == true){
            // 点击确认
            wx.request({
              url: app.store.getState().settings.baseUrl + "/bookcollection/addbookcollection",
              method: "POST",
              data:{
                userId: app.store.getState().user.userId,
                bookId: this.data.bookInfo.bookId
              },
              success: (collectionRes)=>{
                if(collectionRes.statusCode == 200){
                  wx.showToast({
                    title: '成功加入馆藏！',
                    icon: 'success'
                  })
                }else{
                  wx.showToast({
                    title: '出现错误惹！',
                    icon: 'error'
                  })
                }
              }
            })
          }else if(res.cancel == true){
            // 点击取消
          }
        }
  
      })
    }else{
      this.gobalGetUserInfo()
    }
    
  },

  // 放漂
  onAddBookDrift(){
    if(app.store.getState().user.state){
      wx.showModal({
        title: '是否放漂该书！',
        success: (res)=>{
          if(res.confirm == true){
            // 点击确定 获取转漂二维码
            wx.request({
              url: app.store.getState().settings.baseUrl + '/bookdrift/insert',
              method: 'POST',
              data: {
                bookId: this.data.bookInfo.bookId,
                ownerId: app.store.getState().user.userId,
                state: 0
                // collectionId: this.data.bookInfo.collectionId?this.data.bookInfo.collectionId:-1
              },
              success: (driftRes) => {
                if(driftRes.statusCode == 200){
                  this.setData({
                    ['bookDrift.popupShow']: true,
                    ['bookDrift.base64img']: driftRes.data.base64img
                  })
                }else{
                  wx.showToast({
                    title: '出现错误惹！',
                    icon: 'error'
                  })
                }
                console.log(driftRes);
              }
            })
          }else{
            // 点击取消
          }
        }
      })
    }else{
      this.gobalGetUserInfo()
    }
    
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    const eventChannel = this.getOpenerEventChannel()
    // eventChannel.emit('acceptDataFromOpenedPage', {data: 'test'});
    // eventChannel.emit('someEvent', {data: 'test'});
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据o
    if(eventChannel){
      eventChannel.on('acceptDataFromOpenerPage', function(data) {
        // console.log(data)
        that.setData({
          bookInfo: data
        })
      })
    }
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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