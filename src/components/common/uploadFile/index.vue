<template>
  <div id="uploadFile">
    <van-popup v-model="showNav" closeable close-icon="close" position="right" :style="{ height: '100%', width: '60%' }">
      <div class="selectNav">
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', fontSize: '17px', marginTop: '20px' }">
          选择云端文件夹
        </van-divider>
        <div v-if="userId">
          <!-- 固定文件夹一 二 三 -->
          <div class="fileList" :class="{'active': currentIndex === index}" v-for="(dir, index) in fixedDir" :key="dir.dir_id">
            <div @click="getDirLists(dir, index)"><img src="../../../assets/index/wenjianjia.png" /><a>{{ dir.dir_name }}</a></div>
          </div>
          <div style="margin-top: 30px;" @click="confirmUpload"><van-button type="info" style="border-radius: 30px;" block>确定</van-button></div>
        </div>
        <div style="font-size: 20px; text-align: center; margin-top: 30px;" v-else>请先登录</div>
      </div>
    </van-popup>

    <van-overlay :show="show" @click="show = true" z-index="9999">
      <div class="wrapper">
        <van-circle v-model="uploadidentity" :rate="30" :speed="100" :text="text" />
      </div>
    </van-overlay>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      showVanPopup: false,
      showNav: false, // 显示文件夹弹框
      smartDir: false,
      dir: {},
      currentIndex: -1,
      updateDatas: {},
      word: '',
      show: false,
      total: 0,
      updateChoose: [],
      uploadidentity: 0,  // 上传进度条
      complete: 0,
      totalLast: 0
    }
  },
  computed: {
    userId() {
      return this.$store.state.user.userId
    },
    changeFlag() { // 切换全国版 true 与地方版 false
      return this.$store.state.changeVersion.changeFlag
    },
    fixedDir() {
      return this.$store.state.fixedFolder.fixedFolderArr
    },
    text() {
      return this.uploadidentity.toFixed(0) + '%';
    }
  },
  methods: {
    // 弹出框
    updateOrDelete(data, word) {
      console.log('上传文件data===>', data)
      console.log('上传文件word===>', word)
      if (Array.isArray(data)) {
        this.updateChoose = []
        this.updateChoose = data
      } else {
        this.updateDatas = data
      }
      this.word = word
      this.showNav = true
    },
    getDirLists(dir, index) {
      this.dir = dir
      this.currentIndex = index
    },
    // 上传进度条接口
    reqGetOneKey_UploadProgress(data) {
      console.log('data666', data, this.uploadidentity)
      let that = this
      let interval = setInterval(() => {
        that.xunhuan(data)
        // if (that.uploadidentity !== 100) {
        //   // 监听浏览器回退键
        //   if (window.history && window.history.pushState) {
        //     window.history.pushState('forward', null, '#')
        //     window.history.forward(1)
        //     let that = this
        //     window.onpopstate = function () {
        //       window.history.pushState('forward', null, '#')
        //       window.history.forward(1)
        //        that.$dialog.alert({
        //         title: '提示',
        //         message: '正在进行文件上传,请勿操作！',
        //       }).then(() => {
        //         // on close
        //       })
        //     }
        //   }
        // } else if (that.uploadidentity === 100) {
        //   that.$dialog.confirm({
        //     title: '提示',
        //     message: '是否回到众智云擎首页?',
        //     confirmButtonText: '确定'
        //   })
        //   .then(() => {
        //     that.$router.push({path: '/'})
        //     localStorage.setItem('selectedId', 'a')
        //   })
        //   .catch(() => {
        //     // on cancel
        //   })
        // }
        if (that.uploadidentity === 100) {
          clearInterval(interval)
          this.show = false
          this.showVanPopup = false

          this.$notify({ color: '#fff', background: '#b99573', message: '文件上传成功' })
        }
      }, 1000)
    },
    xunhuan(data) { 
      this.$http.reqGetOneKey_UploadProgress_V2(data).then(response => {
        // console.log('response====>上传进度条接口', response, response.item.complete, response.item.total, this.uploadidentity)
        if (response.rtncode === 1) {
          if (response.rltcode === 1) {
            this.uploadidentity = (response.item.complete / response.item.total * 100 | 0)
            this.complete = response.item.complete
            this.totalLast = response.item.total
            // console.log('this.uploadidentity123456789', this.uploadidentity)
          } else {
            this.show = false
            this.$notify({ color: '#fff', background: '#b99573', message: response.rltdesc })
          }
        } else {
          this.show = false
          this.$notify({ color: '#fff', background: '#b99573', message: response.rtndesc })
        }
      }).catch(() => {
        this.show = false
        // console.log('err', err)
      })
    },
    confirmUpload() {
      if (this.word === '最新文件' || this.word === '综合检索' || this.word === '进出口税收检索' || this.word === '税收优惠项目' || this.word === '税收优惠税种') {
        this.total = this.$parent.totalLists
      } else if (this.word === '行业检索通用规定' || this.word === '条约检索通用规定' || this.word === '税收优惠行业通用') {
        this.total = this.$parent.commonTotal5Lists
      } else if (this.word === '行业检索专属规定' || this.word === '条约检索专属规定' || this.word === '税收优惠行业专属') {
        this.total = this.$parent.industryTotal5lists
      } else if (this.word === '上传城市' && !this.changeFlag) {
        this.total = this.$parent.totalLists2
      } else if (this.word === '上传省级' && !this.changeFlag) {
        this.total = this.$parent.totalLists1
      } else if (this.word === '上传全国' && !this.changeFlag) {
        this.total = this.$parent.totalLists
      } else if (this.word === '选择上传') {
        this.total = this.updateChoose.length
      }

      if (this.currentIndex === -1) {
        this.$notify({ color: '#fff',
                background: '#b99573', message: '请先选择文件夹' })
      } else if (this.currentIndex !== -1 && this.total === 0) {
        this.$notify({ color: '#fff',
                background: '#b99573', message: '上传文件不能为空' })
      } else {
        this.$dialog.confirm({
          title: '提示',
          message: `您确定上传此法规分类下的 ${this.total} 个文件到 [智慧云端] 吗 ?`,
        })
          .then(() => {
            this.show = true
            this.showVanPopup = true
            this.showNav = false
            this.uploadidentity = 0
            if (this.word === '最新文件') {   // 上传最新文件 政策法规
              // console.log('最新文件1', this.updateDatas)
              this.updateDatas.frist.dirid = this.dir.dir_id
              this.updateDatas.fliter.isfilter = true
              let args = this.updateDatas
              // console.log('上传最新文件的参数1', args)

              this.$http.reqOneKeyLastFiles(args).then(response => {
                // console.log('response====>获取列表数据1', response)
                if (response.rtncode === 1) {
                  if (response.rltcode === 1) {
                    // this.show = false
                    // this.$notify({ color: '#fff', background: '#b99573', message: '文件上传成功' })
                    this.$parent.backStatus()
                    this.$parent.clearResult()
                    this.reqGetOneKey_UploadProgress(response.uploadidentity)
                  } else {
                    this.show = false
                    this.$notify({ color: '#fff', background: '#b99573', message: response.rltdesc })
                  }
                } else {
                  this.show = false
                  this.$notify({ color: '#fff', background: '#b99573', message: response.rtndesc })
                }
              }).catch(() => {
                this.show = false
                // console.log('err', err)
              })
            } else if (this.word === '综合检索') {
              // console.log('综合检索this.updateDatas', this.updateDatas)
              this.updateDatas.frist.dirid = this.dir.dir_id
              this.updateDatas.fliter.isfilter = true
              let args = this.updateDatas
              // console.log('args综合检索参数99999999===', args)
              this.$http.reqOneKeyGeneralFiles_V2(args).then(response => {
                // console.log('response====>综合检索===', response)
                if (response.rtncode === 1) {
                  if (response.rltcode === 1) {
                //     this.show = false
                //     this.$notify({ color: '#fff',
                // background: '#b99573', message: '文件上传成功' })
                    this.$parent.backStatus()
                    this.$parent.clearResult()
                    this.reqGetOneKey_UploadProgress(response.uploadidentity)
                  } else {
                    this.show = false
                    this.$notify({ color: '#fff', background: '#b99573', message: response.rltdesc })
                  }
                } else {
                  this.show = false
                  this.$notify({ color: '#fff', background: '#b99573', message: response.rtndesc })
                }
              }).catch(() => {
                this.show = false
                // console.log('err', err)
              })
            } else if (this.word === '行业检索通用规定') {
              console.log('行业检索通用规定69', this.updateDatas)
              this.updateDatas.frist.dirid = this.dir.dir_id
              this.updateDatas.fliter.isfilter = true
              let args = this.updateDatas
              // console.log('args==>6666666', args)
              this.$http.reqOneKeyIndustryCommonFiles_V2(args).then(response => {
                console.log('response====>行业检索通用规定===', response)
                if (response.rtncode === 1) {
                  if (response.rltcode === 1) {
                //     this.show = false
                //     this.$notify({ color: '#fff',
                // background: '#b99573', message: '文件上传成功' })
                    this.$parent.backStatus()
                    this.$parent.clearResult()
                    this.reqGetOneKey_UploadProgress(response.uploadidentity)
                  } else {
                    this.show = false
                    this.$notify({ color: '#fff', background: '#b99573', message: response.rltdesc })
                  }
                } else {
                  this.show = false
                  this.$notify({ color: '#fff', background: '#b99573', message: response.rtndesc })
                }
              }).catch(() => {
                this.show = false
                // console.log('err', err)
              })
            } else if (this.word === '行业检索专属规定') {
              console.log('行业检索专属规定', this.updateDatas)
              this.updateDatas.frist.dirid = this.dir.dir_id
              this.updateDatas.fliter.isfilter = true
              let args = this.updateDatas
              // console.log('args==>', args)
              this.$http.reqOneKeyIndustrySpecialFiles_V2(args).then(response => {
                console.log('response====>行业检索专属规定===', response)
                if (response.rtncode === 1) {
                  if (response.rltcode === 1) {
                    // this.show = false
                    // this.$notify({ type: 'success', message: '文件上传成功' })
                    this.$parent.backStatus()
                    this.$parent.clearResult()
                    this.reqGetOneKey_UploadProgress(response.uploadidentity)
                  } else {
                    this.show = false
                    this.$notify({ color: '#fff', background: '#b99573', message: response.rltdesc })
                  }
                } else {
                  this.show = false
                  this.$notify({ color: '#fff', background: '#b99573', message: response.rtndesc })
                }
              }).catch(() => {
                this.show = false
                // console.log('err', err)
              })
            } else if (this.word === '税收优惠项目') {
              console.log('税收优惠项目', this.updateDatas)
              this.updateDatas.frist.dirid = this.dir.dir_id
              this.updateDatas.fliter.isfilter = true
              let args = this.updateDatas
              // console.log('args==>', args)
              this.$http.reqOneKeyTaxBreakFiles_item_V2(args).then(response => {
                // console.log('response====>税收优惠项目===', response)
                if (response.rtncode === 1) {
                  if (response.rltcode === 1) {
                    // this.show = false
                    // this.$notify({ type: 'success', message: '文件上传成功' })
                    this.$parent.backStatus()
                    this.$parent.clearResult()
                    this.reqGetOneKey_UploadProgress(response.uploadidentity)
                  } else {
                    this.show = false
                    this.$notify({ color: '#fff', background: '#b99573', message: response.rltdesc })
                  }
                } else {
                  this.show = false
                  this.$notify({ color: '#fff', background: '#b99573', message: response.rtndesc })
                }
              }).catch(() => {
                this.show = false
                // console.log('err', err)
              })
            } else if (this.word === '税收优惠税种') {
              console.log('税收优惠税种', this.updateDatas)
              this.updateDatas.frist.dirid = this.dir.dir_id
              this.updateDatas.fliter.isfilter = true
              let args = this.updateDatas
              // console.log('args==>', args)
              this.$http.reqOneKeyTaxBreakFiles_taxes_V2(args).then(response => {
                console.log('response====>税收优惠税种===', response)
                if (response.rtncode === 1) {
                  if (response.rltcode === 1) {
                //     this.show = false
                //     this.$notify({ color: '#fff',
                // background: '#b99573', message: '文件上传成功' })
                    this.$parent.backStatus()
                    this.$parent.clearResult()
                    this.reqGetOneKey_UploadProgress(response.uploadidentity)
                  } else {
                    this.show = false
                    this.$notify({ color: '#fff', background: '#b99573', message: response.rltdesc })
                  }
                } else {
                  this.show = false
                  this.$notify({ color: '#fff', background: '#b99573', message: response.rtndesc })
                }
              }).catch(() => {
                this.show = false
                // console.log('err', err)
              })
            } else if (this.word === '税收优惠行业通用') {
              console.log('税收优惠行业通用', this.updateDatas)
              this.updateDatas.frist.dirid = this.dir.dir_id
              this.updateDatas.fliter.isfilter = true
              let args = this.updateDatas
              // console.log('args==>', args)
              this.$http.reqOneKeyTaxBreakFiles_common_V2(args).then(response => {
                console.log('response====>税收优惠行业通用===', response)
                if (response.rtncode === 1) {
                  if (response.rltcode === 1) {
                //     this.show = false
                //     this.$notify({ color: '#fff',
                // background: '#b99573', message: '文件上传成功' })
                    this.$parent.backStatus()
                    this.$parent.clearResult()
                    this.reqGetOneKey_UploadProgress(response.uploadidentity)
                  } else {
                    this.show = false
                    this.$notify({ color: '#fff', background: '#b99573', message: response.rltdesc })
                  }
                } else {
                  this.show = false
                  this.$notify({ color: '#fff', background: '#b99573', message: response.rtndesc })
                }
              }).catch(() => {
                this.show = false
                // console.log('err', err)
              })
            } else if (this.word === '税收优惠行业专属') {
              console.log('税收优惠行业专属', this.updateDatas)
              this.updateDatas.frist.dirid = this.dir.dir_id
              this.updateDatas.fliter.isfilter = true
              let args = this.updateDatas
              // console.log('args==>', args)
              this.$http.reqOneKeyTaxBreakFiles_special_V2(args).then(response => {
                console.log('response====>税收优惠行业专属===', response)
                if (response.rtncode === 1) {
                  if (response.rltcode === 1) {
                //     this.show = false
                //     this.$notify({ color: '#fff',
                // background: '#b99573', message: '文件上传成功' })
                    this.$parent.backStatus()
                    this.$parent.clearResult()
                    this.reqGetOneKey_UploadProgress(response.uploadidentity)
                  } else {
                    this.show = false
                    this.$notify({ color: '#fff', background: '#b99573', message: response.rltdesc })
                  }
                } else {
                  this.show = false
                  this.$notify({ color: '#fff', background: '#b99573', message: response.rtndesc })
                }
              }).catch(() => {
                this.show = false
                // console.log('err', err)
              })
            } else if (this.word === '条约检索通用规定') {
              console.log('条约检索通用规定66', this.updateDatas)
              this.updateDatas.frist.dirid = this.dir.dir_id
              this.updateDatas.fliter.isfilter = true
              let args = this.updateDatas
              // console.log('args==>6666666', args)
              this.$http.reqOneKeyTreatyCommonFiles_V2(args).then(response => {
                console.log('response====>条约检索通用规定===', response)
                if (response.rtncode === 1) {
                  if (response.rltcode === 1) {
                    // this.show = false
                    // this.$notify({ type: 'success', message: '文件上传成功' })
                    this.$parent.backStatus()
                    this.$parent.clearResult()
                    this.reqGetOneKey_UploadProgress(response.uploadidentity)
                  } else {
                    this.show = false
                    this.$notify({ color: '#fff', background: '#b99573', message: response.rltdesc })
                  }
                } else {
                  this.show = false
                  this.$notify({ color: '#fff', background: '#b99573', message: response.rtndesc })
                }
              }).catch(() => {
                this.show = false
                // console.log('err', err)
              })
            } else if (this.word === '条约检索专属规定') {
              console.log('条约检索专属规定88', this.updateDatas)
              this.updateDatas.frist.dirid = this.dir.dir_id
              this.updateDatas.fliter.isfilter = true
              let args = this.updateDatas
              // console.log('args==>888999', args)
              this.$http.reqOneKeyTreatySpecialFiles_V2(args).then(response => {
                console.log('response====>条约检索专属规定===', response)
                if (response.rtncode === 1) {
                  if (response.rltcode === 1) {
                //     this.show = false
                //     this.$notify({ color: '#fff',
                // background: '#b99573', message: '文件上传成功' })
                    this.$parent.backStatus()
                    this.$parent.clearResult()
                    this.reqGetOneKey_UploadProgress(response.uploadidentity)
                  } else {
                    this.show = false
                    this.$notify({ color: '#fff', background: '#b99573', message: response.rltdesc })
                  }
                } else {
                  this.show = false
                  this.$notify({ color: '#fff', background: '#b99573', message: response.rtndesc })
                }
              }).catch(() => {
                this.show = false
                // console.log('err', err)
              })
            } else if (this.word === '进出口税收检索') {
              console.log('进出口税收检索this.updateDatas', this.updateDatas)
              this.updateDatas.frist.dirid = this.dir.dir_id
              this.updateDatas.fliter.isfilter = true
              let args = this.updateDatas
              // console.log('args==>', args)
              this.$http.reqOneKeyInoutFiles_V2(args).then(response => {
                console.log('response====>进出口税收检索===', response)
                if (response.rtncode === 1) {
                  if (response.rltcode === 1) {
                //     this.show = false
                //     this.$notify({ color: '#fff',
                // background: '#b99573', message: '文件上传成功' })
                    this.$parent.backStatus()
                    this.$parent.clearResult()
                    this.reqGetOneKey_UploadProgress(response.uploadidentity)
                  } else {
                    this.show = false
                    this.$notify({ color: '#fff', background: '#b99573', message: response.rltdesc })
                  }
                } else {
                  this.show = false
                  this.$notify({ color: '#fff', background: '#b99573', message: response.rtndesc })
                }
              }).catch(() => {
                this.show = false
                // console.log('err', err)
              })
            } else if (this.word === '选择上传') {
              console.log('this.updateChoose上传打印的数据===>', this.updateChoose)
              this.$http.upLoadFileToCloud(this.updateChoose, this.dir.dir_id).then(response => {
                // console.log('response====>选择上传===', response)
                if (response.rtncode === 1) {
                  if (response.rltcode === 1) {
                    this.show = false
                    this.$notify({ color: '#fff', background: '#b99573', message: '文件上传成功' })
                    // 恢复按钮的状态
                    this.$parent.backStatus()
                    this.$parent.clearResult()
                  } else {
                    this.show = false
                    this.$notify({ color: '#fff', background: '#b99573', message: response.rltdesc })
                  }
                } else {
                  this.show = false
                  this.$notify({ color: '#fff', background: '#b99573', message: response.rtndesc })
                }
              }).catch(() => {
                this.show = false
                // console.log('err', err)
              })
            } else if (this.word === '上传城市' || this.word === '上传省级' || this.word === '上传全国') {
              // console.log('1234567890', this.word)
              console.log('this.updateDatas地方版的上传的数据88888888888888888888888===>', this.updateDatas)
              this.updateDatas.frist.dirid = this.dir.dir_id
              this.updateDatas.fliter.isfilter = true
              if (this.word === '上传城市') {
                this.updateDatas.fliter.tagpc = [
                  {
                    p: this.updateDatas.frist.ps.p,
                    c: this.updateDatas.frist.ps.c,
                    t: ''
                  }
                ]
              } else if (this.word === '上传省级') {
                this.updateDatas.fliter.tagpc = [
                  {
                    p: this.updateDatas.frist.ps.p,
                    c: '000000',
                    t: ''
                  }
                ]
              } else if (this.word === '上传全国') {
                this.updateDatas.fliter.tagpc = [
                  {
                    p: '000000',
                    c: '000000',
                    t: ''
                  }
                ]
              }
              // console.log('地方版的一键上传之前查看上传的数据789789789', this.updateDatas)
              let args = this.updateDatas
              
              this.$http.reqOneKeyLocalUpload_V2(args).then(response => {
                if (response.rtncode === 1) {
                  if (response.rltcode === 1) {
                //     this.show = false
                //     this.$notify({ color: '#fff',
                // background: '#b99573', message: '文件上传成功' })
                    this.$parent.backStatus()
                    this.$parent.clearResult()
                    this.reqGetOneKey_UploadProgress(response.uploadidentity)
                  } else {
                    this.show = false
                    this.$notify({ color: '#fff', background: '#b99573', message: response.rltdesc })
                  }
                } else {
                  this.show = false
                  this.$notify({ color: '#fff', background: '#b99573', message: response.rtndesc })
                }
              }).catch(() => {
                this.show = false
                // console.log('err', err.message)
              })
            }
          })
          .catch(() => {
            // on cancel
          })
      }
    }
  }
}
</script>

<style lang="less" scoped>
#uploadFile {
  .fileList {
    font-size: 14px;
    padding: 12px 20px;
    border-bottom: 1px solid #ccc;
    img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
    a {
      position: relative;
      top: -5px;
      color: #333;
    }
  }
  .active {
    background: #ecf9ff;
  }
}
</style>
<style>
  .van-circle__text {
    color: #fff;
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>
