<template>
  <view class='my'>
    <view class="my-info"
          @tap="getLogin">
      <view class="my-info__own">
        <AtAvatar :image='own.avatarUrl'
                  circle></AtAvatar>
        <view class="my-info__name">{{own.nickName}}</view>
      </view>
      <view>
        相爱100天12小时12分12秒
      </view>
      <view v-show="other && other._id"
            class="my-info__other">
        <AtAvatar :image="other.avatarUrl"
                  circle></AtAvatar>
        <view class="my-info__name">{{other.nickName}}</view>
      </view>
    </view>
    <view class="my-nav">
      <view class="my-nav__item"
            @tap="getLogin">
        <text>邀请另一半</text>
        <text class="loversid">{{userInfo.loversId}}</text>
      </view>
      <view class="my-nav__item"
            @tap='joinLovers'>加入</view>
    </view>
  </view>
</template>

<script>
import './index.scss'
import { AtAvatar } from 'taro-ui-vue'
import Taro from '@tarojs/taro'

export default {
  name: 'my',
  components: {
    AtAvatar
  },
  data() {
    return {
      userInfo: {},
      loversData: {
        list: []
      },
      own: {
        avatarUrl: '',
        nickName: ''
      },
      other: {
        avatarUrl: '',
        nickName: ''
      }
    }
  },
  methods: {
    async checkRegister() {
      const _checkRegister = await Taro.cloud
        .callFunction({
          name: "checkRegister",
        })
      _checkRegister.result.data.state && this.getLogin(_checkRegister.result.data.state)
    },
    async getLogin(isRegister) {
      !isRegister && await Taro.getUserProfile({ desc: '用于完善会员资料' })
        .then(res => {
          this.userInfo = res.userInfo
          this.cloudID = res.cloudID
        })

      await Taro.cloud
        .callFunction({
          name: "login",
          data: {
            weRunData: this.cloudID && Taro.cloud.CloudID(this.cloudID),
          }
        })
        .then(res => {
          this.userInfo = res.result
        })
      await this.getLovers(this.userInfo.loversId)

    },
    getLovers(loversId) {
      Taro.cloud
        .callFunction({
          name: "getLovers",
          data: {
            loversId: loversId
          }
        })
        .then(res => {
          this.own = res.result.list.find(v => v._openid === this.userInfo._openid) || {
            avatarUrl: '',
            nickName: ''
          }
          this.other = res.result.list.find(v => v._openid !== this.userInfo._openid) || {
            avatarUrl: '',
            nickName: ''
          }
        })
    },
    async joinLovers() {
      await Taro.cloud
        .callFunction({
          name: "joinLovers",
          data: {
            loversId: '0554612268'
          }
        })
        .then(res => {
          this.getLovers('0554612268')
        })
    }
  },
  onLoad() {
    this.checkRegister()
  }
}
</script>

<style lang="scss" >
@import '~taro-ui-vue/dist/style/components/avatar.scss';
.my {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background: #f6f6f6;
  padding: 32px;
  &-info {
    display: flex;
    justify-content: space-between;
    padding: 24px;
    box-shadow: 0 0 12px #999999;
    border-radius: 12px;
    align-items: center;
    font-size: 28px;
    background: #ffffff;
    &__name {
      margin-top: 16px;
      text-align: center;
    }
  }
  &-nav {
    margin-top: 32px;
    &__item {
      padding: 24px;
      border-radius: 12px;
      color: #333333;
      font-size: 28px;
      font-weight: bold;
      background: #ffffff;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .loversid {
        font-size: 20px;
        color: #999999;
      }
    }
  }
}
</style>
