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
      headPic: "https://image12.bookschina.com/2016/20160531/s7146469.jpg",
      author: "沃尔斯",
      publisher: "人民邮电出版社",
      price: "69"
    },
    manipulateChoice:[
      {
        title: "加入馆藏",
        label: "让自己的图书馆满满当当",
        icon: "icon-guancangdanganshuliang",
        iconColor: "#F57646"
      },
      {
        title: "去放漂",
        label: "一起来建设漂流图书馆叭",
        icon: "icon-piaoliuping",
        iconColor: "#1296db"
      },

    ]
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
    if(eventChannel.on != null){
      eventChannel.on('acceptDataFromOpenerPage', function(data) {
        console.log(data.data.bookInfo)
        that.setData({
          bookInfo: data.data.bookInfo
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