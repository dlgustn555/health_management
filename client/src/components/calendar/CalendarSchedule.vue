<template>
  <div>
    <schedule-layer
      v-if="isScheduleLayer"
      :schedule="schedule"
      @hideLayer="isScheduleLayer=false" />
    <week-head />
    <div
      v-for="(row, rowIndex) in oToDay.MAX_ROW"
      :key="rowIndex"
      class="week">
      <div
        v-for="{ cellIndex, date, isShow, aSchedule } in getWeekSchedule(rowIndex)"
        :key="cellIndex"
        :class="cellDateClass(date)" >

        <calendar-cell-date
          v-if="isShow"
          :date="date"
          :a-schedule="aSchedule"
          @showScheduleLayer="showScheduleLayer" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import { createSchedule } from '@/common'
import ScheduleLayer from '@/components/layer/ScheduleLayer.vue'
import CalendarCellDate from './CalendarCellDate.vue'
import WeekHead from './WeekHead'

export default {
  name: 'Calendar',
  components: { WeekHead, ScheduleLayer, CalendarCellDate },
  data() {
    return {
      schedule: null,
      isScheduleLayer: false
    }
  },
  computed: mapState(['oToDay', 'aCalendarDate']),
  methods: {
    showScheduleLayer(schedule) {
      this.isScheduleLayer = true
      this.schedule = schedule
    },
    cellDateClass(date) {
      return date === this.oToDay.todayDate ? 'today cell' : 'cell'
    },
    getWeekSchedule(rowIndex) {
      const begin = rowIndex * this.oToDay.MAX_CELL
      const end = begin + this.oToDay.MAX_CELL
      return this.aCalendarDate.slice(begin, end)
    }
  }
}
</script>

<style lang="css" scoped>
.week {
  display: flex;
  height: 140px;
}
.week.week_head {
  height: 60px;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
}
.cell_head {
  background: cornflowerblue;
  border: 1px solid black;
  padding: 10px;
  flex: 1;
  min-width: 200px;
  opacity: 0.8;
  filter: alpha(opacity=0.8);
}
.cell {
  border: 1px solid black;
  padding: 10px;
  flex: 1;
  min-width: 200px;
}
.cell.today {
  border: 4px solid #a0a0ff;
  padding: 7px;
}
.cell.today .category_button:hover {
  background: #3ac1a4;
}
.cell:hover {
  border: 4px solid black;
  padding: 7px;
}
</style>
