// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

const festival = cloud.database().collection('festival')
const user = cloud.database().collection('user')

exports.main = async (event, context) => {
  const _openId = cloud.getWXContext().OPENID

  const _userInfo = await user.where({
    _openid: _openId
  }).get()

  const res = await festival.where({
    loversId: _userInfo.data[0].loversId
  }).get()

  return {
    code: 200,
    data: {
      list: res.data
    }
  }
}

