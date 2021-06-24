<template>
  <view class='home'>
    <AtInput name='value1'
             type='text'
             placeholder='输入纪念日标题'
             :value="saveData.tips"
             :onChange="(v) => saveData.tips = v" />
    <AtSwitch title='规则'
              :checked="saveData.type"
              :onChange="(v) => saveData.type = v" />
    <AtSwitch title='农历'
              :checked="saveData.isCalendar"
              :onChange="(v) => saveData.isCalendar = v" />
    <AtButton type='primary'
              :on-click='()=>{isOpened = !isOpened}'>选择日期</AtButton>
    <AtFloatLayout :isOpened='isOpened'
                   :onClose="handleClose">
      <AtCalendar :onSelectDate='onSelectDate' />
    </AtFloatLayout>
    <AtButton type='primary'
              :on-click='save'>保存</AtButton>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.scss'
import { AtInput, AtButton, AtCalendar, AtFloatLayout, AtSwitch } from 'taro-ui-vue'
export default {
  name: 'home',
  components: {
    AtInput,
    AtButton,
    AtCalendar,
    AtFloatLayout,
    AtSwitch
  },
  data() {
    return {
      isOpened: false,
      saveData: {
        isTogether: false,
        tips: '',
        _id: '',
        type: false,
        isCalendar: false,
        date: ''
      }
    }
  },
  methods: {
    handleClose(v) {
      this.isOpened = false
    },
    onSelectDate({ value }) {
      this.saveData.date = value.end
      setTimeout(() => {
        this.handleClose()
      }, 120)
    },
    async save() {
      await Taro.cloud
        .callFunction({
          name: "saveFestival",
          data: this.saveData
        })
        .then(res => {
          this.userInfo = res.result
        })
    }
  }
}
</script>

<style lang="scss" >
@import '~taro-ui-vue/dist/style/components/input.scss';
@import '~taro-ui-vue/dist/style/components/icon.scss';
@import '~taro-ui-vue/dist/style/components/button.scss';
@import '~taro-ui-vue/dist/style/components/loading.scss';
@import '~taro-ui-vue/dist/style/components/calendar.scss';
@import '~taro-ui-vue/dist/style/components/float-layout.scss';
.home {
  padding: 32px;
  width: 100vw;
  height: 100vh;
  background: #f9f9f9;
  box-sizing: border-box;
  .card-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &-item {
      width: 100%;
      background: #fff;
      padding: 32px;
      box-sizing: border-box;
      margin-bottom: 40px;
      border-radius: 12px;
      flex: none;
      font-size: 28px;
    }
    &-item:nth-child(2) {
      width: calc(50% - 10px);
    }
    &-item:nth-child(3) {
      width: calc(50% - 10px);
    }

    &-item:nth-child(4) {
      width: calc((100% / 3) - 10px);
    }
    &-item:nth-child(5) {
      width: calc((100% / 3) - 10px);
    }
    &-item:nth-child(6) {
      width: calc((100% / 3) - 10px);
    }
  }
}
</style>
