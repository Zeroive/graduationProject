// pages/libraryManager/libraryManager.js
import utils from '../../utils/util'

const chooseLocation = requirePlugin('chooseLocation');
const app = getApp()

App.Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: '生活服务,娱乐休闲',
    libraryInfo: {
      addressCode: 0,
      createTime: "2022-05-06 15:23:52",
      introduction: null,
      detailAddress: null,
      latitude: 0,
      libraryId: 1,
      libraryName: null,
      longitude: 0,
      phone: '',
    }
  },

  onChoseLocation(){
    const mapSetting = app.store.getState().map.setting
    const userInfo = app.store.getState().user
    const location = JSON.stringify({
      latitude: this.data.libraryInfo.latitude?this.data.libraryInfo.latitude:userInfo.latitude,
      longitude: this.data.libraryInfo.longitude?this.data.libraryInfo.longitude:userInfo.longitude
    })
    wx.navigateTo({
      url: `plugin://chooseLocation/index?key=${mapSetting.key}&referer=${mapSetting.referer}&location=${location}&category=${this.data.category}`
    });
  },

  setValue(e){
    // console.log(e.target.dataset.keyname, e.detail.value);
    this.setData({
      ['libraryInfo.'+e.target.dataset.keyname]: e.detail.value
    })
  },

  onSaveLibraryInfo(){
    // console.log(this.data.libraryInfo);
    wx.request({
      url: app.store.getState().settings.baseUrl + '/userlibrary/update',
      method: 'POST',
      data: this.data.libraryInfo,
      success: (res) => {
        if(res.statusCode == 200){
          wx.showToast({
            title: '保存成功！',
            icon: 'success'
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.store.getState().settings.baseUrl + '/userlibrary/getbyuserid',
      method: 'POST',
      data: {
        userId: app.store.getState().user.userId
      },
      success: (res) => {
        // console.log(res.data);
        this.setData({
          libraryInfo: res.data
        })
      }
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
    const location = chooseLocation.getLocation();
    // console.log(location);
    if(location){
      this.setData({
        libraryInfo: utils.updateObject(this.data.libraryInfo, location),
        ['libraryInfo.detailAddress']: location.address
      })
    }
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