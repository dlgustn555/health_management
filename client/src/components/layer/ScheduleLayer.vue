<template>
  <div class="layer">
    <div class="dimmd" />
    <div class="content">
      <div class="field date">
        <span>{{ schedule.year }}. {{ schedule.month + 1 }}. {{ schedule.date }}. {{ DAYS[selectedDay].name }}요일.</span>
        <a
          href="#"
          class="category_button fill"
          @click.prevent.stop>
          {{ template.tag }}
        </a>
      </div>
      <!-- 
      <div class="field program_part">
        <h3>
          <span>♣</span>
          <span class="program_order">{{ schedule.order }} 일차</span>
          -
          <select>
            <option
              v-for="{ order, part } in template.programs"
              :key="order"
              :selected="order === schedule.order"
              :value="order">
              {{ part }}
            </option>
          </select>
          <span>♣</span>
          <span class="weigth">
            <a
              :class="{ fill: isShowWeight }"
              href="#"
              class="category_button"
              @click="isShowWeight = !isShowWeight"
            >보이기</a>
            몸무게 :
            <span v-show="isShowWeight">
              <input type="text"> Kg
            </span>
          </span>
        </h3>
      </div>
      <div class="course_list">
        <div
          v-for="(course, courseIndex) in program.course"
          :key="`course_${courseIndex}`">
          <h4>
            <span class="course_no">No{{ courseIndex + 1 }}</span> {{ course.name }}
            <span v-show="false">{{ schedule.aCourse[courseIndex].name = course.name }}</span>
          </h4>
          <ul>
            <li
              v-for="(set, setIndex) in course.set"
              :key="`set_${setIndex}`">
              <label>{{ setIndex + 1 }} Set</label>
              -
              <input
                v-model="schedule.aCourse[courseIndex].aSet[setIndex].weigth"
                type="text"
                class="unit_value">
              {{ course.unit }}
              <img
                src="@/assets/images/x.png"
                class="x_icon">
              <input
                v-model="schedule.aCourse[courseIndex].aSet[setIndex].repeat"
                type="number"
                min="1"
                class="repeat"> 회
              <img
                src="@/assets/images/delete.png"
                class="delete">
            </li>
            <li>
              <label />
              <span
                class="course_plush"
                title="추가">
                <img src="@/assets/images/plus.png">
              </span>
            </li>
            <li>
              <label>컨디션</label>
              :
              <textarea
                v-model="schedule.aCourse[courseIndex].condition"
                rows="3" />
            </li>
          </ul>
        </div>
      </div>
      <div class="field_button">
        <button @click="registSchedule">등록</button>
        <button @click="closeLayer">닫기</button>
      </div>
      -->
    </div>
  </div>
</template>

<script>
import CONSTANT from '@/common/constant'
import L from '@/common/lazy'

export default {
  name: 'ScheduleLayer',
  props: {
    schedule: Object
  },
  data() {
    return {
      DAYS: CONSTANT.DAYS.START_SUNDAY,
      isShowWeight: true
    }
  },
  computed: {
    program() {
      const [program] = L.take(
        1,
        L.filter(
          ({ order }) => order === this.schedule.order,
          this.template.programs
        )
      )
      return program
    }
  },
  methods: {
    async registSchedule() {
      const { success, data } = await this.$store.dispatch(
        CONSTANT.REGIST_SCHEDULE,
        this.schedule
      )
      const message = success
        ? '등록되었습니다.'
        : `등록에 실패 했습니다.\n${data.error.message}`
      alert(message)
      this.closeLayer()
    },
    closeLayer() {
      this.$emit('hideLayer')
    }
  }
}
</script>

<style lang="css" scoped>
.program_part {
  height: 35px;
}
.weigth {
  font-size: 15px;
  float:right;
  margin-right: 20px;
}
.weigth input {
  width: 65px;
  text-align: right;
}
.weigth a.category_button {
  font-size: 10px;
  height:5px;
  border: 1px solid #ff5675;
}
.weigth .category_button.fill {
  background: #ff5675;
}
.course_no {
  font-size: 10px;
}
.course_plush {
  text-align: center;
  display: inline-block;
  margin-left: 12px;
  width: 225px;
}
.course_plush:hover {
  cursor: pointer;
  background-color: rgba(115, 84, 201, 0.3);
}
.course_plush img {
  margin-top: 3px;
  width: 23px;
  height: 23px;
}
input {
  padding-right: 10px;
}
input.unit_value {
  width: 80px;
  text-align: right;
}
input.repeat {
  width: 50px;
  text-align: right;
}
.content {
  min-width: 800px;
  max-width: 800px;
  height: 950px;
}
.date {
  text-align: right;
}
.date span {
  font-weight: bold;
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
.program_part {
  margin-bottom: 30px;
}
.program_part select {
  padding: 0px 20px;
  font-size: 20px;
  font-weight: bold;
}
.course_list {
  min-height: 500px;
  max-height: 600px;
  padding-bottom: 200px;
  overflow: scroll;
}
.course_list > div {
  margin-bottom: 35px;
}
.course_list h4 {
  border-radius: 10px;
  padding: 5px 10px;
  background: rgba(160, 82, 45, 0.5);
  margin-bottom: 10px;
  margin-right: 20px;
}
.course_list li {
  margin-bottom: 5px;
}
.course_list li label {
  display: inline-block;
  width: 200px;
  text-align: right;
}
.course_list li textarea {
  width: 60%;
  padding: 5px;
}
img.x_icon {
  width: 10px;
  height: 10px;
}
img.delete {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
