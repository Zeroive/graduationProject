// components/header/header.js
const app = getApp()

App.Component({
  /**
   * 组件的属性列表
   */
  options:{
    multipleSlots: true
  },
  useStore: true,
  properties: {
    backgroundcolor:{
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

  },

  lifetimes:{
    created(){
    }
  }
})
