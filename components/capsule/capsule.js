// components/capsule/capsule.js

const app = getApp()
let { map } = app.store.getState();

App.Component({
  /**
   * 组件的属性列表
   */
  useStore: true,
  options:{
    multipleSlots: true
  },
  properties: {
    city:{
      type: String,
      value: "成都"
    },
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
    toShiftCity(){
      if(app.store.getState().user.state){
        wx.navigateTo({
          url: `plugin://citySelector/index?key=${map.setting.key}&referer=${map.setting.referer}&hotCitys=${map.setting.hotCitys}`,
        })
      }else{
        wx.showToast({
          title: '请登录',
          icon: 'error'
        })
      }
      
    },
    
  },

  lifetimes:{
    attached(){
    }
  },

  pageLifetimes:{
    show(){
    }
  }
})
