<template>
  <view className='index'>
    <AtButton type='primary'>打卡</AtButton>
  </view>
</template>

<script>
import './index.scss'
import { AtButton } from 'taro-ui-vue'

export default {
  name: 'clockIn',
  components: {
    AtButton
  }
}
</script>

<style lang="scss" >
@import '~taro-ui-vue/dist/style/components/button.scss';
@import '~taro-ui-vue/dist/style/components/loading.scss';
</style>
