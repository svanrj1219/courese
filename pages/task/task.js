// pages/task/task.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tasks: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        wx.getStorage({
            key: 'id',
            success(res) {
                that.setData({
                    isLogin: false
                })
                wx.vrequest({
                    url: 'http://1.15.144.204:8080/getTask',
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    method: "POST",
                    data: {
                        id: res.data
                    },
                    success(resp) {
                        var data = JSON.parse(resp.data).data
                        that.setData({
                            tasks: data
                        })
                    }
                })
            }
        })
    },
    canel(e) {
        var that = this
        wx.vrequest({
            url: 'http://1.15.144.204:8080/doneTask',
            header: {
                'content-type': 'application/json' // 默认值
            },
            method: "POST",
            data: {
                uid: e.currentTarget.dataset.data.uid,
                get_points: e.currentTarget.dataset.data.get_points,
                content: e.currentTarget.dataset.data.content
            },
            success(resp) {
                var data = JSON.parse(resp.data).message
                wx.showToast({
                    title: data,
                })
            }
        })
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
        var that = this;
        wx.getStorage({
            key: 'userinfo',
            success(res) {
                that.setData({
                    userinfo: res.data
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