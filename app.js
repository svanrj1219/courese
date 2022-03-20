// app.js
require('./utils/v-request.js')
App({
  onLaunch() {
    wx.cloud.init({
      env:"test-6g9apzk59613b672",
      traceUser:true
    })
    // const db=wx.cloud.database();
    // const classes=db.collection('classes');

    // classes.get().then(res=>{
    //   this.class=res.data[0].class;
    //   console.log(this.class)
    // })
  },
})
