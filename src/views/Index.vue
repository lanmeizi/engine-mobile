<template>
  <!-- 首页 -->
  <div id="indexPage" class="pageContainer">
    <div class="test"></div>
    <div class="btnChange">
      <div class="btnChange-child btn-fg" @click.stop="btnClick('fg')"></div>
      <div class="btnChange-child btn-ss" @click.stop="btnClick('ss')"></div>
      <div class="btnChange-child btn-zh" @click.stop="btnClick('zh')"></div>
    </div>
    <div class="loginChange">
      <div class="loginChange-child btn-login" @click.stop="login"></div>
      <div class="loginChange-child btn-test" @click="applyLogin"></div>
    </div>
    <audio id="bgMusic">
      <source src="../assets/indexAudio/btnChange.mp3" type="audio/mp3" />
    </audio>
    <audio id="loginMusic">
      <source src="../assets/indexAudio/btnLogin.mp3" type="audio/mp3" />
    </audio>
    <div class="ss"></div>
    <div class="zh"></div>
    <div class="fg"></div>
    <login ref="alertModel"></login>
  </div>
</template>

<script>
import Login from '@/components/common/login'
import TripleDES from '@/utils/lib/crypto.js'
// import { getUrlKey } from '@/utils/lib/getUrlKey.js'
export default {
  data () {
    return {
      loginNum: 0,
      applyLoginNum: 0,
      clickNum: 0,
      value: 'fg',
      owx: ''
    }
  },
  components: {
    Login
  },
  computed: {
    userId() {
      return this.$store.state.user.userId
    }
  },
  created() {
    // console.log('Index页面-点击注销登录-token==6666>', this.$store.state.user.token)
    // let innerHeight=window.innerHeight
    // let innerWidth=window.innerWidth
    // console.log(innerWidth,innerHeight)

    // 地址栏：`http://localhost:9527/#/newPage?LIFNR=1000000524`
    //获取地址栏参数
    // this.owx = getUrlKey('o')
    // this.$store.commit('user/Owx', this.owx)

    // console.log('token===', this.$store.state.user.token)
    
    if (sessionStorage.userId === undefined && this.$cookie.get('cookieObj') === null) {
      this.templogin()
    }

    // https://www.holywiser.com/api2  http://192.168.8.31:20201
    if (sessionStorage.userId === undefined && this.$cookie.get('cookieObj') !== null) {
      console.log('执行前的更新token', this.$store.state.user.token)
      this.$http.refreshToken().then(resp => {
        console.log('resp888', resp)
        if (resp.rtncode === 1) {
          if (resp.rltcode === 1) {
            // this.$cookie.delete('cookieObj')
            this.$store.commit('user/setUserId', resp.userid)
            this.$store.commit('user/setUserGuid', resp.userguid)
            this.$store.commit('user/setRealName', resp.realname)
            this.$store.commit('user/setToken', resp.token)
            this.$store.commit('user/setMobileNum', resp.mobilenum)
            this.$store.commit('user/setPermission', resp.permission)

            sessionStorage.setItem('userId', resp.userid)
            sessionStorage.setItem('userguid', resp.userguid)
            sessionStorage.setItem('token', resp.token)
            sessionStorage.setItem('phone', resp.mobilenum)

            let cookieObj = {
              userId: resp.userid,
              userguid: resp.userguid,
              realname: resp.realname,
              token: resp.token,
              phone: resp.mobilenum,
              permission: resp.permission
            }
            let data = TripleDES.encode('token', cookieObj)
            this.$cookie.set('cookieObj', JSON.stringify(data), 4)
          }
        }
      })
    }

    if (this.$route.query.o) {
      this.owx = this.$route.query.o
      this.$store.commit('user/setOwx', this.owx)
    }
    
    // console.log('this.o', this.owx)  //1000000524
  },
  mounted() {
    // 监听浏览器回退键
    if (window.history && window.history.pushState) {
      window.history.pushState('forward', null, '#')
      window.history.forward(1)
      let that = this
      window.onpopstate = function () {
        window.history.pushState('forward', null, '#')
        window.history.forward(1)
        that.$router.push({ path: '/' })
      }
    }
    this.$store.commit('changeVersion/setChangeFlag', true)
  },
  methods: {
    templogin() {
      this.$http.reqTempLogin().then(resp => {
        if (resp.rtncode === 1) {
          if (resp.rltcode === 1) {
            if (resp.usertype === 'temp' && sessionStorage.userId === undefined && this.$cookie.get('cookieObj') === null) {
              console.log('resp临时登录66666', resp)
              this.$store.commit('user/setUserId', resp.userid)
              this.$store.commit('user/setUserGuid', resp.userguid)
              this.$store.commit('user/setRealName', resp.realname)
              this.$store.commit('user/setToken', resp.token)
              this.$store.commit('user/setMobileNum', resp.mobileNum)
              this.$store.commit('user/setIsLogin', true)
              this.$store.commit('user/setUserType', resp.usertype)
              this.$store.commit('user/setPermission', resp.permission)

              sessionStorage.setItem('userguid', resp.userguid)
              sessionStorage.setItem('token', resp.token)
            }
          }
        }
      })
    },
    btnClick (value) {
      // console.log(document.querySelector('#bgMusic'));
      if (this.value !== value) {
        document.querySelector('#bgMusic').currentTime = 0
        document.querySelector('#bgMusic').play()
      }
      if (value === 'fg') {
        this.goToHomePage(0)
        document.querySelector('#indexPage').className = "pageContainer fg"
      }
      if (value === 'ss') {
        this.goToHomePage(1)
        document.querySelector('#indexPage').className = "pageContainer ss"
      }
      if (value === 'zh') {
        this.goToHomePage(2)
        document.querySelector('#indexPage').className = "pageContainer zh"
      }
      this.value = value
    },
    goToHomePage (item) {
      this.clickNum = item
      if (item === 0 && this.userId) {
        this.$store.commit('commonSearchData/changeActiveName', 'a')
        localStorage.setItem('selectedId', 'a')
        setTimeout(()=>{
          this.$router.push({ name: 'Main'})
        },1000)
        // this.$router.push({ name: 'Main', params: { source: 1 } })
      } else if (item === 1 && this.userId) {
        this.$store.commit('commonSearchData/changeActiveName', 'b')
        localStorage.setItem('selectedId', 'b')
        setTimeout(()=>{
          this.$router.push({ name: 'Main'})
        },1000)
        // this.$router.push({ name: 'Main', params: { source: 1 } })
      } else if (item === 2 && this.userId) {
        this.$store.commit('commonSearchData/changeActiveName', 'c')
        localStorage.setItem('selectedId', 'c')
        setTimeout(()=>{
          this.$router.push({ name: 'Main'})
        },1000)
        // this.$router.push({ name: 'Main', params: { source: 1 } })
      }
    },
    // 登录按钮
    login () {
      // let token = this.$store.state.user.token
      // console.log('登录按钮===token', token)

      if (this.clickNum === 0) {
        this.$store.commit('commonSearchData/changeActiveName', 'a')
        localStorage.setItem('selectedId', 'a')
      } else if (this.clickNum === 1) {
        this.$store.commit('commonSearchData/changeActiveName', 'b')
        localStorage.setItem('selectedId', 'b')
      } else if (this.clickNum === 2) {
        this.$store.commit('commonSearchData/changeActiveName', 'c')
        localStorage.setItem('selectedId', 'c')
      }
      document.querySelector('#loginMusic').currentTime = 0
      document.querySelector('#loginMusic').play()
      if (!this.userId) {
        this.$refs.alertModel.changeShowLogin(true)  // 弹出登录框
      } else {
        this.$router.push({ name: 'Main'})
        // setTimeout(()=>{
        //   this.$router.push({ name: 'Main'})
        // },1000)
        // this.$router.push({ name: 'Main', params: { source: 2 } })
      }
    },
    // 申请试用按钮
    applyLogin () {
      document.querySelector('#loginMusic').currentTime = 0
      document.querySelector('#loginMusic').play()
      this.$refs.alertModel.changeShowApplyLogin(true)  // 弹出申请试用框
    }
  }
}
</script>

<style lang="less" scoped>
#indexPage {
  // height: 18rem;
  background-image: url(../assets/indexImg/fgbg.png),
    url(../assets/indexImg/csbg.jpg);
  background-repeat: no-repeat, no-repeat;
  background-size: 100% auto, 100% 100%;
  -webkit-background-size: 100% auto, 100% 100%;
  background-attachment: fixed;
  -webkit-background-attachment: fixed;
  position: relative;
  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > div {
      margin-top: 20px;
    }
  }
}
#indexPage:before {
  content: '';
  display: table;
}
.btnChange {
  // background: red;
  height: 5.3rem;
  width: 5.3rem;
  border-radius: 50%;
  margin: auto;
  left: 0;
  right: 0;
  top: 5.6rem;
  position: absolute;
  overflow: hidden;
  z-index: 10;
}
.btnChange-child {
  z-index: 1;
  position: absolute;
  width: 58%;
  height: 58%;
  left: 50%;
  top: 50%;
  transform-origin: 0% 0%;
}
.ss {
  background-image: url(../assets/indexImg/ssbg.png),
    url(../assets/indexImg/csbg.jpg) !important;
}
.fg {
  background-image: url(../assets/indexImg/fgbg.png),
    url(../assets/indexImg/csbg.jpg) !important;
}
.zh {
  background-image: url(../assets/indexImg/zhbg.png),
    url(../assets/indexImg/csbg.jpg) !important;
}
.btn-fg {
  transform: rotate(30deg) skewX(-30deg);
  // background-color: yellowgreen;
}
.btn-ss {
  transform: rotate(150deg) skewX(-30deg);
  // background-color: blue;
}
.btn-zh {
  transform: rotate(270deg) skewX(-30deg);
}
.loginChange {
  // background: red;
  height: 1.18rem;
  width: 100%;
  position: absolute;
  top: 12.7rem;
  left: 0;
  display: flex;
  justify-content: space-around;
  // justify-content: space-evenly;
}
.loginChange-child {
  width: 3.7rem;
  height: 100%;
  // background: yellowgreen;
}
.btn-login {
  background-image: url(../assets/indexImg/dl2.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
}
.btn-test {
  background-image: url(../assets/indexImg/sy2.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
}
</style>
