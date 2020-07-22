<template>
  <div id="listContentCom">
    <div class="listContent" :class="{'listContent_active': flag}">
      <div v-if="total > 0 && lists.length > 0">
        <van-checkbox-group v-model="result" @change="toggle">
          <van-cell-group>
            <van-cell v-for="list in lists" :key="list.docid">
              <template #title>
                <div @click="wordDetail(list)" v-html="list.fname" class="doctitle"></div>
              </template>
              <template #label>
                <div class="msgContent">
                  <div class="time">{{ list.fcode }} {{ list.pdate }}</div>
                  <div class="tag">
                    <span class="tag">{{ list.potence }}</span>
                  </div>
                </div>
              </template>
              <template #right-icon>
                <van-checkbox v-if="flag" :name="list.docid" ref="checkboxes" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </div>
      <div v-else-if="lockLists.length > 0">
        <van-checkbox-group v-model="result" @change="toggle">
          <van-cell-group>
            <van-cell v-for="list in lockLists" :key="list.docid">
              <template #title>
                <div @click="wordDetail(list)" v-html="list.fname" class="doctitle"></div>
              </template>
              <template #label>
                <div class="msgContent">
                  <div class="time">{{ list.fcode }} {{ list.pdate }}</div>
                  <div class="tag">
                    <span class="tag">{{ list.potence }}</span>
                  </div>
                </div>
              </template>
              <template #right-icon>
                <van-checkbox v-if="flag" :name="list.docid" ref="checkboxes" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </div>
      <div v-else-if="doubleLists && (commonLists.length > 0 || industryLists.length > 0)">
        <van-tabs v-model="active" @change="changeTabs" color="#1989FA" title-active-color="#1989FA">
          <van-tab title="通用规定">
            <div v-if="commonLists.length > 0">
              <van-checkbox-group v-model="result" @change="toggle">
                <van-cell-group>
                  <van-cell v-for="list in commonLists" :key="list.docid">
                    <template #title>
                      <div @click="wordDetail(list)" v-html="list.fname" class="doctitle"></div>
                    </template>
                    <template #label>
                      <div class="msgContent">
                        <div class="time">{{ list.fcode }} {{ list.pdate }}</div>
                        <div class="tag">
                          <span class="tag">{{ list.potence }}</span>
                        </div>
                      </div>
                    </template>
                    <template #right-icon>
                      <van-checkbox v-if="flag" :name="list.docid" ref="checkboxes" />
                    </template>
                  </van-cell>
                </van-cell-group>
              </van-checkbox-group>
            </div>
            <div v-else>
              <div class="noDatas">
                <van-empty description="暂无数据" />
              </div>
            </div>
          </van-tab>
          <van-tab v-if="countries" title="国家(地区)">
            <div v-if="industryLists.length > 0">
              <van-checkbox-group v-model="result" @change="toggle">
                <van-cell-group>
                  <van-cell v-for="list in industryLists" :key="list.docid">
                    <template #title>
                      <div @click="wordDetail(list)" v-html="list.fname" class="doctitle"></div>
                    </template>
                    <template #label>
                      <div class="msgContent">
                        <div class="time">{{ list.fcode }} {{ list.pdate }}</div>
                        <div class="tag">
                          <span class="tag">{{ list.potence }}</span>
                        </div>
                      </div>
                    </template>
                    <template #right-icon>
                      <van-checkbox v-if="flag" :name="list.docid" ref="checkboxes" />
                    </template>
                  </van-cell>
                </van-cell-group>
              </van-checkbox-group>
            </div>
            <div v-else>
              <div class="noDatas">
                <van-empty description="暂无数据" />
              </div>
            </div>
          </van-tab>
          <van-tab v-else title="专属规定">
            <div v-if="industryLists.length > 0">
              <van-checkbox-group v-model="result" @change="toggle">
                <van-cell-group>
                  <van-cell v-for="list in industryLists" :key="list.docid">
                    <template #title>
                      <div @click="wordDetail(list)" v-html="list.fname" class="doctitle"></div>
                    </template>
                    <template #label>
                      <div class="msgContent">
                        <div class="time">{{ list.fcode }} {{ list.pdate }}</div>
                        <div class="tag">
                          <span class="tag">{{ list.potence }}</span>
                        </div>
                      </div>
                    </template>
                    <template #right-icon>
                      <van-checkbox v-if="flag" :name="list.docid" ref="checkboxes" />
                    </template>
                  </van-cell>
                </van-cell-group>
              </van-checkbox-group>
            </div>
            <div v-else>
              <div class="noDatas">
                <van-empty description="暂无数据" />
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <div v-else-if="place && (provinceLists.length > 0 || cityLists.length > 0 || globalLists.length > 0)">
        <van-tabs v-model="activePlace" @change="changeTabsPlace" color="#1989FA" title-active-color="#1989FA">
          <van-tab v-if="valueC !== '' && valueCityCode !== ''" :title="valueC+'('+totalLists2+')'">
            <div v-if="cityLists.length > 0">
              <van-checkbox-group v-model="result" @change="toggle">
                <van-cell-group>
                  <van-cell v-for="list in cityLists" :key="list.docid">
                    <template #title>
                      <div @click="wordDetail(list)" v-html="list.fname" class="doctitle"></div>
                    </template>
                    <template #label>
                      <div class="msgContent">
                        <div class="time">{{ list.fcode }} {{ list.pdate }}</div>
                        <div class="tag">
                          <span class="tag">{{ list.potence }}</span>
                        </div>
                      </div>
                    </template>
                    <template #right-icon>
                      <van-checkbox v-if="flag" :name="list.docid" ref="checkboxes" />
                    </template>
                  </van-cell>
                </van-cell-group>
              </van-checkbox-group>
            </div>
            <div v-else>
              <div class="noDatas">
                <van-empty description="暂无数据" />
              </div>
            </div>
          </van-tab>
          <van-tab v-if="valueP !== '' && valueProvCode !== ''" :title="valueP+'('+totalLists1+')'">
            <div v-if="provinceLists.length > 0">
              <van-checkbox-group v-model="result" @change="toggle">
                <van-cell-group>
                  <van-cell v-for="list in provinceLists" :key="list.docid">
                    <template #title>
                      <div @click="wordDetail(list)" v-html="list.fname" class="doctitle"></div>
                    </template>
                    <template #label>
                      <div class="msgContent">
                        <div class="time">{{ list.fcode }} {{ list.pdate }}</div>
                        <div class="tag">
                          <span class="tag">{{ list.potence }}</span>
                        </div>
                      </div>
                    </template>
                    <template #right-icon>
                      <van-checkbox v-if="flag" :name="list.docid" ref="checkboxes" />
                    </template>
                  </van-cell>
                </van-cell-group>
              </van-checkbox-group>
            </div>
            <div v-else>
              <div class="noDatas">
                <van-empty description="暂无数据" />
              </div>
            </div>
          </van-tab>
          <van-tab :title="'全国('+totalLists+')'">
            <div v-if="globalLists.length > 0">
              <van-checkbox-group v-model="result" @change="toggle">
                <van-cell-group>
                  <van-cell v-for="list in globalLists" :key="list.docid">
                    <template #title>
                      <div @click="wordDetail(list)" v-html="list.fname" class="doctitle"></div>
                    </template>
                    <template #label>
                      <div class="msgContent">
                        <div class="time">{{ list.fcode }} {{ list.pdate }}</div>
                        <div class="tag">
                          <span class="tag">{{ list.potence }}</span>
                        </div>
                      </div>
                    </template>
                    <template #right-icon>
                      <van-checkbox v-if="flag" :name="list.docid" ref="checkboxes" />
                    </template>
                  </van-cell>
                </van-cell-group>
              </van-checkbox-group>
            </div>
            <div v-else>
              <div class="noDatas">
                <van-empty description="暂无数据" />
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <div v-else>
        <div class="noDatas">
          <van-empty description="暂无数据" />
        </div>
      </div>
    </div>
    <!-- 弹框详情 -->
    <van-popup v-model="showDetailPopup" position="right" :style="{ height: '100%', width: '100%' }">
      <div class="fileElements">
        <div class="docContent" id="moreMerchant">
          <van-collapse v-model="activeNames">
            <van-collapse-item title="文件要素" name="1">
              <div class="elements topLine">
                <div class="title">文件要素</div>
                <div class="content">内容</div>
              </div>
              <div class="elements" v-for="(item, index) in headers" :key="index">
                <div class="title" v-html="item.t"></div>
                <div class="content" v-html="item.v" @click="open"></div>
              </div>
            </van-collapse-item>
          </van-collapse>
          <div class="detail defaultFont" v-html="value" style="background: #fff; padding: 10px;" @click="open"></div>
          <div v-if="!userId" class="loginBtn"><van-button type="primary" @click="login">请登录查看全文</van-button></div>
        </div>
      </div>
      <van-tabbar :border="false">
        <div v-if="activeName === 'c'" class="backStyle" style="background-color: #fff; diaplay: flex;justify-content: space-around;align-items: center;">
          <van-button :disabled="lastFlag" style="height: 100%;width: 3.2rem;border-radius: 30px;height: 40px;" type="info" @click="backToLastFire">返回</van-button>
          <van-button style="height: 100%;width: 3.2rem;border-radius: 30px;height: 40px;" type="info" @click="backToMail">关闭</van-button>
        </div>
        <div v-else class="backStyle" style="background-color: #fff; diaplay: flex;align-items: center;">
          <van-button :disabled="lastFlag" style="height: 100%;width: 2.6rem;border-radius: 30px;height: 40px;" type="info" @click="backToLastFire">返回</van-button>
          <van-button style="height: 100%;width: 2.6rem;border-radius: 30px;height: 40px;" type="info" @click="backToMail">关闭</van-button>
          <van-button style="height: 100%;width: 2.6rem;border-radius: 30px;height: 40px;" type="info" @click="uploadToSmartCloud">上传云端</van-button>
        </div>
      </van-tabbar>
    </van-popup>
    <!-- 登录 -->
    <login ref="alertModel" @updateDoc="updateDoc"></login>

    <!-- <van-overlay :showLoding="showLoding"></van-overlay> -->
    <van-overlay :show="showLoding" @click="showLoding = false" z-index="9999" :custom-style="{backgroundColor: 'rgba(255, 255, 255, .8)'}">
      <div class="wrapper" @click.stop>
        <van-loading type="spinner" color="#1989fa"></van-loading>
      </div>
    </van-overlay>

  </div>
</template>

<script>
import { base } from '@/utils/lib/util.js'
import Login from '@/components/common/login'
// import VanOverlay from '@/components/common/vanOverlay'

export default {
  props: {
    lists: {
      type: Array,
      default: function () {
        return []
      }
    },
    total: {
      type: Number,
      default: 0
    },
    totalLists: {
      type: Number,
      default: 0
    },
    totalLists1: {
      type: Number,
      default: 0
    },
    totalLists2: {
      type: Number,
      default: 0
    },
    lockLists: {
      type: Array,
      default: function () {
        return []
      }
    },
    doubleLists: {
      type: Boolean,
      default: false
    },
    countries: {
      type: Boolean,
      default: false
    },
    commonLists: { // 通用规定
      type: Array,
      default: function () {
        return []
      }
    },
    industryLists: { // 专属规定
      type: Array,
      default: function () {
        return []
      }
    },
    provinceLists: { // 省份
      type: Array,
      default: function () {
        return []
      }
    },
    cityLists: { // 城市
      type: Array,
      default: function () {
        return []
      }
    },
    globalLists: { // 全国
      type: Array,
      default: function () {
        return []
      }
    },
    place: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Login
    // VanOverlay
  },
  computed: {
    userId() {
      return this.$store.state.user.userId
    },
    valueP() {
      return this.$store.state.commonSearchData.valueP
    },
    valueProvCode() {
      return this.$store.state.commonSearchData.valueProvCode
    },
    valueC() {
      return this.$store.state.commonSearchData.valueC
    },
    valueCityCode() {
      return this.$store.state.commonSearchData.valueCityCode
    },
    fixedDir() {
      return this.$store.state.fixedFolder.fixedFolderArr
    },
    activeName() {
      return this.$store.state.commonSearchData.activeName
    }
  },
  data() {
    return {
      showDetailPopup: false, // 弹出框
      show: true,
      activeNames: ['1'],
      headers: [], // 文件要素
      value: '', // 文件正文内容
      showLoginBtn: false,
      active: this.$store.state.commonSearchData.active,
      activePlace: this.$store.state.commonSearchData.activePlace,
      result: [],
      flag: false,
      backDocFiresArr: [], // 返回的文件docid
      lastFlag: true,
      loginDocId: '', // 点击的doc的文件内容
      loginDoc: {}, // 点击的doc的文件内容
      showLoding: false,
      addid: true  // 为true的时候添加id进数组  
    }
  },
  methods: {
    toggle(names) {
      this.result = names
      // console.log('result44', this.result)
      this.$store.commit('choose/setResult', this.result)
      // this.$refs.checkboxes[index].toggle();
    },
    changeFlag() {
      this.flag = true
    },
    changeFlag2() {
      this.flag = false
    },
    // 切换标签
    changeTabs(name, title) {
      console.log('name, title', name, title)
      this.$store.commit('commonSearchData/changeActive', name)
      if (name === 0 && title === '通用规定') {
        this.$emit('changeCommonFlag')
      } else if (name === 1 && title === '专属规定') {
        this.$emit('changeIndustryFlag')
      } else if (name === 1 && title === '国家(地区)') {
        this.$emit('changeIndustryFlag')
      }
    },
    // 切换地方版 省份 城市 全国标签
    changeTabsPlace(name) {
      // console.log('name, title', name, title)
      this.$store.commit('commonSearchData/changeActivePlace', name)
      if (name === 0 && this.valueC !== '' && this.valueCityCode !== '') {
        this.$emit('changeCityFlag')
      } else if (name === 0 && this.valueC === '' && this.valueCityCode === '') {
        this.$emit('changeProvinceFlag')
      } else if (name === 1 && this.valueC !== '' && this.valueCityCode !== '') {
        this.$emit('changeProvinceFlag')
      } else if (name === 1 && this.valueC === '' && this.valueCityCode === '') {
        this.$emit('changeGlobalFlag')
      } else if (name === 2) {
        this.$emit('changeGlobalFlag')
      }
    },
    // 返回按钮
    backToLastFire() {

      this.addid = false

      this.$nextTick(() => {
        let dom = document.getElementById('moreMerchant')
        dom.scrollIntoView()
      })
      if (this.backDocFiresArr.length > 1) {
        this.backDocFiresArr.pop()
        let lastId = this.backDocFiresArr.slice(-1)
        this.getDetail1(lastId)
        if (this.backDocFiresArr.length === 1) {
          this.lastFlag = true
        }
      } else {
        // 只有一个id
        this.getDetail1(this.backDocFiresArr[0])
        this.lastFlag = true
      }
    },
    // 关闭按钮
    backToMail() {
      this.addid = true
      this.showDetailPopup = false
      this.backDocFiresArr = []
    },
    // 上传云端按钮
    uploadToSmartCloud() {
      // console.log('点击了上传云端按钮this.backDocFiresArr=======', this.backDocFiresArr)
      if (this.userId) {
        let uploadId = this.backDocFiresArr.slice(-1)
        // console.log('uploadId', uploadId, this.fixedDir)
        // 执行上传
        this.$http.upLoadFileToCloud(uploadId, this.fixedDir[0].dir_id).then(response => {
          // console.log('response====>选择上传===', response)
          if (response.rtncode === 1) {
            if (response.rltcode === 1) {
              this.$notify({ color: '#fff', background: '#b99573', message: '文件已成功上传至智慧云端-上传文件库-文件夹一' })
            } else {
              this.$notify({ color: '#fff', background: '#b99573', message: response.rltdesc })
            }
          } else {
            this.$notify({ color: '#fff', background: '#b99573', message: response.rtndesc })
          }
        }).catch(() => {
          // console.log('err', err)
        })
      } else {
        // 提示登录后使用
        this.$notify({ 
          color: '#fff',
          background: '#b99573', 
          message: '请您先登录再使用[上传云端]功能' 
        })
      }
    },

    // 更新doc文件的内容
    updateDoc() {
      if (this.backDocFiresArr.length > 1) {
        this.getDetail1(this.loginDocId)
      } else {
        this.getDetail(this.loginDoc)
      }
    },

    // 点击列表查看详情
    wordDetail(doc) {
      // console.log('点击列表数据的内容', doc)
      this.loginDoc  = doc
      // this.backDocFiresArr.push(doc.docid)
      this.lastFlag = true

      this.showDetailPopup = true
      this.getDetail(doc)

      this.$nextTick(() => {
        let dom = document.getElementById('moreMerchant')
        dom.scrollIntoView()
      })
    },
    // 获取最新文件列表
    getDetail(doc) {
      // console.log('doc', doc, this.$store.state.user)
      this.showLoding = true
      let bodyJson = {
        docid: parseInt(doc.docid),
        h1hit: doc.h1hit,
        chit: doc.chit,
        cutwords: []
      }
      this.$http.reqPostDocDetail(bodyJson).then( response => {
        console.log('response111111111111111111111111111111====>详情数据', response)
        if (response.rtncode === 1) {
          if (response.rltcode === 1) {
            this.handleLoadDoc(response)
          }
        }
        // this.handleLoadDoc(response)
      }).catch( () => {
        sessionStorage.clear()
        this.$cookie.delete('cookieObj')
        // this.$toast.fail(err.message)
        // console.log('err66669999', err)
        this.showDetailPopup = false
      })
    },
    getDetail1(docid) {
      this.showLoding = true
      let bodyJson = {
        docid: parseInt(docid),
        h1hit: [],
        chit: [],
        cutwords: []
      }
      this.$http.reqPostDocDetail(bodyJson).then( response => {
        console.log('response====>详情数据666666', response)
        if (response.rtncode === 1) {
          if (response.rltcode === 1) {
            this.handleLoadDoc(response)
          } else {
            this.$notify({ color: '#fff', background: '#b99573', message: response.rltdesc })
            this.showLoding = false
          }
          if (response.rltcode === -300) { // 该文件需要下载才能访问，请请求下载接口
            this.$notify({ color: '#fff', background: '#b99573', message: '该文件暂时无法访问,请阅览其他文件！' })
            this.showLoding = false
          }
        } else {
          this.showLoding = false
        }
      }).catch( () => {
        // this.$toast.fail(err.message)
        this.showDetailPopup = false
      })
    },
    // 点击详情里面的链接 调整相应的页面
    open(value) {
      console.log('value===>', value)
      if (value.srcElement.id) {
        this.addid = true
        this.showLoding = true
        this.loginDocId = value.srcElement.id
        this.$nextTick(() => {
          let dom = document.getElementById('moreMerchant')
          dom.scrollIntoView()
        })
        this.getDetail1(value.srcElement.id)
      } else if (value.srcElement.tagName === 'TT') {
        this.$nextTick(() => {
          let dom = document.getElementById(value.srcElement.lang)
          dom.scrollIntoView()
        })
        this.showLoding = false
      }
    },
    // 临时登录查看文件时显示 点击登录按钮
    handleLoadDoc(response) {
      console.log('response临时登录查看文件6666666666666===>', response)
      // this.showLoding = true
      if (response.rtncode === 1) {
        if (response.rltcode === 1) {
          if (this.addid) {
            this.backDocFiresArr.push(response.item.docid)
            if (this.backDocFiresArr.length > 1) {
              this.lastFlag = false
            } else {
              this.lastFlag = true
            }
            // console.log('111111临时登录this.backDocFiresArr=======', this.backDocFiresArr)
          }
          
          this.showLoding = false
          this.headers = response.item.headers
          let tempdata = base.b64_to_utf8(response.item.body)
          this.value = tempdata.replace(/\r?\n/g, '<br />')
          if (response.item.hidden === true) { // true：临时登录  false：已登录
            this.showLoginBtn = true
          }
        } else {
          // this.$toast.fail(response.rltdesc)
          this.$notify({ color: '#fff', background: '#b99573', message: response.rltdesc })
          this.showLoding = false
        }
      } else {
        // this.$toast.fail(response.rtndesc)
        this.$notify({ color: '#fff', background: '#b99573', message: response.rtndesc })
        this.showLoding = false
      }
    },
    // 请登录查看全文 按钮
    login() {
      this.$refs.alertModel.changeShowLogin(true)
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/variable.less";
@--line-color: #DCDEE2;
#listContentCom {
  .fileElements {
    height: 100%;
    background: #fff;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;  // 重点
    }
    .topLine {
      border-top: 1px solid @--line-color;
    }
    .elements {
      display: flex;
      min-height: 40px;
      border-bottom: 1px solid @--line-color;
      color: #515A6E;
      font-size: 12px;
      border-right: 1px solid @--line-color;
      &:nth-child(odd) {
        background-color: #F8F8F9;
      }
      .title {
        flex: 0 0 27%;
        text-align: center;
        border-left: 1px solid @--line-color;
        border-right: 1px solid @--line-color;
        line-height: 40px;
      }
      .content {
        flex: 1;
        text-align: center;
        // border-right: 1px solid @--line-color;
        margin: auto  0;
      }
    }
    .docContent {
      margin-bottom: 60px;
    }
  }
  .backStyle {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
  }
  .loginBtn {
    height: 280px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-top: -210px;
    background: rgba(255, 255, 255, .9);
  }
  .listContent_active {
    margin-bottom: 20px;
    .doctitle {
      width: 315px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #656565;
      // border: 1px solid red;
    }
    .msgContent {
      width: 315px;
      font-size: 12px;
      color: #A6A6A6;
      display: flex;
      justify-content: space-between;
      // border: 1px solid red;
      .time {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tag {
        min-width: 50px;
        margin-left: 4px;
        .tag {
          width: 100%;
          color: @--base-word-color;
        }
      }
    }
  }
}
</style>

<style lang="less">
hh1,
hh2,
hh3,
hh41,
hh42,
hh5,
hh6,
hh7,
hh81,
hh82,
sc,
p {
  margin: 0pt 2pt;
  font-weight: normal;
}

//文件名
hh1 {
  display: block;
  text-align: center;
  line-height: 170%;
  font-size: 14pt;
  font-weight: normal;
  font-weight: 700;
}

//文号
hh2 {
  text-align: center;
  line-height: 300%;
  font-size: 8pt;
  font-weight: normal;
  display: block;
  margin-top: 10pt;
}

//废止依据
hh3 {
  text-align: justify;
  line-height: 200%;
  font-size: 12pt;
  font-weight: normal;
  display: block;
}

hh4 {
  text-align: justify;
  line-height: 200%;
  font-size: 12pt;
  font-weight: normal;
  display: block;
}

hh41 {
  text-align: justify;
  line-height: 200%;
  font-size: 12pt;
  font-weight: normal;
  display: block;
}

hh42 {
  text-align: justify;
  line-height: 200%;
  font-size: 12pt;
  font-weight: normal;
  display: block;
}

//发文单位
hh5 {
  text-align: right;
  line-height: 200%;
  font-size: 11pt;
  font-weight: normal;
  display: block;
}

//发文时间
hh6 {
  text-align: right;
  line-height: 200%;
  font-size: 11pt;
  font-weight: normal;
  display: block;
}

//附件
hh7 {
  text-align: justify;
  line-height: 200%;
  font-size: 12pt;
  font-weight: normal;
  display: block;
}

// hh9 {
//   text-align: justify;
//   line-height: 300%;
//   font-size: 12pt;
//   font-weight: normal;
//   display: block;
// }

//相关链接
hh81 {
  text-align: justify;
  line-height: 200%;
  font-size: 12pt;
  font-weight: normal;
  display: block;
}

//版本汇总
hh82 {
  text-align: justify;
  line-height: 200%;
  font-size: 12pt;
  font-weight: normal;
  display: block;
}

sc {
  text-align: justify;
  line-height: 180%;
  font-size: 11pt;
  font-weight: normal;
  display: block;
  margin-top: 6pt;
}

basis {
  font-size: 12pt;
  font-weight: normal;
  line-height: 200%;
  color: #c00000;
}

potencedesc {
  text-align: justify;
  line-height: 200%;
  font-size: 12pt;
  font-weight: normal;
  display: block;
  color: #c00000;
}

tt {
  text-align: justify;
  line-height: 200%;
  font-size: 12pt;
  font-weight: normal;
}

sr {
  color: #c00000
}

.ls {
  //text-decoration: underline;
  color: blue;
  cursor: Pointer;
}

.ls_w:after {
  font-family: "iconfont" !important;
  font-size: 12pt;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\e62e";
  //background-image: url(../../../../static/images/img/download.png);
}

.ls_e {
  color: blue;
  cursor: Pointer;
}

.ls_z {
  color: blue;
  cursor: Pointer;
}

.ls_o {
  color: blue;
  cursor: Pointer;
}

.defaultFont {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  position: relative;
  min-height: 492px;
}

#hh9 {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50px 50px 50px;
  grid-auto-flow: column;
}

hh9 {
  font-size: 16px;
  text-align: left;
  //border: 1px solid #e5e4e9;
}

hit {
  background-color: yellow;
}

.van-tab__text--ellipsis {
  -webkit-line-clamp: 2;
  text-align: center;
}
</style>
