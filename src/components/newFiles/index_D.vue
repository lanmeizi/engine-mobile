<template>
  <!-- 最新文件 政策法规 -->
  <div id="newFilesD" class="listStyle">
    <!-- 点击弹出搜索弹框 -->
    <div @click="showSearchPopup = true" class="openPopup" id="goToHere">
      <van-sticky :offset-top="80">
        <van-cell  v-if="valueP === '' && valueProvCode === ''" title="定位失败" style="font-size: 12px;" is-link value="切换到其他省/市" />
        <van-cell  v-else-if="valueC !== '' && valueCityCode !== ''" :title="'当前城市：'+valueP+'/'+valueC" style="font-size: 12px;" is-link value="切换到其他省/市" />
        <van-cell  v-else :title="'当前城市：'+valueP" style="font-size: 12px;" is-link value="切换到其他省/市" />
      </van-sticky>
    </div>
    <div class="top">
      <!-- 法规层级 -->
      <classification-rules ref="classification" @showGetData="showGetData" @changeTagid="changeTagid" :classifytag="data" :stime="stime" :etime="etime" :searchText="searchText"></classification-rules>
      <!-- 法规层级 -->
      <regulations-hierarchy ref="regulations"></regulations-hierarchy>
      <!-- 搜索框 -->
      <SearchBox ref="searchBox" @searchKeyWord="searchKeyWord" @selectTime="selectTime" @clearTime="clearTime"></SearchBox>
      <!-- 城市切换弹框 -->
      <van-popup v-model="showSearchPopup" closeable close-icon="close" position="top" :style="{ height: '100%' }">
        <div class="selectNavS">
          <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', fontSize: '17px', marginTop: '20px' }">
            城市切换
          </van-divider>
          <van-area title="城市切换" 
            :area-list="areaList" 
            :columns-num="3" 
            :value="valueC !== '' && valueCityCode !== '' ? valueCityCode : valueProvCode"
            @confirm="clickConfirmWord"
            @cancel="clickCancelWord"
          />
        </div>
      </van-popup>
      <!-- 列表组件 -->
      <list-content ref="listContent" 
        :provinceLists="provinceLists" 
        :cityLists="cityLists" 
        :globalLists="globalLists" 
        :place="place"
        @changeCityFlag="changeCityFlag" 
        @changeProvinceFlag="changeProvinceFlag"
        @changeGlobalFlag="changeGlobalFlag"
        :totalLists="totalLists"
        :totalLists1="totalLists1"
        :totalLists2="totalLists2"
      ></list-content>
      <!-- 一键上传 -->
      <upload-file ref="uploadFile"></upload-file>
    </div>

    <!-- 分页 -->
    <!-- 全国 -->
    <div v-if="globalFlag && globalLists.length > 0" class="pageBoxStyle">
      <van-pagination v-model="currentPage" :page-count="total" mode="simple" @change="changePage" />
    </div>
    <!-- 省份 -->
    <div v-if="provinceFlag && provinceLists.length > 0" class="pageBoxStyle">
      <van-pagination v-model="currentPage1" :page-count="total1" mode="simple" @change="changePage1" />
    </div>
    <!-- 城市 -->
    <div v-if="cityFlag && cityLists.length > 0" class="pageBoxStyle">
      <van-pagination v-model="currentPage2" :page-count="total2" mode="simple" @change="changePage2" />
    </div>
    
    <!-- 底部导航 -->
    <tabbar ref="tabbar" @alertBars="alertBars" @alertCengji="alertCengji" @updateOrDelete="updateOrDelete" @chooseUpdateOrDelete="chooseUpdateOrDelete" :selectedID="selectedId"></tabbar>

    <van-overlay :showLoding="showLoding"></van-overlay>
    <!-- <van-overlay :show="showLoding" @click="showLoding = false" z-index="9999" :custom-style="{background: 'transparent'}">
      <div class="wrapper" @click.stop>
        <van-loading type="spinner" color="#1989fa">文件加载中...</van-loading>
      </div>
    </van-overlay> -->

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
export default {
  data() {
    return {
      showLoding: false,
      pp: '', // 定位的省份
      cc: '', // 默认选中定位的城市
      selectedId: 'a',
      currentPage: 1, // 全国
      currentPage1: 1, // 省份
      currentPage2: 1,  // 城市
      total: 0, // 全国
      total1: 0, // 省份
      total2: 0, // 城市
      totalLists: 0,
      totalLists1: 0,
      totalLists2: 0,
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
      showSearchPopup: false, // 切换城市弹框
      provinceLists: [], // 省份
      cityLists: [], // 城市
      globalLists: [], // 全国
      place: true, // 显示列表的标记
      cityFlag: true,
      provinceFlag: false,
      globalFlag: false,
      areaList: {}, // 城市选择
      province: {},
      city: {},
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
    VanOverlay
  },
  computed: {
    userId() {
      return this.$store.state.user.userId
    },
    changeFlag() { // 切换全国版 true 与地方版 false
      return this.$store.state.changeVersion.changeFlag
    },
    valueP() {
      return this.$store.state.commonSearchData.valueP
    },
    valueC() {
      return this.$store.state.commonSearchData.valueC
    },
    valueProvCode() {
      return this.$store.state.commonSearchData.valueProvCode
    },
    valueCityCode() {
      return this.$store.state.commonSearchData.valueCityCode
    },
    changeActivePlace() {
      return this.$store.state.commonSearchData.activePlace
    }
  },
  created() {
    this.getData()
    this.reqGetProvinceAndCity()
  },
  mounted() {
    this.pp = this.$store.state.commonSearchData.valueProvCode
    this.cc = this.$store.state.commonSearchData.valueCityCode
    // console.log('this.$store.state.commonSearchData', this.$store.state.commonSearchData)
    if (this.valueC === '' && this.valueCityCode === '' && this.valueP === '' && this.valueProvCode === '') {
      this.cityFlag = false
      this.provinceFlag = false
      this.globalFlag = true
    } else if (this.valueC === '' && this.valueCityCode === '') {
      this.cityFlag = false
      this.provinceFlag = true
      this.globalFlag = false
    } else {
      this.cityFlag = true
      this.provinceFlag = false
      this.globalFlag = false
    }
  },
  methods: {
    // 清除时间和搜索框的内容
    clearMsg() {
      this.$refs.searchBox.clearMsg()
    },
    // // 点击城市选择的取消按钮
    clickCancelWord() {
      this.showSearchPopup = false
    },
    // 点击城市选择的确定按钮
    clickConfirmWord(data) {
      // console.log('data------->888888888888', data)
      // console.log('this.$store--11111111----->', this.$store.state.commonSearchData)
      
      if (this.changeActivePlace === 0) { // 判断显示分页
        this.cityFlag = true
        this.provinceFlag = false
        this.globalFlag = false
      } else if (this.changeActivePlace === 1) {
        this.cityFlag = false
        this.provinceFlag = true
        this.globalFlag = false
      } else if (this.changeActivePlace === 2) {
        this.cityFlag = false
        this.provinceFlag = false
        this.globalFlag = true
      }

      this.SearchTimes = 1
      this.province = {}
      this.city = {}
      this.clearProOrCityMsg()
      this.tagid = ''
      this.stime = ''
      this.etime = ''
      this.searchText = ''
      this.clearMsg()
      this.showSearchPopup = false
      this.province = data[0]
      this.$store.commit('commonSearchData/changeValueP', this.province.name)
      this.$store.commit('commonSearchData/changeValueProvCode', this.province.code)

      if (data[1] !== undefined && data[2] === undefined) {
        this.city = data[1]
        this.$store.commit('commonSearchData/changeValueC', this.city.name)
        this.$store.commit('commonSearchData/changeValueCityCode', this.city.code)
      }

      if (data[2] !== undefined) {
        this.city = data[2]
        this.$store.commit('commonSearchData/changeValueC', this.city.name)
        this.$store.commit('commonSearchData/changeValueCityCode', this.city.code)
      }

      this.alertBars1()
      this.backStatus()
      this.$refs.listContent.toggle([])
      this.getData(this.tagid, this.stime, this.etime, this.searchText)
    },
    // 获取省市的数据
    reqGetProvinceAndCity() {
      this.$http.reqGetProvinceAndCity().then(res => {
        // console.log('res获取省市9999999======>', res)
        if (res.rtncode === 1) {
          if (res.rltcode === 1) {
            this.$store.dispatch('commonSearchData/updateProvinceAndCity', res.datas)
            let provinceAndCitylists = {
              province_list: {},
              city_list: {
                110100: '北京',
                120100: '天津',
                310100: '上海',
                500100: '重庆'
              },
              county_list: {}
            }
            res.datas.map(item => {
              provinceAndCitylists.province_list[item.id] = item.label
              if (item.id === '110000') {
                if (item.children && item.children.length > 0) {
                  item.children.forEach(item => {
                    provinceAndCitylists.county_list[item.id] = item.label
                  })
                }
              }
              if (item.id === '120000') {
                if (item.children && item.children.length > 0) {
                  item.children.map(item => {
                    provinceAndCitylists.county_list[item.id] = item.label
                  })
                }
              }
              if (item.id === '310000') {
                if (item.children && item.children.length > 0) {
                  item.children.map(item => {
                    provinceAndCitylists.county_list[item.id] = item.label
                  })
                }
              }
              if (item.id === '500000') {
                if (item.children && item.children.length > 0) {
                  item.children.map(item => {
                    provinceAndCitylists.county_list[item.id] = item.label
                  })
                }
              }
              if (item.id !== '110000' && item.id !== '120000' && item.id !== '310000' && item.id !== '500000' && item.children && item.children.length > 0) {
                item.children.map(item => {
                  provinceAndCitylists.city_list[item.id] = item.label
                })
              }
            })
            this.areaList = provinceAndCitylists
            // console.log('this.areaList222', this.areaList)
          }
        }
      })
    },
    // 清除数据
    clearProOrCityMsg() {
      this.currentPage = 1
      this.currentPage1 = 1
      this.currentPage2 = 1
    },
    // 修改标杆信息
    changeCityFlag() {
      this.cityFlag = true
      this.provinceFlag = false
      this.globalFlag = false
      this.backStatus()
      this.$refs.listContent.toggle([])
    },
    changeProvinceFlag() {
      this.cityFlag = false
      this.provinceFlag = true
      this.globalFlag = false
      this.backStatus()
      this.$refs.listContent.toggle([])
    },
    changeGlobalFlag() {
      this.cityFlag = false
      this.provinceFlag = false
      this.globalFlag = true
      this.backStatus()
      this.$refs.listContent.toggle([])
    },
    // 获取/请求地方版默认数据
    getData(tagid, stime, etime, text) {
      // console.log('tthis.cityFlagthis.provinceFlagthis.globalFlag', this.cityFlag, this.provinceFlag ,this.globalFlag)
      // console.log('this.SearchTimes', this.SearchTimes)
      // console.log('this.isFilter', this.isFilter)
      // console.log('tagidtagidtagid', tagid)

      this.showLoding = true
      if (tagid && tagid !== undefined) {
        this.isFilter = true
      } else {
        this.isFilter = false
      }
      // console.log('this.isFilter', this.isFilter)
      let nodes = Vue.prototype.$baseConfig.code
      let args = {
        searchtimes: this.SearchTimes,  // 查询次数，第一次查询一定传1，二次查询传2
        frist: {
          text: '',
          potence: '',
          icode: '',
          tcode: '',
          kcode: '',
          country: '',
          ps: { 
            // p: this.province.code ? this.province.code : '110000', 
            // c: this.city.code ? this.city.code : '110101', 
            p: this.$store.state.commonSearchData.valueProvCode,
            c: this.$store.state.commonSearchData.valueCityCode,
            t: ''
          },
          dirid: '',  // 上传目录ID，云端查询需要这个参数
          id: ''
        },
        second: [
          {
            text2: text && text !== undefined ? text : '',
            stime: stime && stime !== undefined ? stime : '',
            etime: etime && etime !== undefined ? etime : ''
          }
        ],
        fliter: {
          isfilter: this.isFilter,
          tagpc: [
            {p:'000000', c: '000000'},
            {p: this.$store.state.commonSearchData.valueProvCode, c: '000000'},
            {p: this.$store.state.commonSearchData.valueProvCode, c: this.$store.state.commonSearchData.valueCityCode}
            // {p: this.province.code ? this.province.code : '510000', c: '000000'},
            // {p: this.province.code ? this.province.code : '510000', c: this.city.code ? this.city.code : '510100'}
          ],
          tagid: tagid && tagid !== undefined ? tagid : ''
        },
        pager: [
          { pagesize: 10, pageindex: this.currentPage },  // 全国
          { pagesize: 10, pageindex: this.currentPage1 }, // 省级
          { pagesize: 10, pageindex: this.currentPage2 }, // 市级
        ]
      }
      // console.log('请求的参数args===》', args)
      this.updateDatas = args

      this.$http.reqGetLocalLastFiles(args, nodes).then(response => {
        // console.log('地方版法规政策返回的数据111111111111111', response)
        this.showLoding = false
        this.globalLists = response.tbls[0].items !== null ? response.tbls[0].items : []  // 全国
        this.provinceLists = response.tbls[1].items !== null ? response.tbls[1].items : []  // 省份
        this.cityLists = response.tbls[2].items !== null ? response.tbls[2].items : []  // 城市
        this.total = Math.ceil(response.tbls[0].total/10)  // 全国
        this.total1 = Math.ceil(response.tbls[1].total/10)  // 省份
        this.total2 = Math.ceil(response.tbls[2].total/10)  // 城市
        this.totalLists = response.tbls[0].total // 总的条数 全国
        this.totalLists1 = response.tbls[1].total // 总的条数 省份
        this.totalLists2 = response.tbls[2].total // 总的条数 城市
        this.classifytag = response.tbls[0].classifytag
        this.minback = response.tbls[0].minback
        this.minlock = response.tbls[0].minlock
        // this.flag = true
        this.place = true
        this.data = {
          classifytag: this.classifytag,
          minlock: this.minlock ? this.minlock : 0
        }

        // this.$store.dispatch('choose/updateLists', this.lists)
        this.bus.$emit('classifytagData', this.data)
      }).catch(() => {
        this.showLoding = false
        // console.log('err====>2', err.message)
      })
    },
    // 改变页码  全国
    changePage(num) {
      this.currentPage = num
      this.currentPage1 = 1
      this.currentPage2 = 1
      this.$nextTick(() => {
        let dom = document.getElementById('goToHere')
        dom.scrollIntoView()
      })
      this.getData(this.tagid, this.stime, this.etime, this.searchText)
    },
    // 省份
    changePage1(num) {
      this.currentPage = 1
      this.currentPage1 = num
      this.currentPage2 = 1
      this.$nextTick(() => {
        let dom = document.getElementById('goToHere')
        dom.scrollIntoView()
      })
      this.getData(this.tagid, this.stime, this.etime, this.searchText)
    },
    // 城市
    changePage2(num) {
      this.currentPage = 1
      this.currentPage1 = 1
      this.currentPage2 = num
      this.$nextTick(() => {
        let dom = document.getElementById('goToHere')
        dom.scrollIntoView()
      })
      this.getData(this.tagid, this.stime, this.etime, this.searchText)
    },
    showGetData(data) {
      // console.log('data', data)
      this.showData = data
      this.tagid = data.tagid
      this.getData(this.tagid, data.stime, data.etime, data.searchText)
    },
    // 选择时间
    selectTime(time) {
      this.SearchTimes = 2
      this.stime = time.stime
      this.etime = time.etime
      this.currentPage = 1
      this.getData(this.tagid, this.stime, this.etime, this.searchText)
      this.backStatus()
      this.$refs.listContent.toggle([])
    },
    // 搜索按钮
    searchKeyWord(keyword) {
      this.SearchTimes = 2
      this.searchText = keyword
      this.currentPage = 1
      this.getData(this.tagid, this.stime, this.etime, this.searchText)
      this.backStatus()
      this.$refs.listContent.toggle([])
    },
    // 清除时间按钮
    clearTime() {
      this.SearchTimes = 2
      this.stime = ''
      this.etime = ''
      this.currentPage = 1
      this.getData(this.tagid, this.stime, this.etime, this.searchText)
      this.backStatus()
      this.$refs.listContent.toggle([])
    },
    // 改变tagid的值
    changeTagid(val) {
      this.tagid = val
      this.backStatus()
      this.$refs.listContent.toggle([])
    },
    // 点击弹出搜索导航框 法规分类
    alertBars() {
      if (this.globalLists.length === 0 && this.provinceLists.length === 0 && this.cityLists.length === 0 && this.classifytag.length === 0 && this.totalLists === 0 && this.totalLists1 === 0 && this.totalLists2 === 0) {
        this.$refs.classification.alertBar4()
      } else {
        this.$refs.classification.alertBars()
      }
    },
    // 清除数据
    alertBars1() {
      this.$refs.classification.alertBars1()
    },
    // 点击弹出法规层级框
    alertCengji() {
      this.$refs.regulations.alertCengji()
    },
    // 点击一键上传
    updateOrDelete() {
      // console.log('点击了地方版的一键上传的参数数据==》', this.updateDatas)
      let activePlace = this.$store.state.commonSearchData.activePlace
      if (this.userId) {
        if (activePlace === 0 && this.valueC === '' && this.valueCityCode === '' && this.valueP === '' && this.valueProvCode === '') { // 上传全国
          this.$refs.uploadFile.updateOrDelete(this.updateDatas, '上传全国')
        } else if (activePlace === 0 && this.valueC === '' && this.valueCityCode === '' && this.valueP !== '' && this.valueProvCode !== '') { // 上传省级
          this.$refs.uploadFile.updateOrDelete(this.updateDatas, '上传省级')
        } else if (activePlace === 1 && this.valueC === '' && this.valueCityCode === '' && this.valueP !== '' && this.valueProvCode !== '') { // 上传全国
          this.$refs.uploadFile.updateOrDelete(this.updateDatas, '上传全国')
        } else if (activePlace === 0 && this.valueC !== '' && this.valueCityCode !== '' && this.valueP !== '' && this.valueProvCode !== '') { // 上传城市
          this.$refs.uploadFile.updateOrDelete(this.updateDatas, '上传城市')
        } else if (activePlace === 1 && this.valueC !== '' && this.valueCityCode !== '' && this.valueP !== '' && this.valueProvCode !== '') { // 上传省级
          this.$refs.uploadFile.updateOrDelete(this.updateDatas, '上传省级')
        } else if (activePlace === 2) { // 上传全国
          this.$refs.uploadFile.updateOrDelete(this.updateDatas, '上传全国')
        }
      } else {
        this.$notify({ color: '#fff', background: '#b99573', message: '请先登录' })
      }
    },
    // 点击选择上传
    chooseUpdateOrDelete() {
      if (this.userId) {
        if (this.$store.state.choose.flag1 === false && (this.globalLists.length > 0 ||this.provinceLists.length > 0 ||this.cityLists.length > 0) && this.$store.state.choose.result.length === 0) {
          this.$refs.listContent.changeFlag()
          this.$store.commit('choose/setFlag1', true)
          this.$store.commit('choose/setChooseUp1', '确定')
          this.$notify({ color: '#fff',
                background: '#b99573', message: '请先选择要上传的文件' })
        } else if (this.$store.state.choose.flag1 === true && (this.globalLists.length > 0 ||this.provinceLists.length > 0 ||this.cityLists.length > 0) && this.$store.state.choose.result.length === 0) {
          this.backStatus()
          this.clearResult()
        } else if (this.$store.state.choose.flag1 === true && (this.globalLists.length > 0 ||this.provinceLists.length > 0 ||this.cityLists.length > 0) && this.$store.state.choose.result.length > 0) {
          this.$refs.uploadFile.updateOrDelete(this.$store.state.choose.result, '选择上传')
        }
      } else {
        this.$notify({ color: '#fff',
                background: '#b99573', message: '请先登录' })
      }
    },
    // 恢复选择的状态
    backStatus() {
      this.$refs.listContent.changeFlag2()
      this.$store.commit('choose/setFlag1', false)
      this.$store.commit('choose/setChooseUp1', '选择上传')
      this.$store.commit('choose/setResult', [])
    },
    clearResult() {
      this.$refs.listContent.toggle([])
    },
    // 清除数据
    clearArrayData() {
      this.provinceLists = [] // 省份
      this.cityLists = [] // 城市
      this.globalLists = [] // 全国
    }
  }
}
</script>

<style lang="less" scoped>
#newFilesD {
  display: flex;
  flex-direction: column;
  .top {
    flex: 1;
    margin-bottom: 70px;
  }
  .pageBoxStyle {
    flex: 0 0 50px;
    background-color: #fff;
  }
  .selectNavS {
    padding: 20px 20px 150px;
  }
}
</style>

<style>
.van-dropdown-item__content {
  max-height: 100%;
}
</style>
