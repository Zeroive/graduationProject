// pages/profile/profile.js
const app = getApp()

App.Page({

  /**
   * 页面的初始数据
   */
  useStore: true,
  data: {
    avatarUrl: '', //头像Url
    fontColor: "black", //字体颜色
    active: 0, //选中标签
    driftBooksInfo: [ //书籍信息
        {
        bookName: "Spring实战-(第4版)1",
        thumbUrl: "http://image12.bookschina.com/2016/20160531/s7146469.jpg",
        publisher: "人民邮电出版社",
        price: "69",
        page: 498,
        createTime: "2022-04-11 15:10:26",//图书的创建时间， 即馆藏时间
        newold: 0,
        note: 0,
        charge: 0,
        driftTime: 0,
        isthumbUrlWork: true
      }
    ],
    collectionBooksInfo:[
      {
        bookName: "Spring实战-(第4版)1",
        thumbUrl: "http://api.jisuapi.com/isbn/upload/854/853057.jpg",
        publisher: "人民邮电出版社",
        price: "69",
        page: 498,
        createTime: "2022-04-11 15:10:26",//图书的创建时间， 即馆藏时间
        newold: 0,
        note: 0,
        charge: 0,
        driftTime: 0,
        isthumbUrlWork: false
      }
    ],
    show: false, // 弹窗是否展示
    ManagerorDrift: 0
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
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.name}`,
    //   icon: 'none',
    // });
  },

  onClickShow(e) {
    // console.log(e.target.dataset.data);
    this.setData({ 
      show: true,
      ManagerorDrift: e.target.dataset.flag
    });
    if(e.target.dataset.flag == 0)
      this.selectComponent("#manger").setData({bookInfo: e.target.dataset.data})
    // console.log(e.target.dataset.data);
  },

  onClickHide() {
    this.setData({ show: false });
  },

  onClickLeftSlideShow(){
    this.selectComponent("#leftslide").onClickShow()
  },

  onShareAppMessage() {
    return {
      title: '自定义转发标题',
      path: '/page/profile'
    }
  },

  getBookCollection(){
    console.log("获取馆藏书籍");
    wx.request({
      url: app.store.getState().settings.baseUrl + "/bookcollection/findallbyuserid",
      method: "POST",
      data: {
        userId: app.store.getState().user.userId
      },
      success:(res)=>{
        res.data.collectionBooksInfo.map((val) => {
          wx.request({
            url: val.thumbUrl,
            method: 'GET',
            success: (res) => {
              if(res.statusCode == 200){
                val['isthumbUrlWork'] = true
              }
            }
          })
          return val
        })
        this.setData({
          collectionBooksInfo: res.data.collectionBooksInfo
        })
      }
    })
  },

  getBookDrift(){
    console.log("获取漂流书籍");
    wx.request({
      url: app.store.getState().settings.baseUrl + "/bookdrift/getbyuserid",
      method: "POST",
      data: {
        userId: app.store.getState().user.userId
      },
      success:(res)=>{
        res.data.driftBooksInfo.map((val) => {
          wx.request({
            url: val.thumbUrl,
            method: 'GET',
            success: (res) => {
              if(res.statusCode == 200){
                val['isthumbUrlWork'] = true
              }
            }
          })
          return val
        })
        this.setData({
          driftBooksInfo: res.data.driftBooksInfo
        })
      }
    })
  },

  onFirstDrift(e){
    if(e.target.dataset.data.num == 0){
      wx.showToast({
        title: '数量不足',
        icon: 'none'
      })
    }else{
      // 请求后台获得二维码
      wx.showModal({
        title: '是否放漂该书！',
        success: (res)=>{
          if(res.confirm == true){
            console.log(e.target.dataset.data.bookId, app.store.getState().user.userId);
            this.setData({
              show: true,
              ManagerorDrift: e.target.dataset.flag
            })
            this.selectComponent("#firstDrift").setData({bookInfo: e.target.dataset.data})
            // 点击确定 获取转漂二维码
            wx.request({
              url: app.store.getState().settings.baseUrl + '/bookdrift/insert',
              method: 'POST',
              data: {
                bookId: e.target.dataset.data.bookId,
                ownerId: app.store.getState().user.userId,
                state: 1
              },
              success: (driftRes) => {
                console.log(driftRes);
                if(driftRes.statusCode == 200){
                  this.selectComponent("#firstDrift").setData({base64img: driftRes.data.base64img})
                }else{
                  wx.showToast({
                    title: '出现错误惹！',
                    icon: 'error'
                  })
                }
              }
            })
          }else{
            // 点击取消
          }
        }
      })
    }
    
  },

  onemoreDrift(e){
    // 请求后台获得二维码
    wx.showModal({
      title: '是否转漂该书！',
      success: (res)=>{
        if(res.confirm == true){
          console.log(e.target.dataset.data.driftId, app.store.getState().user.userId);
          this.setData({
            show: true,
            ManagerorDrift: e.target.dataset.flag
          })
          this.selectComponent("#onemoreDrift").setData({bookInfo: e.target.dataset.data})
          // 点击确定 获取转漂二维码
          wx.request({
            url: app.store.getState().settings.baseUrl + '/bookdrift/onemoredrift',
            method: 'POST',
            data: {
              driftId: e.target.dataset.data.driftId
            },
            success: (driftRes) => {
              console.log(driftRes);
              if(driftRes.statusCode == 200){
                this.selectComponent("#onemoreDrift").setData({base64img: driftRes.data.base64img})
              }else{
                wx.showToast({
                  title: '出现错误惹！',
                  icon: 'error'
                })
              }
            }
          })
        }else{
          // 点击取消
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      // 根据背景图片设置字体颜色
      fontColor: app.store.getState().user.fontcolor
    })
    this.getBookCollection()
    this.getBookDrift()
    console.log(this.data);
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