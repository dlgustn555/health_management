<template>
  <div>
    <schedule-layer
      v-if="isShow"
      :schedule="schedule"
      :selected-day="selectedDay"
      :template="template"
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
            v-for="{ _id, tag } in onTags"
            :key="_id"
            :class="{ opacity_6: oCellDate.isBiggerThanToDay }"
            class="field">
            <a
              v-if="oCellDate.aSchedule[_id] && oCellDate.aSchedule[_id].isShowTag"
              :class="{ dotted: oCellDate.aSchedule[_id].isDotted, fill: oCellDate.aSchedule[_id].isFill }"
              href="#"
              class="category_button"
              @click="showScheduleLayer(oCellDate, _id)">
              {{ tag }} {{ oCellDate.aSchedule[_id].part !== '' ? `- ${oCellDate.aSchedule[_id].part}` : '' }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import { createSchedule } from '@/common'
import L from '@/common/lazy'
import CONTANT from '@/common/constant'
import ScheduleLayer from '@/components/layer/ScheduleLayer.vue'

export default {
  name: 'Calendar',
  components: { ScheduleLayer },
  data() {
    return {
      DAYS: CONTANT.DAYS,
      isShow: false,
      schedule: null,
      template: null,
      selectedDay: 0
    }
  },
  computed: {
    ...mapState(['oToDay', 'aCalendarDate', 'aTag', 'aTemplate', 'userId']),
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

    showScheduleLayer(oCellDate, tagId) {
      const { isFill, schedule, part } = oCellDate.aSchedule[tagId]
      const [template] = L.take(
        1,
        L.filter(({ _id }) => _id === tagId, this.aTemplate)
      )
      this.isShow = true
      this.selectedDay = oCellDate.day
      this.template = template

      if (isFill) {
        this.schedule = cloneDeep(schedule)
        return
      }
      const [{ course, order }] = L.take(
        1,
        L.filter(program => program.part === part, template.programs)
      )

      this.schedule = {
        ...createSchedule(course),
        userId: this.userId,
        templateId: tagId,
        order,
        part,
        year: this.oToDay.year,
        month: this.oToDay.month,
        date: oCellDate.date,
        cellIndex: oCellDate.cellIndex
      }
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
