// pages/tmp/tmp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: "",
    show: false
  },

  wish: function () {
    wx.reLaunch({
      url: '../index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setInterval(() => {
      var myDate = new Date();
      var y = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
      var m = myDate.getMonth(); //获取当前月份(0-11,0代表1月)
      var d = myDate.getDate();
      var h = myDate.getHours(); //获取当前小时数(0-23)
      var mm = myDate.getMinutes(); //获取当前分钟数(0-59)
      var s = myDate.getSeconds();
      if (s <= 9) {
        s = '0' + s
      }
      m += 1
      if (m <= 9)
        m = '0' + m
      var date = y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s
      this.setData({
        time: date
      })
    }, 100);
  },
  //自定义导航栏标题
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})