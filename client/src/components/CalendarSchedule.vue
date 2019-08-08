<template>
  <div>
    <schedule-layer
      v-if="isShow"
      :o-cell-date="oCellDate"
      :schedule="schedule"
      @hideLayer="isShow=false" />
    <div class="week week_head">
      <div
        v-for="({ name }, index) in DAYS.START_SUNDAY"
        :key="index"
        class="cell_head">
        <span>{{ name }}</span>
      </div>
    </div>
    <div
      v-for="(row, rowIndex) in oToDay.MAX_ROW"
      :key="rowIndex"
      class="week">
      <div
        v-for="(oCellDate, cellIndex) in getWeekSchedule(rowIndex)"
        :key="cellIndex"
        :class="oCellDate.date === oToDay.todayDate && 'today'"
        class="cell">
        <div v-if="oCellDate.isShow">
          <span>{{ oCellDate.date }}</span>
          <div
            v-for="onTag in onTags"
            :key="onTag._id"
            :class="{ opacity_6: oCellDate.isBiggerThanToDay }"
            class="field">
            <a
              v-if="oCellDate.aSchedule[onTag._id] && oCellDate.aSchedule[onTag._id].isShowTag"
              :class="{ dotted: oCellDate.aSchedule[onTag._id].isDotted, fill: oCellDate.aSchedule[onTag._id].isFill }"
              href="#"
              class="category_button">
              {{ onTag.tag }} {{ oCellDate.aSchedule[onTag._id].part !== '' ? `- ${oCellDate.aSchedule[onTag._id].part}` : '' }}
            </a>
          </div>
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
      oCellDate: null,
      schedule: null
    }
  },
  computed: {
    ...mapState(['oToDay', 'aCalendarDate', 'aTag']),
    onTags() {
      return this.aTag.filter(tag => tag.isOn)
    }
  },
  methods: {
    getWeekSchedule(rowIndex) {
      const begin = rowIndex * this.oToDay.MAX_CELL
      const end = begin + this.oToDay.MAX_CELL
      return this.aCalendarDate.slice(begin, end)
    },

    registSchedule(oCellDate) {
      if (!oCellDate.isShow || oCellDate.date > this.oToDay.todayDate) {
        return
      }
      this.isShow = true
      this.oCellDate = oCellDate
    },

    registScheduleFromCategory(oCellDate, schedule = null) {
      if (!oCellDate.isShow) {
        return
      }
      this.isShow = true
      this.oCellDate = oCellDate
      this.schedule = schedule
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
