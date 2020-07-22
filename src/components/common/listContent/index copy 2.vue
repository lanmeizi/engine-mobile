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
    
    <van-overlay :show="showLoding" @click="showLoding = false" z-index="9999" :custom-style="{backgroundColor: 'rgba(255, 255, 255, .8)'}">
      <div class="wrapper" @click.stop>
        <van-loading type="spinner" color="#1989fa"></van-loading>
      </div>
    </van-overlay>

    <FileSharing v-show="fileSharing" :listDetail="loginDoc" ref="fileSharing"></FileSharing>

  </div>
</template>

<script>
import FileSharing from '@/components/common/fileSharing'

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
    FileSharing
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
      fileSharing: false, // 弹框详情

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
    
    // 点击列表查看详情
    wordDetail(doc) {
      console.log('点击列表数据的内容doc', doc)
      this.fileSharing = true
      this.loginDoc  = doc
      this.$refs.fileSharing.wordDetail1(this.loginDoc)
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
