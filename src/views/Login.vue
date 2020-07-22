<template>
  <!-- 登录页面 -->
  <div id="loginContainer">
    <div class="loginBox">
      <div class="logo">
        <img src="../assets/index/logo.png" />
      </div>
      <div class="login">
        <!-- <p v-if="userId" @click="showMenu"><img src="../assets/index/header.png" style="width:24px;height:24px;margin-right: 20px;" /></p> -->
        <p v-if="userId" @click="showMenu" style="display: flex;justify-content: center;align-items: center;">
          <img src="../assets/index/header.png" style="width:16px;height:16px;margin-right: 4px;" />
          <span style="margin-right: 10px; font-size: 0.3rem;">{{ userId }}</span>
        </p>
        
        <p v-else><span class="word" @click="login">登录</span></p>
        <p v-if="!userId" style="margin-right: 10px;">|</p>
        <p v-if="!userId"><span class="word" @click="applyLogin">申请试用</span></p>
        <p @click="show1 = true">
          <van-button type="warning" size="mini" style="width:60px;">
            <img style="width:10px;margin-right: 4px;" src="../assets/index/sanjiao.png" />{{ radioWord }}
          </van-button>
        </p>
        <!-- <p @click="themeDefault">默认</p>
        <p @click="themeGreen">green</p> -->
        <!-- <p @click="themLink">333</p> -->
        <van-popup v-model="show1" position="top" get-container="body">
        <!-- <van-popup v-model="show1" position="top" :style="{ height: '40%' }" get-container="body"> -->
          <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', fontSize: '17px', marginTop: '40px' }">
            版本切换
          </van-divider>
          <van-radio-group v-model="radio" @change="changeVersion">
            <van-cell-group>
              <van-cell title="全国版" clickable @click="radio = '1'">
                <template #right-icon>
                  <van-radio name="1" />
                </template>
              </van-cell>
              <van-cell title="地方版" clickable @click="radio = '2'">
                <template #right-icon>
                  <van-radio name="2" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
          <div style="margin-top: 40px;"></div>
        </van-popup>
      </div>
    </div>
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" get-container="body" />

    <login ref="alertModel"></login>

    <van-popup v-model="showAccMsg" position="bottom" :style="{ height: '32%'}" get-container="body">
      <van-divider :style="{ fontSize: '18px', marginTop: '40px' }">
        账号信息
      </van-divider>
      <div class="acc" style="line-height: 40px; margin: 0 30px; font-size: 18px;">账号：{{ userId }}</div>
      <div class="acc" style="line-height: 40px; margin: 0 30px; font-size: 18px;">手机：{{ phone }}</div>
    </van-popup>

    <!-- 意见反馈弹框 -->
    <van-popup v-model="feedBack" closeable position="bottom" :style="{ height: '100%'}" get-container="body">
      <van-divider :style="{ fontSize: '18px', marginTop: '40px' }">
        意见反馈
      </van-divider>
      <div class="feed-back-box">
        <div style="border: 1px solid #f5f6f7; height: 100%;">
          <van-field
            v-model="feedBackMessage"
            rows="18"
            autosize
            type="textarea"
            placeholder="请输入意见/反馈内容"
          />
        </div>
      </div>
      <div class="btn-buju">
        <van-button style="width: 30%;border-radius: 30px;height: 40px;" type="default" @click="clocsFeed">取消</van-button>
        <van-button style="width: 30%;border-radius: 30px;height: 40px;" type="info" @click="confirmFeedBack">确定</van-button>
      </div>
    </van-popup>
  </div>
</template>
<script>
import Login from "@/components/common/login";
export default {
  data() {
    return {
      show: false,
      show1: false,
      actions: [
        { name: '账号信息' },
        { name: '修改密码' },
        // { name: '意见反馈' },
        { name: '注销账号', color: '#ed4014'},
      ],
      showAccMsg: false,
      feedBack: false, // 意见反馈
      changeFlag: true, // 切换版本
      radio: '1',
      radioWord: '全国版',
      feedBackMessage: '' // 反馈内容
    }
  },
  components: {
    Login
  },
  computed: {
    userId() {
      return this.$store.state.user.userId
    },
    phone() {
      return this.$store.state.user.mobileNum
    }
  },
  methods: {
    // 关闭意见反馈弹框
    clocsFeed() {
      this.feedBack = false
      this.feedBackMessage = ''
    },
    // 点击意见反馈弹框里的确定按钮
    confirmFeedBack() {
      if (this.feedBackMessage) {
        let params = {
          suggestions: this.feedBackMessage
        }
        this.$http.reqCreateFeedBack(params).then(res => {
          if (res.rtncode === 1) {
            if (res.rltcode === 1) {
              this.$notify({ color: '#fff', background: '#b99573', message: '意见反馈成功' })
              this.feedBack = false
            } else {
              this.feedBack = false
            }
          } else {
            this.feedBack = false
          }
        }).catch(() => {
          this.feedBack = false
        })
      } else {
        this.$notify({ color: '#fff', background: '#b99573', message: '请输入意见/反馈内容' })
      }
    },
    // 切换版本
    changeVersion(value) {
      // console.log('value切换版本====>', value)
      if (value === '1') {
        this.changeFlag = true
        this.radioWord = '全国版'
        this.show1 = false
      } else if (value === '2') {
        this.changeFlag = false
        this.radioWord = '地方版'
        this.show1 = false
      }
      this.$store.commit('changeVersion/setChangeFlag', this.changeFlag)
      this.$store.commit('commonSearchData/changeActiveName', 'a')  // 每次切换 都选中政策法规
      this.$store.commit('commonSearchData/changeActivePlace', 0)  // 每次切换 都选中城市
      this.$store.commit('commonSearchData/changeActive', 0) // 每次切换都选中通用规定
      this.$store.commit('commonSearchData/changeValueP', localStorage.getItem('valueP'))
      this.$store.commit('commonSearchData/changeValueC', localStorage.getItem('valueC'))
      this.$store.commit('commonSearchData/changeValueProvCode', localStorage.getItem('valueProvCode'))
      this.$store.commit('commonSearchData/changeValueCityCode', localStorage.getItem('valueCityCode'))
      // console.log('点击了切换版本this.store==》', this.$store.state)
    },
    // 登录
    login() {
      this.$refs.alertModel.changeShowLogin(true)
    },
    // 申请试用
    applyLogin() {
      this.$refs.alertModel.changeShowApplyLogin(true)
    },
    onSelect(item) {
      // console.log('item==>', item, index)
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false
      if (item.name === '账号信息') {
        this.showAccMsg = true
      } else if (item.name === '意见反馈') {
        this.feedBack = true
      } else if (item.name === '修改密码') {
        this.$refs.alertModel.changeResetPassword(true)
      } else if (item.name === '注销账号') {
        this.$dialog.confirm({
          title: '提示',
          message: '确定退出登录吗',
          confirmButtonText: '确定'
        })
          .then(() => {
            this.$store.commit('user/setUserId', '')
            this.$store.commit('user/setUserGuid', '')
            this.$store.commit('user/setToken', '')
            this.$store.commit('user/setMobileNum', '')
            this.$store.commit('changeVersion/setChangeFlag', true)
            this.$store.commit('commonSearchData/changeValueP', localStorage.getItem('valueP'))
            this.$store.commit('commonSearchData/changeValueC', localStorage.getItem('valueC'))
            this.$store.commit('commonSearchData/changeValueProvCode', localStorage.getItem('valueProvCode'))
            this.$store.commit('commonSearchData/changeValueCityCode', localStorage.getItem('valueCityCode'))
            localStorage.setItem('selectedId', 'a')
            sessionStorage.removeItem('userId')
            sessionStorage.removeItem('phone')
            sessionStorage.removeItem('userguid')
            sessionStorage.removeItem('token')

            this.$cookie.delete('cookieObj')

            this.$router.push({ path: "/index" })
          })
          .catch(() => {
            // on cancel
          })
      }
    },
    showMenu() {
      this.show = true
    },
    // 默认样式
    themeDefault() {
      document.body.className = 'theme_default';
      localStorage.setItem('themeColor', 'theme_default')
    },
    // 青绿色
    themeGreen() {
      document.body.className = 'theme_darkgreen';
      localStorage.setItem('themeColor', 'theme_darkgreen')
    }
    // 暖色
    // themLink() {
    //   document.body.className = 'thenm_warm';
    //   localStorage.setItem('themeColor', 'thenm_warm')
    // }
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/variable.less";

#loginContainer {
  height: 40px;
  .loginBox {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;
    box-sizing: border-box;

    .logo {
      display: flex;
      align-items: center;
      img {
        height: 24px;
      }
    }

    .login {
      display: flex;
      align-items: center;
      .word {
        margin-right: 10px;
        font-weight: 600;
      }
      .van-icon {
        width: 26px;
        height: 26px;
        margin-right: 10px;
      }
      // .van-dropdown-menu__title {
      //   color: #1989FA;
      // }
      // .van-dropdown-menu__bar {
      //   background-color: #171819;
      //   color: #1989FA;
      // }
    }
  }
  .acc {
    line-height: 40px;
    margin: 0 30px;
    font-size: 14px;
  }
}
</style>
<style lang="less">
.feed-back-box {
  padding:  0 20px 20px;
  height: 70%;
}
.btn-buju {
  display: flex;
  justify-content: space-between;
  &:before,
  &:after {
    content: '';
    display: block;
  }
}
</style>
