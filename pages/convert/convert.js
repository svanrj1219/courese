// pages/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mall_log: [],
        page: 1,
        size: 10,
        logNull: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    getLogs() {
        if (!this.data.logNull) {
            wx.showToast({
                title: '暂无更多数据',
                icon: 'none',
                duration: 2000
            })
            return
        }
        wx.showLoading({
            title: '加载中',
        })
        let newLogs = this.data.mall_log
        this.setData({
            page: ++this.data.page
        })
        var that = this
        wx.getStorage({
            key: 'id',
            success(res) {
                wx.vrequest({
                    url: 'http://1.15.144.204:8080/getDetails',
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    method: "POST",
                    data: {
                        uid: res.data,
                        page: that.data.page,
                        size: that.data.size
                    },
                    success(resp) {
                        var data = JSON.parse(resp.data).data
                        .data.forEach(e => {
                            newLogs.push(e)
                        });
                        if (data.length==0) {
                            that.setData({
                                mall_log: newLogs,
                                logNull: false
                            })
                            wx.showToast({
                                title: '暂无更多数据',
                                icon: 'none',
                                duration: 2000
                            })
                        }
                        that.setData({
                            mall_log: newLogs,
                        })
                        wx.hideLoading()
                    }
                })
            },
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var that = this;
        wx.getStorage({
            key: 'userinfo',
            success(res) {
                that.setData({
                    userinfo: res.data
                })
            },
        })
        wx.getStorage({
            key: 'id',
            success(res) {
                that.setData({
                    isLogin: false
                })
                wx.vrequest({
                    url: 'http://1.15.144.204:8080/getDetails',
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    method: "POST",
                    data: {
                        id: res.data,
                        page: that.data.page,
                        size: that.data.size
                    },
                    success(resp) {
                        var data = JSON.parse(resp.data).data
                        if (data.length == 0) {
                            that.setData({
                                mall_log: data,
                                logNull: false
                            })
                        }
                        that.setData({
                            mall_log: data
                        })
                    }
                })
            },
        })
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