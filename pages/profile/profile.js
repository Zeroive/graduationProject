// pages/profile/profile.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl, //头像Url
    fontColor: "black", //字体颜色
    active: 1, //选中标签
    driftBooksInfo: [ //书籍信息
        {
        name: "Spring实战-(第4版)1",
        thumbUrl: "https://image12.bookschina.com/2016/20160531/s7146469.jpg",
        publisher: "人民邮电出版社",
        price: "69",
        page: 498,
        driftStartTime: "2022-04-11 15:10:26",
        newold: 0,
        note: 0,
        charge: 0,
        driftTime: 0
      },
      {
        name: "Spring实战-(第4版)2",
        thumbUrl: "https://image12.bookschina.com/2016/20160531/s7146469.jpg",
        publisher: "人民邮电出版社",
        price: "69",
        page: 498,
        driftStartTime: "2022-04-11 15:10:26",
        newold: 0,
        note: 0,
        charge: 0,
        driftTime: 0
      },
      {
        name: "Spring实战-(第4版)3",
        thumbUrl: "https://image12.bookschina.com/2016/20160531/s7146469.jpg",
        publisher: "人民邮电出版社",
        price: "69",
        page: 498,
        driftStartTime: "2022-04-11 15:10:26"
      },
    ],
    show: false, // 弹窗是否展示
    ManagerorOnemoreDrift: 0
  },
  // 获取头像
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
  },
  // 切换标签页
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
  },

  onClickShow(e) {
    console.log(this);
    this.setData({ 
      show: true,
      ManagerorOnemoreDrift: e.target.dataset.flag
    });
    if(e.target.dataset.flag == 0)
      this.selectComponent("#manger").setData({bookInfo: e.target.dataset.data})
    // console.log(e.target.dataset.data);
  },

  onClickHide() {
    this.setData({ show: false });
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