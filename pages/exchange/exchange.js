// pages/exchange/exchange.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userinfo: {},
        isLogin: false,
        jf: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {},
    getUserProfile(e) {
        if (!this.data.isLogin) {
            return
        }
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
        // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        var that = this;
        wx.getUserProfile({
            desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                that.setData({
                    userinfo: res.userInfo
                })
                wx.setStorage({
                    key: "userinfo",
                    data: res.userInfo
                })
                wx.login({
                    success(resp) {
                        if (resp.code) {
                            wx.vrequest({
                                url: 'http://1.15.144.204:8080/wxlogin',
                                header: {
                                    'content-type': 'application/json' // 默认值
                                },
                                method: "POST",
                                data: {
                                    code: resp.code,
                                    username: res.userInfo.nickName,
                                    avatarUrl: res.userInfo.avatarUrl
                                },
                                success(res) {
                                    var data = JSON.parse(res.data)
                                    if (!data.isVip) {
                                        wx.showModal({
                                            title: '请输入邀请码',
                                            placeholderText: '请输入邀请码',
                                            editable: true,
                                            success(rese) {
                                                if (rese.confirm) {
                                                    wx.vrequest({
                                                        url: 'http://1.15.144.204:8080/setVip',
                                                        header: {
                                                            'content-type': 'application/json' // 默认值
                                                        },
                                                        method: "POST",
                                                        data: {
                                                            id: data.id,
                                                            code: rese.content
                                                        },
                                                        success(ress) {
                                                            var data1 = JSON.parse(ress.data)
                                                            if (data1.code) {
                                                                wx.showToast({
                                                                    title: data1.message,
                                                                })
                                                                wx.setStorage({
                                                                    key: "id",
                                                                    data: data.id
                                                                })
                                                                wx.setStorage({
                                                                    key: "jf",
                                                                    data: data.integration
                                                                })
                                                                that.setData({
                                                                    isLogin: false
                                                                })
                                                                that.setData({
                                                                    jf: data.integration
                                                                })
                                                            } else {
                                                                wx.showToast({
                                                                    title: data1.message,
                                                                    success() {
                                                                        setTimeout(() => {
                                                                            wx.reLaunch({
                                                                                url: '../index/index'
                                                                            })
                                                                        }, 1000);
                                                                    }
                                                                })
                                                            }
                                                        }
                                                    })
                                                } else if (rese.cancel) {
                                                    wx.showToast({
                                                        title: '暂时不支持非邀请用户',
                                                    })
                                                    wx.reLaunch({
                                                        url: '../index/index'
                                                    })
                                                }
                                            }
                                        })
                                    } else {
                                        wx.setStorage({
                                            key: "id",
                                            data: data.id
                                        })
                                        that.setData({
                                            isLogin: false
                                        })
                                        wx.setStorage({
                                            key: "jf",
                                            data: data.integration
                                        })
                                        that.setData({
                                            jf: data.integration
                                        })
                                    }
                                }
                            })
                        } else {
                            console.log('登录失败！' + resp.errMsg)
                        }
                    }
                })
            }
        })
    },
    task() {
        wx.navigateTo({
            url: '../task/task',
        })
    },
    detail() {
        wx.navigateTo({
            url: '../detail/detail',
        })
    },
    convert() {
        wx.navigateTo({
            url: '../convert/convert',
        })
    },
    mall() {
        wx.navigateTo({
            url: '../malls/malls',
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
        var that = this
        wx.getStorage({
            key: 'id',
            success(res) {
                that.setData({
                    isLogin: false
                })
                wx.vrequest({
                    url: 'http://1.15.144.204:8080/getJf',
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    method: "POST",
                    data: {
                        id: res.data
                    },
                    success(resp) {
                        var data = JSON.parse(resp.data).jf

                        wx.setStorage({
                            key: "jf",
                            data: data
                        })
                        that.setData({
                            jf: data
                        })
                    }
                })
            },
            fail: function (res) {
                that.setData({
                    isLogin: true
                })
            }
        })
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