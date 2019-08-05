<template>
  <div>
    <schedule-layer
      v-if="isShow"
      :o-cell-date="oCellDate"
      @hideLayer="isShow=false" />
    <div class="week week_head">
      <div
        v-for="(day, index) in DAYS.START_SUNDAY"
        :key="index"
        class="cell_head">
        <span>{{ day }}</span>
      </div>
    </div>
    <div
      v-for="(row, rowIndex) in calendar.MAX_ROW"
      :key="rowIndex"
      class="week">
      <div
        v-for="({ index, oCellDate }, cellIndex) in getWeekSchedule(rowIndex)"
        :key="cellIndex"
        :class="oCellDate.date === calendar.todayDate && 'today'"
        class="cell"
        @click="registSchedule(oCellDate)">
        <div v-show="oCellDate.isShow">
          <span>{{ oCellDate.date }}</span>
          <span
            v-for="template in oCellDate.aTemplate"
            :key="template._id">
            <a
              href="#"
              class="category_button">
              {{ template.category }}
            </a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CONTANT from '@/common/constant'
import ScheduleLayer from '@/components/layer/ScheduleLayer.vue'

export default {
  name: 'Calendar',
  components: { ScheduleLayer },
  data() {
    return {
      DAYS: CONTANT.DAYS,
      isShow: false,
      oCellDate: null
    }
  },
  computed: mapState(['calendar', 'aSchedule', 'aTemplate']),
  methods: {
    getWeekSchedule(rowIndex) {
      const begin = rowIndex * this.calendar.MAX_CELL
      const end = begin + this.calendar.MAX_CELL
      return this.aSchedule.slice(begin, end)
    },

    registSchedule(oCellDate) {
      if (!oCellDate.isShow) {
        return
      }
      this.isShow = true
      this.oCellDate = oCellDate
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
.cell:hover {
  border: 4px solid black;
  padding: 7px;
}
</style>
