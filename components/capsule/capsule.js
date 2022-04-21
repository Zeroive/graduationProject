// components/capsule/capsule.js
const app = getApp()
App.Component({
  /**
   * 组件的属性列表
   */
  useStore: true,
  properties: {
    city:{
      type: String,
      value: "成都"
    },
    currentPage:{
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
    attached(){
    }
  }
})
