//app.js
// sdk wilddog 可以解决我们数据存储
// 云服务，todo 对象文档集合 mongodb
var wilddog = require('wilddog-weapp-all')

App({
  onLaunch: function() {
    // wilddog配置
    var config = {
      //wilddog 哪个后端项目跟小程序对应
      //相当于数据库
      syncURL: "http://cchangtodo.wilddogio.com",
      authDomain:"cchangtodo.wilddog.com"
    }
    wilddog.initializeApp(config)
    // 跟todo数据表想对应起来
    this.ref = wilddog.sync().ref('todo')
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  //应用级别的数据通信
  addItem: function(todo) {
    //todo 数据表对象 数据对象化
    this.ref.push(todo)
  },
  getTodoRef: function() {
    return this.ref
  },
  login: function(callback) {
    console.log(callback);
    wilddog.auth().signInWeapp().then(function(user){
      callback(user);
      // console.log(JSON.stringify(user));
      // wx.showToast({
      //   title:JSON.stringify(user)
      // });
    }).catch(function(err){
      wx.showToast({
        title:'登录失败'
      });
    })
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null
  }
})
