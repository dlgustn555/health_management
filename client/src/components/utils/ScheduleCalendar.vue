<template>
  <div class="schedulecalendar_container">
    <div class="selected_month">
      <h1 class="date">{{ year }}.{{ month + 1 }}월</h1>
    </div>
    <div>
      <div class="week header">
        <div
          v-for="(day, index) in aDays"
          :key="index"
          class="cell">
          {{ day }}요일
        </div>
      </div>
      <div
        v-for="(row, rowIndex) in MAX_ROWS"
        :key="rowIndex"
        class="week">
        <div
          v-for="(schedule, colIndex) in getWeekSchedules(rowIndex)"
          :key="colIndex"
          :class="['cell', schedule.isToday ? 'today' : '']">
          <span v-if="schedule.isDisplay">{{ schedule.date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ScheduleCalendar',
  data() {
    return {
      MAX_ROWS: 5,
      MAX_COLS: 7,
      START_DAY: 'MONDAY',
      DAYS: {
        MONDAY: ['월', '화', '수', '목', '금', '토', '일'],
        SUNDAY: ['일', '월', '화', '수', '목', '금', '토']
      },
      MONTH: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      oDate: new Date()
    }
  },
  computed: {
    DAY_PER_MONTHS() {
      const { year } = this
      const twoMonthDay =
        (year % 100 !== 0 && year % 4 === 0) || year % 400 === 0 ? 29 : 28
      return [31, twoMonthDay, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    },
    year() {
      return this.oDate.getFullYear()
    },
    // ※ 주의!! ※ 선택한 "month - 1"을 리턴. (ex) 1월: 0, 2월: 1...
    month() {
      return this.oDate.getMonth()
    },
    todate() {
      return this.oDate.getDate()
    },
    // [월, 화, 수, 목, 금...] or [일, 월, 화, 수...]
    aDays() {
      const { DAYS, START_DAY } = this
      return DAYS[START_DAY]
    },
    // 시작요일
    startDay() {
      const { year, month, START_DAY } = this
      const date = 1
      let startDay = new Date(year, month, date).getDay()
      const SUNDAY = 0

      if (START_DAY === 'MONDAY') {
        startDay = startDay === SUNDAY ? 0 : startDay - 1
      }
      return startDay
    },
    // 마지막날짜
    lastDate() {
      const { DAY_PER_MONTHS, month } = this
      return DAY_PER_MONTHS[month]
    },

    schedules() {
      const { MAX_ROWS, MAX_COLS } = this
      const schedules = Array.apply(null, Array(MAX_ROWS * MAX_COLS)).map(
        (empty, index) => {
          return {
            index,
            ...this._getColumnDate(index),
            data: {}
          }
        }
      )

      return schedules
    }
  },
  methods: {
    _getColumnDate(index) {
      const { startDay, lastDate, year, month, todate } = this
      const oDate = {
        isDisplay: false,
        year,
        month: month + 1,
        date: 0
      }

      if (index === 0 && index === startDay) {
        oDate.isDisplay = true
        oDate.date = 1
      } else if (index >= startDay) {
        const date = index - startDay + 1
        oDate.isDisplay = true
        oDate.date = date
        oDate.isToday = date === todate
      }

      if (oDate.date > lastDate) {
        oDate.isDisplay = false
      }

      return oDate
    },
    getWeekSchedules(rowIndex) {
      const { schedules, MAX_COLS } = this
      const begin = rowIndex * MAX_COLS
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
