// pages/malls/malls.js
Page({

    /**
     * 页面的初始数据
     */

    /* 页面的初始数据 */
    data: {
        curNav: 1,
        class: []
    },
    /* 把点击到的某一项 设为当前curNav */
    switchRightTab: function (e) {
        let id = e.target.dataset.id;
        this.setData({
            curNav: id
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.vrequest({
            url: 'http://1.15.144.204:8080/getMallClass',
            header: {
                'content-type': 'application/json' // 默认值
            },
            method: "POST",
            success(resp) {
                var data = JSON.parse(resp.data).data
                that.setData({
                    class: data
                })
            }
        })
    },
    buy(e) {
        var that = this
        wx.getStorage({
            key: 'id',
            success(res) {
                that.setData({
                    isLogin: false
                })
                wx.vrequest({
                    url: 'http://1.15.144.204:8080/exchangeGoods',
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    method: "POST",
                    data: {
                        id: e.currentTarget.dataset.data.id,
                        uid: res.data,
                        required_points: e.currentTarget.dataset.data.required_points,
                    },
                    success(resp) {
                        var data = JSON.parse(resp.data).message
                        wx.showToast({
                          title: data
                        })
                    }
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