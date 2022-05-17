// components/profile/MCard/MCard.js
const app = getApp()

App.Component({
  /**
   * 组件的属性列表
   */
  useStore: true,
  options:{
    multipleSlots: true
  },
  properties: {
    bookInfo:{
      type: Object,
      value: {}
    },
    info1:{
      type: Number,
      value: 0
    },
    info2:{
      type: String,
      value: ""
    },
    isthumbUrlWork:{
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onJudgethumbUrl(){
      try{
        wx.request({
          url: this.data.bookInfo.thumbUrl,
          method: 'GET',
          success: (res) => {
            if(res.statusCode != 200){
              this.setData({
                ['bookInfo.isthumbUrlWork']: false
              })
            }
          }
        })
      }
      catch(e){
        console.log(e);
      }
    }
  },
  pageLifetimes:{
    show(){
      this.onJudgethumbUrl()
    }
  }
})
