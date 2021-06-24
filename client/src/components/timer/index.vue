<template>
  <view>
    <slot v-bind="dateInfo">
    </slot>
  </view>
</template>

<script>
import { calendar } from '../../utils/calendar'

export default {
  name: 'timer',

  props: {
    date: {
      type: [Date, String],
      default: '',
      required: true
    },
    // positive and negative 
    /**
     * false 已经过了多少天 例: 上周一到这周一 距离七天
     * true  距离下一次 还有多少天 仅取日期 年份会自动计算
     */
    type: {
      type: Boolean,
      default: false
    },
    // 是否农历
    calendar: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      dateInfo: {
        days: '',
        hours: '',
        minutes: '',
        seconds: '',
      }
    }
  },
  created() {
    this.computing()
    this.init()
  },
  methods: {
    init() {
      setInterval(() => {
        this.computing()
      }, 1000);
    },
    computing() {
      let _data = this.date instanceof Date ? this.date.replace(/\-/g, '/') : this.date
      if (!this.type) {
        if (this.calendar) {
          this.dateInfo = this.buildDate(new Date(), this.buildCalendar(_data))
        } else {
          this.dateInfo = this.buildDate(new Date(), _data)
        }
      } else {
        if (this.calendar) {
          this.dateInfo = this.buildDate(this.buildCalendar(_data))
        } else {
          this.dateInfo = this.buildDate(_data)
        }
      }
    },
    buildCalendar(date) {
      let _month = Number(new Date(date).getMonth()) + 1
      let _day = new Date(date).getDate()
      let _year = new Date().getFullYear()
      let jieBirthday = calendar.lunar2solar(_year, _month, _day).date
      let _diff = new Date(jieBirthday).getTime() - new Date().getTime()
      return calendar.lunar2solar(_diff <= 0 ? _year + 1 : _year, _month, _day).date
    },
    buildDate(a = new Date(), b = new Date()) {
      let diff = new Date(a).getTime() - new Date(b).getTime()
      //计算出相差天数
      let days = Math.floor(diff / (24 * 3600 * 1000))
      //计算出小时数
      var leave1 = diff % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
      let hours = Math.floor(leave1 / (3600 * 1000))
      //计算相差分钟数
      var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
      let minutes = Math.floor(leave2 / (60 * 1000))
      //计算相差秒数
      var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
      let seconds = Math.round(leave3 / 1000)
      return {
        days,
        hours,
        minutes,
        seconds,
      }
    }
  }
};
</script>