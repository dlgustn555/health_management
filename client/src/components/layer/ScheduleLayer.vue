<template>
  <div class="layer">
    <div class="dimmd" />
    <div class="content">
      <div class="field">
        <span class="date">{{ oToDay.year }}. {{ oToDay.month + 1 }}. {{ oCellDate.date }}. {{ DAYS[oCellDate.day].name }}요일.</span>
        <a
          href="#"
          class="category_button fill"
          @click.prevent.stop>
          {{ schedule.category }}
        </a>
        <div class="field">
          <h3>♣ {{ program.order }}일차 - {{ program.part }} ♣</h3>
        </div>
      </div>
      <div class="programs">
        <div
          v-for="({ name, set, unit }, index) in program.templates"
          :key="`template_${index}`"
          class="field">
          <label>{{ name }}</label>
          <ul>
            <li
              v-for="s in set"
              :key="`template_${index}_set_${s}`">
              <label>{{ s }} Set</label>
              :
              <input type="text">
              <label>{{ unit }}</label>
              <img
                class="mult_img"
                src="@/assets/images/x.png">
              <input type="number">
              <label>회</label>
            </li>
            <li>
              <textarea rows="4" />
            </li>
          </ul>
        </div>
      </div>
      <div class="field_button">
        <button>등록</button>
        <button @click="$emit('hideLayer')">닫기</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import L from '@/common/lazy'
import CONSTANT from '@/common/constant'

export default {
  name: 'ScheduleLayer',
  props: {
    oCellDate: {
      type: Object,
      default: null
    },
    schedule: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      DAYS: CONSTANT.DAYS.START_SUNDAY
    }
  },
  computed: {
    ...mapState(['oToDay', 'aTemplate']),
    program() {
      const { templateId, order } = this.schedule
      const [program] = L.take(
        1,
        L.filter(
          program => program.order === order,
          ...L.map(
            ({ programs }) => programs,
            L.filter(template => template._id === templateId, this.aTemplate)
          )
        )
      )
      return program
    }
  }
}
</script>

<style lang="css" scoped>
.content {
  min-width: 800px;
  max-width: 800px;
  max-height: 950px;
}
.programs {
  overflow: scroll;
  max-height: 700px;
}
.date {
  font-weight: bold;
}
.mult_img {
  width: 18px;
  height: 18px;
}
.field ul {
  width: 100%;
}
.field ul li {
  display: inline-block;
  margin-top: 5px;
  padding-left: 50px;
}
.field ul li input {
  text-align: right;
  padding-right: 10px;
}
.field ul li textarea {
  width: 500px;
  padding: 10px;
}
</style>
