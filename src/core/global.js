import Vue from 'vue'


// ----- 全局 mixin -----
Vue.mixin({
  data () {
    return {
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight,
      doneTip: '到底啦,我也是有底线的',
      starTipText: [
        '<span style="color:#fed53d;">$ 分 - 很差</span>',
        '<span style="color:#fed53d;">$ 分 - 勉强</span>',
        '<span style="color:#fed53d;">$ 分 - 一般</span>',
        '<span style="color:#fed53d;">$ 分 - 挺好</span>',
        '<span style="color:#fed53d;">$ 分 - 非常好</span>'
      ]
    }
  }
})

Vue.prototype.goto = function (path) {
  this.$router.push(path)
}

Vue.prototype.gotoReplace = function (path) {
  this.$router.replace(path)
}

Vue.prototype.goBack = function () {
  this.$router.go(-1)
}

Vue.prototype.checkVip = function () {
  Vue.prototype.$confirm({
    title: '提示',
    content: '请您先购买会员服务!',
    onOk () {
    },
    onCancel () {}
  })
}

Vue.prototype.getImage = function (path, width, height) {
  if (path) {
    if (path.indexOf('http://') === 0 || path.indexOf('https://') === 0) {
      return path
    }
    let param = ''
    if (width) {
      let _h = height || ''
      param = '!' + width + _h
    }
    return path + param
  } else {
    return null
  }
}
