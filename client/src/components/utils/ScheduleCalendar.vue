<template>
  <div class="schedulecalendar_container">
    <div class="selected_month">
      <h1 class="month">{{ month + 1 }}월</h1>
      <table border="1">
        <tbody>
          <tr>
            <td
              v-for="(day, index) in aDays"
              :key="index">
              {{ day }}요일
            </td>
          </tr>
          <tr
            v-for="row in MAX_ROWS"
            :key="row">
            <td
              v-for="column in MAX_COLS"
              :key="column">
              {{ getColumnDate(row - 1, column - 1) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      시작일 : {{ DAYS[START_DAY][startDay] }}요일 ({{ startDay }})
    </p>
  </div>
</template>
<script>
export default {
  name: 'ScheduleCalendar',
  data() {
    return {
      MAX_ROWS: 5,
      MAX_COLS: 7,
      START_DAY: 'SUNDAY',
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
    // 2월 이면 1 리턴
    month() {
      return this.oDate.getMonth()
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
    }
  },
  methods: {
    getColumnDate(row, column) {
      const columnIndex = row * 7 + column
      const { startDay, lastDate } = this
      let date = ''

      if (columnIndex === 0 && columnIndex === startDay) {
        date = startDay + ''
      } else if (columnIndex >= startDay) {
        date = columnIndex - startDay + 1 + ''
      }

      if (date > lastDate) {
        date = ''
      }

      return date
    }
  }
}
</script>
