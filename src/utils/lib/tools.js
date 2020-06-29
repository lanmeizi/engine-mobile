    // export const getSMSFrom = () => {
    //   let type = {}
    //   type.SMS_CODE_TYPE_REG = 1            // 注册时获取验证码
    //   type.SMS_CODE_TYPE_MOBILE_LOGIN = 2  // 登录时获取验证码
    //   type.SMS_CODE_TYPE_UPDATE_PWD = 3   // 更新密码获取验证码
    //   return type
    // }

export const getSMSFrom = {
  SMS_CODE_TYPE_REG: 1, // 注册时获取验证码
  SMS_CODE_TYPE_MOBILE_LOGIN: 2, // 登录时获取验证码
  SMS_CODE_TYPE_UPDATE_PWD: 3 // 更新密码获取验证码
}
