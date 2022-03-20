// pages/class/class.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        week: [{
            id: 1,
            name: "周一",
        }, {
            id: 2,
            name: "周二"
        }, {
            id: 3,
            name: "周三"
        }, {
            id: 4,
            name: "周四"
        }, {
            id: 5,
            name: "周五"
        }],
        decId:1,
        class:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const that=this;
        wx.getStorage({
            key:"class",
            success(res){
                that.setData({
                    class:res.data
                })
            }
        })

    },
    clickWeek(e){
        this.setData({
            decId:e.target.dataset.id
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
        const that=this;
        wx.getStorage({
            key:"class",
            success(res){
                that.setData({
                    class:res.data
                })
            }
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