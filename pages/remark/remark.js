// pages/remark/remark.js
const app = getApp()

App.Page({

  /**
   * 页面的初始数据
   */
  data: {
    driftId: -1,
    bookId: -1,
    inputRemarkShow: false,
    areaTextFocus: false,
    buttonLoading: false,
    textAreaValue: "",
    bookInfo:{
      bookName: "Spring实战-(第4版)1",
      thumbUrl: "http://api.jisuapi.com/isbn/upload/854/853057.jpg",
      publisher: "人民邮电出版社",
      author: "沃尔斯",
      price: "69",
      page: 498,
      createTime: "2022-04-11 15:10:26",//图书的创建时间， 即馆藏时间
      newold: 0,
      note: 0,
      charge: 0,
      driftTime: 0,
      isthumbUrlWork: false
    },
    remarks:[
      {
        date: '2021/12/24',
        time: "11:11",
        borrowerName: "一个帅哥",
        memo: '这是第一条数据嘻嘻'
      },
      {
        date: '2021/12/24',
        time: "11:11",
        borrowerName: "一个帅哥",
        memo: '这是第2条数据嘻嘻哈哈哈哈哈说的都是多多'
      },
      {
        date: '2021/12/24',
        time: "11:11",
        borrowerName: "一个帅哥",
        memo: '这是第32条数据嘻嘻哈哈哈哈哈说的都是多多考生复试巅峰计划看电视看粉红色的粉红色的粉红色的发送到'
      },
      {
        date: '2021/12/24',
        time: "11:11",
        borrowerName: "一个帅哥",
        memo: '这是第4条数据嘻嘻哈哈哈哈哈说的都是多多ediuf dkh d是的柔肤水搜发送到粉红色的接口发就是掉分束带结发和闪电发货都是废话水电费客户'
      },
      {
        date: '2021/12/24',
        time: "11:11",
        borrowerName: "一个帅哥",
        memo: '这位是司电话费斯柯达粉红色的几句话分时间掉分更合适的发送到看就发烧打几分水电费水电费是的就很烦上岛咖啡水电费水电费收代理费和上岛咖啡和上岛咖啡死得快方式的会计法司电话费可视对讲发说多了几分圣诞快乐分离式的发射基地看凤山街道看了上分'
      },
      {
        date: '2021/12/24',
        time: "11:11",
        borrowerName: "一个帅哥",
        memo: '这是第5条数据嘻嘻这是第5条数据d这是第5条数据'
      },
    ]
  },

  getBookInfo(){
    wx.request({
      url: app.store.getState().settings.baseUrl + '/book/findbybookid',
      method: 'POST',
      data:{
        bookId: this.data.bookId
      },
      success: (res)=>{
        if (res.statusCode == 200) {
          this.setData({
            bookInfo: res.data
          })
        }
      }
    })
  },

  getRemark(){
    wx.request({
      url: app.store.getState().settings.baseUrl + '/remark/findbydriftid',
      method: 'POST',
      data:{
        driftId: this.data.driftId
      },
      success: (res)=>{
        if (res.statusCode == 200) {
          this.setData({
            remarks: res.data
          })
        }
      }
    })
  },

  onSubmitRemark(){
    this.setData({
      buttonLoading: true
    })
    wx.request({
      url: app.store.getState().settings.baseUrl + '/remark/add',
      method: 'POST',
      data: {
        driftId: this.data.driftId,
        memo: this.data.textAreaValue
      },
      success: (res)=>{
        if(res.statusCode == 200 ){
          this.setData({
            buttonLoading: false
          })
          this.onClickHide()
          wx.showToast({
            title: '提交成功',
            icon: 'success'
          })
          this.getRemark()
        }
      }
    })
  },

  addRemark(){
    this.onClickShow()
  },

  onClickShow() {
    this.setData({ inputRemarkShow: true });
  },

  onClickHide() {
    this.setData({ inputRemarkShow: false });
  },

  changeAreaTextValue(e){
    this.setData({
      textAreaValue: e.detail.value
    })
  },

  doNothing(){

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that = this
    const eventChannel = this.getOpenerEventChannel()
    if(eventChannel.on){
      eventChannel.on('acceptDataFromOpenerPage', function(data) {
        console.log(data)
        that.setData({
          driftId: data.driftId,
          bookId: data.bookId
        })
      })
    }
    this.getBookInfo()
    this.getRemark()
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