<template>
  <div id="loginOrReg">
    <!-- 登录弹框 -->
    <van-popup v-model="showLogin" round position="bottom" @open="openLogin" :style="{ height: '70%' }" get-container="body">
      <div class="loginContent" style="margin: 16px 0px 20px;">
        <van-tabs v-model="active" :border="false">
          <van-tab title="账号登录">
            <div class="content" style="padding: 10px 20px 20px;">
              <van-cell-group>
                <van-field
                  v-model="account"
                  center
                  clearable
                  placeholder="请输入登录账号"
                  @blur="checkAccount"
                  :error-message="errMsg.account"
                />
                <van-field
                  v-model="password"
                  center
                  clearable
                  type="password" 
                  placeholder="请输入登录密码"
                  @blur="changeLoginPwd"
                  :error-message="errMsg.changeLoginPwd"
                />
              </van-cell-group>
              <div class="forgetPwdOrReg" style="font-size: 14px;margin-top: 30px;display: flex;justify-content: center;">
                <span @click="createAccount">创建账号</span>
                <span style="margin: 0 14px; color: #715641;">|</span>
                <span @click="forgotPwd" class="pwd">忘记密码</span>
              </div>
              <div style="margin-top: 30px;" @click="beforeLogin(0)">
                <van-button block type="info" style="border-radius: 30px;">登录</van-button>
              </div>
            </div>
          </van-tab>
          <van-tab title="验证码登录">
            <div class="content" style="padding: 10px 20px 20px;">
              <van-cell-group>
                <van-field
                  v-model="regMoblie"
                  center
                  clearable
                  type="number"
                  maxlength="11"
                  placeholder="请输入11位手机号码"
                  @blur="checkMobile"
                  :error-message="errMsg.mobilePhone"
                />
                <van-field
                  v-model="regCode"
                  center
                  clearable
                  type="number"
                  maxlength="6"
                  placeholder="请输入短信验证码"
                  @blur="changeCode"
                  :error-message="errMsg.code"
                >
                  <template #button>
                    <van-button :disabled="disabled" size="small" type="info" style="background-color: #ccc; color: #fff;border: 1px solid transparent;" @click="sendcode(2)">{{ btntxt }}</van-button>
                  </template>
                </van-field>
              </van-cell-group>
              <div class="forgetPwdOrReg" style="font-size: 14px;margin-top: 30px;display: flex;justify-content: center;">
                <span @click="createAccount">创建账号</span>
                <span style="margin: 0 14px; color: #715641;">|</span>
                <span @click="forgotPwd" class="pwd">忘记密码</span>
              </div>
              <div style="margin-top: 30px;" @click="beforeLogin(1)">
                <van-button block type="info" style="border-radius: 30px;">登录</van-button>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </van-popup>
    <!-- 申请试用弹框 发送手机验证码 -->
    <van-popup v-model="showApplyLogin" round position="bottom" closeable close-icon="close" @open="openApplyLogin" :style="{ height: '58%' }" get-container="body">
      <div class="loginContent" style="margin: 16px 0px 20px;">
        <div class="content" style="padding: 10px 20px 20px;">
          <div class="title titleStyleAll" style="font-weight: 600;text-align: center;margin-bottom: 28px;font-size: 18px;">创建您的账号</div>
          <van-cell-group>
            <van-field
              v-model="regMoblie"
              center
              clearable
              type="number"
              maxlength="11"
              placeholder="请输入11位手机号码"
              @blur="checkMobile"
              :error-message="errMsg.mobilePhone"
            />
            <van-field
              v-model="regCode"
              center
              clearable
              type="number"
              maxlength="6"
              placeholder="请输入短信验证码"
              @blur="changeCode"
              :error-message="errMsg.code"
            >
              <template #button>
                <van-button :disabled="disabled" size="small" type="info" style="background-color: #ccc; color: #fff;border: 1px solid transparent;" @click="sendcode(1)">{{ btntxt }}</van-button>
              </template>
            </van-field>
          </van-cell-group>
          <div style="margin-top: 30px;" @click="beforeApplyLoginClose">
            <van-button block type="info" style="border-radius: 30px;">确定</van-button>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 注册 设置账号和密码 -->
    <van-popup v-model="showReg" round position="bottom" closeable close-icon="close" @open="openReg" :style="{ height: '90%' }" get-container="body">
      <div class="loginContent" style="margin: 16px 0px 20px;">
        <div class="content" style="padding: 10px 20px 20px;">
          <div class="title titleStyleAll" style="font-weight: 600;text-align: center;margin-bottom: 28px;font-size: 18px;">设置您的账号及密码</div>
          <van-cell-group>
            <van-field
              v-model="account"
              center
              clearable
              placeholder="账号只能使用字母、数字、下划线,不超过12位"
              @blur="checkAccount"
              :error-message="errMsg.account"
            />
            <van-field
              v-model="password"
              center
              clearable
              type="password" 
              placeholder="密码长度至少6位"
              @blur="checkPassword"
              :error-message="errMsg.password"
            />
            <van-field
              v-model="confirmPwd"
              center
              clearable
              type="password"
              placeholder="请输入确认密码"
              @blur="checkConfirmPwd"
              :error-message="errMsg.confirmPwd"
            />
          </van-cell-group>
          <div v-if="setOwx === 'wx'" class="tip" style="margin-top: 20px;">
            <van-notice-bar wrapable :scrollable="false">
              特别提示：注册成功后，请点击"云擎中心"按钮进入"变动提醒"绑定账号，即时获取云端文件效力变动信息。
            </van-notice-bar>
          </div>
          <div v-else class="tip" style="margin-top: 20px;">
            <van-notice-bar wrapable :scrollable="false">
              特别提示：注册成功后，请及时关注微信公众号"众智云擎"，点击"云擎中心"按钮进入"变动提醒"绑定账号，即时获取云端文件效力变动信息。
            </van-notice-bar>
          </div>
          <div style="margin-top: 30px;" @click="beforeReg">
            <van-button block type="info" style="border-radius: 30px;">确定</van-button>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 忘记密码 -->
    <van-popup v-model="resetPassword" round position="bottom" closeable close-icon="close" @open="openResetPwd" :style="{ height: '62%' }" get-container="body">
      <div class="loginContent" style="margin: 16px 0px 20px;">
        <div class="content" style="padding: 10px 20px 20px;">
          <div class="title titleStyleAll" style="font-weight: 600;text-align: center;margin-bottom: 28px;font-size: 18px;">正在重置您的密码</div>
          <van-cell-group>
            <van-field
              v-model="regMoblie"
              center
              clearable
              type="number"
              maxlength="11"
              placeholder="请输入11位手机号码"
              @blur="checkMobile"
              :error-message="errMsg.mobilePhone"
            />
            <van-field
              v-model="regCode"
              center
              clearable
              type="number"
              maxlength="6"
              placeholder="请输入短信验证码"
              @blur="changeCode"
              :error-message="errMsg.code"
            >
              <template #button>
                <van-button :disabled="disabled" size="small" type="info" style="background-color: #ccc; color: #fff;border: 1px solid transparent;" @click="sendcode(3)">{{ btntxt }}</van-button>
              </template>
            </van-field>
          </van-cell-group>
          <div style="margin-top: 30px;" @click="beforeResetPwd">
            <van-button block type="info" style="border-radius: 30px;">确定</van-button>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 密码 确认密码 -->
    <van-popup v-model="comPassword" round position="bottom" closeable close-icon="close" @open="openChangePwd" :style="{ height: '62%' }" get-container="body">
      <div class="loginContent" style="margin: 16px 0px 20px;">
        <div class="content" style="padding: 10px 20px 20px;">
          <div class="title titleStyleAll" style="font-weight: 600;text-align: center;margin-bottom: 28px;font-size: 18px;">请输入并确认您的密码</div>
          <van-cell-group>
            <van-field
              v-model="password"
              center
              clearable
              type="password"
              placeholder="请输入密码"
              @blur="checkPassword"
              :error-message="errMsg.password"
            />
            <van-field 
              v-model="confirmPwd"
              center
              clearable
              type="password" 
              placeholder="请输入确认密码"
              @blur="checkConfirmPwd"
              :error-message="errMsg.confirmPwd"
            />
          </van-cell-group>
          <div style="margin-top: 30px;" @click="beforeChangePwd">
            <van-button block type="info" style="border-radius: 30px;">确定</van-button>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getSMSFrom } from '@/utils/lib/tools'
import { getTimeStamp } from '@/utils/lib/sign.js'
import TripleDES from '@/utils/lib/crypto.js'
export default {
  data() {
    return {
      codeType: 0,

      showLogin: false, // 登录弹框
      showReg: false, // 注册弹框
      resetPassword: false, // 重置密码弹框
      comPassword: false, // 修改密码 密码 确认密码

      showApplyLogin: false, // 申请试用弹框
      regMoblie: '', // 申请试用弹框 手机号码
      regCode: '', // 申请试用弹框 验证码

      code: '',
      account: '', // 账号
      password: '', // 密码
      confirmPwd: '', // 确认密码
      active: 0, // 账号登录 验证码登录
      btntxt: '发送验证码',
      disabled: false, // 禁用发送验证码按钮
      time: 0, // 倒计时

      pattern: /^1[3456789]\d{9}$/, // 手机号码验证
      accPattern: /^[0-9a-zA-Z_]{1,12}$/, // 验证账号格式  账号只能使用字母、数字、下划线,不超过12位
      errMsg: {
        mobilePhone: '', // 手机号码
        code: '', // 验证码
        account: '', // 账号
        password: '', // 密码
        confirmPwd: '', // 确认密码
        changeLoginPwd: '' // 登录时验证是否输入密码
      }
    }
  },
  computed: {
    setOwx() {
      return this.$store.state.user.Owx
    },
    userGuid() {
      return this.$store.state.user.userGuid
    }
  },
  methods: {
    // 验证手机号码
    checkMobile() {
      if (!this.regMoblie) {
        this.errMsg.mobilePhone = '请输入手机号码'
        return false
      } else if (!this.pattern.test(this.regMoblie)) {
        this.errMsg.mobilePhone = '手机号码输入有误,请重新输入'
        return false
      } else {
        this.errMsg.mobilePhone = ''
        return true
      }
    },
    // 验证申请试用验证码
    changeCode() {
      if (!this.regCode) {
        this.errMsg.code = '请输入验证码'
        return false
      }
    },
    // 注册弹框 验证账号
    checkAccount() {
      if (!this.account) {
        this.errMsg.account = '请输入账号'
        return false
      } else if (this.account.length > 12) {
        this.errMsg.account = '账号只能使用字母、数字、下划线,不超过12位'
        return false
      } else if (this.account.length <= 12 && !this.accPattern.test(this.account)) {
        this.errMsg.account = '账号只能使用字母、数字、下划线,不超过12位'
        return false
      } else {
        this.errMsg.account = ''
        return true
      }
    },
    // 登录时验证是否输入密码
    changeLoginPwd() {
      if (!this.password) {
        this.errMsg.changeLoginPwd = '请输入密码'
        return false
      } else {
        this.errMsg.changeLoginPwd = ''
        return true
      }
    },
    // 密码
    checkPassword() {
      if (!this.password) {
        this.errMsg.password = '请输入密码'
        return false
      } else if (this.password.length < 6) {
        this.errMsg.password = '密码长度至少6位'
        return false
      } else if (this.confirmPwd && this.password !== this.confirmPwd) {
        this.errMsg.confirmPwd = '两次密码不一致'
        return false
      } else {
        this.errMsg.password = ''
        return true
      }
    },
    // 确认密码
    checkConfirmPwd() {
      if (!this.confirmPwd) {
        this.errMsg.confirmPwd = '请输入确认密码'
        return false
      } else if (this.password !== this.confirmPwd) {
        this.errMsg.confirmPwd = '两次密码不一致'
        return false
      } else {
        this.errMsg.confirmPwd = ''
        return true
      }
    },
    // 打开登录弹框之前
    openLogin() {
      this.active = 0
      this.regMoblie = ''
      this.regCode = ''
      this.time = 0
      this.btntxt = '获取验证码'
      this.disabled = false
      this.account = ''
      this.password = ''
    },
    // 关闭登录弹框之前
    beforeLogin(active) {
      // console.log('active登录===>', this.active)
      if (active === 0) { // 账号登录
        if(!this.account || !this.password) {
          this.checkAccount()
          this.changeLoginPwd()
          this.showLogin = true
        } else {
          let bodyJson = {
            userid: this.account,
            passwd: this.password,
            tempid: this.userGuid
          }
          this.$http.reqLogin(bodyJson).then(response => {
            console.log('登录成功之后的数据===>', response)
            if (response.rtncode === 1) {
              if (response.rltcode === 1) {
                this.$store.commit('user/setUserId', response.userid)
                this.$store.commit('user/setUserGuid', response.userguid)
                this.$store.commit('user/setRealName', response.realname)
                this.$store.commit('user/setToken', response.token)
                this.$store.commit('user/setMobileNum', response.mobilenum)
                this.$store.commit('user/setIsLogin', true)
                this.$store.commit('user/setUserType', '')
                this.$store.commit('user/setPermission', response.permission)

                // console.log('登录成功之后的数据store', this.$store.state.user)

                sessionStorage.setItem('userId', response.userid)
                sessionStorage.setItem('userguid', response.userguid)
                sessionStorage.setItem('token', response.token)
                sessionStorage.setItem('phone', response.mobilenum)

                let cookieObj = {
                  userId: response.userid,
                  userguid: response.userguid,
                  realname: response.realname,
                  token: response.token,
                  phone: response.mobilenum,
                  permission: response.permission,
                  ts: Number(getTimeStamp())
                }

                let data = TripleDES.encode('token', cookieObj)
                // console.log('data====>', data)

                this.$cookie.set('cookieObj', JSON.stringify(data), 4)
                // this.$cookie.set('cookieObj', JSON.stringify(cookieObj), 4)

                // let data1 = TripleDES.decode('token', JSON.parse(this.$cookie.get('cookieObj')))
                // console.log('data1data1', data1)

                // localStorage.setItem('selectedId', 'a')

                this.showLogin = false
                // 登录成功之后 文件夹创建默认目录
                this.$http.reqCreateDefault().then(res => {
                  if (res.rltcode === 1) {
                    if (res.rltcode === 1) {
                      this.getFixedFolder()
                    }
                  }
                })

                this.$notify({ color: '#fff', background: '#b99573', message: '登录成功' })
                this.$router.replace({ path: '/main' }) // 登录成功之后跳转到首页
                this.$emit('updateDoc') // 更新doc文件的内容
              } else {
                this.$notify(response.rltdesc)
                this.showLogin = true
              }
            } else {
              this.$notify(response.rtndesc)
              this.showLogin = true
            }
          }).catch(err => {
            this.$notify(err.message)
            this.showLogin = true
          })
        }
      } else if (active === 1) { // 验证码登录
        if(!this.regMoblie || !this.regCode) {
          this.checkMobile()
          this.changeCode()
          this.showLogin = true
        } else {
          let bodyJson = {
            mobilenum: this.regMoblie,
            smscode: this.regCode,
            tempid: this.userGuid
          }
          this.$http.reqRegCheckSmsCode(this.regMoblie, this.regCode, getSMSFrom.SMS_CODE_TYPE_MOBILE_LOGIN).then(response => {
            if (response.rtncode === 1) {
              if (response.rltcode === 1) {
                this.$http.reqSMSLogin(bodyJson).then(response => {
                  // console.log('response登录成功之后的数据', response)
                  if (response.rtncode === 1) {
                    if (response.rltcode === 1) {
                      this.$store.commit('user/setUserId', response.userid)
                      this.$store.commit('user/setUserGuid', response.userguid)
                      this.$store.commit('user/setRealName', response.realname)
                      this.$store.commit('user/setToken', response.token)
                      this.$store.commit('user/setMobileNum', response.mobilenum)
                      this.$store.commit('user/setIsLogin', true)
                      this.$store.commit('user/setUserType', '')
                      this.$store.commit('user/setPermission', response.permission)

                      sessionStorage.setItem('userId', response.userid)
                      sessionStorage.setItem('userguid', response.userguid)
                      sessionStorage.setItem('token', response.token)
                      sessionStorage.setItem('phone', response.mobilenum)

                      let cookieObj = {
                        userId: response.userid,
                        userguid: response.userguid,
                        realname: response.realname,
                        token: response.token,
                        phone: response.mobilenum,
                        permission: response.permission,
                        ts: Number(getTimeStamp())
                      }

                      let data = TripleDES.encode('token', cookieObj)
                      // console.log('data====>', data)

                      this.$cookie.set('cookieObj', JSON.stringify(data), 4)
                     
                      // this.$cookie.set('cookieObj', JSON.stringify(cookieObj), 4)
                      // console.log('cookieObj', JSON.parse(this.$cookie.get('cookieObj')))

                      // localStorage.setItem('selectedId', 'a')

                      this.showLogin = false
                      // 登录成功之后 文件夹创建默认目录
                      this.$http.reqCreateDefault().then(res => {
                        if (res.rltcode === 1) {
                          if (res.rltcode === 1) {
                            this.getFixedFolder()
                          }
                        }
                      })

                      this.$notify({ color: '#fff', background: '#b99573', message: '登录成功'})
                      this.$router.replace({ path: '/main' }) // 登录成功之后跳转到首页
                      this.$emit('updateDoc') // 更新doc文件的内容
                    } else {
                      this.$notify(response.rltdesc)
                      this.showLogin = true
                    }
                  } else {
                    this.$notify(response.rtndesc)
                    this.showLogin = true
                  }
                }).catch(err => {
                  this.$notify(err.message)
                  this.showLogin = true
                })
              } else {
                this.$notify(response.rltdesc)
                this.showLogin = true
              }
            } else {
              this.$notify(response.rtndesc)
              this.showLogin = true
            }
          }).catch(err => {
            this.$notify(err.message)
            this.showLogin = true
          })
        }
      }
    },
    // 关闭申请试用弹框之前
    beforeApplyLoginClose() {
      if(!this.regMoblie || !this.regCode) {
        this.checkMobile()
        this.changeCode()
        this.showApplyLogin = true
      } else {
        // console.log('关闭申请试用this.regMoblie, this.regCode, getSMSFrom.SMS_CODE_TYPE_REG', this.regMoblie, this.regCode, getSMSFrom.SMS_CODE_TYPE_REG)
        this.$http.reqRegCheckSmsCode(this.regMoblie, this.regCode, getSMSFrom.SMS_CODE_TYPE_REG).then(response => {
          if (response.rtncode === 1) {
            if (response.rltcode === 1) {
              this.showReg = true
              this.showApplyLogin = false
            } else {
              this.$notify(response.rltdesc)
              this.showApplyLogin = true
            }
          } else {
            this.$notify(response.rtndesc)
            this.showApplyLogin = true
          }
        }).catch(err => {
          this.$notify(err.message)
          this.showApplyLogin = true
        })
      }
    },
    // 打开注册弹框
    openReg() {
      this.account = ''
      this.password = ''
      this.confirmPwd = ''
    },
    // 关闭注册弹框之前
    beforeReg() {
      if(!this.account || !this.password || !this.confirmPwd) {
        this.checkAccount()
        this.checkPassword()
        this.checkConfirmPwd()
        this.showReg = true
      } else if(this.errMsg.password !== '' || this.errMsg.confirmPwd !== '') {
        this.showReg = true
      } else {
        let bodyJson = {
          mobilenum: this.regMoblie,
          userid: this.account,
          password: this.password,
          tempuserguid: this.userGuid,
          smscode: this.regCode,
          unitname: ''
        }
        this.$http.reqReg(bodyJson).then(response => {
          // console.log('response', response)
          if (response.rtncode === 1) {
            if (response.rltcode === 1) {
              this.$notify({ color: '#fff', background: '#b99573', message: '注册成功, 请登录' })
              this.showReg = false

              // 注册成功之后 文件夹创建默认目录
              this.$http.reqCreateDefault().then(res => {
                if (res.rltcode === 1) {
                  if (res.rltcode === 1) {
                    this.getFixedFolder()
                  }
                }
              })

            } else {
              this.$notify(response.rltdesc)
              this.showReg = true
            }
          } else {
            this.$notify(response.rtndesc)
            this.showReg = true
          }
        }).catch(err => {
          this.$notify(err.message)
          this.showReg = true
        })
      }
    },
    // 打开重置密码框之前
    openChangePwd() {
      this.password = ''
      this.confirmPwd = ''
    },
    // 关闭重置密码框之前
    beforeChangePwd() {
      this.checkPassword()
      this.checkConfirmPwd()
      if (!this.password || !this.confirmPwd) {
        this.comPassword = true
      } else if(this.errMsg.password !== '' || this.errMsg.confirmPwd !== '') {
        this.comPassword = true
      } else {
        let bodyJson = {
          telnum: this.regMoblie,
          pwd: this.password,
          smscode: this.regCode
        }
        this.$http.reqSetPwd(bodyJson.telnum, bodyJson.pwd, bodyJson.smscode).then(response => {
          // console.log('response', response)
          if (response.rtncode === 1) {
            if (response.rltcode === 1) {
              this.comPassword = false
              // this.showLogin = true
              this.$notify({ color: '#fff', background: '#b99573', message: '密码重置成功, 请重新登录' })
              sessionStorage.removeItem('userId')
              sessionStorage.removeItem('phone')
              sessionStorage.removeItem('userguid')
              sessionStorage.removeItem('token')
              this.$store.commit('user/setUserId', '')
              this.$store.commit('user/setUserGuid', '')
              this.$store.commit('user/setToken', '')
              this.$store.commit('user/setMobileNum', '')

              this.$cookie.delete('cookieObj')

              this.$router.push('index')
            } else {
              this.$notify(response.rltdesc)
              this.comPassword = true
            }
          } else {
            this.$notify(response.rtndesc)
            this.comPassword = true
          }
        }).catch(err => {
          this.$notify(err.message)
          this.comPassword = true
        })
      }
    },
    // 打开忘记密码弹框之前
    openResetPwd() {
      this.regMoblie = ''
      this.regCode = ''
      this.time = 0
      this.btntxt = '获取验证码'
      this.disabled = false
    },
    // 关闭忘记密码弹框之前
    beforeResetPwd() {
      if(!this.regMoblie || !this.regCode) {
        this.checkMobile()
        this.changeCode()
        this.resetPassword = true
      } else {
        this.$http.reqRegCheckSmsCode(this.regMoblie, this.regCode, getSMSFrom.SMS_CODE_TYPE_UPDATE_PWD).then(response => {
          if (response.rtncode === 1) {
            if (response.rltcode === 1) {
              this.comPassword = true
              this.resetPassword = false
            } else {
              this.$notify(response.rltdesc)
              this.resetPassword = true
            }
          } else {
            this.$notify(response.rtndesc)
            this.resetPassword = true
          }
        }).catch(err => {
          this.$notify(err.message)
          this.resetPassword = true
        })
      }
    },
    // 改变showLogin
    changeShowLogin(val) {
      this.showLogin = val
    },
    // 改变showApplyLogin
    changeShowApplyLogin(val) {
      this.showApplyLogin = val
    },
    // 改变resetPassword  修改密码
    changeResetPassword(val) {
      this.resetPassword = val
    },
    // 创建账号按钮
    createAccount() {
      this.showLogin = false
      this.showApplyLogin = true
    },
    // 忘记密码按钮
    forgotPwd() {
      this.showLogin = false
      this.resetPassword = true
    },
    // 发送验证码
    sendcode(num) {
      // console.log('点击了发送验证码num===>', num)
      if (num === 1) { // 申请试用
        this.codeType = getSMSFrom.SMS_CODE_TYPE_REG
      } else if (num === 2) { // 登录
        this.codeType = getSMSFrom.SMS_CODE_TYPE_MOBILE_LOGIN
      } else if (num === 3) { // 修改密码
        this.codeType = getSMSFrom.SMS_CODE_TYPE_UPDATE_PWD
      }
      console.log('token==>', this.$store.state.user)
      // console.log('this.regMoblie===>', this.regMoblie)
      if (this.regMoblie && (/^1[3456789]\d{9}$/.test(this.regMoblie))) {
        this.$http.reqSmsCode(this.regMoblie, this.codeType).then(response => {
          // console.log('response发送验证码', response)
          if (response.rtncode === 1) {
            if (response.rltcode === 1) {
              this.$notify({ color: '#fff', background: '#b99573', message: '验证码发送成功'
              })
              this.time = 60
              this.disabled = true
              this.timer()
            } else {
              this.$notify(response.rltdesc)
            }
          } else {
            this.$notify(response.rtndesc)
          }
        }).catch(err => {
          this.$notify(err.message)
        })
      }
    },
    // 打开申请试用弹框
    openApplyLogin() {
      this.regMoblie = ''
      this.regCode = ''
      this.time = 0
      this.btntxt = '获取验证码'
      this.disabled = false
    },
    // 验证码的倒计时
    timer() {
      if (this.time > 0) {
        this.time--
        this.btntxt = this.time + 's后获取'
        setTimeout(this.timer, 1000)
      } else {
        this.time = 0
        this.btntxt = '获取验证码'
        this.disabled = false
      }
    },
    // 获取云端固定文件夹
    getFixedFolder() {
      this.$http.reqGetFixedFolder().then(response => {
        // console.log('response.item登录成功后获取固定文件夹==>', response)
        if (response.rtncode === 1) {
          if (response.rltcode === 1) {
            this.$store.dispatch('fixedFolder/updateFixedFolderArr', response.item)
            localStorage.setItem('fixedFolderArr', JSON.stringify(response.item))
            // console.log('this.$store.state.fixedFolder==>', this.$store.state.fixedFolder)
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/variable.less";
#loginOrReg {
  .loginContent {
    margin: 16px 0px 20px;
    .content {
      padding: 10px 20px 20px;
      .title {
        font-size: 16px;
        font-weight: 600;
        text-align: center;
        color: @--base-word-color;
        margin-bottom: 28px;
      }
      .tip {
        margin-top: 20px;
      }
      .forgetPwdOrReg {
        font-size: 14px;
        margin-top: 30px;
        display: flex;
        justify-content: center;
        .pwd {
          margin-left: 20px;
        }
      }
    }
  }
}
.van-cell {
  border: 1px solid #EDEDEF;
  margin-top: 20px;
  border-radius: 6px;
  min-height: 60px;
}
.van-popup--bottom.van-popup--round {
  border-radius: 10px 10px 0 0;
}
/deep/.van-cell:not(:last-child)::after{
  border-bottom: none;
}
/deep/.van-field__control{
  font-size: 12px;
}
</style>
<style lang="less">
// .van-field__control {
//   font-size: 12px;
// }
</style>
