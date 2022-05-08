// components/manger/manger.js
const app = getApp()

App.Component({
  /**
   * 组件的属性列表
   */
  options:{
    multipleSlots: true
  },

  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    bookInfo: {},
    options: {
      newold: [
        { name: '旧' },
        { name: '六成新' },
        { name: '七成新' },
        { name: '八成新' },
        { name: '九成新' },
      ],
      note: [
        { name: '无' },
        { name: '少量' },
        { name: '大量' }
      ],
      charge: [
        { name: '免费' },
        { name: '收费' }
      ],
      driftTime: [
        { name: '一月' },
        { name: '一季度' },
        { name: '一年' }
      ],
      active: ''
    },
    actionSheetShow: false,
    actions: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose() {
      this.setData({ actionSheetShow: false });
    },
  
    onSelect(e) {
      // e.detail 选项内容 {name: "旧"}
      // console.log(e.detail);
      // 更改图书信息
      this.setData({
        ["bookInfo."+this.data.options.active]: e.detail.name
      })
    },

    onChangeActionSheet(e){
      this.data.options.active = e.target.dataset.index
      this.setData({
        actions: this.data.options[this.data.options.active],
      })
      this.setData({
        actionSheetShow: true
      })
    },

    closePopup(){
      this.triggerEvent('closePopup')
    },

    submitInfo(){
      wx.request({
        url: app.store.getState().settings.baseUrl + '/bookcollection/updatebycollectionid',
        method: 'POST',
        data: this.data.bookInfo,
        success: (res) => {
          this.closePopup()
        }
      })
    }
  },

  lifetimes:{
    attached(){
      
    }
  },

  pageLifetimes:{
    show(){
      // console.log(this.data)
    }
  }
})
