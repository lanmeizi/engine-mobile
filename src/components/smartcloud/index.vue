<template>
<!-- 智慧云端 -->
  <div id="smartcloud" class="listStyle">
    <div id="goToHere1"></div>
    <div v-if="userId">
      <!-- 点击弹出搜索弹框 -->
      <div @click="alertPopup" class="openPopup">
        <van-sticky :offset-top="80">
          <van-cell v-if="chooseDir === '全部文件夹'" title="当前文件夹" is-link value="选择文件夹" />
          <van-cell v-else :title="'当前文件夹：' + chooseDir" is-link value="选择文件夹" />
        </van-sticky>
      </div>
      <div class="top">
        <!-- 法规层级 -->
        <classification-rules ref="classification" @showGetData="showGetData" @changeTagid="changeTagid" :classifytag="data" :stime="stime" :etime="etime" :searchText="searchText"></classification-rules>
        <!-- 法规层级 -->
        <regulations-hierarchy ref="regulations" @getSearchLists="getSearchLists"></regulations-hierarchy>
        <!-- 搜索框 -->
        <SearchBox ref="searchBox" @searchKeyWord="searchKeyWord" @selectTime="selectTime" @clearTime="clearTime"></SearchBox>
        <!-- 搜索弹框 -->
        <van-popup v-model="showSearchPopup" closeable close-icon="close" position="right" :style="{ height: '100%', width: '60%' }">
          <div class="selectNavS">
            <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', fontSize: '17px', marginTop: '20px' }">
              上传文件库
            </van-divider>
            <div>
              <van-notice-bar mode="closeable">
                选择文件夹即可查阅文件
              </van-notice-bar>
            </div>
            <div style="margin-top: 20px;">
              <van-nav-bar
                :title="docFolidName"
                left-text=""
                left-arrow
                @click-left="onClickLeft"
                id="resultTitle"
              ></van-nav-bar>
              <div class="marginStyle file">
                <div v-if="fixedDir.length > 0 && dirFlag">
                  <div class="fileList" v-for="dir in fixedDir" :key="dir.dir_id">
                    <div @click="getDirLists(dir)"><img src="../../assets/index/wenjianjia.png" /><a>{{ dir.dir_name }}</a></div>
                  </div>
                </div>
                <div v-else>
                  <div v-if="fixedDirChild.length > 0">
                    <div class="fileList" v-for="dir in fixedDirChild" :key="dir.dir_id">
                      <!-- <div @click="getDirLists(dir)"><img src="../../assets/index/wenjianjia.png" /><a>{{ dir.dir_name }}</a></div> -->
                      子文件夹
                    </div>
                  </div>
                  <div v-else class="noDir">暂无子文件夹</div>
                  </div>
                </div>
              <van-button style="margin-top: 30px;border-radius: 30px;" type="info" block @click="closePopup">确定</van-button>
            </div>
          </div>
        </van-popup>
        <!-- 列表组件 -->
        <list-content ref="listCont" :lists="lists" :total="total"></list-content>
      </div>
      <!-- 分页 -->
      <div v-if="lists.length > 0" class="pageBoxStyle">
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
      <tabbar @alertBars="alertBars" @alertCengji="alertCengji" @updateOrDelete="updateOrDelete" @chooseUpdateOrDelete="chooseUpdateOrDelete" :selectedID="selectedId"></tabbar> 
    </div>
    <div v-else class="noDatas">请先登录</div>

    <!-- 点击一键删除弹出框 -->
    <!-- <van-action-sheet
      v-model="showActiveSheet"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="onSelect"
      @cancel="onCancel"
    /> -->
    <van-action-sheet v-model="showActiveSheet" :round="false" get-container="body" >
      <div style="height: 210px;">
        <van-divider :style="{ fontSize: '17px', marginTop: '40px', marginBottom: '8px', position: 'relative' }">
          请选择
          <!-- <van-icon class="closeIcon" @click="onCancel" name="cross" color="#c8c9cc" /> -->
          <van-icon class="closeIcon" @click="onCancel" name="close" color="#c8c9cc" />
        </van-divider>
        <div class="showActiveSheetContent">
          <button v-for="(act, index) in actions" :key="index" class="item item-line" @click="onSelect(index)">
            <img class="img" :src="act.img" />
            <span class="word">{{ act.name }}</span>
          </button>
          <van-button block type="primary" color="#907456" @click="onCancel">取消</van-button>
        </div>
      </div>
    </van-action-sheet>
    <van-overlay :showLoding="showLoding"></van-overlay>
  </div>
</template>

<script>
import SearchBox from '@/components/common/search'
import Tabbar from '@/components/common/tabbar'

import ClassificationRules from '@/components/common/classificationRules' // 法规分类
import RegulationsHierarchy from '@/components/common/regulationsHierarchy' // 法规层级
import ListContent from '@/components/common/listContent'
import VanOverlay from '@/components/common/vanOverlay'
import Pagination from '@/components/common/pagination' // 分页

export default {
  data() {
    return {
      showActiveSheet: false, // 点击一键删除弹出框
      // actions: [
      //   { name: '删除此文件夹下的所有文件' },
      //   { name: '删除全文废止（失效）文件' }
      // ],
      actions: [
        { name: '删除此文件夹下的所有文件', img: require('../../assets/index/d1.png') },
        { name: '删除全文废止（失效）文件', img: require('../../assets/index/d2.png') }
      ],
      showLoding: false,
      selectedId: 'c',
      chooseDir: '全部文件夹',
      lists: [],
      data: {
        classifytag: [],
        minlock: 0
      },
      flag: false,
      minback: 0,
      minlock: 0,
      currentPage: 1,
      total: 0,
      totalLists: 0,
      stime: '', // 开始时间
      etime: '', // 结束时间
      searchText: '', // 搜索关键字
      tagid: '',
      showSearchPopup: false, // 选择文件夹弹框
      // fixedDir: [], // 固定文件夹
      breadList: [],
      folderid: '', // 点击的文件夹的id
      tagpc: [],
      t1: [],
      t2: [],
      t3: [],
      proAndCityData: {},
      dirFlag: true, // 显示固定文件夹和子文件夹的标杆
      docFolidName: '全部文件归档',
      fixedDirChild: [], // 子文件夹
      SearchTimes: 1,
      isFilter: false,
      clickConfirmBtn: true,
      showAllTagpc: [],
      deleteAll: false,
      delListtotal: 0
    }
  },
  components: {
    SearchBox,
    Tabbar,
    ClassificationRules,
    RegulationsHierarchy,
    ListContent,
    VanOverlay,
    Pagination
  },
  computed: {
    userId() {
      return this.$store.state.user.userId
    },
    fixedDir() {
      return this.$store.state.fixedFolder.fixedFolderArr
    }
  },
  methods: {
    alertPopup() {
      this.showSearchPopup = true
    },
    clearClassData() {
      this.$refs.classification.alertBar2()
    },
    // 点击左侧的返回按钮
    onClickLeft() {
      this.docFolidName = '全部文件归档'
      this.chooseDir = '全部文件夹'
      this.clickConfirmBtn = true
      this.isFilter = false
      this.deleteAll = false
      this.clearData()
      // 初始化法规分类弹框的数据
      this.data = {
        classifytag: [],
        minlock: 0
      }
      if (this.data.classifytag.length === 0 && this.data.minlock === 0) {
        this.$refs.classification.alertBar2()
      }
    },
    // 获取子文件夹
    getDirLists(dir) {
      // console.log('点击固定文件夹的哪一个==》', dir)
      this.dirFlag = false
      this.SearchTimes = 1
      this.docFolidName = dir.dir_name

      this.chooseDir = dir.dir_name

      this.folderid = dir.dir_id
      this.$refs.searchBox.keyword = ''
      this.$refs.searchBox.startAndEndTimeOne = ''
      this.$refs.searchBox.startAndEndTimeTwo = ''

      this.stime = ''
      this.etime = ''
      this.searchText = ''

      // 清除数据
      this.backStatus()
      this.$refs.listCont.toggle([])

      let args = {
        sdirid: dir.dir_id
      }
      this.getData()
      // 获取子文件夹
      this.$http.reqGetChildByParentId(args).then(response => {
        // console.log('获取文件夹子文件夹reqGetTreeByParentId', response)
        if (response.rtncode === 1) {
          if (response.rltcode === 1) {
            this.fixedDirChild = response.item
          }
        }
      }).catch(() => {
        // console.log('err===>', err)
      })
    },
    // 获取云端文件
    getData(tagid, stime, etime, text) {
      // console.log('this.currentPage999999999999999999999', this.tagpc, this.currentPage, tagid, stime, etime, text)
      // console.log('this.SearchTimes', this.SearchTimes)
      // console.log('this.isFilter', this.isFilter)
      this.showLoding = true
      if (tagid && tagid !== undefined) {
        this.isFilter = true
      } else {
        // this.isFilter = false
      }
      let args = {
        searchtimes: this.SearchTimes,  // 查询次数，第一次查询一定传1，二次查询传2
        frist: {
          text: '',
          potence: '',
          icode: '',
          tcode: '',
          kcode: '',
          country: '',
          ps: {},
          dirid: this.folderid,  // 上传目录ID，云端查询需要这个参数
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
          tagpc: this.tagpc,
          tagid: tagid && tagid !== undefined ? tagid : ''
        },
        pager: [
          {
            pagesize: 10, // 当前页  
            pageindex: this.currentPage, // 每页显示的条数
          }
        ]
      }

      // console.log('argsargsparams666666666666', args)
      this.$http.reqGetUploadFiles(args).then(response => {
        console.log('获取云端文件==============>>>>>', response)

        if (response.tbls[0].items === null && response.tbls[0].classifytag.length === 0) {
          this.$refs.classification.alertBar2()
        }

        this.showLoding = false
        this.lists = response.tbls[0].items !== null ? response.tbls[0].items : []
        this.t1 =  response.tbls[0].divisiontag.length !== 0 && response.tbls[0].divisiontag.t1.length > 0 ? response.tbls[0].divisiontag.t1 : []
        this.t2 =  response.tbls[0].divisiontag.length !== 0 && response.tbls[0].divisiontag.t2.length > 0 ? response.tbls[0].divisiontag.t2 : []
        this.t3 =  response.tbls[0].divisiontag.length !== 0 && response.tbls[0].divisiontag.t3.length > 0 ? response.tbls[0].divisiontag.t3 : []
        this.proAndCityData = {
          t1: this.t1.length > 0 ? this.t1 : [],
          t2: this.t2.length > 0 ? this.t2 : [],
          t3: this.t3.length > 0 ? this.t3 : []
        }
        // console.log('获取云端文件proAndCityData=>', this.proAndCityData)
        // this.$refs.regulations.processData(this.proAndCityData)
        if (this.clickConfirmBtn) {
          this.tagpc = this.filterData(this.proAndCityData)
          this.showAllTagpc = []
          this.showAllTagpc = this.tagpc
        }

        this.totalLists = response.tbls[0].total // 总的条数

        this.total = Math.ceil(this.totalLists/10)

        if (this.currentPage > this.total) {
          this.currentPage = this.total
        }

        this.classifytag = response.tbls[0].classifytag
        this.minback = response.tbls[0].minback
        this.minlock = response.tbls[0].minlock
        this.flag = true
        this.data = {
          classifytag: this.classifytag,
          minlock: this.minlock ? this.minlock : 0
        }
        // console.log('this.data-----------', this.data)
        this.$store.dispatch('choose/updateLists', this.lists)
        // this.bus.$emit('classifytagData', this.data)
        this.$refs.classification.getSelectData(this.data)
      }).catch(() => {
        this.showLoding = false
        // console.log('err===>', err)
      })
    },
    // 第一次改变tagid的时候 循环城市数据 tagpc
    filterData(data) {
      let searchParameter = []
      let national = []
      let tagpc1 = []
      let tagpc2 = []
      if (data.t1.length > 0) {
        national = [{p: '000000', c: '000000'}]
      }
      if (data.t2.length > 0) { // 循环省份
        data.t2.forEach(item => {
          let stringlength = item.id.length
          let pstring = item.id.substring(0,6) // 截取前六位
          let nstring = item.id.substring(stringlength - 6, stringlength) // 截取后六位
          tagpc1.push({p: pstring, c: nstring})
        })
      }
      if (data.t3.length > 0) { // 循环城市
        data.t3.forEach(item => {
          if (item.children && item.children.length > 0) {
            item.children.forEach(item1 => {
              let stringlength = item1.id.length
              let pstring = item1.id.substring(0,6) // 截取前六位
              let nstring = item1.id.substring(stringlength - 6, stringlength) // 截取后六位
              tagpc2.push({p: pstring, c: nstring})
            })
          }
        })
      }
      searchParameter = [...national, ...tagpc1, ...tagpc2]
      return searchParameter
    },
    // 清除数据
    clearData() {
      this.$refs.searchBox.keyword = ''
      this.$refs.searchBox.startAndEndTimeOne = ''
      this.$refs.searchBox.startAndEndTimeTwo = ''
      this.tagid = ''
      this.stime = ''
      this.etime = ''
      this.searchText = ''
      this.lists = []
      this.tagpc = []
      this.dirFlag = true
      this.fixedDirChild = []
      this.currentPage = 1
      this.flag = false
      this.folderid = ''
    },
    // 选择省份城市后触发的事件
    getSearchLists(tagpc) {
      // console.log('传递给父组件的数据tagpc==》', tagpc)
      // console.log('传递给父组件的数据this.showAllTagpc==》', this.showAllTagpc)
      this.clickConfirmBtn = false
      this.isFilter = true
      this.tagpc = tagpc
      console.log('this.tagpc', this.tagpc)
      this.currentPage = 1
      this.getData(this.tagid, this.stime, this.etime, this.searchText)
    },
    showGetData(data) {
      this.showData = data
      this.tagid = data.tagid
      this.getData(this.tagid, data.stime, data.etime, data.searchText)
      // 清除数据
      this.backStatus()
      this.$refs.listCont.toggle([])
    },
    // 选择时间
    selectTime(time) {
      // this.SearchTimes = 2
      this.stime = time.stime
      this.etime = time.etime
      this.currentPage = 1
      
      // this.getData(this.tagid, this.stime, this.etime, this.searchText)
      if (this.folderid) {
        this.SearchTimes = 2
        this.getData(this.tagid, this.stime, this.etime, this.searchText)
      }

      // 清除数据
      this.backStatus()
      this.$refs.listCont.toggle([])
    },
    // 搜索按钮
    searchKeyWord(keyword) {
      // this.SearchTimes = 2
      this.searchText = keyword
      this.currentPage = 1
      // if (!(this.stime || this.etime || this.searchText)) {
      //   this.$refs.classification.alertBar2()
      // }
      // if (this.folderid && this.searchText) {
      //   this.SearchTimes = 2
      //   this.getData(this.tagid, this.stime, this.etime, this.searchText)
      // }
      if (this.folderid) {
        this.SearchTimes = 2
        this.getData(this.tagid, this.stime, this.etime, this.searchText)
      }
      // 清除数据
      this.backStatus()
      this.$refs.listCont.toggle([])
    },
    // 清除时间按钮
    clearTime() {
      // this.SearchTimes = 2
      this.stime = ''
      this.etime = ''
      this.currentPage = 1
      // if (!this.stime && !this.etime && !this.searchText) {
      //   this.$refs.classification.alertBar2()
      // }
      // this.getData(this.tagid, this.stime, this.etime, this.searchText)
      if (this.folderid) {
        this.SearchTimes = 2
        this.getData(this.tagid, this.stime, this.etime, this.searchText)
      }
      // 清除数据
      this.backStatus()
      this.$refs.listCont.toggle([])
    },
    // 改变tagid的值
    changeTagid(val) {
      this.tagid = val
      this.backStatus()
      this.$refs.listCont.toggle([])
    },
    // 改变页码
    changePage(num) {
      console.log('num==>>', num)
      this.currentPage = num
      this.$nextTick(() => {
        let dom = document.getElementById('goToHere1')
        dom.scrollIntoView()
      })
      this.getData(this.tagid, this.stime, this.etime, this.searchText)
    },
    prevPage() {  // 上一页
      if (this.currentPage == 1) return
      this.currentPage--
      this.$nextTick(() => {
        let dom = document.getElementById('goToHere1')
        dom.scrollIntoView()
      })
      this.getData(this.tagid, this.stime, this.etime, this.searchText)
    },
    nextPage() {  // 下一页
      if (this.currentPage == this.total)return
      this.currentPage++
      this.$nextTick(() => {
        let dom = document.getElementById('goToHere1')
        dom.scrollIntoView()
      })
      this.getData(this.tagid, this.stime, this.etime, this.searchText)
    },
    jumpToPageSize(num) {  // 跳转到多少页
      this.currentPage = num
      this.getData(this.tagid, this.stime, this.etime, this.searchText)
    },
    // 点击弹出搜索导航框
    alertBars() {
      if (this.flag) {
        this.$refs.classification.alertBars()
      } else if (!this.flag) {
        this.$notify({ color: '#fff', background: '#b99573', message: '请先选择文件夹后使用' })
      }
    },
    // 点击弹出法规层级框
    alertCengji() {
      if (this.deleteAll) {
        this.$refs.regulations.clearData()
      }
      if (this.flag && !this.deleteAll) {
        this.$refs.regulations.processData(this.proAndCityData)
      } else if (!this.flag) {
        this.$notify({ color: '#fff', background: '#b99573', message: '请先选择文件夹后使用' })
      }
    },
    // 取消
    onCancel() {
      this.showActiveSheet = false
    },
    // 点击了智慧云端一键删除
    // onSelect(name, index) {
    onSelect(index) {
      if (index === 0) {  // 删除当前文件夹下得所有文件
        if (this.lists.length > 0) {
          this.$dialog.confirm({
            title: '提示',
            message: `您确定删除此文件夹下的所有文件吗?`,
          })
            .then(() => {
              this.$http.reqRemoveFilesByFolderId(this.folderid).then(response => {
                if (response.rtncode === 1) {
                  if (response.rltcode === 1) {
                    this.lists = []
                    this.getData()
                    this.$refs.classification.alertBar2()
                    this.$notify({ color: '#fff', background: '#b99573', message: '删除成功' })
                    this.backStatus()
                    this.deleteAll = true
                    this.showActiveSheet = false
                  }
                }
              })
            })
            .catch(() => {
              // on cancel
            })
        } else {
          this.$notify({ color: '#fff', background: '#b99573', message: '当前文件夹下无文件' })
          this.showActiveSheet = false
        }
      } else if (index === 1) {  // 删除所有全文废止(失效)文件
        if (this.lists.length === 0) {
          this.$notify({ color: '#fff', background: '#b99573', message: '当前文件夹下无全文废止(失效)文件' })
          this.backStatus()
          this.showActiveSheet = false
        } else {
          this.$dialog.confirm({
              title: '提示',
              message: `您确定删除此文件夹下的所有全文废止(失效)文件吗?`,
            })
              .then(() => {
                this.$http.reqRemoveAbolitionFilesByFolderId(this.folderid).then(response => {
                  if (response.rtncode === 1) {
                    if (response.rltcode === 1) {
                      if (this.tagid || this.stime || this.etime || this.searchText) {
                        this.getData(this.tagid, this.stime, this.etime, this.searchText)
                      } else {
                        this.getData()
                        this.$refs.classification.alertBar2()
                      }
                      this.$notify({ color: '#fff', background: '#b99573', message: '删除成功' })
                      this.backStatus()
                      this.showActiveSheet = false
                    }
                  }
                })
              })
              .catch(() => {
                // on cancel
              })
        }
      }
    },
    // 点击智慧云端的一键删除
    updateOrDelete() {
      if (!this.folderid) {
        this.$notify({ color: '#fff', background: '#b99573', message: '请先选择文件夹' })
        this.showActiveSheet = false
      } else {
        this.showActiveSheet = true
      }
    },
    // 删除所有文件
    deleteThisAllFiles() {
      if (this.lists.length > 0) {
        this.$dialog.confirm({
          title: '提示',
          message: `您确定删除此文件夹下的所有文件吗?`,
        })
          .then(() => {
            this.$http.reqRemoveFilesByFolderId(this.folderid).then(response => {
              // console.log('response===>', response)
              if (response.rtncode === 1) {
                if (response.rltcode === 1) {
                  this.lists = []
                  this.getData()
                  this.$refs.classification.alertBar2()
                  this.showActiveSheet = false
                  this.$notify({ color: '#fff', background: '#b99573', message: '删除成功' })
                  this.backStatus()
                  this.deleteAll = true
                }
              }
            })
          })
          .catch(() => {
            // on cancel
          })
      } else {
        this.$notify({ color: '#fff', background: '#b99573', message: '当前文件夹下无文件' })
        this.showActiveSheet = false
      }
    },
    // 删除全文废止(失效)文件
    deleteAbolish() {
      if (this.lists.length === 0) {
        this.$notify({ color: '#fff', background: '#b99573', message: '当前文件夹下无全文废止(失效)文件' })
        this.backStatus()
        this.showActiveSheet = false
      } else {
        this.$dialog.confirm({
            title: '提示',
            message: `您确定删除此文件夹下的所有全文废止(失效)文件吗?`,
          })
            .then(() => {
              this.$http.reqRemoveAbolitionFilesByFolderId(this.folderid).then(response => {
                if (response.rtncode === 1) {
                  if (response.rltcode === 1) {
                    if (this.tagid || this.stime || this.etime || this.searchText) {
                      this.getData(this.tagid, this.stime, this.etime, this.searchText)
                    } else {
                      this.getData()
                      this.$refs.classification.alertBar2()
                    }
                    this.showActiveSheet = false
                    this.$notify({ color: '#fff', background: '#b99573', message: '删除成功' })
                    this.backStatus()
                  }
                }
              })
            })
            .catch(() => {
              // on cancel
            })
      }
    },
    // 点击智慧云端的选择删除
    chooseUpdateOrDelete() {
      // console.log('this.folderid', this.folderid, this.lists.length, this.$store.state.choose.flag3, this.$store.state.choose.result.length)
      this.delListtotal = 0
      if (!this.folderid) {
        this.$notify({ color: '#fff', background: '#b99573', message: '请先选择文件夹' })
      } else {
        if (this.lists.length === 0) {
          this.$notify({ color: '#fff', background: '#b99573', message: '当前文件夹下无文件' })
          this.backStatus()
        } else if (this.$store.state.choose.flag3 === false && this.$store.state.choose.lists.length > 0 && this.$store.state.choose.result.length === 0) {
          this.$refs.listCont.changeFlag()
          this.$store.commit('choose/setFlag3', true)
          this.$store.commit('choose/setDelWord', '确定')
          this.$notify({ color: '#fff', background: '#b99573', message: '请先选择要删除的文件' })
        } else if (this.$store.state.choose.flag3 === true && this.$store.state.choose.lists.length > 0 && this.$store.state.choose.result.length === 0) {
          this.$refs.listCont.changeFlag2()
          this.$store.commit('choose/setFlag3', false)
          this.$store.commit('choose/setDelWord', '选择删除')
          this.$store.commit('choose/setResult', [])
          this.clearResult()
        } else if (this.$store.state.choose.flag3 === true && this.$store.state.choose.lists.length > 0 && this.$store.state.choose.result.length > 0) {
          let list = this.$store.state.choose.result
          if (list.length > 0) {
            this.delListtotal = list.length
            this.$dialog.confirm({
              title: '提示',
              message: `您确定删除此文件夹下的选中文件吗?`,
            })
              .then(() => {
                this.$http.reqRemoveFilesByList(this.folderid, list).then(response => {
                  if (response.rtncode === 1) {
                    if (response.rltcode === 1) {
                      if (this.tagid || this.stime || this.etime || this.searchText) {
                        this.getData(this.tagid, this.stime, this.etime, this.searchText)
                      } else {
                        this.getData()
                        this.$refs.classification.alertBar2()
                      }

                      this.$notify({ color: '#fff', background: '#b99573', message: '删除成功' })
                      this.backStatus()
                    }
                  }
                })
              })
              .catch(() => {
                // on cancel
              })
          }
        }
      }
    },
    // 清除时间和搜索框的内容
    clearMsg() {
      this.$refs.searchBox.clearMsg()
    },
    // 恢复选择的状态
    backStatus() {
      this.$refs.listCont.changeFlag2()
      this.$store.commit('choose/setFlag3', false)
      this.$store.commit('choose/setDelWord', '选择删除')
      this.$store.commit('choose/setResult', [])
      // this.$store.dispatch('choose/updateLists', [])
    },
    clearFlag() {
      this.$refs.listCont.changeFlag2()
      this.$store.commit('choose/setFlag3', false)
      this.$store.commit('choose/setDelWord', '选择删除')
      this.$store.dispatch('choose/updateLists', [])
    },
    clearResult() {
      this.$refs.listCont.toggle([])
    },
    closePopup() {
      this.showSearchPopup = false
    },
    clearFolderid() {
      // this.fixedDir = this.$store.state.fixedFolder.fixedFolderArr
      this.flag = false
      this.lists = []
      this.tagpc = []
      this.breadList = []
      this.currentPage = 1
      this.clearData()
      this.folderid = ''
      this.getData('', '', '', '')
      this.$refs.classification.alertBars1()
    }
  },
  destroyed() {
    this.$store.commit('choose/setFlag3', false)
    this.$store.commit('choose/setDelWord', '选择删除')
    this.$store.dispatch('choose/updateLists', [])
    this.$store.commit('choose/setResult', [])
  }
}
</script>

<style lang="less" scoped>
#smartcloud {
  display: flex;
  flex-direction: column;
  .top {
    flex: 1;
    margin-bottom: 90px;
  }
  .pageBoxStyle {
    flex: 0 0 50px;
    background-color: #fff;
  }
  .selectNavS {
    padding: 20px 20px 20px;
  }
  .marginStyle {
    margin-top: 10px;
  }
  .file {
    font-size: 14px;
    .fileList {
      padding: 12px 20px;
      border-bottom: 1px solid #ccc;
      img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
      a {
        position: relative;
        top: -3px;
        color: #333;
      }
      &:first-child {
        margin-top: 10px;
      }
    }
    .active {
      background: #ecf9ff;
    }
    .noDir {
      padding: 20px;
      text-align: center;
    }
  }
  .van-nav-bar__left {
    padding: 0;
  }
  // /deep/ .van-action-sheet__item {
  //   font-size: 0.38rem;
  // }
  // /deep/ .van-action-sheet__cancel {
  //   font-size: 0.38rem;
  //   background: linear-gradient(#907456,#715641);
  //   color: #fff;
  // }
}
</style>
<style lang="less">
.van-dialog__message {
  text-align: left;
}
.van-dialog__message {
  text-align: left;
}
.van-nav-bar__title {
  font-weight: 700;
}
.van-action-sheet__cancel {
  font-size: 0.4rem;
  background: #907456;
  color: #fff;
}
.closeIcon {
  position: absolute;
  font-size: 0.58667rem; 
  right: 0.42667rem;
  top: -20px;
}
.showActiveSheetContent {
  padding: 0 20px 20px;
  box-sizing: border-box;
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 1.33333rem;
    padding: 0;
    font-size: 0.36rem;
    line-height: 0.53333rem;
    background-color: #fff;
    border: none;
    cursor: pointer;
    .word {
      font-size: 0.36rem;
      line-height: 0.53333rem;
    }
    .img {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }
    &:active {
      background-color: #f2f3f5;
    }
  }
  .item-line:nth-child(odd) {
    // border-bottom-width: 0.02667rem;
    border-bottom: 1px solid #ebedf0;
  }
}
</style>
