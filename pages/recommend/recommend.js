// pages/recommend/recommend.js
const app = getApp()

App.Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommendBooks:[
      {
        bookName: "Spring实战-(第4版)",
        thumbUrl: "https://image12.bookschina.com/2016/20160531/s7146469.jpg",
        author: "沃尔斯",
        publisher: "人民邮电出版社",
        price: "69"
      }
    ]
  },

  getRecommendBook(){
    wx.request({
      url: app.store.getState().settings.baseUrl + '/userCF/recommend',
      method: 'POST',
      data:{
        userId: app.store.getState().user.userId,
        num: 5
      },
      success: (res)=>{
        if(res.statusCode == 200){
          this.setData({
            recommendBooks: res.data
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getRecommendBook()
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