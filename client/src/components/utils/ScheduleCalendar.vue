<template>
  <div class="schedulecalendar_container">
    <div class="selected_month">
      <button @click="setSchedules(STATUS.PREVE)">이전</button>
      <button @click="setSchedules(STATUS.NOW)">오늘</button>
      <button @click="setSchedules(STATUS.NEXT)">다음</button>
      <select v-model="START_DAY">
        <option value="SUNDAY">일요일</option>
        <option value="MONDAY">월요일</option>
      </select>
      <h1 class="date">{{ oDate.getFullYear() }}.{{ oDate.getMonth() + 1 }}월</h1>
    </div>
    <div>
      <div class="week header">
        <div
          v-for="(day, index) in DAYS[START_DAY]"
          :key="index"
          class="cell">
          {{ day }}요일
        </div>
      </div>

      <div
        v-for="(week, weekIndex) in MAX_ROWS"
        :key="weekIndex"
        class="week">
        <div
          v-for="(schedule, colIndex) in getWeekSchedules(weekIndex)"
          :key="colIndex"
          :class="['cell', schedule.isToday ? 'today' : '']">
          <div v-if="schedule.isDisplay">{{ schedule.date }}</div>
          <div>{{ schedule.data }}</div>
        </div>
      </div>
    </div>
    <pre>
      {{ result }}
    </pre>
  </div>
</template>
<script>
export default {
  name: 'ScheduleCalendar',
  data() {
    return {
      STATUS: {
        PREVE: 'preve',
        NOW: 'now',
        NEXT: 'next'
      },
      MAX_ROWS: 5,
      MAX_COLS: 7,
      START_DAY: 'SUNDAY',
      DAYS: {
        MONDAY: ['월', '화', '수', '목', '금', '토', '일'],
        SUNDAY: ['일', '월', '화', '수', '목', '금', '토']
      },
      MONTH: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      oDate: null,
      schedules: [],
      result: ''
    }
  },
  computed: {
    DAY_PER_MONTHS() {
      const year = this.oDate.getFullYear
      const twoMonthDay =
        (year % 100 !== 0 && year % 4 === 0) || year % 400 === 0 ? 29 : 28
      return [31, twoMonthDay, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    }
  },
  async created() {
    this.setSchedules(this.STATUS.NOW)
    const url = '/health'
    const { status, data } = await this.$axios.get(url)
    if (status === 200 && data.success) {
      this.result = data.message
    }
  },
  methods: {
    _getOption(status) {
      const year = this.oDate.getFullYear()
      const month = this.oDate.getMonth()
      return {
        status,
        year,
        month,
        startDay: this._getStartDay(year, month),
        lastDate: this.DAY_PER_MONTHS[month],
        todate: this.oDate.getDate()
      }
    },
    setSchedules(status) {
      this.oDate = this._getDateByMonth(status)
      const oDateOtion = this._getOption(status)
      const { MAX_ROWS, MAX_COLS } = this
      this.schedules = Array.apply(null, Array(MAX_ROWS * MAX_COLS)).map(
        (empty, index) => {
          return {
            index,
            ...this._getColumnDate(oDateOtion, index),
            data: {}
          }
        }
      )
    },
    // 시작요일
    _getStartDay(year, month) {
      const SUNDAY = 0
      const date = 1
      let startDay = new Date(year, month, date).getDay()
      if (this.START_DAY === 'MONDAY') {
        startDay = startDay === SUNDAY ? 0 : startDay - 1
      }
      return startDay
    },
    _getDateByMonth(status) {
      const { STATUS, oDate } = this
      if (status === STATUS.PREVE) {
        return new Date(oDate.getFullYear(), oDate.getMonth() - 1)
      } else if (status === STATUS.NEXT) {
        return new Date(oDate.getFullYear(), oDate.getMonth() + 1)
      } else {
        return new Date()
      }
    },
    _getColumnDate(oDateOtion, index) {
      const { status, year, month, startDay, lastDate, todate } = oDateOtion
      const oColumnDate = {
        isDisplay: false,
        year,
        month: month + 1,
        date: 0
      }

      if (index === 0 && index === startDay) {
        oColumnDate.isDisplay = true
        oColumnDate.date = 1
      } else if (index >= startDay) {
        const date = index - startDay + 1
        oColumnDate.isDisplay = true
        oColumnDate.date = date
        oColumnDate.isToday = status === this.STATUS.NOW && date === todate
      }

      if (oColumnDate.date > lastDate) {
        oColumnDate.isDisplay = false
      }
      return oColumnDate
    },
    getWeekSchedules(weekIndex) {
      const { schedules, MAX_COLS } = this
      const begin = weekIndex * MAX_COLS
      const end = begin + MAX_COLS
      return schedules.slice(begin, end)
    }
  }
}
</script>
<style>
.week {
  display: flex;
}
.week.header {
  text-align: center;
  background: lightblue;
}
.cell {
  border: 1px solid black;
  padding: 10px;
  flex: 1;
}
.cell.today {
  background: sandybrown;
}
</style>
