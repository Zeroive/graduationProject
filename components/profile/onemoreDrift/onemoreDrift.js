// components/onemoreDrift/onemoreDrift.js
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
    onSubmitOnemoreDrift(){
      this.triggerEvent('closePopup')
      this.triggerEvent('updateDrift', {})
    },
  }
})
