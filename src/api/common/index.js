import {
  HttpGet,
  HttpPost,
  HttpPost2
} from '../../utils/lib/api.request.js'
import {
  randomWord,
  getTimeStamp,
  tempLoginSign,
  loginSign
} from "../../utils/lib/sign"
import baseConfig from '../../../public/config.json'

//获取最新文件(法规分类)
export const reqGetLasFiles = (params, nodes) => HttpPost('/api/public/search/new', params, nodes)

// 文件列表的详情页面
export const reqPostDocDetail = (bodyJson) => HttpPost('/api/public/search/showdoc', bodyJson)

//用户临时登录
export const reqTempLogin = () => {
  var randomStr, timestamp, sign, password
  randomStr = randomWord(true, 10, 16)
  timestamp = getTimeStamp()
  password = baseConfig.tempLoginPwd
  sign = tempLoginSign(timestamp, randomStr, password)
  var bodyJson = {
      randstr: randomStr,
      timestamp: timestamp,
      sign: sign
  }
  return HttpPost2('/api/public/login/tempuser', bodyJson)
}

//根据id获取一键上传进度V2
export const reqGetOneKey_UploadProgress_V2 = (identity) => HttpGet('/api/public/cloud/upload/onekey_speed_v2/'+identity)

//用户账号登录
export const reqLogin = (payload) => {
  var randomStr
  var timestamp
  var sign
  randomStr = randomWord(true, 6, 8)
  timestamp = getTimeStamp()
  sign = loginSign(payload.userid, timestamp, randomStr, payload.passwd)
  var bodyJson = {
      userid: payload.userid,
      tempuserguid: payload.tempid,
      randstr: randomStr,
      timestamp: timestamp,
      sign: sign
  }
  return HttpPost2('/api/public/login/user', bodyJson)
}

//用户手机验证码登录
export const reqSMSLogin = (payload) => {
  var bodyJson = {
    mobilenum: payload.mobilenum,
    tempuserguid: payload.tempid,
    smscode: payload.smscode
  }
  return HttpPost2('/api/public/login/mobile', bodyJson)
}

//用户注册
export const reqReg = (reginfo) => {
  var bodyJson = {
    mobilenum: reginfo.mobilenum,
    userid: reginfo.userid,
    pwd: reginfo.password,
    tempuserguid: reginfo.tempuserguid,
    smscode: reginfo.smscode,
    workunit: reginfo.unitname,
    login: true
  }
  return HttpPost('/api/public/security/user/reg', bodyJson)
}

//获取验证码
export const reqSmsCode = (telnum, regsrc) => {
  var bodyJson = {
    reqsrc: regsrc, //reg-注册,'resetpwd'-修改密码
    mobilenum: telnum,
  }
  return HttpPost('/api/public/security/user/getsmscode', bodyJson)
}

//验证验证码
export const reqRegCheckSmsCode = (telnum, smscode, codetype) => {
  var bodyJson = {
    mobilenum: telnum,
    smscode: smscode,
    smscodetype: codetype,
  }
  return HttpPost('/api/public/security/user/checksmscode', bodyJson)
}

//修改密码
export const reqSetPwd = (telnum, pwd, smscode) => {
  var bodyJson = {
    mobilenum: telnum,
    pwd: pwd,
    smscode: smscode,
  }
  return HttpPost('/api/public/security/user/resetpwd', bodyJson)
}

//校验用户ID是否有效
export const reqCheckUserId = (telnum, userId) => {
  var bodyJson = {
    mobilenum: telnum,
    expectuserid: userId,
  }
  return HttpPost('/api/public/security/user/checkid', bodyJson)
}

// 更新token
export const refreshToken = (nodes) => {
  var bodyJson = {}
  return HttpPost('/api/public/security/user/refreshtoken', bodyJson, nodes)
}

// 综合检索
export const reqGetGeneralFiles = (args, nodes) => HttpPost('/api/public/search/engine/general', args, nodes)

// 进出口税收检索
export const reqGetInOutFiles = (args, nodes) => HttpPost('/api/public/search/engine/inout', args, nodes)

// 税收优惠项目
export const reqGetTaxBreakFiles_item = (args, nodes) => HttpPost('/api/public/search/engine/reduction_item', args, nodes)

// 税收优惠税种
export const reqGetTaxBreakFiles_taxes = (args, nodes) => HttpPost('/api/public/search/engine/reduction_taxes', args, nodes)

// 税收优惠行业
// 税收优惠行业通用
export const reqGetTaxBreakIndustryCommonFiles = (args, nodes) => HttpPost('/api/public/search/engine/reduction_industrycommon', args, nodes)

// 税收优惠行业专属
export const reqGetTaxBreakIndustryFiles = (args, nodes) => HttpPost('/api/public/search/engine/reduction_industry', args, nodes)

//行业检索,专属
export const reqGetIndustryFiles = (args, nodes) => HttpPost('/api/public/search/engine/industry', args,nodes)

//行业检索,通用
export const reqGetIndustryCommonFiles = (args, nodes) => HttpPost('/api/public/search/engine/industrycommon', args, nodes)

// 条约检索 国家(地区)
export const reqGetTreatyFiles = (args, nodes) => HttpPost('/api/public/search/engine/treaty', args, nodes)

// 条约检索 通用规定
export const reqGetCommonTreatyFiles = (args, nodes) => HttpPost('/api/public/search/engine/treatycommon', args, nodes)

// 行业
export const reqGetIndustry = () => { 
  var params = {}
  return HttpGet('/api/public/base/industry', params)
}

// 税种
export const reqGetTaxes = () => { 
  var params = {}
  return HttpGet('/api/public/base/taxes', params)
}

// 进出口
export const reqGetInOut = () => {  
  var params = {}
  return HttpGet('/api/public/base/inout', params)
}

// 优惠项目
export const reqGetReduction = () => {
  var params = {}
  return HttpGet('/api/public/base/reduction_item', params)
}

// 优惠税种
export const reqGetReduction_tax = () => {
  var params = {}
  return HttpGet('/api/public/base/reduction_taxes', params)
}

// 优惠行业
export const reqGetReduction_industry = () => {
  var params = {}
  return HttpGet('/api/public/base/reduction_industry', params)
}

// 获取国家
export const reqGetCountry = () => {  
  var params = {}
  return HttpGet('/api/public/base/country', params)
}

// 文件夹创建默认目录
export const reqCreateDefault = () => {
  var bodyJson = {}
  return HttpPost('/api/public/cloud/uploaddir/createdefault', bodyJson)
}

// 获取文件夹固定目录
export const reqGetFixedFolder = () => {
  var parameters = {}
  return HttpGet('/api/public/cloud/uploaddir/getfixed', parameters)
}

//获取文件库目录树,按父级目录id
export const reqGetTreeByParentId = (args) => {
  var parameters = {}
  parameters.sdirid = args.sdirid
  return HttpGet('/api/public/cloud/uploaddir/gettree', parameters)
}

// 获取文件库目录列表,按父级目录id
export const reqGetChildByParentId = (args) => {
  var parameters = {}
  parameters.sdirid = args.sdirid
  return  HttpGet('/api/public/cloud/uploaddir/getchild', parameters)
}

//获取云端文件
export const reqGetUploadFiles = (args) => HttpPost('/api/public/cloud/upload/searchallfile', args)

//上传文件至云端,选择性上传[1,2]
export const upLoadFileToCloud = (idlist, folderid) => {
  var bodyJson = {
    dirid:folderid,
    docids:idlist,
  }
  return HttpPost('/api/public/cloud/upload/add', bodyJson)
}

//删除云端指定文件夹下的文件
export const reqRemoveFilesByFolderId = (folderid) => {
  var bodyJson = {
    dirid:folderid,
  }
  return HttpPost('/api/public/cloud/upload/clean', bodyJson)
}

//删除云端文件夹文件,按文件id
export const reqRemoveFilesByList = (folderid, list) => {
  var bodyJson = {
    dirid:folderid,
    docids:list
  }
  return HttpPost('/api/public/cloud/upload/remove', bodyJson)
}

// 一键上传-最新文件
export const reqOneKeyLastFiles = (args) => HttpPost('/api/public/cloud/upload/onekey_v2/new', args)

// 一键上传-综合搜索-----------------------------------
export const reqOneKeyGeneralFiles_V2 = (args) => HttpPost('/api/public/cloud/upload/onekey_v2/general', args)

// 一键上传-进出口-------------------------------------
export const reqOneKeyInoutFiles_V2 = (args) => HttpPost('/api/public/cloud/upload/onekey_v2/inout', args)

// 一键上传-行业-通用----------------------------------
export const reqOneKeyIndustryCommonFiles_V2 = (args) => HttpPost('/api/public/cloud/upload/onekey_v2/industrycommon', args)

// 一键上传-行业-专属----------------------------------
export const reqOneKeyIndustrySpecialFiles_V2 = (args) => HttpPost('/api/public/cloud/upload/onekey_v2/industry', args)

// 一键上传-条约-通用----------------------------------
export const reqOneKeyTreatyCommonFiles_V2 = (args) => HttpPost('/api/public/cloud/upload/onekey_v2/treatycommon', args)

// 一键上传-条约-专属----------------------------------
export const reqOneKeyTreatySpecialFiles_V2 = (args) => HttpPost('/api/public/cloud/upload/onekey_v2/treaty', args)

// 一键上传-税收优惠项目-----------------------------------
export const reqOneKeyTaxBreakFiles_item_V2 = (args) => HttpPost('/api/public/cloud/upload/onekey_v2/reduction_item', args)

// 一键上传-税收优惠税种-----------------------------------
export const reqOneKeyTaxBreakFiles_taxes_V2 = (args) => HttpPost('/api/public/cloud/upload/onekey_v2/reduction_taxes', args)

// 一键上传-税收优惠行业通用-----------------------------------
export const reqOneKeyTaxBreakFiles_common_V2 = (args) => HttpPost('/api/public/cloud/upload/onekey_v2/reduction_industrycommon', args)

// 一键上传-税收优惠行业专属-----------------------------------
export const reqOneKeyTaxBreakFiles_special_V2 = (args) => HttpPost('/api/public/cloud/upload/onekey_v2/reduction_industry', args)

// 请求地方版默认数据
export const reqGetLocalLastFiles = (params, nodes) => HttpPost('/api/public/search/localnew', params, nodes)

// 获取定位
export const ReqGetLocation = () => {
  var params = {}
  return HttpGet('/api/public/base/postion_v2', params)
}

// 获取省市
export const reqGetProvinceAndCity = () => {
  var params = {}
  return HttpGet('/api/public/base/division', params)
}

//地方版一键上传
export const reqOneKeyLocalUpload_V2 = (args) => HttpPost('/api/public/cloud/upload/onekey_v2/new', args)
