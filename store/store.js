const Store = require('wxministore');

let store = new Store({
  state: {
    //以下为自定义的全局状态，用法和页面中的data: {...} 一致。
    msg: 'Mini Store 是一个基于微信小程序的全局状态库。\n能够在Page，Component，template中任意wxml文件内使用全局状态。\n且全局的状态完全同步。',
    user: {
      name: 'Leisure'
    },
    currentPage: "",

    counter: 0
  },
  methods: {
    goAnyWhere(e) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    }
  },
  pageListener: {
    onLoad(options) {
      store.setState({
        currentPage: this.route
      })
      // console.log('我在' + this.route, '参数为', options);
      // console.log(this.currentPage);
    },
    onHide() {
      console.log('onHide')
    },
    onShareAppMessage(res) {
      return {
        title: '全局分享',
        path: '/index/index?id=123'
      }
    }
  },
  // 开启了局部模式
  openPart: true
})

export default store