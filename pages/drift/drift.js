// pages/drift/drift.js
const app = getApp()

App.Page({

  /**
   * 页面的初始数据
   */
  useStore: true,
  data: {
    recommendBooks: [
      {
        name: "Spring实战-(第4版)",
        thumbUrl: "https://image12.bookschina.com/2016/20160531/s7146469.jpg",
        author: "沃尔斯",
        publisher: "人民邮电出版社",
        price: "69",
        address: "成都"
      },
      {
        name: "Spring实战-(第4版)",
        thumbUrl: "https://image12.bookschina.com/2016/20160531/s7146469.jpg",
        author: "沃尔斯",
        publisher: "人民邮电出版社",
        price: "69"
      },
      {
        name: "Spring实战-(第4版)",
        thumbUrl: "https://image12.bookschina.com/2016/20160531/s7146469.jpg",
        author: "沃尔斯",
        publisher: "人民邮电出版社",
        price: "69"
      }
    ],
    historyBooks:[
      {
        date: '2021/12/24',
        time: "11:11",
        content: '这是第一条数据嘻嘻'
      },
      {
        date: '2021/12/24',
        time: "11:11",
        content: '这是第2条数据嘻嘻哈哈哈哈哈说的都是多多'
      },
      {
        date: '2021/12/24',
        time: "11:11",
        content: '这是第32条数据嘻嘻哈哈哈哈哈说的都是多多考生复试巅峰计划看电视看粉红色的粉红色的粉红色的发送到'
      },
      {
        date: '2021/12/24',
        time: "11:11",
        content: '这是第4条数据嘻嘻哈哈哈哈哈说的都是多多ediuf dkh d是的柔肤水搜发送到粉红色的接口发就是掉分束带结发和闪电发货都是废话水电费客户'
      },
      {
        date: '2021/12/24',
        time: "11:11",
        content: '这位是司电话费斯柯达粉红色的几句话分时间掉分更合适的发送到看就发烧打几分水电费水电费是的就很烦上岛咖啡水电费水电费收代理费和上岛咖啡和上岛咖啡死得快方式的会计法司电话费可视对讲发说多了几分圣诞快乐分离式的发射基地看凤山街道看了上分'
      },
      {
        date: '2021/12/24',
        time: "11:11",
        content: '这是第5条数据嘻嘻这是第5条数据d这是第5条数据'
      },
    ]
  },

  goSearchPage(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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