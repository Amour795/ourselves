const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

const lovers = cloud.database().collection('lovers')

exports.main = async (event, context) => {
  const result = await lovers.where({
    _id: event.loversId
  }).get()


  return result.data.length ? result.data[0] : {}
}

