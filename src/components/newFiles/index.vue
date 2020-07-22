<template>
  <!-- 最新文件 政策法规 -->
  <div id="newFiles" class="listStyle">
    <div class="top" id="goToHere">
      <!-- 法规层级 -->
      <classification-rules
        ref="classification"
        @showGetData="showGetData"
        @changeTagid="changeTagid"
        :classifytag="data"
        :stime="stime"
        :etime="etime"
        :searchText="searchText"
      ></classification-rules>
      <!-- 法规层级 -->
      <regulations-hierarchy ref="regulations"></regulations-hierarchy>
      <!-- 搜索框 -->
      <SearchBox
        ref="searchBox"
        @searchKeyWord="searchKeyWord"
        @selectTime="selectTime"
        @clearTime="clearTime"
      ></SearchBox>
      <!-- 列表组件 -->
      <list-content ref="listContent" :lists="lists" :total="total"></list-content>
      <!-- 一键上传 -->
      <upload-file ref="uploadFile"></upload-file>
    </div>
    <!-- 分页 -->
    <div v-if="total > 0" class="pageBoxStyle">
      <!-- <div class="clickPage">
            <van-pagination ref="vanPager" v-model="currentPage" :page-count="total" mode="simple" @change="changePage" />
      </div> -->
      <Pagination
        :currentPage="currentPage"
        :total="total"
        :totalLists="totalLists"
        @prevPage="prevPage"
        @nextPage="nextPage"
        @jumpToPageSize="jumpToPageSize"
      ></Pagination>
    </div>

    <!-- 底部导航 -->
    <tabbar
      ref="tabbar"
      @alertBars="alertBars"
      @alertCengji="alertCengji"
      @updateOrDelete="updateOrDelete"
      @chooseUpdateOrDelete="chooseUpdateOrDelete"
      :selectedID="selectedId"
    ></tabbar>
    <van-overlay :showLoding="showLoding"></van-overlay>
  </div>
</template>
<script>
import SearchBox from '@/components/common/search'
import Tabbar from '@/components/common/tabbar'

import ClassificationRules from '@/components/common/classificationRules' // 法规分类
import RegulationsHierarchy from '@/components/common/regulationsHierarchy' // 法规层级
import UploadFile from '@/components/common/uploadFile' // 一键上传
import ListContent from '@/components/common/listContent'
import VanOverlay from '@/components/common/vanOverlay'
import Vue from 'vue'
import Pagination from '@/components/common/pagination' // 分页
// import TripleDES from '@/utils/lib/crypto.js'
export default {
  data () {
    return {
      isShowPager: false,
      showLoding: false,
      selectedId: 'a',
      currentPage: 1,
      total: 0,
      totalLists: 0,
      lists: [], // 列表的数据
      classifytag: [], // 搜索下拉列表
      data: {},
      showNav: false, // 显示法规分类弹框
      minback: 0,
      minlock: 0,
      flag: false, // 数据返回后再加载组件
      stime: '', // 开始时间
      etime: '', // 结束时间
      searchText: '', // 搜索关键字
      tagid: '',
      showData: {},
      updateDatas: {},
      SearchTimes: 1,
      isFilter: false
    }
  },
  components: {
    SearchBox,
    Tabbar,
    ClassificationRules,
    RegulationsHierarchy,
    UploadFile,
    ListContent,
    VanOverlay,
    Pagination
  },
  computed: {
    userId () {
      return this.$store.state.user.userId
    },
    changeFlag () { // 切换全国版 true 与地方版 false
      return this.$store.state.changeVersion.changeFlag
    }
  },
  created () {
    // let data1 = TripleDES.decode('token', JSON.parse(this.$cookie.get('cookieObj')))
    // console.log('main==data1data1', data1)
    this.getData()
  },
  mounted () { },
  methods: {
    //show total
    // showPagerTotal() {
    //     var isExistTotalElement = document.getElementById('pager_total')
    //     if (!isExistTotalElement) {
    //         var span =document.createElement('span')
    //         span.innerHTML="页"
    //         var el = document.createElement('li')
    //         el.setAttribute('class', 'van-pagination__page-desc')
    //         el.setAttribute('id', 'pager_total')
    //         el.innerHTML = "共" + this.totalLists + "条"
    //         var lastChild = this.$refs.vanPager.$el.childNodes[2]
    //         this.$refs.vanPager.$el.insertBefore(el, lastChild)  
    //         this.$refs.vanPager.$el.childNodes[1].appendChild(span)
    //     } else {
    //         isExistTotalElement.innerHTML = "共" + this.totalLists + "条"
    //     }
    // },
    // 清除时间和搜索框的内容
    clearMsg () {
      this.$refs.searchBox.clearMsg()
    },
    showGetData (data) {
      // console.log('data===>', data)
      this.showData = data
      this.tagid = data.tagid
      this.getData(this.tagid, data.stime, data.etime, data.searchText)
    },
    // 选择时间
    selectTime (time) {
      // this.thisFs = false
      this.SearchTimes = 2
      this.stime = time.stime
      this.etime = time.etime
      this.currentPage = 1
      this.getData(this.tagid, this.stime, this.etime, this.searchText)
      this.backStatus()
      this.$refs.listContent.toggle([])
    },
    // 搜索按钮
    searchKeyWord (keyword) {
      this.SearchTimes = 2
      this.searchText = keyword
      this.currentPage = 1
      this.getData(this.tagid, this.stime, this.etime, this.searchText)
      this.backStatus()
      this.$refs.listContent.toggle([])
    },
    // 清除时间按钮
    clearTime () {
      this.SearchTimes = 2
      this.stime = ''
      this.etime = ''
      this.currentPage = 1
      this.getData(this.tagid, this.stime, this.etime, this.searchText)
      this.backStatus()
      this.$refs.listContent.toggle([])
    },
    // 改变tagid的值
    changeTagid (val) {
      this.isFilter = true // 切换tag的时候传true
      this.tagid = val
      this.backStatus()
      this.$refs.listContent.toggle([])
    },
    // 获取最新文件列表
    getData (tagid, stime, etime, text) {
      console.log('获取最新文件列表的token', this.$store.state.user.token)
      // console.log('this.currentPage999999999999999999999', this.currentPage, tagid, stime, etime, text)
      // console.log('this.SearchTimes', this.SearchTimes)
      // console.log('this.isFilter', this.isFilter)
      this.showLoding = true
      let nodes = Vue.prototype.$baseConfig.code
      if (tagid && tagid !== undefined) {
        this.isFilter = true
      } else {
        this.isFilter = false
      }
      let params = {
        searchtimes: this.SearchTimes, // 查询次数，第一次查询一定传1，二次查询传2
        frist: {
          text: '',
          potence: '',
          icode: '',
          tcode: '',
          kcode: '',
          country: '',
          ps: {},
          dirid: '', // 上传目录ID，云端查询需要这个参数
          id: ''
        },
        second: [{
          text2: text && text !== undefined ? text : '',
          stime: stime && stime !== undefined ? stime : '',
          etime: etime && etime !== undefined ? etime : ''
        }],
        fliter: {
          isfilter: this.isFilter,
          tagpc: [{ p: '000000', c: '000000' }],
          tagid: tagid && tagid !== undefined ? tagid : ''
        },
        pager: [{
          pagesize: 10, // 当前页  
          pageindex: this.currentPage, // 每页显示的条数
        }]
      }

      console.log('获取最新文件列表', params)
      this.updateDatas = params
      this.$http.reqGetLasFiles(params, nodes).then(response => {
        console.log('全国版法规政策返回的数据', response)
        this.showLoding = false
        this.lists = response.tbls[0].items !== null ? response.tbls[0].items : []
        this.total = Math.ceil(response.tbls[0].total / 10)
        this.totalLists = response.tbls[0].total // 总的条数
        this.classifytag = response.tbls[0].classifytag
        this.minback = response.tbls[0].minback
        this.minlock = response.tbls[0].minlock
        this.flag = true
        this.data = {
          classifytag: this.classifytag,
          minlock: this.minlock ? this.minlock : 0
        }

        this.$store.dispatch('choose/updateLists', this.lists)

        this.bus.$emit('classifytagData', this.data)
        // if (this.total > 0) {
        //     this.isShowPager = true
        //     this.showPagerTotal()
        // }
      }).catch(() => {
        this.showLoding = false
        // console.log('err====>1', err.message)
      })
    },
    // 改变页码
    changePage (num) {
      this.currentPage = num
      this.$nextTick(() => {
        let dom = document.getElementById('goToHere')
        dom.scrollIntoView()
      })
      this.getData(this.tagid, this.stime, this.etime, this.searchText)
    },
    prevPage () {  // 上一页
      if (this.currentPage == 1) return
      this.currentPage--
      this.$nextTick(() => {
        let dom = document.getElementById('goToHere')
        dom.scrollIntoView()
      })
      this.getData(this.tagid, this.stime, this.etime, this.searchText)
    },
    nextPage () {  // 下一页
      if (this.currentPage == this.total) return
      this.currentPage++
      this.$nextTick(() => {
        let dom = document.getElementById('goToHere')
        dom.scrollIntoView()
      })
      this.getData(this.tagid, this.stime, this.etime, this.searchText)
    },
    jumpToPageSize(num) {  // 跳转到多少页
      this.currentPage = num
      this.getData(this.tagid, this.stime, this.etime, this.searchText)
    },
    // 点击弹出搜索导航框
    alertBars () {
      // console.log('this.lists===>', this.lists)
      // console.log('this.totalLists===>', this.totalLists)
      // console.log('this.classifytag===>', this.classifytag)
      if (this.lists.length === 0 && this.classifytag.length === 0 && this.totalLists === 0) {
        this.$refs.classification.alertBar4()
      } else {
        this.$refs.classification.alertBars()
      }
    },
    // 清除数据
    alertBars1 () {
      this.currentPage = 1
      this.$refs.classification.alertBars1()
    },

    // 点击弹出法规层级框
    alertCengji () {
      this.$refs.regulations.alertCengji()
    },
    // 点击一键上传
    updateOrDelete () {
      // console.log('点击了全国版政策法规的一键上传', this.updateDatas)
      // this.$refs.uploadFile.updateOrDelete(this.updateDatas, '最新文件')

      if (this.userId) {
        this.$refs.uploadFile.updateOrDelete(this.updateDatas, '最新文件')
      } else {
        this.$notify({ color: '#fff', background: '#b99573', message: '请先登录' })
      }
    },
    // 点击选择上传
    chooseUpdateOrDelete () {
      if (this.userId) {
        if (this.$store.state.choose.flag1 === false && this.$store.state.choose.lists.length > 0 && this.$store.state.choose.result.length === 0) {
          this.$refs.listContent.changeFlag()
          this.$store.commit('choose/setFlag1', true)
          this.$store.commit('choose/setChooseUp1', '确定')
          this.$notify({
            color: '#fff',
            background: '#b99573',
            message: '请先选择要上传的文件'
          })
        } else if (this.$store.state.choose.flag1 === true && this.$store.state.choose.lists.length > 0 && this.$store.state.choose.result.length === 0) {
          this.backStatus()
          this.clearResult()
        } else if (this.$store.state.choose.flag1 === true && this.$store.state.choose.lists.length > 0 && this.$store.state.choose.result.length > 0) {
          this.$refs.uploadFile.updateOrDelete(this.$store.state.choose.result, '选择上传')
        }
      } else {
        this.$notify({
          color: '#fff',
          background: '#b99573',
          message: '请先登录'
        })
      }
    },
    // 恢复选择的状态
    backStatus () {
      this.$refs.listContent.changeFlag2()
      this.$store.commit('choose/setFlag1', false)
      this.$store.commit('choose/setChooseUp1', '选择上传')
      this.$store.commit('choose/setResult', [])
    },
    clearResult () {
      this.$refs.listContent.toggle([])
    }
  },
  destroyed () {
    this.$store.commit('choose/setFlag1', false)
    this.$store.commit('choose/setChooseUp1', '选择上传')
    this.$store.dispatch('choose/updateLists', [])
    this.$store.commit('choose/setResult', [])
  }
}
</script>
<style lang="less" scoped>
#newFiles {
  display: flex;
  flex-direction: column;

  .top {
    flex: 1;
    margin-bottom: 70px;
  }
}
</style>
<style>
.van-dropdown-item__content {
  max-height: 100%;
}
</style>