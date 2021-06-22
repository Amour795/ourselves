// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

const user = cloud.database().collection('user')
const lovers = cloud.database().collection('lovers')



const buildLoversId = async (size = 10) => {
  let loversId = ''
  let numArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  let index = 0
  for (let i = 0; i < size; i++) {
    index = parseInt(Math.random() * numArr.length);
    loversId += numArr[index];
  }
  let res = await user.where({
    loversId: loversId
  }).get()

  if (res.length) {
    return buildLoversId(size)
  } else {
    return loversId
  }
}

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = async (event, context) => {
  const _openId = cloud.getWXContext().OPENID
  const _userData = event.weRunData.data

  let userInfo = {
    avatarUrl: _userData.avatarUrl,
    nickName: _userData.nickName,
    _openid: _openId
  }

  const result = await user.where({
    _openid: _openId
  }).get()

  if (result.data.length) {
    let update = {
      ...userInfo,
      loversId: result.loversId
    }
    await user.where({
      _openid: _openId
    }).update({
      data: {
        ...update
      }
    })

    await lovers.add({
      data: {
        _id: loversId,
        list: [
          ...update
        ]
      }
    })

    return update
  } else {
    let loversId = await buildLoversId()
    let res = await user.add({
      data: {
        ...userInfo,
        loversId: loversId
      }
    })

    let _addUserInfo = {
      ...userInfo,
      _id: res._id,
      loversId: loversId
    }

    await lovers.add({
      data: {
        _id: loversId,
        list: [
          _addUserInfo
        ]
      }
    })
    return _addUserInfo
  }

}

