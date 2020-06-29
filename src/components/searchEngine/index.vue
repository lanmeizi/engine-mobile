<template>
  <!-- 搜索引擎 -->
  <div id="searchEngine" class="listStyle">
    <div id="goToHere2"></div>
    <!-- 点击弹出搜索弹框 -->
    <div @click="showSearchPopup = true" class="openPopup">
      <van-sticky :offset-top="80">
        <van-cell title="打开搜索引擎" is-link />
      </van-sticky>
    </div>
    <div class="top">
      <!-- 法规层级 -->
      <classification-rules ref="classification" @showGetData="showGetData" @changeTagid="changeTagid" :classifytag="data" :stime="stime" :etime="etime" :searchText="searchText"></classification-rules>
      <!-- 法规层级 -->
      <regulations-hierarchy ref="regulations"></regulations-hierarchy>
      <!-- 搜索框 -->
      <SearchBox v-show="flag" ref="searchBox" @searchKeyWord="searchKeyWord" @selectTime="selectTime" @clearTime="clearTime"></SearchBox>
      <!-- 搜索弹框 -->
      <van-popup v-model="showSearchPopup" closeable close-icon="close" position="top" :style="{ height: '100%' }">
        <div class="selectNavS">
          <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', fontSize: '17px', marginTop: '20px' }">
            搜索引擎
          </van-divider>
          <van-collapse v-model="activeNames" accordion>
            <van-collapse-item title="综合检索" name="1">
              <div class="searchItem">
                <div class="name">查询内容</div>
                <div class="content">
                  <van-field v-model="search1" clearable input-align="center" placeholder="请输入查询内容" />
                </div>
              </div>
              <div class="searchItem">
                <div class="name">文件效力</div>
                <div class="content">
                  <van-dropdown-menu>
                    <van-dropdown-item v-model="value1" :options="option1" @change="changeSearch1" />
                  </van-dropdown-menu>
                </div>
              </div>
              <div class="btn" @click="searchDatas(1)"><van-button block icon="search" style="border-radius: 30px;" type="info">查询</van-button></div>
            </van-collapse-item>
            <van-collapse-item title="行业检索" name="2">
              <div class="searchItem">
                <div class="name">行业</div>
                <div class="content">
                  <van-dropdown-menu>
                    <van-dropdown-item v-model="value2" :options="option2" @change="changeValue2" />
                  </van-dropdown-menu>
                </div>
              </div>
              <div class="searchItem">
                <div class="name">文件效力</div>
                <div class="content">
                  <van-dropdown-menu>
                    <van-dropdown-item v-model="value5" :options="option1" @change="changeSearch5" />
                  </van-dropdown-menu>
                </div>
              </div>
              <div class="btn" @click="searchDatas(2)">
                <van-button block icon="search" style="border-radius: 30px; font-size: 16px;" type="info">查询</van-button>
              </div>
            </van-collapse-item>
            <van-collapse-item title="税收优惠检索" name="3">
              <van-radio-group v-model="radio" @change="changeRadio">
                <van-cell-group>
                  <van-cell title="税收优惠项目" clickable @click="radio = '1'">
                    <template #right-icon>
                      <van-radio name="1" />
                    </template>
                  </van-cell>
                  <van-cell title="税收优惠税种" clickable @click="radio = '2'">
                    <template #right-icon>
                      <van-radio name="2" />
                    </template>
                  </van-cell>
                  <van-cell title="税收优惠行业" clickable @click="radio = '3'">
                    <template #right-icon>
                      <van-radio name="3" />
                    </template>
                  </van-cell>
                </van-cell-group>
              </van-radio-group>
              <div class="searchItem">
                <div class="name">优惠项目</div>
                <div class="content">
                  <van-dropdown-menu>
                    <van-dropdown-item v-model="value11" :disabled="disabled2" :options="option11" @change="changeValue11" />
                  </van-dropdown-menu>
                </div>
              </div>
              <div class="searchItem">
                <div class="name">优惠税种</div>
                <div class="content">
                  <van-dropdown-menu>
                    <van-dropdown-item v-model="value12" :disabled="disabled1" :options="option12" @change="changeValue12" />
                  </van-dropdown-menu>
                </div>
              </div>
              <div class="searchItem">
                <div class="name">优惠行业</div>
                <div class="content">
                  <van-dropdown-menu>
                    <van-dropdown-item v-model="value13" :disabled="disabled3" :options="option13" @change="changeValue13" />
                  </van-dropdown-menu>
                </div>
              </div>
              <div class="searchItem">
                <div class="name">文件效力</div>
                <div class="content">
                  <van-dropdown-menu>
                    <van-dropdown-item v-model="value6" :options="option1" @change="changeSearch6" />
                  </van-dropdown-menu>
                </div>
              </div>
              <div class="btn" @click="searchDatas(3)"><van-button block icon="search" style="border-radius: 30px;" type="info">查询</van-button></div>
            </van-collapse-item>
            <van-collapse-item title="条约检索" name="4">
              <div class="searchItem">
                <div class="name">国家/地区</div>
                <div class="content">
                  <van-dropdown-menu>
                    <van-dropdown-item v-model="value3" :options="option3" @change="changeValue3" />
                  </van-dropdown-menu>
                </div>
              </div>
              <div class="searchItem">
                <div class="name">文件效力</div>
                <div class="content">
                  <van-dropdown-menu>
                    <van-dropdown-item v-model="value7" :options="option1" @change="changeSearch7" />
                  </van-dropdown-menu>
                </div>
              </div>
              <div class="btn" @click="searchDatas(4)"><van-button block icon="search" style="border-radius: 30px;" type="info">查询</van-button></div>
            </van-collapse-item>
            <van-collapse-item title="进出口税收检索" name="5">
              <div class="searchItem">
                <div class="name">类别</div>
                <div class="content">
                  <van-dropdown-menu>
                    <van-dropdown-item v-model="value4" :options="option4" @change="changeValue4" />
                  </van-dropdown-menu>
                </div>
              </div>
              <div class="searchItem">
                <div class="name">文件效力</div>
                <div class="content">
                  <van-dropdown-menu>
                    <van-dropdown-item v-model="value8" :options="option1" @change="changeSearch8" />
                  </van-dropdown-menu>
                </div>
              </div>
              <div class="btn" @click="searchDatas(5)"><van-button block icon="search" style="border-radius: 30px;" type="info">查询</van-button></div>
            </van-collapse-item>
          </van-collapse>
        </div>
      </van-popup>
      <!-- 列表组件 -->
      <list-content ref="listCont" :lists="lists" :total="total" :lockLists="lists4" :doubleLists="doubleLists" :commonLists="commonLists" :industryLists="industryLists"
        @changeCommonFlag="changeCommonFlag" 
        @changeIndustryFlag="changeIndustryFlag"
        :countries="countries"
      ></list-content>
      <!-- 一键上传 -->
      <upload-file ref="uploadFile"></upload-file>
    </div>
    
    <!-- 分页 -->
    <div v-if="lists.length > 0" class="pageBoxStyle">
      <van-pagination v-model="currentPage" :page-count="total" mode="simple" @change="changePage" />
    </div>
    <div v-if="lists4.length > 0" class="pageBoxStyle">
      <van-pagination v-model="currentPage5" :page-count="total5" mode="simple" @change="changePage5" />
    </div>
    <div v-if="commonFlag && commonLists.length > 0" class="pageBoxStyle">
      <van-pagination v-model="currentCommonPage" :page-count="commonTotal5" mode="simple" @change="changePage5" />
    </div>
    <div v-if="industryFlag && industryLists.length > 0" class="pageBoxStyle">
      <van-pagination v-model="currentIndustryPage" :page-count="industryTotal5" mode="simple" @change="changePage5" />
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

export default {
  data() {
    return {
      showLoding: false,
      flag: false,
      selectedId: 'b',
      lists: [],
      data: {
        classifytag: [],
        minlock: 0
      },
      dataC: {
        classifytag: [],
        minlock: 0
      },
      dataI: {
        classifytag: [],
        minlock: 0
      },
      minback: 0,
      minlock: 0,
      currentPage: 1,
      total: 0,

      minback5: 0,
      minlock5: 0,
      currentPage5: 1,
      total5: 0,

      commonTotal5: 0,
      currentCommonPage: 1,
      commonFlag: true,
      industryTotal5: 0,
      currentIndustryPage: 1,
      industryFlag: false,

      stime: '', // 开始时间
      etime: '', // 结束时间
      searchText: '', // 搜索关键字
      tagid: '',
      showSearchPopup: false, // 搜索引擎弹框
      activeNames: ['1'],

      // 文件效力
      value1: '1',
      value5: '1',
      value6: '1',
      value7: '1',
      value8: '1',
      option1: [
        { text: '请选择', value: '1' },
        { text: '全文有效', value: '20' },
        { text: '尚未生效', value: '0' },
        { text: '部分废止(失效)', value: '30' },
        { text: '全文废止(失效)', value: '40' }
      ],  

      // 综合检索
      search1: '',

      // 行业检索
      value2: '0',
      option2: [
        { text: '请选择', value: '0' }
      ],

      // 税收优惠检索
      radio: '1',
      disabled1: true,
      disabled2: false,
      disabled3: true,
      value11: '0', // 优惠项目
      option11: [
        { text: '请选择', value: '0' }
      ],
      value12: '0', // 优惠税种
      option12: [
        { text: '请选择', value: '0' }
      ],
      value13: '0', // 优惠行业
      option13: [
        { text: '请选择', value: '0' }
      ],
      
      // 条约检索
      value3: '0',
      option3: [
        { text: '请选择', value: '0' }
      ],

      // 进出口税收检索
      value4: '0',
      option4: [
        { text: '请选择', value: '0' }
      ],
      lists4: [],
      queryBtn: 0,
      doubleLists: false,
      commonLists: [], // 通用规定
      industryLists: [], // 专属规定
      countries: false, // 切换专属和国家(地区)

      updateDatas: {}, // 上传数据
      totalLists: 0, // 总的条数
      updateCommonDatas: {}, // 通用
      commonTotal5Lists: 0,
      updateIndustryDatas: {}, // 专属
      industryTotal5lists: 0,
      // thisFs: true,  // true 点击的是查询按钮  false 点击的是其他按钮 搜索...
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
  created() {
    this.$nextTick(() => {
      this.getSelectData()
    })
  },
  computed: {
    userId() {
      return this.$store.state.user.userId
    }
  },
  mounted() {},
  methods: {
    // 清除时间和搜索框的内容
    clearMsg() {
      this.$refs.searchBox.clearMsg()
    },
    // 获取综合检索的数据
    getData(tagid, stime, etime, searchText) {
      this.showLoding = true
      if (tagid && tagid !== undefined) {
        this.isFilter = true
      } else {
        this.isFilter = false
      }
      let args = {
        searchtimes: this.SearchTimes,  // 查询次数，第一次查询一定传1，二次查询传2
        frist: {
          text: this.search1 ? this.search1 : '',
          potence: this.value1 !== '1' ? this.value1 : '',
          icode: '',
          tcode: '',
          kcode: '',
          country: '',
          ps: {},
          dirid: '',  // 上传目录ID，云端查询需要这个参数
          id: ''
        },
        second: [
          {
            text2: searchText && searchText !== undefined ? searchText : '',
            stime: stime && stime !== undefined ? stime : '',
            etime: etime && etime !== undefined ? etime : ''
          }
        ],
        fliter: {
          isfilter: this.isFilter,
          tagpc: [{p:'000000', c: '000000'}],
          tagid: tagid && tagid !== undefined ? tagid : ''
        },
        pager: [
          {
            pagesize: 10, // 当前页  
            pageindex: this.currentPage, // 每页显示的条数
          }
        ]
      }

      // console.log('综合检索全国版的数据====》', args)
      let nodes = this.$baseConfig.code
      this.updateDatas = args

      this.$http.reqGetGeneralFiles(args, nodes).then(response => {
        // console.log('所有数据全国版搜索引擎的综合检索====》', response)
        this.showLoding = false
        this.lists = response.tbls[0].items !== null ? response.tbls[0].items : []
        this.total = Math.ceil(response.tbls[0].total/10)
        this.totalLists = response.tbls[0].total // 总的条数
        this.classifytag = response.tbls[0].classifytag
        this.minback = response.tbls[0].minback
        this.minlock = response.tbls[0].minlock
        this.flag = true
        this.data = {
          classifytag: this.classifytag,
          // minlock: this.minlock
          minlock: this.minlock ? this.minlock : 0
        }

        this.$store.dispatch('choose/updateLists', this.lists)

        this.bus.$emit('classifytagData', this.data)
      }).catch(err => {
        this.showLoding = false
        // console.log('err', err.message)
      })
    },
    // 查询按钮
    searchDatas(num) {
      this.$refs.classification.clearSearchValue()
      this.SearchTimes = 1
      this.queryBtn = num
      this.lists = []
      this.lists4 = []
      this.commonLists = []  // 通用规定
      this.industryLists = []  // 专属规定
      this.currentPage = 1
      this.currentPage5 = 1
      this.currentCommonPage = 1
      this.currentIndustryPage = 1
      // this.showSearchPopup = false
      this.stime = '', // 开始时间
      this.etime = '', // 结束时间
      this.searchText = '', // 搜索关键字
      this.tagid = '',
      this.$refs.searchBox.keyword = ''
      this.$refs.searchBox.startAndEndTimeOne = ''
      this.$refs.searchBox.startAndEndTimeTwo = ''
      this.data = {}
      this.dataC = {}
      this.dataI = {}

      // 清除数据
      this.backStatus()
      this.$refs.listCont.toggle([])

      if (this.flag) {
        this.$refs.classification.changeFixedBtn()
      }

      if (num === 1) {  // 综合检索的查询按钮
        if (!this.search1 && this.value1 === '1') {
          this.$toast('查询内容不能为空')
          this.showSearchPopup = true
        } else {
          this.showSearchPopup = false
          this.currentPage = 1
          this.getData()
          if (this.flag) {
            this.$refs.classification.alertBars1()
          }
        }
      } else if (num === 2) {  // 行业检索的查询按钮
        if (this.value2 === '0' && this.value5 === '1') {
          this.$toast('查询内容不能为空')
          this.showSearchPopup = true
        } else {
          this.showSearchPopup = false
          this.doubleLists = true
          this.countries = false
          this.getData2Common()
          this.getData2Industry()
        }
      } else if (num === 3) {  // 税收优惠检索的查询按钮
        if (this.radio === '1') {
          if (this.value11 === '0' && this.value6 === '1') {
            this.$toast('查询内容不能为空')
            this.showSearchPopup = true
          } else {
            this.showSearchPopup = false
            this.getDataRadio1()
          }
        } else if (this.radio === '2') {
          if (this.value12 === '0' && this.value6 === '1') {
            this.$toast('查询内容不能为空')
            this.showSearchPopup = true
          } else {
            this.showSearchPopup = false
            this.getDataRadio2()
          }
        } else if (this.radio === '3') {
          if (this.value13 === '0' && this.value6 === '1') {
            this.$toast('查询内容不能为空')
            this.showSearchPopup = true
          } else {
            this.showSearchPopup = false
            this.doubleLists = true
            this.countries = false
            this.getDataRadio3CommonFiles()
            this.getDataRadio3IndustryFiles()
          }
        }
      } else if (num === 4) {  // 条约检索的查询按钮
        if (this.value3 === '0' && this.value7 === '1') {
          this.$toast('查询内容不能为空')
          this.showSearchPopup = true
        } else {
          this.showSearchPopup = false
          this.doubleLists = true
          this.countries = true
          this.getData4Common()
          this.getData4Industry()
        }
      } else if (num === 5) {  // 进出口税收检索的查询按钮
        if (this.value4 === '0' && this.value8 === '1') {
          this.$toast('查询内容不能为空')
          this.showSearchPopup = true
        } else {
          this.showSearchPopup = false
          this.currentPage5 = 1
          this.getData5()
        }
      } 
    },
    // 行业检索 通用
    getData2Common(tagid, stime, etime, searchText) {
      this.showLoding = true
      if (tagid && tagid !== undefined) {
        this.isFilter = true
      } else {
        this.isFilter = false
      }
      let args = {
        searchtimes: this.SearchTimes,  // 查询次数，第一次查询一定传1，二次查询传2
        frist: {
          text: '',
          potence: this.value5 !== '1' ? this.value5 : '',
          icode: this.value2 !== '0' ? this.value2 : '',
          tcode: '',
          kcode: '',
          country: '',
          ps: {},
          dirid: '',  // 上传目录ID，云端查询需要这个参数
          id: ''
        },
        second: [
          {
            text2: searchText && searchText !== undefined ? searchText : '',
            stime: stime && stime !== undefined ? stime : '',
            etime: etime && etime !== undefined ? etime : ''
          }
        ],
        fliter: {
          isfilter: this.isFilter,
          tagpc: [{p:'000000', c: '000000'}],
          tagid: tagid && tagid !== undefined ? tagid : ''
        },
        pager: [
          {
            pagesize: 10, // 当前页  
            pageindex: this.currentCommonPage, // 每页显示的条数
          }
        ]
      }

      // console.log('进出口税收检索的数据====》', args)

      let nodes = this.$baseConfig.code
      this.updateCommonDatas = args

      this.$http.reqGetIndustryCommonFiles(args, nodes).then(response => {
        // console.log('行业检索 通用response', response)
        this.showLoding = false
        this.commonLists = response.tbls[0].items !== null ? response.tbls[0].items : []
        this.commonTotal5 = Math.ceil(response.tbls[0].total/10)
        this.commonTotal5Lists = response.tbls[0].total
        this.classifytag = response.tbls[0].classifytag
        this.minback5 = response.tbls[0].minback
        this.minlock5 = response.tbls[0].minlock
        this.flag = true
        // this.data = {
        //   classifytag: this.classifytag,
        //   minlock: this.minlock5
        // }
        this.dataC = {
          classifytag: this.classifytag,
          // minlock: this.minlock5
          minlock: this.minlock5 ? this.minlock5 : 0
        }

        this.$store.dispatch('choose/updateCommonResult', this.commonLists)
        
        this.$refs.classification.alertBars5(this.dataC)
      }).catch(err => {
        this.showLoding = false
        // console.log('err', err.message)
      })
    },
    // 行业检索 专属
    getData2Industry(tagid, stime, etime, searchText) {
      this.showLoding = true
      if (tagid && tagid !== undefined) {
        this.isFilter = true
      } else {
        this.isFilter = false
      }
      let args = {
        searchtimes: this.SearchTimes,  // 查询次数，第一次查询一定传1，二次查询传2
        frist: {
          text: '',
          potence: this.value5 !== '1' ? this.value5 : '',
          icode: this.value2 !== '0' ? this.value2 : '',
          tcode: '',
          kcode: '',
          country: '',
          ps: {},
          dirid: '',  // 上传目录ID，云端查询需要这个参数
          id: ''
        },
        second: [
          {
            text2: searchText && searchText !== undefined ? searchText : '',
            stime: stime && stime !== undefined ? stime : '',
            etime: etime && etime !== undefined ? etime : ''
          }
        ],
        fliter: {
          isfilter: this.isFilter,
          tagpc: [{p:'000000', c: '000000'}],
          tagid: tagid && tagid !== undefined ? tagid : ''
        },
        pager: [
          {
            pagesize: 10, // 当前页  
            pageindex: this.currentIndustryPage, // 每页显示的条数
          }
        ]
      }

      // console.log('进出口税收检索的数据====》', args)
      let nodes = this.$baseConfig.code
      this.updateIndustryDatas = args

      this.$http.reqGetIndustryFiles(args, nodes).then(response => {
        // console.log('行业检索 专属', response)
        this.showLoding = false
        this.industryLists = response.tbls[0].items !== null ? response.tbls[0].items : []
        this.industryTotal5 = Math.ceil(response.tbls[0].total/10)
        this.industryTotal5lists = response.tbls[0].total
        this.classifytag = response.tbls[0].classifytag
        this.minback5 = response.tbls[0].minback
        this.minlock5 = response.tbls[0].minlock
        this.flag = true
        // this.data = {
        //   classifytag: this.classifytag,
        //   minlock: this.minlock5
        // }
        this.dataI = {
          classifytag: this.classifytag,
          // minlock: this.minlock5
          minlock: this.minlock5 ? this.minlock5 : 0
        }
        this.$store.dispatch('choose/updateIndustryResult', this.industryLists)
        this.$refs.classification.alertBars5(this.dataI)
      }).catch(err => {
        this.showLoding = false
        // console.log('err', err.message)
      })
    },
    // 税收优惠项目
    getDataRadio1(tagid, stime, etime, searchText) {
      this.showLoding = true
      if (tagid && tagid !== undefined) {
        this.isFilter = true
      } else {
        this.isFilter = false
      }
      let args = {
        searchtimes: this.SearchTimes,  // 查询次数，第一次查询一定传1，二次查询传2
        frist: {
          text: '',
          potence: this.value6 !== '1' ? this.value6 : '',
          icode: '',
          tcode: '',
          kcode: this.value11 !== '0' ? this.value11 : '',
          country: '',
          ps: {},
          dirid: '',  // 上传目录ID，云端查询需要这个参数
          id: ''
        },
        second: [
          {
            text2: searchText && searchText !== undefined ? searchText : '',
            stime: stime && stime !== undefined ? stime : '',
            etime: etime && etime !== undefined ? etime : ''
          }
        ],
        fliter: {
          isfilter: this.isFilter,
          tagpc: [{p:'000000', c: '000000'}],
          tagid: tagid && tagid !== undefined ? tagid : ''
        },
        pager: [
          {
            pagesize: 10, // 当前页  
            pageindex: this.currentPage5, // 每页显示的条数
          }
        ]
      }

      // console.log('税收优惠项目的数据====》', args)

      let nodes = this.$baseConfig.code
      this.updateDatas = args
      this.$http.reqGetTaxBreakFiles_item(args, nodes).then(response => {
        // console.log('税收优惠项目1111', response)
        this.showLoding = false
        this.lists4 = response.tbls[0].items !== null ? response.tbls[0].items : []
        this.total5 = Math.ceil(response.tbls[0].total/10)
        this.totalLists = response.tbls[0].total // 总的条数

        this.classifytag = response.tbls[0].classifytag
        this.minback5 = response.tbls[0].minback
        this.minlock5 = response.tbls[0].minlock
        this.flag = true
        this.data = {
          classifytag: this.classifytag,
          // minlock: this.minlock5
          minlock: this.minlock5 ? this.minlock5 : 0
        }

        this.$store.dispatch('choose/updateLists', this.lists4)

        // this.bus.$emit('classifytagData', this.data)
        this.$refs.classification.alertBars5(this.data)
      }).catch(err => {
        this.showLoding = false
        // console.log('err', err.message)
      })
    },
    // 税收优惠税种
    getDataRadio2(tagid, stime, etime, searchText) {
      this.showLoding = true
      if (tagid && tagid !== undefined) {
        this.isFilter = true
      } else {
        this.isFilter = false
      }
      let args = {
        searchtimes: this.SearchTimes,  // 查询次数，第一次查询一定传1，二次查询传2
        frist: {
          text: '',
          potence: this.value6 !== '1' ? this.value6 : '',
          icode: '',
          tcode: '',
          kcode: this.value12 !== '0' ? this.value12 : '',
          country: '',
          ps: {},
          dirid: '',  // 上传目录ID，云端查询需要这个参数
          id: ''
        },
        second: [
          {
            text2: searchText && searchText !== undefined ? searchText : '',
            stime: stime && stime !== undefined ? stime : '',
            etime: etime && etime !== undefined ? etime : ''
          }
        ],
        fliter: {
          isfilter: this.isFilter,
          tagpc: [{p:'000000', c: '000000'}],
          tagid: tagid && tagid !== undefined ? tagid : ''
        },
        pager: [
          {
            pagesize: 10, // 当前页  
            pageindex: this.currentPage5, // 每页显示的条数
          }
        ]
      }

      // console.log('税收优惠项目的数据====》', args)
      let nodes = this.$baseConfig.code
      this.updateDatas = args
      this.$http.reqGetTaxBreakFiles_taxes(args, nodes).then(response => {
        // console.log('税收优惠税种2222', response)
        this.showLoding = false
        this.lists4 = response.tbls[0].items !== null ? response.tbls[0].items : []
        this.total5 = Math.ceil(response.tbls[0].total/10)
        this.totalLists = response.tbls[0].total // 总的条数
        this.classifytag = response.tbls[0].classifytag
        this.minback5 = response.tbls[0].minback
        this.minlock5 = response.tbls[0].minlock
        this.flag = true
        this.data = {
          classifytag: this.classifytag,
          // minlock: this.minlock5
          minlock: this.minlock5 ? this.minlock5 : 0
        }

        this.$store.dispatch('choose/updateLists', this.lists4)

        // this.bus.$emit('classifytagData', this.data)
        this.$refs.classification.alertBars5(this.data)
      }).catch(err => {
        this.showLoding = false
        // console.log('err', err.message)
      })
    },
    // 税收优惠行业 税收优惠行业通用
    getDataRadio3CommonFiles(tagid, stime, etime, searchText) {
      this.showLoding = true
      if (tagid && tagid !== undefined) {
        this.isFilter = true
      } else {
        this.isFilter = false
      }
      let args = {
        searchtimes: this.SearchTimes,  // 查询次数，第一次查询一定传1，二次查询传2
        frist: {
          text: '',
          potence: this.value6 !== '1' ? this.value6 : '',
          icode: '',
          tcode: '',
          kcode: this.value13 !== '0' ? this.value13 : '',
          country: '',
          ps: {},
          dirid: '',  // 上传目录ID，云端查询需要这个参数
          id: ''
        },
        second: [
          {
            text2: searchText && searchText !== undefined ? searchText : '',
            stime: stime && stime !== undefined ? stime : '',
            etime: etime && etime !== undefined ? etime : ''
          }
        ],
        fliter: {
          isfilter: this.isFilter,
          tagpc: [{p:'000000', c: '000000'}],
          tagid: tagid && tagid !== undefined ? tagid : ''
        },
        pager: [
          {
            pagesize: 10, // 当前页  
            pageindex: this.currentCommonPage, // 每页显示的条数
          }
        ]
      }

      // console.log('进出口税收检索的数据====》', args)
      let nodes = this.$baseConfig.code
      this.updateCommonDatas = args
      this.$http.reqGetTaxBreakIndustryCommonFiles(args, nodes).then(response => {
        // console.log('税收优惠检索的查询按钮222', response)
        this.showLoding = false
        this.commonLists = response.tbls[0].items !== null ? response.tbls[0].items : []
        this.commonTotal5 = Math.ceil(response.tbls[0].total/10)
        this.commonTotal5Lists = response.tbls[0].total
        this.classifytag = response.tbls[0].classifytag
        this.minback5 = response.tbls[0].minback
        this.minlock5 = response.tbls[0].minlock
        this.flag = true
        // this.data = {
        //   classifytag: this.classifytag,
        //   minlock: this.minlock5
        // }
        this.dataC = {
          classifytag: this.classifytag,
          // minlock: this.minlock5
          minlock: this.minlock5 ? this.minlock5 : 0
        }

        this.$store.dispatch('choose/updateCommonResult', this.commonLists)
        this.$refs.classification.alertBars5(this.dataC)
      }).catch(err => {
        this.showLoding = false
        // console.log('err', err.message)
      })
    },
    //  税收优惠行业 税收优惠行业专属
    getDataRadio3IndustryFiles(tagid, stime, etime, searchText) {
      this.showLoding = true
      if (tagid && tagid !== undefined) {
        this.isFilter = true
      } else {
        this.isFilter = false
      }
      let args = {
        searchtimes: this.SearchTimes,  // 查询次数，第一次查询一定传1，二次查询传2
        frist: {
          text: '',
          potence: this.value6 !== '1' ? this.value6 : '',
          icode: '',
          tcode: '',
          kcode: this.value13 !== '0' ? this.value13 : '',
          country: '',
          ps: {},
          dirid: '',  // 上传目录ID，云端查询需要这个参数
          id: ''
        },
        second: [
          {
            text2: searchText && searchText !== undefined ? searchText : '',
            stime: stime && stime !== undefined ? stime : '',
            etime: etime && etime !== undefined ? etime : ''
          }
        ],
        fliter: {
          isfilter: this.isFilter,
          tagpc: [{p:'000000', c: '000000'}],
          tagid: tagid && tagid !== undefined ? tagid : ''
        },
        pager: [
          {
            pagesize: 10, // 当前页  
            pageindex: this.currentIndustryPage, // 每页显示的条数
          }
        ]
      }

      // console.log('进出口税收检索的数据====》', args)
      let nodes = this.$baseConfig.code
      this.updateIndustryDatas = args
      this.$http.reqGetTaxBreakIndustryFiles(args, nodes).then(response => {
        // console.log('税收优惠检索的查询按钮222', response)
        this.showLoding = false
        this.industryLists = response.tbls[0].items !== null ? response.tbls[0].items : []
        this.industryTotal5 = Math.ceil(response.tbls[0].total/10)
        this.industryTotal5lists = response.tbls[0].total
        this.classifytag = response.tbls[0].classifytag
        this.minback5 = response.tbls[0].minback
        this.minlock5 = response.tbls[0].minlock
        this.flag = true
        // this.data = {
        //   classifytag: this.classifytag,
        //   minlock: this.minlock5
        // }
        this.dataI = {
          classifytag: this.classifytag,
          // minlock: this.minlock5
          minlock: this.minlock5 ? this.minlock5 : 0
        }

        this.$store.dispatch('choose/updateIndustryResult', this.industryLists)
        this.$refs.classification.alertBars5(this.dataI)
      }).catch(err => {
        this.showLoding = false
        // console.log('err', err.message)
      })
    },
    // 条约检索 通用
    getData4Common(tagid, stime, etime, searchText) {
      this.showLoding = true
      if (tagid && tagid !== undefined) {
        this.isFilter = true
      } else {
        this.isFilter = false
      }
      let args = {
        searchtimes: this.SearchTimes,  // 查询次数，第一次查询一定传1，二次查询传2
        frist: {
          text: '',
          potence: this.value7 !== '1' ? this.value7 : '',
          icode: '',
          tcode: '',
          kcode: '',
          country: this.value3 !== '0' ? this.value3 : '',
          ps: {},
          dirid: '',  // 上传目录ID，云端查询需要这个参数
          id: ''
        },
        second: [
          {
            text2: searchText && searchText !== undefined ? searchText : '',
            stime: stime && stime !== undefined ? stime : '',
            etime: etime && etime !== undefined ? etime : ''
          }
        ],
        fliter: {
          isfilter: this.isFilter,
          tagpc: [{p:'000000', c: '000000'}],
          tagid: tagid && tagid !== undefined ? tagid : ''
        },
        pager: [
          {
            pagesize: 10, // 当前页  
            pageindex: this.currentCommonPage, // 每页显示的条数
          }
        ]
      }

      // console.log('条约检索 通用的数据====》', args)
      let nodes = this.$baseConfig.code
      this.updateCommonDatas = args
      this.$http.reqGetCommonTreatyFiles(args, nodes).then(response => {
        // console.log('条约检索 通用', response)
        this.showLoding = false
        this.commonLists = response.tbls[0].items !== null ? response.tbls[0].items : []
        this.commonTotal5 = Math.ceil(response.tbls[0].total/10)
        this.commonTotal5Lists = response.tbls[0].total
        this.classifytag = response.tbls[0].classifytag
        this.minback5 = response.tbls[0].minback
        this.minlock5 = response.tbls[0].minlock
        this.flag = true
        // this.data = {
        //   classifytag: this.classifytag,
        //   minlock: this.minlock5
        // }
        this.dataC = {
          classifytag: this.classifytag,
          // minlock: this.minlock5
          minlock: this.minlock5 ? this.minlock5 : 0
        }

        this.$store.dispatch('choose/updateCommonResult', this.commonLists)
        this.$refs.classification.alertBars5(this.dataC)
      }).catch(err => {
        this.showLoding = false
        // console.log('err', err.message)
      })
    },
    // 条约检索 国家(地区)
    getData4Industry(tagid, stime, etime, searchText) {
      this.showLoding = true
      if (tagid && tagid !== undefined) {
        this.isFilter = true
      } else {
        this.isFilter = false
      }
      let args = {
        searchtimes: this.SearchTimes,  // 查询次数，第一次查询一定传1，二次查询传2
        frist: {
          text: '',
          potence: this.value7 !== '1' ? this.value7 : '',
          icode: '',
          tcode: '',
          kcode: '',
          country: this.value3 !== '0' ? this.value3 : '',
          ps: {},
          dirid: '',  // 上传目录ID，云端查询需要这个参数
          id: ''
        },
        second: [
          {
            text2: searchText && searchText !== undefined ? searchText : '',
            stime: stime && stime !== undefined ? stime : '',
            etime: etime && etime !== undefined ? etime : ''
          }
        ],
        fliter: {
          isfilter: this.isFilter,
          tagpc: [{p:'000000', c: '000000'}],
          tagid: tagid && tagid !== undefined ? tagid : ''
        },
        pager: [
          {
            pagesize: 10, // 当前页  
            pageindex: this.currentIndustryPage, // 每页显示的条数
          }
        ]
      }

      // console.log('条约检索 国家(地区)====》', args)
      let nodes = this.$baseConfig.code
      this.updateIndustryDatas = args
      this.$http.reqGetTreatyFiles(args, nodes).then(response => {
        // console.log('条约检索 国家(地区)', response)
        this.showLoding = false
        this.industryLists = response.tbls[0].items !== null ? response.tbls[0].items : []
        this.industryTotal5 = Math.ceil(response.tbls[0].total/10)
        this.industryTotal5lists = response.tbls[0].total
        this.classifytag = response.tbls[0].classifytag
        this.minback5 = response.tbls[0].minback
        this.minlock5 = response.tbls[0].minlock
        this.flag = true
        // this.data = {
        //   classifytag: this.classifytag,
        //   minlock: this.minlock5
        // }
        this.dataI = {
          classifytag: this.classifytag,
          // minlock: this.minlock5
          minlock: this.minlock5 ? this.minlock5 : 0
        }
        this.$store.dispatch('choose/updateIndustryResult', this.industryLists)
        this.$refs.classification.alertBars5(this.dataI)
      }).catch(err => {
        this.showLoding = false
        // console.log('err', err.message)
      })
    },
    // 获取进出口税收检索的数据
    getData5(tagid, stime, etime, searchText) {
      // console.log('this.currentPage5', this.currentPage5, tagid, stime, etime, searchText)
      // console.log('this.SearchTimes', this.SearchTimes)
      // console.log('this.isFilter', this.isFilter)
      this.showLoding = true
      if (tagid && tagid !== undefined) {
        this.isFilter = true
      } else {
        this.isFilter = false
      }
      let args = {
        searchtimes: this.SearchTimes,  // 查询次数，第一次查询一定传1，二次查询传2
        frist: {
          text: '',
          potence: this.value8 !== '1' ? this.value8 : '',
          icode: '',
          tcode: '',
          kcode: this.value4 !== '0' ? this.value4 : '',
          country: '',
          ps: {},
          dirid: '',  // 上传目录ID，云端查询需要这个参数
          id: ''
        },
        second: [
          {
            text2: searchText && searchText !== undefined ? searchText : '',
            stime: stime && stime !== undefined ? stime : '',
            etime: etime && etime !== undefined ? etime : ''
          }
        ],
        fliter: {
          isfilter: this.isFilter,
          tagpc: [{p:'000000', c: '000000'}],
          tagid: tagid && tagid !== undefined ? tagid : ''
        },
        pager: [
          {
            pagesize: 10, // 当前页  
            pageindex: this.currentPage5, // 每页显示的条数
          }
        ]
      }

      // console.log('进出口税收检索的数据====》', args)

      let nodes = this.$baseConfig.code
      this.updateDatas = args

      this.$http.reqGetInOutFiles(args, nodes).then(response => {
        // console.log('进出口返回的数据res==response==>4444', response)
        this.showLoding = false
        this.lists4 = response.tbls[0].items !== null ? response.tbls[0].items : []
        this.total5 = Math.ceil(response.tbls[0].total/10)
        this.totalLists = response.tbls[0].total // 总的条数
        this.classifytag = response.tbls[0].classifytag
        this.minback5 = response.tbls[0].minback
        this.minlock5 = response.tbls[0].minlock
        this.flag = true
        this.data = {
          classifytag: this.classifytag,
          // minlock: this.minlock5
          minlock: this.minlock5 ? this.minlock5 : 0
        }

        this.$store.dispatch('choose/updateLists', this.lists4)

        this.$refs.classification.alertBars5(this.data)
      }).catch(err => {
        this.showLoding = false
        // console.log('err', err.message)
      })
    },
    changeValue2(value) {
      this.value2 = value
    },
    changeValue3(value) {
      this.value3 = value
    },
    changeValue11(value) {
      this.value11 = value
    },
    changeValue12(value) {
      this.value12 = value
    },
    changeValue13(value) {
      this.value13 = value
    },
    // 进出口税收检索的类别切换
    changeValue4(value) {
      this.value4 = value
    },
    // 选择时间
    selectTime(time) {
      // this.thisFs = false
      this.SearchTimes = 2
      this.stime = time.stime
      this.etime = time.etime
      this.backStatus()
      this.$refs.listCont.toggle([])
      if (this.queryBtn === 1) {
        this.currentPage = 1
        this.getData(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 2 && this.commonFlag) {
        this.currentCommonPage = 1
        this.getData2Common(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 2 && this.industryFlag) {
        this.currentIndustryPage = 1
        this.getData2Industry(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 3 && this.radio === '1') {
        this.currentPage5 = 1
        this.getDataRadio1(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 3 && this.radio === '2') {
        this.currentPage5 = 1
        this.getDataRadio2(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 3 && this.radio === '3' && this.commonFlag) {
        this.currentCommonPage = 1
        this.getDataRadio3CommonFiles(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 3 && this.radio === '3' && this.industryFlag) {
        this.currentIndustryPage = 1
        this.getDataRadio3IndustryFiles(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 4 && this.commonFlag) {
        this.currentCommonPage = 1
        this.getData4Common(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 4 && this.industryFlag) {
        this.currentIndustryPage = 1
        this.getData4Industry(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 5) {
        this.currentPage5 = 1
        this.getData5(this.tagid, this.stime, this.etime, this.searchText)
      } 
    },
    // 搜索按钮
    searchKeyWord(keyword) {
      // this.thisFs = false
      this.SearchTimes = 2
      this.searchText = keyword
      this.backStatus()
      this.$refs.listCont.toggle([])
      if (this.queryBtn === 1) {
        this.currentPage = 1
        this.getData(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 2 && this.commonFlag) {
        this.currentCommonPage = 1
        this.getData2Common(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 2 && this.industryFlag) {
        this.currentIndustryPage = 1
        this.getData2Industry(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 3 && this.radio === '1') {
        this.currentPage5 = 1
        this.getDataRadio1(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 3 && this.radio === '2') {
        this.currentPage5 = 1
        this.getDataRadio2(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 3 && this.radio === '3' && this.commonFlag) {
        this.currentCommonPage = 1
        this.getDataRadio3CommonFiles(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 3 && this.radio === '3' && this.industryFlag) {
        this.currentIndustryPage = 1
        this.getDataRadio3IndustryFiles(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 4 && this.commonFlag) {
        this.currentCommonPage = 1
        this.getData4Common(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 4 && this.industryFlag) {
        this.currentIndustryPage = 1
        this.getData4Industry(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 5) {
        this.currentPage5 = 1
        this.getData5(this.tagid, this.stime, this.etime, this.searchText)
      }
    },
    // 清除时间按钮
    clearTime() {
      // this.thisFs = false
      this.SearchTimes = 2
      this.stime = ''
      this.etime = ''
      this.backStatus()
      this.$refs.listCont.toggle([])
      if (this.queryBtn === 1) {
        this.currentPage = 1
        this.getData(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 2 && this.commonFlag) {
        this.currentCommonPage = 1
        this.getData2Common(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 2 && this.industryFlag) {
        this.currentIndustryPage = 1
        this.getData2Industry(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 3 && this.radio === '1') {
        this.currentPage5 = 1
        this.getDataRadio1(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 3 && this.radio === '2') {
        this.currentPage5 = 1
        this.getDataRadio2(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 3 && this.radio === '3' && this.commonFlag) {
        this.currentCommonPage = 1
        this.getDataRadio3CommonFiles(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 3 && this.radio === '3' && this.industryFlag) {
        this.currentIndustryPage = 1
        this.getDataRadio3IndustryFiles(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 4 && this.commonFlag) {
        this.currentCommonPage = 1
        this.getData4Common(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 4 && this.industryFlag) {
        this.currentIndustryPage = 1
        this.getData4Industry(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 5) {
        this.currentPage5 = 1
        this.getData5(this.tagid, this.stime, this.etime, this.searchText)
      }
    },
    // 改变tagid的值
    changeTagid(val) {
      this.tagid = val
      this.backStatus()
      this.$refs.listCont.toggle([])
    },
    // 改变页码
    changePage(num) {
      this.currentPage = num
      this.$nextTick(() => {
        let dom = document.getElementById('goToHere2')
        dom.scrollIntoView()
      })
      this.getData(this.tagid, this.stime, this.etime, this.searchText)
    },
    changePage5(num) {
      this.$nextTick(() => {
        let dom = document.getElementById('goToHere2')
        dom.scrollIntoView()
      })
      if (this.queryBtn === 2 && this.commonFlag) {
        this.currentCommonPage = num
        this.getData2Common(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 2 && this.industryFlag) {
        this.currentIndustryPage = num
        this.getData2Industry(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 3 && this.radio === '1') {
        this.currentPage5 = num
        this.getDataRadio1(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 3 && this.radio === '2') {
        this.currentPage5 = num
        this.getDataRadio2(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 3 && this.radio === '3' && this.commonFlag) {
        this.currentCommonPage = num
        this.getDataRadio3CommonFiles(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 3 && this.radio === '3' && this.industryFlag) {
        this.currentIndustryPage = num
        this.getDataRadio3IndustryFiles(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 4 && this.commonFlag) {
        this.currentCommonPage = num
        this.getData4Common(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 4 && this.industryFlag) {
        this.currentIndustryPage = num
        this.getData4Industry(this.tagid, this.stime, this.etime, this.searchText)
      } else if (this.queryBtn === 5) {
        this.currentPage5 = num
        this.getData5(this.tagid, this.stime, this.etime, this.searchText)
      }
    },
    // 法规分类触发的事件
    showGetData(data) {
      // console.log('法规分类触发的事件data===>', data)
      this.showData = data
      this.tagid = data.tagid
      if (this.queryBtn === 1) {
        this.getData(this.tagid, data.stime, data.etime, data.searchText)
      } else if (this.queryBtn === 2 && this.commonFlag) {
        this.getData2Common(this.tagid, data.stime, data.etime, data.searchText)
      } else if (this.queryBtn === 2 && this.industryFlag) {
        this.getData2Industry(this.tagid, data.stime, data.etime, data.searchText)
      } else if (this.queryBtn === 3 && this.radio === '1') {
        this.getDataRadio1(this.tagid, data.stime, data.etime, data.searchText)
      } else if (this.queryBtn === 3 && this.radio === '2') {
        this.getDataRadio2(this.tagid, data.stime, data.etime, data.searchText)
      } else if (this.queryBtn === 3 && this.radio === '3' && this.commonFlag) {
        this.getDataRadio3CommonFiles(this.tagid, data.stime, data.etime, data.searchText)
      } else if (this.queryBtn === 3 && this.radio === '3' && this.industryFlag) {
        this.getDataRadio3IndustryFiles(this.tagid, data.stime, data.etime, data.searchText)
      } else if (this.queryBtn === 4 && this.commonFlag) {
        this.getData4Common(this.tagid, data.stime, data.etime, data.searchText)
      } else if (this.queryBtn === 4 && this.industryFlag) {
        this.getData4Industry(this.tagid, data.stime, data.etime, data.searchText)
      } else if (this.queryBtn === 5) {
        this.getData5(this.tagid, data.stime, data.etime, data.searchText)
      }
    },
    // 点击弹出搜索导航框
    alertBars() {
      // console.log('this.lists===>', this.industryLists)
      // console.log('this.totalLists===>', this.industryTotal5lists)
      // console.log('this.classifytag===>', this.classifytag)
      let active = this.$store.state.commonSearchData.active
      if (!this.flag) {
        // this.$refs.classification.alertBars()
        this.$refs.classification.alertBar3()
      } else {
        if (this.queryBtn === 1) {
          // this.$refs.classification.alertBars()

          if (this.lists.length === 0 && this.classifytag.length === 0 && this.totalLists === 0) {
            this.$refs.classification.alertBar3()
          } else {
            this.$refs.classification.alertBars()
          }

        } else if (this.queryBtn === 3 && (this.radio === '1' || this.radio === '2')) {
          // this.$refs.classification.commonSelected(this.data)

          if (this.lists4.length === 0 && this.classifytag.length === 0 && this.totalLists === 0) {
            this.$refs.classification.alertBar3()
          } else {
            this.$refs.classification.commonSelected(this.data)
          }

        } else if (this.queryBtn === 5) {
          // this.$refs.classification.commonSelected(this.data)

          if (this.lists4.length === 0 && this.classifytag.length === 0 && this.totalLists === 0) {
            this.$refs.classification.alertBar3()
          } else {
            this.$refs.classification.commonSelected(this.data)
          }

        } else if (this.doubleLists && active === 0) {
          // this.$refs.classification.commonSelected(this.dataC)

          if (this.commonLists.length === 0 && this.classifytag.length === 0 && this.commonTotal5Lists === 0) {
            this.$refs.classification.alertBar3()
          } else {
            this.$refs.classification.commonSelected(this.dataC)
          }

        } else if (this.doubleLists && active === 1) {
          // this.$refs.classification.commonSelected(this.dataI)

          if (this.industryLists.length === 0 && this.classifytag.length === 0 && this.industryTotal5lists === 0) {
            this.$refs.classification.alertBar3()
          } else {
            this.$refs.classification.commonSelected(this.dataI)
          }
        }
      }
    },
    // 点击弹出法规层级框
    alertCengji() {
      this.$refs.regulations.alertCengji()
    },
    // 点击一键上传
    updateOrDelete() {
      console.log('点击了全国版一键上传', this.updateDatas)
      if (this.userId) {
        if (this.queryBtn === 0) {
          this.$notify({ color: '#fff', background: '#b99573', message: '请先搜索文件后上传' })
        } else if (this.queryBtn === 1) {
          this.$refs.uploadFile.updateOrDelete(this.updateDatas, '综合检索')
        } else if (this.queryBtn === 2 && this.commonFlag) {
          this.$refs.uploadFile.updateOrDelete(this.updateCommonDatas, '行业检索通用规定')
        } else if (this.queryBtn === 2 && this.industryFlag) {
          this.$refs.uploadFile.updateOrDelete(this.updateIndustryDatas, '行业检索专属规定')
        } else if (this.queryBtn === 3 && this.radio === '1') {
          this.$refs.uploadFile.updateOrDelete(this.updateDatas, '税收优惠项目')
        } else if (this.queryBtn === 3 && this.radio === '2') {
          this.$refs.uploadFile.updateOrDelete(this.updateDatas, '税收优惠税种')
        } else if (this.queryBtn === 3 && this.radio === '3' && this.commonFlag) {
          this.$refs.uploadFile.updateOrDelete(this.updateCommonDatas, '税收优惠行业通用')
        } else if (this.queryBtn === 3 && this.radio === '3' && this.industryFlag) {
          this.$refs.uploadFile.updateOrDelete(this.updateIndustryDatas, '税收优惠行业专属')
        } else if (this.queryBtn === 4 && this.commonFlag) {
          this.$refs.uploadFile.updateOrDelete(this.updateCommonDatas, '条约检索通用规定')
        } else if (this.queryBtn === 4 && this.industryFlag) {
          this.$refs.uploadFile.updateOrDelete(this.updateIndustryDatas, '条约检索专属规定')
        } else if (this.queryBtn === 5) {
          this.$refs.uploadFile.updateOrDelete(this.updateDatas, '进出口税收检索')
        }
      } else {
        this.$notify({ color: '#fff', background: '#b99573', message: '请先登录' })
      }
    },
    // 点击选择上传
    chooseUpdateOrDelete() {
      if (this.userId) {
        if (this.queryBtn === 0) {
          this.$notify({ color: '#fff', background: '#b99573', message: '请先搜索文件后上传' })
        } else if (this.$store.state.choose.flag2 === false && (this.$store.state.choose.lists.length > 0 || this.$store.state.choose.commonResult.length > 0 || this.$store.state.choose.industryResult.length > 0) && this.$store.state.choose.result.length === 0) {
          this.$refs.listCont.changeFlag()
          this.$store.commit('choose/setFlag2', true)
          this.$store.commit('choose/setChooseUp2', '确定')
          this.$notify({ color: '#fff', background: '#b99573', message: '请先选择要上传的文件' })
        } else if (this.$store.state.choose.flag2 === true && (this.$store.state.choose.lists.length > 0 || this.$store.state.choose.commonResult.length > 0 || this.$store.state.choose.industryResult.length > 0) && this.$store.state.choose.result.length === 0) {
          this.backStatus()
          this.clearResult()
        } else {
          this.$refs.uploadFile.updateOrDelete(this.$store.state.choose.result, '选择上传')
        }
      } else {
        this.$notify({ color: '#fff',
                background: '#b99573', message: '请先登录' })
      }
    },

    // 恢复选择的状态
    backStatus() {
      this.$refs.listCont.changeFlag2()
      this.$store.commit('choose/setFlag2', false)
      this.$store.commit('choose/setChooseUp2', '选择上传')
      this.$store.commit('choose/setResult', [])
    },
    clearResult() {
      this.$refs.listCont.toggle([])
    },
    // 初始化数据
    startClear() {
      this.flag = false
      this.lists = []
      this.lists4 = []
      this.commonLists = []  // 通用规定
      this.industryLists = []  // 专属规定
      this.currentPage = 1
      this.currentPage5 = 1
      this.currentCommonPage = 1
      this.currentIndustryPage = 1
      this.stime = '' // 开始时间
      this.etime = '' // 结束时间
      this.searchText = '' // 搜索关键字
      this.tagid = ''
      this.data = {}
      this.dataC = {}
      this.dataI = {}
    },

    // 切换专属和通用规定
    changeCommonFlag() {
      this.SearchTimes = 1
      this.commonFlag = true
      this.industryFlag = false
      this.currentCommonPage = 1
      this.stime = '', // 开始时间
      this.etime = '', // 结束时间
      this.searchText = '', // 搜索关键字
      this.tagid = ''
      this.$refs.searchBox.keyword = ''
      this.$refs.searchBox.startAndEndTimeOne = ''
      this.$refs.searchBox.startAndEndTimeTwo = ''
      this.$refs.classification.changeFixedBtn()

      // 清除数据
      this.backStatus()
      this.$refs.listCont.toggle([])

      if (this.queryBtn === 2 && this.commonFlag) {
        this.getData2Common()
        this.$refs.classification.clearSearchValue()
      } else if (this.queryBtn === 3 && this.radio === '3' && this.commonFlag) {
        this.getDataRadio3CommonFiles()
        this.$refs.classification.clearSearchValue()
      } else if (this.queryBtn === 4 && this.commonFlag) {
        this.getData4Common()
      }
    },
    // 切换专属和通用规定
    changeIndustryFlag() {
      this.SearchTimes = 1
      this.industryFlag = true
      this.commonFlag = false
      this.currentIndustryPage = 1
      this.stime = '', // 开始时间
      this.etime = '', // 结束时间
      this.searchText = '', // 搜索关键字
      this.tagid = ''
      this.$refs.searchBox.keyword = ''
      this.$refs.searchBox.startAndEndTimeOne = ''
      this.$refs.searchBox.startAndEndTimeTwo = ''
      this.$refs.classification.changeFixedBtn()

      // 清除数据
      this.backStatus()
      this.$refs.listCont.toggle([])

      if (this.queryBtn === 2 && this.industryFlag) {
        this.getData2Industry()
        this.$refs.classification.clearSearchValue()
      } else if (this.queryBtn === 3 && this.radio === '3' && this.industryFlag) {
        this.getDataRadio3IndustryFiles()
        this.$refs.classification.clearSearchValue()
      } else if (this.queryBtn === 4 && this.industryFlag) {
        this.getData4Industry()
      }
    },
    // 综合检索的文件效力改变
    changeSearch1 (value) {
      this.value1 = value
    },
    // 行业检索的文件效力改变
    changeSearch5 (value) {
      this.value5 = value
    },
    // 税收优惠检索的文件效力改变
    changeSearch6 (value) {
      this.value6 = value
    },
    // 条约检索的文件效力改变
    changeSearch7 (value) {
      this.value7 = value
    },
    // 进出口税收检索的文件效力改变
    changeSearch8 (value) {
      this.value8 = value
    },
    // 获取下拉查询条件的数据
    getSelectData() {
      let reqGetIndustryArr = this.$store.state.commonSearchData.reqGetIndustry // 行业
      // let reqGetTaxesArr = this.$store.state.commonSearchData.reqGetTaxes // 税种
      let reqGetInOutArr = this.$store.state.commonSearchData.reqGetInOut // 进出口
      let reqGetReductionArr = this.$store.state.commonSearchData.reqGetReduction // 优惠项目
      let reqGetReduction_taxArr = this.$store.state.commonSearchData.reqGetReduction_tax // 优惠税种
      let reqGetReduction_industryArr = this.$store.state.commonSearchData.reqGetReduction_industry // 优惠行业
      let reqGetCountryArr = this.$store.state.commonSearchData.reqGetCountry // 获取国家
      // console.log('// 税种reqGetTaxesArr', reqGetTaxesArr)
      reqGetIndustryArr.forEach(item => {
        this.option2.push({text: item.label, value: item.id})
      })
      reqGetInOutArr.forEach(item => {
        this.option4.push({text: item.label, value: item.id})
      })
      reqGetReductionArr.forEach(item => {
        this.option11.push({text: item.label, value: item.id})
      })
      reqGetReduction_taxArr.forEach(item => {
        this.option12.push({text: item.label, value: item.id})
      })
      reqGetReduction_industryArr.forEach(item => {
        this.option13.push({text: item.label, value: item.id})
      })
      reqGetCountryArr.forEach(item => {
        this.option3.push({text: item.label, value: item.id})
      })
    },
    // 改变radio时
    changeRadio(name) {
      this.value11 = '0'
      this.value12 = '0'
      this.value13 = '0'
      this.value6 = '1'
      if (name === '1') {
        this.disabled1 = true
        this.disabled2 = false
        this.disabled3 = true
      } else if (name === '2') {
        this.disabled1 = false
        this.disabled2 = true
        this.disabled3 = true
      } else if (name === '3') {
        this.disabled1 = true
        this.disabled2 = true
        this.disabled3 = false
      }
    }
  },
  destroyed() {
    this.$store.commit('choose/setFlag2', false)
    this.$store.commit('choose/setChooseUp2', '选择上传')
    this.$store.dispatch('choose/updateLists', [])
    this.$store.commit('choose/setResult', [])
  }
}
</script>

<style lang="less" scoped>
#searchEngine {
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
  .timeBox {
    height: 45px;
    display: flex;
    background: #fff;
    margin: 0 0 2px 0;
    padding: 0 8px 0 15px;
    .time {
      flex: 1;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 8px;
    }
  }
  .searchItem {
    display: flex;
    .name {
      line-height: 52px;
      flex: 0 0 70px;
      text-align: center;
      color: #333;
    }
    .content {
      flex: 1;
    }
  }
  .btn {
    text-align: center;
    margin-top: 20px;
  }
  .van-cell {
    height: 50px;
    line-height: 32px;
  }
}
</style>
