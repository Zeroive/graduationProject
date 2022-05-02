// components/leftSlide/leftSlide.js
const app = getApp()

App.Component({
  /**
   * 组件的属性列表
   */
  options:{
    addGlobalClass: true,
    multipleSlots: true
  },
  useStore: true,
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    overlayShow: false,
    leftSlideShow: false,
    MAnimation: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 显示
    onClickShow(){
      this.setData({
        leftSlideShow: true,
        overlayShow: true
      })
      this.setData({
        MAnimation: "animation: slideInLeft 1s 1;"
      })
    },
    // 隐藏 先更换动画效果 再隐藏
    onClickHide(){
      const that = this
      this.setData({
        overlayShow: false,
        MAnimation: "animation: slideOutLeft 0.5s 1;"
      })
      setTimeout(()=>{
        that.setData({
          leftSlideShow: false
        })
      }, 200)
    }
  }
})
