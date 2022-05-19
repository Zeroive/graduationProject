// pages/search/search.js
const app = getApp()

App.Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    history_list:[111],
    showHistory: false,
    bookInfos:[],
  },

  //清空历史
  clearHistory() {
    this.setData({
      history_list:[]
    })
    wx.removeStorageSync('search_history')
  },

  getSearchOne(e){
    let {index}=e.currentTarget.dataset,{history_list}=this.data;
    let va=history_list[index]
    this.setData({
      value:va
    })
    this.data.history_list.forEach((item, index) => {
      if (item == va) {
        this.data.history_list.splice(index, 1);
      }
    })
    this.data.history_list.unshift(va);
    this.setData({
      history_list:this.data.history_list.slice(0,15)
    })
    wx.setStorageSync('search_history', JSON.stringify(this.data.history_list))
  },

  onSearch(e){
    let data = e.detail.replace(/(^\s*)|(\s*$)/g, "");//去掉前后的空格
    if (data.trim() != '') {
      this.data.history_list.forEach((key, index) => {
        if (key == data) {
          this.data.history_list.splice(index, 1);
        }
      })
      this.data.history_list.unshift(data);
      this.setData({
        history_list:this.data.history_list.slice(0,15)
      })
      wx.setStorageSync('search_history', JSON.stringify(this.data.history_list))

      wx.request({
        url: app.store.getState().settings.baseUrl + '/book/findbookbyname',
        method: 'POST',
        data:{
          bookName: data
        },
        success:(res)=>{
          this.setData({
            bookInfos: res.data
          })
        }
      })
    }
  },

  onCancel(){
    this.setData({
      value: ""
    })
  },

  onShowHistory(){
    this.setData({
      showHistory: true
    })
  },

  onHideHistory(){
    this.setData({
      showHistory: false
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
    if (wx.getStorageSync('search_history') ){
      this.setData({
        list:JSON.parse(wx.getStorageSync('search_history') ).slice(0, 15)
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