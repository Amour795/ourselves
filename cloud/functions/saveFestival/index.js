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
  const result = event._id ? await festival.doc(event._id).get() : null

  const userInfo = await user.where({
    _openid: _openId
  }).get()

  let saveData = {
    loversId: userInfo.data[0].loversId,
    tips: event.tips,
    isTogether: event.isTogether || false,
    type: event.type,
    date: event.date,
    _openId: _openId,
  }
  if (!userInfo.data.length) return {
    code: 200,
    error: {
      message: '用户不存在'
    }
  }
  if (result && result.data) {
    await festival.update({
      data: {
        ...saveData,
        _id: event._id
      }
    })
  } else {
    await festival.add({
      data: {
        ...saveData
      }
    })

  }

  return {
    code: 200,
    error: {
      message: '操作成功'
    }
  }
}

