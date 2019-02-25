<template>
  <div class="schedulecalendar_container">
    <create-schedule-template-modal />

    <div class="selected_month">
      <button @click="changeYear(STATUS.PREV)">이전년도</button>
      <button @click="changeMonth(STATUS.PREV)">이전</button>
      <button @click="changeMonth(STATUS.RESET)">오늘</button>
      <button @click="changeMonth(STATUS.NEXT)">다음</button>
      <button @click="changeYear(STATUS.NEXT)">다음년도</button>
      <select v-model="START_DAY_TYPE">
        <option :value="START_DAY.SUNDAY">일요일</option>
        <option :value="START_DAY.MONDAY">월요일</option>
      </select>
      <input
        id="check_full"
        v-model="IS_FULL"
        type="checkbox">
      <label for="check_full">FULL</label>
      <h1 class="date">{{ year }}.{{ month + 1 }}월</h1>
    </div>

    <div class="contents">
      <div class="c-right">
        <b-button
          v-b-modal.createScheduleTemplate
          variant="outline-primary">+추가하기</b-button>
      </div>

      <div class="week header">
        <div
          v-for="(day, index) in DAYS[START_DAY_TYPE]"
          :key="index"
          class="cell">
          {{ day }}요일
        </div>
      </div>

      <div
        v-for="(week, weekIndex) in MAX_ROWS(year, month)"
        :key="weekIndex"
        class="week">
        <div
          v-for="(schedule, colIndex) in getWeekSchedules(weekIndex, STATUS.NOW)"
          :key="colIndex"
          :class="['cell', schedule.isToday ? 'today' : '']">
          
          <div v-if="schedule.isDisplay">
            <div :class="schedule.status">{{ schedule.date }}</div>
            <div
              v-if="schedule.date === 20"
              class="health">헬스 - 어깨</div>
            <div
              v-if="schedule.date === 20 || schedule.date === 19"
              class="boxing">복싱</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CreateScheduleTemplateModal from '~/components/modal/CreateScheduleTemplateModal.vue'

export default {
  name: 'ScheduleCalendar',
  components: { CreateScheduleTemplateModal },
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
      START_DAY_TYPE: 'sunday',
      START_DAY: {
        MONDAY: 'monday',
        SUNDAY: 'sunday'
      },
      DAYS: {
        monday: ['월', '화', '수', '목', '금', '토', '일'],
        sunday: ['일', '월', '화', '수', '목', '금', '토']
      },
      oDate: new Date(),
      modal: {
        create: false
      }
    }
  },
  computed: {
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
    MAX_ROWS(year, month) {
      const startDay = this._getStartDay(year, month)
      const lastDate = this.DAY_PER_MONTHS[month]
      return Math.ceil((startDay + lastDate) / 7)
    },
    changeYear(status) {
      const { STATUS, oDate, year, month } = this
      const changeYear = status === STATUS.PREV ? year - 1 : year + 1
      this.oDate = new Date(changeYear, month)
    },
    changeMonth(status) {
      this.oDate = this._getDateByMonth(status)
    },
    getWeekSchedules(weekIndex, status) {
      const {
        year,
        month,
        schedules,
        IS_FULL,
        MAX_COLS,
        STATUS: { PREV, NOW, NEXT }
      } = this
      const begin = weekIndex * MAX_COLS
      const end = begin + MAX_COLS
      const weekSchedules = schedules[status].slice(begin, end)

      if (!IS_FULL) {
        return weekSchedules
      }

      if (status === NOW && weekIndex === 0) {
        const prevDate = this._getDateByMonth(PREV)
        const pwIndex =
          this.MAX_ROWS(prevDate.getFullYear(), prevDate.getMonth()) - 1 // 이전달의 총 주차 구할것!!
        const pwSchedules = this.getWeekSchedules(pwIndex, PREV)
        const startDay = this._getStartDay(year, month)
        return [
          ...pwSchedules.slice(0, startDay),
          ...weekSchedules.slice(startDay)
        ]
      }

      if (status === NOW && weekIndex === this.MAX_ROWS(year, month) - 1) {
        const lastDay = this._getLastDay(year, month) + 1
        const nextWekkSchedules = this.getWeekSchedules(0, NEXT)
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
      const { MAX_COLS } = this
      return Array.apply(
        null,
        Array(this.MAX_ROWS(oDate.getFullYear(), oDate.getMonth()) * MAX_COLS)
      ).map((empty, index) => {
        return {
          index,
          status,
          ...this._getColumnDate(oDateOtion, index)
        }
      })
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
      if (this.START_DAY_TYPE === 'MONDAY') {
        startDay = startDay === SUNDAY ? 6 : startDay - 1
      }
      return startDay
    },
    _getLastDay(year, month) {
      const SUNDAY = 0
      const date = this.DAY_PER_MONTHS[month]
      let lastDay = new Date(year, month, date).getDay()
      if (this.START_DAY_TYPE === 'MONDAY') {
        lastDay = lastDay === SUNDAY ? 6 : lastDay - 1
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
<style scoped>
.contents {
  width: 1050px;
}
.week {
  display: flex;
  height: 100px;
}
.week.header {
  text-align: center;
  background: lightblue;
  height: auto;
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
.health {
  background: #ff4000;
}
.boxing {
  background: #04b431;
}
.c-right {
  text-align: right;
}
</style>
