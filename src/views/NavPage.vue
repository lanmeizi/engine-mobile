<template>
  <!-- 导航菜单 -->
  <div id="appsNav">
    <van-tabs v-model="activeName" sticky :offset-top="40" @change="navChange" @disabled="clickDisabled">
      <van-tab title="政策法规" name="a">
        <NewFiles v-if="changeFlag" ref="newfiles"></NewFiles>
        <NewFilesD v-else-if="!changeFlag" ref="newfilesD"></NewFilesD>
      </van-tab>
      <van-tab title="搜索引擎" name="b">
        <SearchEngine v-if="changeFlag" ref="searchEngine"></SearchEngine>
        <SearchEngineD v-else-if="!changeFlag" ref="searchEngineD"></SearchEngineD>
      </van-tab>
      <van-tab title="智慧云端" name="c"><Smartcloud ref="smartcloud"></Smartcloud></van-tab>
      <van-tab title="特别声明" name="g"><important-clause></important-clause></van-tab>
      <van-tab title="网上商城" name="d"><OnlineMall></OnlineMall></van-tab>
      <!-- <van-tab title="操作手册" name="e" disabled><Usermanual></Usermanual></van-tab>
      <van-tab title="演示视频" name="f" disabled><Video></Video></van-tab> -->
    </van-tabs>
    <login ref="alertModel"></login>
  </div>
</template>

<script>
import Login from '@/components/common/login';
import NewFiles from '@/components/newFiles'
import NewFilesD from '@/components/newFiles/index_D.vue'
import SearchEngine from '@/components/searchEngine'
import SearchEngineD from '@/components/searchEngine/index_D.vue'
import Smartcloud from '@/components/smartcloud'
import OnlineMall from '@/components/onlineMall'
import Usermanual from '@/components/usermanual'
import Video from '@/components/video'
import ImportantClause from '@/components/importantClause'

export default {
  data() {
    return {}
  },
  components: {
    Login,
    NewFiles,
    NewFilesD,
    SearchEngine,
    SearchEngineD,
    Smartcloud,
    OnlineMall,
    Usermanual,
    Video,
    ImportantClause
  },
  computed: {
    userId() {
      return this.$store.state.user.userId
    },
    changeFlag() { // 切换全国版 true 与地方版 false
      return this.$store.state.changeVersion.changeFlag
    },
    activeName: {
      get() {
        return this.$store.state.commonSearchData.activeName
      },
      set() {
        this.$store.commit('commonSearchData/changeActiveName', localStorage.getItem('selectedId'))
      }
    }
  },
  mounted() {},
  methods: {
    navChange(name, title) {
      // console.log('name', name)
      this.$store.commit('commonSearchData/changeActiveName', name)
      if (name === 'a' && title === '政策法规' && this.changeFlag) {
        this.$nextTick(() => {
          this.$refs.newfiles.tagid = ''
          this.$refs.newfiles.stime = ''
          this.$refs.newfiles.etime = ''
          this.$refs.newfiles.searchText = ''
          this.$refs.newfiles.SearchTimes = 1
          this.$refs.newfiles.getData()
          this.$refs.newfiles.alertBars1()
          this.$refs.newfiles.backStatus()
          this.$refs.newfiles.clearResult()
          this.$refs.newfiles.clearMsg() // 清除搜索框的内容和搜索时间的内容
        })
      } else if (name === 'a' && title === '政策法规' && !this.changeFlag) {
        this.$nextTick(() => {
          this.$store.commit('commonSearchData/changeActivePlace', 0)
          this.$refs.newfilesD.tagid = ''
          this.$refs.newfilesD.stime = ''
          this.$refs.newfilesD.etime = ''
          this.$refs.newfilesD.searchText = ''
          this.$refs.newfilesD.SearchTimes = 1
          this.$refs.newfilesD.getData()
          this.$refs.newfilesD.alertBars1()

          this.$refs.newfilesD.backStatus()
          this.$refs.newfilesD.clearResult()

          // this.$refs.newfilesD.clearArrayData()

          this.$refs.newfilesD.clearMsg() // 清除搜索框的内容和搜索时间的内容
        })
      } else if (name === 'b' && title === '搜索引擎' && this.changeFlag) {
        this.$nextTick(() => {
          this.$refs.searchEngine.tagid = ''
          this.$refs.searchEngine.stime = ''
          this.$refs.searchEngine.etime = ''
          this.$refs.searchEngine.searchText = ''
          this.$refs.searchEngine.startClear()

          this.$refs.searchEngine.backStatus()
          this.$refs.searchEngine.clearResult()
          this.$refs.searchEngine.clearMsg() // 清除搜索框的内容和搜索时间的内容
        })
      } else if (name === 'b' && title === '搜索引擎' && !this.changeFlag) {
        this.$nextTick(() => {
          this.$refs.searchEngineD.tagid = ''
          this.$refs.searchEngineD.stime = ''
          this.$refs.searchEngineD.etime = ''
          this.$refs.searchEngineD.searchText = ''
          this.$refs.searchEngineD.startClear()

          this.$refs.searchEngineD.backStatus()
          this.$refs.searchEngineD.clearResult()
          this.$refs.searchEngineD.clearMsg() // 清除搜索框的内容和搜索时间的内容
        })
      } else if (name === 'c' && title === '智慧云端' && this.userId) {
        this.$nextTick(() => {
          this.$refs.smartcloud.backStatus()
          this.$refs.smartcloud.clearResult()
          this.$refs.smartcloud.docFolidName = '全部文件归档'
          this.$refs.smartcloud.chooseDir = '全部文件夹'
          this.$refs.smartcloud.deleteAll = false
          this.$refs.smartcloud.isFilter = false
          this.$refs.smartcloud.clearData()
          this.$refs.smartcloud.clearMsg() // 清除搜索框的内容和搜索时间的内容
          this.$refs.smartcloud.clearClassData() // 初始化数据
        })
      } else if (name === 'c' && title === '智慧云端' && !this.userId) {
        this.$refs.alertModel.changeShowLogin(true)
      }
    },
    // 点击禁用标签时
    clickDisabled(name, title) {
      if (name === 'e' && title === '操作手册') {
        this.$toast('暂未开放')
      } else if (name === 'f' && title === '演示视频') {
        this.$toast('暂未开放')
      }
    }
  }
}
</script>

<style lang="less">
// #appsNav {
//   height: 60px;
// }
.van-tabs--line .van-tabs__wrap {
  height: 40px;
}
</style>
