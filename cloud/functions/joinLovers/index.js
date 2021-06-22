// 云函数入口文件
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

const lovers = cloud.database().collection('lovers')
const user = cloud.database().collection('user')


// 云函数入口函数
exports.main = async (event, context) => {
  const _openid = cloud.getWXContext().OPENID
  const loversId = event.loversId
  let loversData = await lovers.doc(loversId).get()
  loversData = loversData.data
  if (loversData.list.length === 1) {
    // // 更新当前用户 情侣id
    await user.where({
      '_openid': _openid
    }).update({
      data: {
        loversId: loversId
      }
    })

    const userInfo = await user.where({
      _openid: _openid
    }).get()

    const _ = cloud.database().command
    lovers.doc(event.loversId).update({
      data: {
        list: _.push({ ...userInfo.data[0] })
      }
    })
  } else {
    return {
      code: 200,
      error: {
        message: '此情侣ID已绑定'
      }
    }
  }



  return {
    code: 200,
    error: {
      message: '加入成功'
    }
  }
}