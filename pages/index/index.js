const app = getApp()
var grhxnj = []
var iffwfw = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: 'https://ww2.sinaimg.cn/thumb150/0077aIQAly1gtibwlls7xj30j30hfdju.jpg',
    week: {
      id: 6,
      data: "星期六"
    },
    title: 'iffwfw',
    class: [],
    grhxnj: false
  },
  getWeek() {
    var myDate = new Date();
    var days = myDate.getDay();
    switch (days) {
      case 1:
        days = {
          id: 0,
          data: '星期一'
        };
        break;
      case 2:
        days = {
          id: 1,
          data: '星期二'
        };
        break;
      case 3:
        days = {
          id: 2,
          data: '星期三'
        };
        break;
      case 4:
        days = {
          id: 3,
          data: '星期四'
        };
        break;
      case 5:
        days = {
          id: 4,
          data: '星期五'
        };
        break;
      case 6:
        days = {
          id: 5,
          data: '星期六'
        };
        break;
      case 0:
        days = {
          id: 6,
          data: '星期日'
        };
        break;
    }
    this.setData({
      week: days
    })
  },
  getGrhxnj() {
    wx.vrequest({
      url: 'http://1.15.144.204:8080/getCourse',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      data: {
        type: "grhxnj"
      },
      success(res) {
        var data = JSON.parse(res.data).data
        let week = []
        let week1 = []
        let week2 = []
        let week3 = []
        let week4 = []

        for (let i = 0; i < data.length; i++) {
          if (data[i].week === "星期一") {
            week.push(data[i])
            grhxnj[0] = week;
          }
          if (data[i].week === "星期二") {
            week1.push(data[i])
            grhxnj[1] = week1;
          }
          if (data[i].week === "星期三") {
            week2.push(data[i])
            grhxnj[2] = week2;
          }
          if (data[i].week === "星期四") {
            week3.push(data[i])
            grhxnj[3] = week3;
          }
          if (data[i].week === "星期五") {
            week4.push(data[i])
            grhxnj[4] = week4;
          }
        }
      }
    })
  },
  getIffwfw() {
    const that = this
    wx.vrequest({
      url: 'http://1.15.144.204:8080/getCourse',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      data: {
        type: "iffwfw"
      },
      success(res) {
        var data = JSON.parse(res.data).data
        let week = []
        let week1 = []
        let week2 = []
        let week3 = []
        let week4 = []
        for (let i = 0; i < data.length; i++) {
          if (data[i].week === "星期一") {
            week.push(data[i])
            iffwfw[0] = week;
          }
          if (data[i].week === "星期二") {
            week1.push(data[i])
            iffwfw[1] = week1;
          }
          if (data[i].week === "星期三") {
            week2.push(data[i])
            iffwfw[2] = week2;
          }
          if (data[i].week === "星期四") {
            week3.push(data[i])
            iffwfw[3] = week3;
          }
          if (data[i].week === "星期五") {
            week4.push(data[i])
            iffwfw[4] = week4;
          }
        }
        if (!that.data.grhxnj) {
          that.setData({
            class: iffwfw
          })
          wx.setStorage({
            key: "class",
            data: iffwfw
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGrhxnj()
    this.getIffwfw()
    if (this.data.grhxnj) {
      this.setData({
        class: grhxnj
      })
      wx.setStorage({
        key: "class",
        data: grhxnj
      })
    } else {
      this.setData({
        class: iffwfw
      })
      wx.setStorage({
        key: "class",
        data: iffwfw
      })
    }
    this.getWeek()
  },
  changeClass() {
    if (this.data.grhxnj) {
      this.setData({
        class: iffwfw,
        title: 'iffwfw',
        grhxnj: !this.data.grhxnj
      })
      wx.setStorage({
        key: "class",
        data: iffwfw
      })
    } else {
      this.setData({
        class: grhxnj,
        title: 'grhxnj',
        grhxnj: !this.data.grhxnj
      })
      wx.setStorage({
        key: "class",
        data: grhxnj
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getGrhxnj()
    this.getIffwfw()
    if (this.data.grhxnj) {
      this.setData({
        class: grhxnj
      })
      wx.setStorage({
        key: "class",
        data: grhxnj
      })
    } else {
      this.setData({
        class: iffwfw
      })
      wx.setStorage({
        key: "class",
        data: iffwfw
      })
    }
    this.getWeek()
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