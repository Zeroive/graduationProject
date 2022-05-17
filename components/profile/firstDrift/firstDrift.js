// components/profile/firstDrift/firstDrift.js
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
    closePopup(){
      this.triggerEvent('closePopup')
    },
    onSubmitFirstDrift(){
      this.triggerEvent('updateCollection', {})
      this.triggerEvent('updateDrift', {})
      this.closePopup()
    }
  }
})
