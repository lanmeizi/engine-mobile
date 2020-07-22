<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import templogin from '@/utils/lib/tempLogin.js'  // 临时登录
export default {
  name: "App",
  data() {
    return {}
  },
  created() {
    // let data2 = TripleDES.decode('token', JSON.parse(this.$cookie.get('cookieObj')))
    // console.log('获取前data2data2data2', document.URL)
   
    // 执行临时登录
    if (sessionStorage.userId === undefined && this.$cookie.get('cookieObj') === null) {
      templogin()
    }
  },
  mounted() {
    localStorage.setItem('selectedId', 'a')
  }
}
</script>
<style lang="less">
@import "~@/styles/index.less";

html,
body,
#app {
  width: 100%;
  height: 100%;
  // background: #fff;
}
</style>