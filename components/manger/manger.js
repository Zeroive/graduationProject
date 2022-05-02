// components/manger/manger.js
Component({
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
      newoldValue: 0,
      noteValue: 0,
      chargeValue: 0,
      driftTimeValue: 0,
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
      // 更改图书信息
      this.data.options[this.data.options.active].filter((val, index)=>{
        if(val.name==e.detail.name){
          this.setData({
            ["bookInfo."+this.data.options.active]: index
          })
        }
      });
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
