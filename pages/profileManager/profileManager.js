// pages/profileManager/profileManager.js
const areaList = require("../../static/data/areaList.js")
const app = getApp()


App.Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      'userId': 1, 
      'openId': 'og6Wu5D7G0nM3SXQ0P2kE6WIKLJs', 
      'sessionKey': '0LlKLnTZQ5nAJf6WEzCKZQ==', 
      'nickName': '╰⋛⋋⊱⋋\uf8ff⋌⊰⋌⋚╯', 
      'avatarUrl': 'https://thirdwx.qlogo.cn/mmopen/vi_32/8O7wCx1X6Whpk5CWDmyUstgJCicHTOn2MfHy6nvAR6FchO0ib9onlQwibKlTMDzB2icDvdI10bqSiaqRibnqMgFBMziaw/132', 
      'city': '', 
      'gender': '男', 
      'province': '', 
      'district': '', 
      'language': 'zh_CN', 
      'addressCode': '', 
      'latitude': '', 
      'longitude': ''
    },
    genderactions:{
      actions:[
        {
          name: '男'
        },
        {
          name: '女'
        }
      ],
      show: false
    },
    addressactions:{
      show: false,
      region: ['广东省', '广州市', '海珠区'],
    },
    customItem: '全部',
    areaList: areaList.areaList
  },

  setValue(e){
    // console.log(e.target.dataset.keyname, e.detail.value);
    this.setData({
      ['userInfo.'+e.target.dataset.keyname]: e.detail.value
    })
  },

  onGenderActionShow(e){
    this.setData({
      ['genderactions.show']:!this.data.genderactions.show
    })
  },

  onAddressActionShow(){
    this.setData({
      ['addressactions.show']:!this.data.addressactions.show
    })
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  onGenderSelect(e){
    this.setData({
      ['userInfo.gender']: e.detail.name
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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