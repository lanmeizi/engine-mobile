<template>
<!-- 主页内容 -->
  <div id="mainContainer" class="pageContainer">
    <van-sticky>
      <LoginPage></LoginPage>
    </van-sticky> 
    <div class="container">
      <nav-page></nav-page>
    </div>
    <audio id="bgMusic">
      <source src="../assets/indexAudio/btnChange.mp3" type="audio/mp3" />
    </audio>
    <audio id="loginMusic">
      <source src="../assets/indexAudio/btnLogin.mp3" type="audio/mp3" />
    </audio>
  </div>
</template>

<script>
import LoginPage from './Login'
import NavPage from './NavPage'
export default {
  data() {
    return {
    }
  },
  components: {
    LoginPage,
    NavPage
  },
  created() {
    let source = this.$route.params.source
    this.$nextTick(() => {
      if (source !== undefined) {
        if (source === 1) {
          document.querySelector('#bgMusic').currentTime = 0
          document.querySelector('#bgMusic').play()
        } else {
          document.querySelector('#loginMusic').currentTime = 0
          document.querySelector('#loginMusic').play()
        }
      }
    })
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
        that.$dialog.confirm({
          title: '提示',
          message: '是否回到众智云擎首页?',
          confirmButtonText: '确定'
        })
        .then(() => {
          that.$router.push({path: '/'})
          localStorage.setItem('selectedId', 'a')
        })
        .catch(() => {
          // on cancel
        })
      }
    }
    // window.history.pushState('forward', null, '#') // 在IE中必须得有这两行
    // window.history.forward(1)
  }
}
</script>

<style lang="less" scoped>
#mainContainer {
  height: 100%;
}
</style>
