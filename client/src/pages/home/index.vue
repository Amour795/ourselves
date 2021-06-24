<template>
  <view class='home'>
    <view class="card-list">
      <view class="card-list-item"
            v-for="item in list"
            :key="item._id">
        <timer :date='item.date'
               :type='item.type'
               :calendar='item.isCalendar'>
          <template slot-scope="row">
            &nbsp;
            <text v-if="row.days || row.hours || row.minutes || row.seconds">
              {{item.tips}}
            </text>
            <text v-if="row.days">
              {{row.days}}天
            </text>
            <text v-if="row.hours">
              {{row.hours}}小时
            </text>
            <text v-if="row.minutes">
              {{row.minutes}}分钟
            </text>
            <text v-if="row.seconds">
              {{row.seconds}}秒
            </text>
          </template>
        </timer>
      </view>
    </view>
    <button @tap='navigateTo'>213</button>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.scss'
import timer from '../../components/timer/index.vue'
export default {
  name: 'home',
  components: {
    timer
  },
  data() {
    return {
      list: []
    }
  },
  methods: {
    navigateTo() {
      Taro.navigateTo({
        url: '/pages/createFestival/index',
      })
    },
    async getList() {
      Taro.cloud
        .callFunction({
          name: "getFestival",
        })
        .then(({ result }) => {
          this.list = result.data.list
        })
    }
  },
  onLoad() {
    this.getList()
  },
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
