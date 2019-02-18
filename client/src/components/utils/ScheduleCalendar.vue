<template>
  <div class="schedulecalendar_container">
    <div class="selected_month">
      <button @click="changeYear(STATUS.PREV)">이전년도</button>
      <button @click="changeMonth(STATUS.PREV)">이전</button>
      <button @click="changeMonth(STATUS.RESET)">오늘</button>
      <button @click="changeMonth(STATUS.NEXT)">다음</button>
      <button @click="changeYear(STATUS.NEXT)">다음년도</button>
      <select v-model="START_DAY">
        <option value="SUNDAY">일요일</option>
        <option value="MONDAY">월요일</option>
      </select>
      <input
        id="check_full"
        v-model="IS_FULL"
        type="checkbox">
      <label for="check_full">FULL</label>
      <h1 class="date">{{ year }}.{{ month + 1 }}월</h1>
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
          v-for="(schedule, colIndex) in getWeekSchedules(weekIndex, STATUS.NOW)"
          :key="colIndex"
          :class="['cell', schedule.isToday ? 'today' : '']">
          <div v-if="schedule.isDisplay">
            <div :class="schedule.status">{{ schedule.date }}</div>
            <div>{{ schedule.data }}</div>
          </div>
        </div>
      </div>
    </div>
    <p>{{ test }}</p>
    <p>{{ test }}</p>
    <p>{{ test }}</p>
    <p>{{ test }}</p>
  </div>
</template>
<script>
export default {
  name: 'ScheduleCalendar',
  data() {
    return {
      STATUS: {
        PREV: 'prev',
        NOW: 'now',
        NEXT: 'next',
        RESET: 'reset'
      },
      IS_FULL: false,
      MAX_COLS: 7,
      START_DAY: 'SUNDAY',
      DAYS: {
        MONDAY: ['월', '화', '수', '목', '금', '토', '일'],
        SUNDAY: ['일', '월', '화', '수', '목', '금', '토']
      },
      MONTH: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      oDate: new Date(),
      result: ''
    }
  },
  computed: {
    test() {
      console.log('TEST')
      return 'test'
    },
    schedules() {
      return {
        prev: this._getSchedules(this.STATUS.PREV),
        now: this._getSchedules(this.STATUS.NOW),
        next: this._getSchedules(this.STATUS.NEXT)
      }
    },
    DAY_PER_MONTHS() {
      const year = this.oDate.getFullYear()
      const twoMonthDay =
        (year % 100 !== 0 && year % 4 === 0) || year % 400 === 0 ? 29 : 28
      return [31, twoMonthDay, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    },
    MAX_ROWS() {
      // const startDays = this.schedules.now.filter(({ isDisplay, index }) => {
      //   return isDisplay && (index === 0 || index % 7 === 0)
      // })
      const startDays = [1, 2, 3, 4, 5]
      return startDays.length
    },
    year() {
      return this.oDate.getFullYear()
    },
    month() {
      return this.oDate.getMonth()
    },
    todate() {
      const oTodate = new Date()
      return `${oTodate.getFullYear()}${oTodate.getMonth()}${oTodate.getDate()}`
    }
  },
  async created() {
    // const url = '/health'
    // const { status, data } = await this.$axios.get(url)
    // if (status === 200 && data.success) {
    //   this.result = data.message
    // }
  },
  methods: {
    changeYear(status) {
      const { STATUS, oDate, year, month } = this
      const changeYear = status === STATUS.PREV ? year - 1 : year + 1
      this.oDate = new Date(changeYear, month)
    },
    changeMonth(status) {
      this.oDate = this._getDateByMonth(status)
    },
    getWeekSchedules(weekIndex, status) {
      const { schedules, IS_FULL, MAX_ROWS, MAX_COLS, STATUS } = this
      const begin = weekIndex * MAX_COLS
      const end = begin + MAX_COLS
      const weekSchedules = schedules[status].slice(begin, end)

      if (!IS_FULL) {
        return weekSchedules
      }

      if (status === STATUS.NOW && weekIndex === 0) {
        const pwIndex = MAX_ROWS - 1
        const pwSchedules = this.getWeekSchedules(pwIndex, STATUS.PREV)
        const startDay = this._getStartDay(this.year, this.month)
        return [
          ...pwSchedules.slice(0, startDay),
          ...weekSchedules.slice(startDay)
        ]
      }

      if (status === this.STATUS.NOW && weekIndex === MAX_ROWS - 1) {
        const lastDay = this._getLastDay(this.year, this.month) + 1
        const nextWekkSchedules = this.getWeekSchedules(0, STATUS.NEXT)
        return [
          ...weekSchedules.splice(0, lastDay),
          ...nextWekkSchedules.splice(lastDay)
        ]
      }
      return weekSchedules
    },
    _getSchedules(status) {
      const oDate = this._getDateByMonth(status)
      const oDateOtion = this._getDateOption(oDate, status)
      const { MAX_ROWS, MAX_COLS } = this
      return Array.apply(null, Array(MAX_ROWS * MAX_COLS)).map(
        (empty, index) => {
          return {
            index,
            status,
            ...this._getColumnDate(oDateOtion, index)
          }
        }
      )
    },
    _getDateOption(oDate, status) {
      const year = oDate.getFullYear()
      const month = oDate.getMonth()
      return {
        status,
        year,
        month,
        startDay: this._getStartDay(year, month),
        lastDate: this.DAY_PER_MONTHS[month]
      }
    },
    _getStartDay(year, month) {
      const SUNDAY = 0
      const date = 1
      let startDay = new Date(year, month, date).getDay()
      if (this.START_DAY === 'MONDAY') {
        startDay = startDay === SUNDAY ? 0 : startDay - 1
      }
      return startDay
    },
    _getLastDay(year, month) {
      const SUNDAY = 0
      const date = this.DAY_PER_MONTHS[month]
      let lastDay = new Date(year, month, date).getDay()
      if (this.START_DAY === 'MONDAY') {
        lastDay = lastDay === SUNDAY ? 0 : lastDay - 1
      }
      return lastDay
    },
    _getDateByMonth(status) {
      const { STATUS, oDate, year, month } = this
      if (status === STATUS.PREV) {
        return new Date(year, month - 1)
      } else if (status === STATUS.NEXT) {
        return new Date(year, month + 1)
      } else if (status === STATUS.RESET) {
        return new Date()
      } else {
        return oDate
      }
    },
    _getColumnDate(oDateOtion, index) {
      const { status, year, month, startDay, lastDate } = oDateOtion
      const oColumnDate = {
        year,
        month: month + 1,
        date: 0,
        isDisplay: false
      }

      if (index === 0 && index === startDay) {
        oColumnDate.isDisplay = true
        oColumnDate.date = 1
      } else if (index >= startDay) {
        const date = index - startDay + 1
        oColumnDate.isDisplay = true
        oColumnDate.date = date
        oColumnDate.isToday = `${year}${month}${date}` === `${this.todate}`
      }

      if (oColumnDate.date > lastDate) {
        oColumnDate.isDisplay = false
      }
      return oColumnDate
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
.cell .prev,
.cell .next {
  font-style: italic;
}
</style>
