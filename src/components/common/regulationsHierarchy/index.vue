<template>
<!-- 法规层级弹框组件 -->
  <div id="regulationsHierarchy">
    <van-popup v-model="showNav" closeable close-icon="close" position="left" :style="{ height: '100%', width: '80%' }">
      <div class="selectNav">
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', fontSize: '17px', marginTop: '20px' }">
          法规层级
        </van-divider>
        <div v-if="changeFlag && (this.$store.state.commonSearchData.activeName === 'a' || this.$store.state.commonSearchData.activeName === 'b')">
          <van-cell-group>
            <van-field label="全国" value="全国" disabled />
            <van-field label="省级" value="省(自治区/直辖市)" disabled />
            <van-field label="市级" value="市(地/州)" disabled />
          </van-cell-group>
        </div>
        <div v-else>
          <div v-if="this.$store.state.commonSearchData.activeName === 'a'">
            <van-cell-group>
              <van-field label="全国" value="全国" disabled />
              <van-field label="省级" :value="valueP" disabled />
              <van-field label="市级" :value="valueC" disabled />
            </van-cell-group>
          </div>
          <div v-else>
            <div class="btnStyle">
              <!-- <div style="display: flex; justify-content: flex-start;"> -->
              <div>
                <p><van-checkbox v-model="checked" style="font-size: 16px;margin-bottom: 20px; margin-left: 1rem;" @change="changeTab">全国</van-checkbox></p>
              </div>
              <van-tabs v-model="active" color="#1989FA">
                <van-tab title="省(自治区/直辖市)">
                  <div v-if="t2.length > 0">
                    <div class="btn">
                      <!-- <p><van-button plain type="info" size="small" @click="selectAllP">选择</van-button></p>
                      <p><van-button plain type="primary" size="small" style="border: 1px solid #715641; color: #715641;" @click="cancelSelectAllP">取消</van-button></p> -->
                      <p @click="selectAllP" style="font-size: 16px;margin-top: 10px;"><van-checkbox v-model="checked1">选择/取消</van-checkbox></p>
                    </div>
                    <van-tree-select
                      :items="result"
                      :active-id.sync="activeIdsP"
                      :main-active-index.sync="activeIndexP"
                      class="leftNav"
                      @click-item="onItemClick"
                    />
                  </div>
                  <div v-else><van-empty description="暂无数据" /></div>
                </van-tab>
                <van-tab title="市(地/州)">
                  <div v-if="t3.length > 0">
                    <div class="btn">
                      <!-- <p><van-button plain type="info" size="small" @click="selectAll">选择</van-button></p>
                      <p><van-button plain type="danger" size="small" style="border: 1px solid #715641; color: #715641;" @click="cancelSelectAll">取消</van-button></p> -->
                      <p @click="selectAll" style="font-size: 16px;margin-top: 10px;"><van-checkbox v-model="checked2">选择/取消</van-checkbox></p>
                    </div>
                    <van-tree-select
                      :items="items"
                      :active-id.sync="activeIds"
                      :main-active-index.sync="activeIndex"
                      @click-nav="onNavClick1"
                      @click-item="onItemClick1"
                    />
                  </div>
                  <div v-else><van-empty description="暂无数据" /></div>
                </van-tab>
              </van-tabs>
            </div>
            <van-tabbar>
              <van-button style="height: 100%;" type="info" block @click="confirmBtn">确定</van-button>
            </van-tabbar>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      checked1: false,
      checked2: false,
      showNav: false, // 显示层级分类弹框
      items: [],
      activeIds: [], // 城市
      selectedIds: [],
      activeIndex: 0,
      btnWord: '全国版',
      ps: {},
      tagpc: [],
      searchParameter: [],
      t1: [],
      t2: [],
      t3: [],
      active: 0,
      result: [], // 省份
      activeIdsP: [], 
      selectedIdsP: [],
      activeIndexP: 0,
      lengthP: 0, // 选中省份的长度
      lengthC: 0, // 选中市级的长度
      t3Length: 0  // children的长度 个数
    }
  },
  computed: {
    changeFlag() { // 切换全国版 true 与地方版 false
      return this.$store.state.changeVersion.changeFlag
    },
    valueP() {
      return this.$store.state.commonSearchData.valueP
    },
    valueC() {
      return this.$store.state.commonSearchData.valueC
    }
  },
  methods: {
    // 全选
    selectAll() {
      if (!this.checked2) {
        this.t3.forEach(item => {
          if (item.children && item.children.length > 0) {
            item.children.forEach(item1 => {
              if (!this.activeIds.includes(item1.id)) {
                this.activeIds.push(item1.id)
              }
            })
          }
        })
      } else {
        this.cancelSelectAll()
      }
    },
    // 反选
    selected() {
      this.t3.forEach(item => {
        if (item.children && item.children.length > 0) {
          item.children.forEach(item1 => {
            if (!this.selectedIds.includes(item1.id)) {
              this.selectedIds.push(item1.id)
            }
          })
        }
      })
      this.selectedIds.forEach(item => {
        if (this.activeIds.indexOf(item) != -1) {
          this.activeIds.splice(this.activeIds.indexOf(item), 1)
        } else {
          this.activeIds.push(item)
        }
      })
    },
    // 取消全选
    cancelSelectAll() {
      this.activeIds = []
    },
    // 全选
    selectAllP() {
      if (!this.checked1) {
        this.t2.forEach(item => {
          if (!this.activeIdsP.includes(item.id)) {
            this.activeIdsP.push(item.id)
          }
        })
      } else {
        this.cancelSelectAllP()
      }
    },
    // 反选
    selectedP() {
      this.t2.forEach(item => {
        if (!this.selectedIdsP.includes(item.id)) {
          this.selectedIdsP.push(item.id)
        }
      })
      this.selectedIdsP.forEach(item => {
        if (this.activeIdsP.indexOf(item) != -1) {
          this.activeIdsP.splice(this.activeIdsP.indexOf(item), 1)
        } else {
          this.activeIdsP.push(item)
        }
      })
    },
    // 取消全选
    cancelSelectAllP() {
      this.activeIdsP = []
    }, 
    // 点击内容的每一项   省
    onItemClick(data) {
      // console.log('data==>', data, this.lengthP, this.activeIdsP.length)
      // console.log('this.activeIdsP', this.activeIdsP)
      if (this.lengthP === this.activeIdsP.length) {
        this.checked1 = true
      } else {
        this.checked1 = false
      }
    },
    // 点击左边的导航  市
    onNavClick1(index) {
      // console.log('index市==>', index)
    },
    // 点击内容的每一项
    onItemClick1(data) {
      // console.log('data市==>', data)
      // console.log('this.t3Lengththis.t3Length==>', this.t3Length, this.lengthC, this.activeIds.length)
      if (this.lengthC === this.activeIds.length) {
        this.checked2 = true
      } else {
        this.checked2 = false
      }
    },
    // 确定按钮
    confirmBtn() {
      // console.log('this.checked====>', this.checked)
      // console.log('this.activeIdsP', this.activeIdsP, this.activeIdsP.length)
      // console.log('this.activeIds', this.activeIds, this.activeIds.length)
      this.showNav = false // 点击确定按钮后关闭谈框
      let national = []
      let tagpc1 = []
      let tagpc2 = []
      if (this.checked) {
        national = [{p: '000000', c: '000000'}]
      }
      // 循环省份
      this.activeIdsP.forEach(item => {
        let stringlength = item.length
        let pstring = item.substring(0,6) // 截取前六位
        let nstring = item.substring(stringlength - 6, stringlength) // 截取后六位
        tagpc1.push({p: pstring, c: nstring})
      })
      // 循环城市
      this.activeIds.forEach(item => {
        let stringlength = item.length
        let pstring = item.substring(0,6) // 截取前六位
        let nstring = item.substring(stringlength - 6, stringlength) // 截取后六位
        tagpc2.push({p: pstring, c: nstring})
      })
      if (this.checked) {
        this.searchParameter = [...national, ...tagpc1, ...tagpc2]
        this.$emit('getSearchLists', this.searchParameter)
      } else {
        this.searchParameter = [...tagpc1, ...tagpc2]
        this.$emit('getSearchLists', this.searchParameter)
      }
      // console.log('this.searchParameter', this.searchParameter)
    },
    // 切换全国版样式
    changeTab(event) {
      this.checked = event
    },
    // 处理数据
    processData(data) {
      // console.log('父组件data===传递的数据', data)
      this.showNav = true
      this.items = []
      this.result = []
      this.activeIndex = 0
      this.t1 = data.t1
      this.t2 = data.t2
      this.t3 = data.t3
      if (this.t1.length > 0) {
        this.t1.forEach(item => {
          this.checked = item.selected
          this.btnWord = item.text
        })
      } else {
        this.checked = false
      }
      
      let pro = [{text: '', children: []}]
      this.t2.forEach(item => {
        if (!pro[0].children.includes(item.id)) {
          pro[0].children.push({text: item.text, id: item.id})
        }
        if (item.selected && !this.activeIdsP.includes(item.id)) {
          this.activeIdsP.push(item.id)
        }
      })
      this.result = pro
      if (this.t2.length === this.activeIdsP.length) {  // 省份  全选和取消
        this.checked1 = true
        this.lengthP = this.activeIdsP.length
      } else {
        this.checked1 = false
      }

      // console.log('this.t3==>', this.t3)
      let t3Leng = 0 // children的长度 个数
      this.t3.forEach(item => {
        this.items.push(item)
        if (item.children && item.children.length > 0) {
          item.children = item.children.sort((a, b) => a.id - b.id)
          t3Leng += item.children.length
          item.children.forEach(item1 => {
            if (item1.selected && !this.activeIds.includes(item1.id)) {
              this.activeIds.push(item1.id)
            }
          })
        }
      })
      this.t3Length = t3Leng
      if (this.t3Length === this.activeIds.length) {
        this.checked2 = true
        this.lengthC = this.activeIds.length
      } else {
        this.checked2 = false
      }
      // console.log('this.t3Lengththis.t3Length==>', this.t3Length, this.lengthC, this.activeIds.length)
    },
    processData1(data) {
      this.showNav = true
      this.processData(data)
    },
    // 弹出框
    alertCengji() {
      this.showNav = true
    },
    clearData() {
      this.showNav = true
      let data = {
        t1: [],
        t2: [],
        t3: []
      }
      this.processData(data)
    }
  }
}
</script>

<style lang="less" scoped>
#regulationsHierarchy {
  font-size: 16px;
  .btn {
    display: flex;
    justify-content: flex-start;
    margin: 10px 0 10px 1rem;
  }
  .leftNav {
    display: flex;
    .van-tree-select__nav {
      flex: 0;
    }
    .van-tree-select__content {
      flex: 1;
    }
    .van-ellipsis {
      text-align: left;
      padding: 0 40px;
    }
    .van-icon-success::before {
      margin-right: 40px;
    }
  }
}
</style>
<style lang="less">
.van-ellipsis {
  white-space: pre-wrap;
  text-align: center;
}
</style>
