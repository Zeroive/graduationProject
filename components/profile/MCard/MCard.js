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
      type: String,
      value: ""
    },
    info2:{
      type: String,
      value: ""
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

  }
})
