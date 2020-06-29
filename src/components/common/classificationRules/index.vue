<template>
<!-- 法规分类弹框组件 -->
  <div id="classificationRules">
    <van-popup v-model="showNav" closeable close-icon="close" position="left" :style="{ height: '100%', width: '70%' }">
      <div v-if="fixedBar" class="selectNav">
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', fontSize: '17px', marginTop: '20px' }">
          法规分类
        </van-divider>
        <van-dropdown-menu :overlay="false">
          <van-dropdown-item :disabled="disabled11" v-model="value11" :options="option11" @change="changeSearchNav11" />
        </van-dropdown-menu>
        <van-dropdown-menu :overlay="false" v-if="disabled11 && option22.length > 1">
          <van-dropdown-item :disabled="disabled22" v-model="value22" :options="option22" @change="changeSearchNav22" />
        </van-dropdown-menu>
        <van-dropdown-menu :overlay="false" v-if="disabled22 && option33.length > 1">
          <van-dropdown-item :disabled="disabled33" v-model="value33" :options="option33" @change="changeSearchNav33" />
        </van-dropdown-menu>
        <van-dropdown-menu :overlay="false" v-if="disabled33 && option44.length > 1">
          <van-dropdown-item :disabled="disabled44" v-model="value44" :options="option44" @change="changeSearchNav44" />
        </van-dropdown-menu>
        <van-dropdown-menu :overlay="false" v-if="disabled44 && option55.length > 1">
          <van-dropdown-item :disabled="disabled55" v-model="value55" :options="option55" @change="changeSearchNav55" />
        </van-dropdown-menu>
        
        <div style="display: flex;justify-content: space-around;margin-top: 30px;">
          <van-button v-if="fixedBtn && backNum > 0" style="width: 40%;border-radius: 30px;height: 40px;" type="info" @click="backToLastNav1">返回</van-button>
          <van-button v-else disabled style="width: 40%;border-radius: 30px;height: 40px;" type="info" @click="backToLastNav1">返回</van-button>
          <van-button style="width: 40%;border-radius: 30px;height: 40px;" type="info" @click="closePopup">确定</van-button>
        </div>
      </div>
      <div v-else class="selectNav">
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', fontSize: '17px', marginTop: '20px' }">
          法规分类
        </van-divider>
        <van-dropdown-menu :overlay="false">
          <van-dropdown-item :disabled="disabled1" v-model="value1" :options="option1" @change="changeSearchNav1" />
        </van-dropdown-menu>
        <van-dropdown-menu :overlay="false" v-if="disabled1 && option2.length > 1">
          <van-dropdown-item :disabled="disabled2" v-model="value2" :options="option2" @change="changeSearchNav2" />
        </van-dropdown-menu>
        <van-dropdown-menu :overlay="false" v-if="disabled2 && option3.length > 1">
          <van-dropdown-item :disabled="disabled3" v-model="value3" :options="option3" @change="changeSearchNav3" />
        </van-dropdown-menu>
        <van-dropdown-menu :overlay="false" v-if="disabled3 && option4.length > 1">
          <van-dropdown-item :disabled="disabled4" v-model="value4" :options="option4" @change="changeSearchNav4" />
        </van-dropdown-menu>
        <van-dropdown-menu :overlay="false" v-if="disabled4 && option5.length > 1">
          <van-dropdown-item :disabled="disabled5" v-model="value5" :options="option5" @change="changeSearchNav5" />
        </van-dropdown-menu>
        
        <div style="display: flex;justify-content: space-around;margin-top: 30px;">
          <van-button :disabled="!disabled1" style="width: 45%;border-radius: 30px;height: 40px;" type="info" @click="backToLastNav">返回</van-button>
          <van-button style="width: 45%;border-radius: 30px;height: 40px;" type="info" @click="closePopup">确定</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  props: {
    classifytag: {
      type: Object,
      default: function () {
        return {}
      }
    },
    stime: {
      type: String,
      default: ''
    },
    etime: {
      type: String,
      default: ''
    },
    searchText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showNav: false, // 显示法规分类弹框
      value1: '0',
      option1: [{ text: '请选择', value: '0' }],
      disabled1: false,
      value2: '0',
      option2: [{ text: '请选择', value: '0' }],
      disabled2: false,
      value3: '0',
      option3: [{ text: '请选择', value: '0' }],
      disabled3: false,
      value4: '0',
      option4: [{ text: '请选择', value: '0' }],
      disabled4: false,
      value5: '0',
      option5: [{ text: '请选择', value: '0' }],
      disabled5: false,
      searchValue1: '',
      searchValue2: '',
      searchValue3: '',
      searchValue4: '',
      searchValue5: '',
      tagid: '',
      tagid1: '',
      tagid2: '',
      tagid3: '',
      tagid4: '',
      tagid5: '',
      tagid6: '',
      minlock: 0,
      minlock1: 0,
      fixedBar: false,

      value11: '0',
      option11: [{ text: '请选择', value: '0' }],
      disabled11: false,
      value22: '0',
      option22: [{ text: '请选择', value: '0' }],
      disabled22: false,
      value33: '0',
      option33: [{ text: '请选择', value: '0' }],
      disabled33: false,
      value44: '0',
      option44: [{ text: '请选择', value: '0' }],
      disabled44: false,
      value55: '0',
      option55: [{ text: '请选择', value: '0' }],
      disabled55: false,
      fixedBtn: false,
      backNum: 0
    }
  },
  created() {
    this.bus.$on('classifytagData', data => {
      this.getSelectData(data)
    })
    // this.getSelectData(this.classifytag)
  },
  methods: {
    getSelectData(data) {
      this.minlock = data.minlock
      data.classifytag.forEach(item => {
        if (!item.children) {
          this.option1.push({
            text: item.label,
            value: item.id
          })
        } else if (item.children && item.children.length > 0) {
          item.children.forEach(c2 => {
            this.option2.push({
              text: c2.label,
              value: c2.id
            })
            if (c2.children && c2.children.length > 0) {
              c2.children.forEach((c3) => {
                this.option3.push({
                  text: c3.label,
                  value: c3.id
                })
                if (c3.children && c3.children.length > 0) {
                  c3.children.forEach(c4 => {
                    this.option4.push({
                      text: c4.label,
                      value: c4.id
                    })
                    if (c4.children && c4.children.length > 0) {
                      c4.children.forEach(c5 => {
                        this.option5.push({
                          text: c5.label,
                          value: c5.id
                        })
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    },
    // 弹出框
    alertBars() {
      this.showNav = true
      this.fixedBar = false
      // console.log('this.moclock', this.minlock)
      if (this.minlock === 0) {
        this.tagid = ''
        this.option1 = [{ text: '请选择', value: '0' }]
        this.option2 = [{ text: '请选择', value: '0' }]
        this.option3 = [{ text: '请选择', value: '0' }]
        this.option4 = [{ text: '请选择', value: '0' }]
        this.option5 = [{ text: '请选择', value: '0' }]
        let data = {
          tagid: this.tagid,
          stime: this.stime,
          etime: this.etime,
          searchText: this.searchText
        }
        this.$emit('showGetData', data)
      } else if (this.minlock === 1 && this.value2 === '0') {
        this.option2 = [{ text: '请选择', value: '0' }]
        this.option3 = [{ text: '请选择', value: '0' }]
        this.option4 = [{ text: '请选择', value: '0' }]
        this.option5 = [{ text: '请选择', value: '0' }]
        let data = {
          tagid: this.searchValue1,
          stime: this.stime,
          etime: this.etime,
          searchText: this.searchText
        }
        this.$emit('showGetData', data)
      } else if (this.minlock === 2 && this.value3 === '0') {
        this.option3 = [{ text: '请选择', value: '0' }]
        this.option4 = [{ text: '请选择', value: '0' }]
        this.option5 = [{ text: '请选择', value: '0' }]
        let data = {
          tagid: this.searchValue2,
          stime: this.stime,
          etime: this.etime,
          searchText: this.searchText
        }
        this.$emit('showGetData', data)
      } else if (this.minlock === 3 && this.value4 === '0') {
        this.option4 = [{ text: '请选择', value: '0' }]
        this.option5 = [{ text: '请选择', value: '0' }]
        let data = {
          tagid: this.searchValue3,
          stime: this.stime,
          etime: this.etime,
          searchText: this.searchText
        }
        this.$emit('showGetData', data)
      } else if (this.minlock === 4 && this.value4 === '0') {
        this.option5 = [{ text: '请选择', value: '0' }]
        let data = {
          tagid: this.searchValue4,
          stime: this.stime,
          etime: this.etime,
          searchText: this.searchText
        }
        this.$emit('showGetData', data)
      } else if (this.minlock === 5) {
        // console.log('5555', this.tagid)
      }
    },
    alertBars1() {
      this.showNav = false
      this.fixedBar = false
      this.disabled1 = false
      this.value1 = '0'
      if (this.minlock === 0 || this.minlock === 2 || this.minlock === 3 || this.minlock === 4 || this.minlock === 5) {
        this.tagid = ''
        this.option1 = [{ text: '请选择', value: '0' }]
        this.option2 = [{ text: '请选择', value: '0' }]
        this.option3 = [{ text: '请选择', value: '0' }]
        this.option4 = [{ text: '请选择', value: '0' }]
        this.option5 = [{ text: '请选择', value: '0' }]
        let data = {
          tagid: '',
          stime: '',
          etime: '',
          searchText: ''
        }
        this.$emit('showGetData', data)
      } else if (this.minlock === 5) {
        // console.log('5555', this.tagid)
      }
    },
    alertBar2() {
      this.option1 = [{ text: '请选择', value: '0' }]
      this.value1 = '0'
      this.disabled1 = false
      this.disabled2 = false
      this.disabled3 = false
      this.disabled4 = false
      this.disabled5 = false
    },
    alertBar4() {
      this.showNav = true
      this.option1 = [{ text: '请选择', value: '0' }]
      this.value1 = '0'
      this.disabled1 = false
      this.disabled2 = false
      this.disabled3 = false
      this.disabled4 = false
      this.disabled5 = false
    },
    alertBar22() {
      this.option11 = [{ text: '请选择', value: '0' }]
      this.option22 = [{ text: '请选择', value: '0' }]
      this.option33 = [{ text: '请选择', value: '0' }]
      this.option44 = [{ text: '请选择', value: '0' }]
      this.option55 = [{ text: '请选择', value: '0' }]
      this.value11 = '0'
      this.disabled11 = false
      this.disabled22 = false
      this.disabled33 = false
      this.disabled44 = false
      this.disabled55 = false
    },
    alertBar3() {
      // 清除搜索引擎的数据
      this.showNav = true
      this.option1 = [{ text: '请选择', value: '0' }]
      this.option2 = [{ text: '请选择', value: '0' }]
      this.option3 = [{ text: '请选择', value: '0' }]
      this.option4 = [{ text: '请选择', value: '0' }]
      this.option5 = [{ text: '请选择', value: '0' }]
      this.value1 = '0'
      this.disabled1 = false
      this.disabled2 = false
      this.disabled3 = false
      this.disabled4 = false
      this.disabled5 = false

      this.option11 = [{ text: '请选择', value: '0' }]
      this.option22 = [{ text: '请选择', value: '0' }]
      this.option33 = [{ text: '请选择', value: '0' }]
      this.option44 = [{ text: '请选择', value: '0' }]
      this.option55 = [{ text: '请选择', value: '0' }]
      this.value11 = '0'
      this.disabled11 = false
      this.disabled22 = false
      this.disabled33 = false
      this.disabled44 = false
      this.disabled55 = false
      this.fixedBtn = false
    },
    changeFixedBtn() {
      this.fixedBtn = false
      this.backNum = 0
    },
    commonSelected(data) {
      this.alertBars5(data)
      this.$nextTick(() => {
        this.showNav = true
      })
    },
    alertBars5(data) {
      this.fixedBar = true

      this.option11 = [{ text: '请选择', value: '0' }]
      this.option22 = [{ text: '请选择', value: '0' }]
      this.option33 = [{ text: '请选择', value: '0' }]
      this.option44 = [{ text: '请选择', value: '0' }]
      this.option55 = [{ text: '请选择', value: '0' }]

      this.minlock1 = data.minlock
      this.disabled11 = false
      this.disabled22 = false
      this.disabled33 = false
      this.disabled44 = false
      this.disabled55 = false

      data.classifytag.forEach(item => {
        this.option11.push({
          text: item.label,
          value: item.id
        })
        this.value11 = item.id
        this.tagid1 = item.id
        this.tagid6 = item.id
        if (item.children && item.children.length === 1) {
          item.children.forEach(item1 => {
            this.option22.push({
              text: item1.label,
              value: item1.id
            })
            this.value22 = item1.id
            this.tagid2 = item1.id
            this.tagid6 = item.id
            if (item1.children && item1.children.length === 1) {
              item1.children.forEach(item2 => {
                this.option33.push({
                  text: item2.label,
                  value: item2.id
                })
                this.value33 = item2.id
                this.tagid3 = item2.id
                this.tagid6 = item.id
                if (item2.children && item2.children.length === 1) {
                  item2.children.forEach(item3 => {
                    this.option44.push({
                      text: item3.label,
                      value: item3.id
                    })
                    this.value44 = item3.id
                    this.tagid4 = item3.id
                    this.tagid6 = item.id
                    if (item3.children && item3.children.length === 1) {
                      item3.children.forEach(item4 => {
                        this.option55.push({
                          text: item4.label,
                          value: item4.id
                        })
                        this.value55 = item4.id
                        this.tagid5 = item4.id
                        this.tagid6 = item.id
                      })
                    } else if (item3.children && item3.children.length > 1) {
                      // this.value55 = '0'
                      item3.children.forEach(item4 => {
                        this.option55.push({
                          text: item4.label,
                          value: item4.id
                        })
                      })
                    }
                  })
                } else if (item2.children && item2.children.length > 1) {
                  this.value44 = '0'
                  item2.children.forEach(item3 => {
                    this.option44.push({
                      text: item3.label,
                      value: item3.id
                    })
                  })
                }
              })
            } else if (item1.children && item1.children.length > 1) {
              this.value33 = '0'
              item1.children.forEach(item2 => {
                this.option33.push({
                  text: item2.label,
                  value: item2.id
                })
              })
            }
          })
        } else if (item.children && item.children.length > 1) {
          this.value22 = '0'
          item.children.forEach(item1 => {
            this.option22.push({
              text: item1.label,
              value: item1.id
            })
          })
        }
      })

      if (this.minlock1 === 1 && this.option22.length > 1) {
        this.disabled11 = true
        this.value22 = '0'
      } else if (this.minlock1 === 1 && this.option22.length === 1) {
        this.disabled11 = true
        this.disabled22 = false
        this.disabled33 = false
        this.disabled44 = false
        this.disabled55 = false
      } else if (this.minlock1 === 2 && this.option33.length > 1) {
        this.disabled11 = true
        this.disabled22 = true
        this.value33 = '0'
      } else if (this.minlock1 === 2 && this.option33.length === 1) {
        this.disabled11 = true
        this.disabled22 = true
        this.disabled33 = false
        this.disabled44 = false
        this.disabled55 = false
      } else if (this.minlock1 === 3 && this.option44.length > 1) {
        this.disabled11 = true
        this.disabled22 = true
        this.disabled33 = true
        this.value44 = '0'
      } else if (this.minlock1 === 3 && this.option44.length === 1) {
        this.disabled11 = true
        this.disabled22 = true
        this.disabled33 = true
        this.disabled44 = false
        this.disabled55 = false
      } else if (this.minlock1 === 4 && this.option55.length > 1) {
        this.disabled11 = true
        this.disabled22 = true
        this.disabled33 = true
        this.disabled44 = true
        this.value55 = '0'
      } else if (this.minlock1 === 4 && this.option55.length === 1) {
        this.disabled11 = true
        this.disabled22 = true
        this.disabled33 = true
        this.disabled44 = true
        this.disabled55 = false
      } else if (this.minlock1 === 5) {
        this.disabled11 = true
        this.disabled22 = true
        this.disabled33 = true
        this.disabled44 = true
        this.disabled55 = true
      }
    },
    // 返回按钮
    backToLastNav() {
      // console.log('点击返回按钮时的值this.minlock', this.minlock)
      this.$parent.currentPage = 1
      if (this.minlock === 5 && this.value2 !== '0' && this.value3 !== '0' && this.value4 !== '0' && this.value5 !== '0') {
        this.option5 = [{ text: '请选择', value: '0' }]

        let data = {
          tagid: this.searchValue4,
          stime: this.stime,
          etime: this.etime,
          searchText: this.searchText
        }
        this.$emit('showGetData', data)
        this.disabled5 = false
        this.value5 = '0'
      } else if (this.minlock === 4 && this.value2 !== '0' && this.value3 !== '0' && this.value4 !== '0') {
        this.option4 = [{ text: '请选择', value: '0' }]
        this.option5 = [{ text: '请选择', value: '0' }]

        let data = {
          tagid: this.searchValue3,
          stime: this.stime,
          etime: this.etime,
          searchText: this.searchText
        }
        this.$emit('showGetData', data)
        this.disabled4 = false
        this.value4 = '0'
      } else if (this.minlock === 3 && this.value2 !== '0' && this.value3 !== '0') {
        this.option3 = [{ text: '请选择', value: '0' }]
        this.option4 = [{ text: '请选择', value: '0' }]
        this.option5 = [{ text: '请选择', value: '0' }]

        let data = {
          tagid: this.searchValue2,
          stime: this.stime,
          etime: this.etime,
          searchText: this.searchText
        }
        this.$emit('showGetData', data)
        this.disabled3 = false
        this.value3 = '0'
      } else if (this.minlock === 2 && this.value2 !== '0') {
        this.option2 = [{ text: '请选择', value: '0' }]
        this.option3 = [{ text: '请选择', value: '0' }]
        this.option4 = [{ text: '请选择', value: '0' }]
        this.option5 = [{ text: '请选择', value: '0' }]

        let data = {
          tagid: this.searchValue1,
          stime: this.stime,
          etime: this.etime,
          searchText: this.searchText
        }
        // console.log('data=====测试数据>', data)
        this.$emit('showGetData', data)
        this.disabled2 = false
        this.value2 = '0'
      } else if (this.minlock === 1 && this.value2 === '0') {
        this.tagid = ''
        this.option1 = [{ text: '请选择', value: '0' }]
        this.option2 = [{ text: '请选择', value: '0' }]
        this.option3 = [{ text: '请选择', value: '0' }]
        this.option4 = [{ text: '请选择', value: '0' }]
        this.option5 = [{ text: '请选择', value: '0' }]
        this.$emit('changeTagid', this.tagid)
        this.$parent.currentPage = 1

        let data = {
          tagid: this.tagid,
          stime: this.stime,
          etime: this.etime,
          searchText: this.searchText
        }
        this.$emit('showGetData', data)
        this.disabled1 = false
        this.value1 = '0'
      }
    },
    // 确定按钮
    closePopup() {
      this.showNav = false
    },
    // 选择搜索条件改变1
    changeSearchNav1(value) {
      this.title1 = value
      if (value !== '0') {
        this.$parent.currentPage = 1
        // this.$parent.SearchTimes = 2
        if (!this.$store.state.changeVersion.changeFlag && this.$store.state.commonSearchData.activeName === 'a') {
          this.$parent.clearProOrCityMsg()
        }
        let data = {
          tagid: value,
          stime: this.stime,
          etime: this.etime,
          searchText: this.searchText
        }
        this.$emit('showGetData', data)
        this.searchValue1 = value
        this.tagid = value
        this.disabled1 = true

        this.value2 = '0'
        this.disabled2 = false

        this.$emit('changeTagid', value)
      }
    },
    // 选择搜索条件改变2
    changeSearchNav2(value) {
      if (value !== '0') {
        this.$parent.currentPage = 1
        // this.$parent.SearchTimes = 2
        if (!this.$store.state.changeVersion.changeFlag && this.$store.state.commonSearchData.activeName === 'a') {
          this.$parent.clearProOrCityMsg()
        }
        let data = {
          tagid: value,
          stime: this.stime,
          etime: this.etime,
          searchText: this.searchText
        }
        this.$emit('showGetData', data)
        this.searchValue2 = value
        this.tagid = value
        this.disabled2 = true

        this.value3 = '0'
        this.disabled3 = false

        this.$emit('changeTagid', value)
      }
    },
    // 选择搜索条件改变3
    changeSearchNav3(value) {
      if (value !== '0') {
        this.$parent.currentPage = 1
        // this.$parent.SearchTimes = 2
        if (!this.$store.state.changeVersion.changeFlag && this.$store.state.commonSearchData.activeName === 'a') {
          this.$parent.clearProOrCityMsg()
        }
        let data = {
          tagid: value,
          stime: this.stime,
          etime: this.etime,
          searchText: this.searchText
        }
        this.$emit('showGetData', data)
        this.searchValue3 = value
        this.tagid = value
        this.disabled3 = true

        this.value4 = '0'
        this.disabled4 = false

        this.$emit('changeTagid', value)
      }
    },
    // 选择搜索条件改变4
    changeSearchNav4(value) {
      if (value !== '0') {
        this.$parent.currentPage = 1
        // this.$parent.SearchTimes = 2
        if (!this.$store.state.changeVersion.changeFlag && this.$store.state.commonSearchData.activeName === 'a') {
          this.$parent.clearProOrCityMsg()
        }
        let data = {
          tagid: value,
          stime: this.stime,
          etime: this.etime,
          searchText: this.searchText
        }
        this.$emit('showGetData', data)
        this.searchValue4 = value
        this.tagid = value
        this.disabled4 = true

        this.value5 = '0'
        this.disabled5 = false

        this.$emit('changeTagid', value)
      }
    },
    // 选择搜索条件改变5
    changeSearchNav5(value) {
      if (value !== '0') {
        this.$parent.currentPage = 1
        // this.$parent.SearchTimes = 2
        if (!this.$store.state.changeVersion.changeFlag && this.$store.state.commonSearchData.activeName === 'a') {
          this.$parent.clearProOrCityMsg()
        }
        let data = {
          tagid: value,
          stime: this.stime,
          etime: this.etime,
          searchText: this.searchText
        }
        this.$emit('showGetData', data)
        this.searchValue5 = value
        this.tagid = value
        this.disabled5 = true
        this.$emit('changeTagid', value)
      }
    },
    changePageNum() {
      this.$parent.currentPage = 1
      this.$parent.currentPage5 = 1
      this.$parent.currentCommonPage = 1
      this.$parent.currentIndustryPage = 1
    },
    clearSearchValue() {
      this.searchValue1 = ''
      this.searchValue2 = ''
      this.searchValue3 = ''
      this.searchValue4 = ''
      this.searchValue5 = ''
    },
    // 固定====返回按钮
    backToLastNav1() {
      this.changePageNum()
      if (this.backNum === 1 && this.searchValue2) {
        this.value22 = '0'
        this.fixedBtn = false
        let data = {
          tagid: this.tagid1,
          stime: this.stime,
          etime: this.etime,
          searchText: this.searchText
        }
        this.$emit('showGetData', data)
        this.disabled22 = false
        this.backNum = 0
      } else if (this.backNum === 1 && this.searchValue3) {
        this.value33 = '0'
        this.fixedBtn = false
        let data = {
          tagid: this.tagid2,
          stime: this.stime,
          etime: this.etime,
          searchText: this.searchText
        }
        this.$emit('showGetData', data)
        this.disabled33 = false
        this.backNum = 0
      } else if (this.backNum === 1 && this.searchValue4) {
        this.value44 = '0'
        let data = {
          tagid: this.tagid3,
          stime: this.stime,
          etime: this.etime,
          searchText: this.searchText
        }
        this.$emit('showGetData', data)
        this.disabled44 = false
        this.backNum = 0
      } else if (this.backNum === 1 && this.searchValue5) {
        this.value55 = '0'
        let data = {
          tagid: this.tagid4,
          stime: this.stime,
          etime: this.etime,
          searchText: this.searchText
        }
        this.$emit('showGetData', data)
        this.disabled55 = false
        this.backNum = 0
      } else if (this.backNum === 2 && this.searchValue2 && this.searchValue3) {
        this.value33 = '0'
        let data = {
          tagid: this.tagid2,
          stime: this.stime,
          etime: this.etime,
          searchText: this.searchText
        }
        this.$emit('showGetData', data)
        this.disabled33 = false
        this.backNum = 1
      } else if (this.backNum === 2 && this.searchValue3 && this.searchValue4) {
        this.value44 = '0'
        let data = {
          tagid: this.tagid3,
          stime: this.stime,
          etime: this.etime,
          searchText: this.searchText
        }
        this.$emit('showGetData', data)
        this.disabled44 = false
        this.backNum = 1
      } else if (this.backNum === 2 && this.searchValue4 && this.searchValue5) {
        this.value55 = '0'
        let data = {
          tagid: this.tagid4,
          stime: this.stime,
          etime: this.etime,
          searchText: this.searchText
        }
        this.$emit('showGetData', data)
        this.disabled55 = false
        this.backNum = 1
      }
    },
    // 选择搜索条件改变11
    changeSearchNav11(value) {
      if (value !== '0') {
        this.changePageNum()
        this.fixedBtn = true
        this.backNum = this.backNum + 1
      }
    },
    // 选择搜索条件改变22
    changeSearchNav22(value) {
      this.searchValue3 = ''
      this.searchValue4 = ''
      this.searchValue5 = ''

      if (value !== '0') {
        this.changePageNum()
        let data = {
          tagid: value,
          stime: this.stime,
          etime: this.etime,
          searchText: this.searchText
        }
        this.$emit('showGetData', data)
        this.searchValue2 = value
        this.tagid = value

        this.value33 = '0'
        this.fixedBtn = true

        this.backNum = this.backNum + 1

        this.$emit('changeTagid', value)
      }
    },
    // 选择搜索条件改变33
    changeSearchNav33(value) {
      this.searchValue4 = ''
      this.searchValue5 = ''

      if (value !== '0') {
        this.changePageNum()
        let data = {
          tagid: value,
          stime: this.stime,
          etime: this.etime,
          searchText: this.searchText
        }
        this.$emit('showGetData', data)
        this.searchValue3 = value
        this.tagid = value

        this.value44 = '0'
        this.fixedBtn = true

        this.backNum = this.backNum + 1

        this.$emit('changeTagid', value)
      }
    },
    // 选择搜索条件改变44
    changeSearchNav44(value) {
      this.searchValue5 = ''
      if (value !== '0') {
        this.changePageNum()
        let data = {
          tagid: value,
          stime: this.stime,
          etime: this.etime,
          searchText: this.searchText
        }
        this.$emit('showGetData', data)
        this.searchValue4 = value
        this.tagid = value

        this.value55 = '0'
        this.fixedBtn = true

        this.backNum = this.backNum + 1

        this.$emit('changeTagid', value)
      }
    },
    // 选择搜索条件改变55
    changeSearchNav55(value) {
      if (value !== '0') {
        this.changePageNum()
        let data = {
          tagid: value,
          stime: this.stime,
          etime: this.etime,
          searchText: this.searchText
        }
        this.$emit('showGetData', data)
        this.searchValue5 = value
        this.tagid = value
        this.fixedBtn = true

        this.backNum = this.backNum + 1

        this.$emit('changeTagid', value)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.class {
  border-radius: 20px;
}
</style>
<style>
.van-cell:not(:last-child)::after {
  -webkit-transform: scaleY(1);
  transform: scaleY(1);
  top: 0;
}
</style>
