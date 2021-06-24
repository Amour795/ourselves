// 云函数入口文件
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

const user = cloud.database().collection('user')


// 云函数入口函数
exports.main = async (event, context) => {
  const userData = await user.where({
    _openid: cloud.getWXContext().OPENID
  }).get()

  return {
    code: 200,
    data: {
      state: !!userData.data.length
    }
  }
}