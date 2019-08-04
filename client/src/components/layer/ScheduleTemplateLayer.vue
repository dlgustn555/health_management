<template>
  <div class="layer">
    <div class="dimmd" />
    <div class="content">
      <div class="field">
        <label><span>●</span> 운동타입</label>
        :
        <input
          v-model="template.category"
          placeholder=" 웨이트 / 헬스 / 요가 / 복싱"
          type="text"
          @input="inputCategoryField">
      </div>
      <div class="field">
        <span class="day_checkbox">
          <input
            id="day_checkbox_all"
            v-model="isAll"
            type="checkbox"
            @click="toggleDays">
          <label
            for="day_checkbox_all">ALL</label>
        </span>
        <span
          v-for="(day, index) in DAY_OF_WEEK"
          :key="`day_${index}`"
          class="day_checkbox">
          <input
            :id="`day_checkbox_${index}`"
            v-model="days"
            :value="day"
            type="checkbox">
          <label
            :for="`day_checkbox_${index}`">{{ day }}</label>
        </span>
      </div>
      <div class="field">
        <span>●</span> 총
        <select
          v-model="programCnt"
          @change="changeProgramCount"
        >
          <option
            v-for="count in 10"
            :key="`program_${count}`"
            :value="count">
            {{ count }}
          </option>
        </select> 개 프로그램
        :
        <span
          v-for="{ order, part } in template.programs"
          :key="order">
          {{ `${order === 1 ? '' : ', '}${part === '' ? '__' : part}` }}
        </span>
      </div>
      <div
        v-swiper:createScheduleTemplateSwiper="swiperOption"
        class="createScheduleTemplateSwiper field">
        <div class="swiper-wrapper">
          <schedule-template-form
            v-for="(program, index) in template.programs"
            ref="scheduleTemplateForm"
            :key="`programForm_${index}`"
            :program="program"
            class="swiper-slide"
          />
        </div>
        <div class="swiper-pagination" />
      </div>
      <div class="field_button">
        <button @click="registTemplate">등록</button>
        <button @click="closeLayer">닫기</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import CONSTANT from '@/common/constant'
import ScheduleTemplateForm from '@/components/form/ScheduleTemplateForm.vue'

export default {
  name: 'ScheduleTemplateLayer',
  components: { ScheduleTemplateForm },
  data() {
    return {
      isAll: false,
      DAY_OF_WEEK: CONSTANT.DAY_OF_WEEK,
      days: [],
      programCnt: 1,
      swiperOption: {
        spaceBetween: 7,
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  computed: mapGetters({
    template: 'cloneTemplate'
  }),
  watch: {
    days(newValue) {
      this.isAll = newValue.length === 7
      this.template.days = this.days
      this.$store.commit(CONSTANT.UPDATE_TEMPLATE, this.template)
    }
  },
  methods: {
    changeProgramCount() {
      const beforeCount = this.template.programs.length
      const actionType =
        this.programCnt > beforeCount ? this.addProgram : this.deleteProgram
      actionType(this.programCnt - beforeCount)
    },

    inputCategoryField({ target }) {
      this.template.category = target.value
      this.$store.commit(CONSTANT.UPDATE_TEMPLATE, this.template)
    },

    addProgram(count) {
      this.$store.commit(CONSTANT.ADD_PROGRAM, count)
    },

    toggleDays() {
      const isCheckAll = !this.isAll
      this.days = isCheckAll ? [...CONSTANT.DAY_OF_WEEK] : []
    },

    async registTemplate() {
      const { data, success } = await this.$store.dispatch(
        CONSTANT.REGIST_TEMPLATE
      )
      const message = success
        ? '등록되었습니다.'
        : `등록에 실패했습니다.\n${data.error.message}`
      alert(message)
      this.closeLayer()
    },

    closeLayer() {
      this.programCnt = 1
      this.$store.commit(CONSTANT.INIT_PROGRAM, 1)
      this.$emit('hideLayer')
    }
  }
}
</script>

<style scoped>
input {
  width: 50%;
}
.createScheduleTemplateSwiper {
  width: 100%;
}
.day_checkbox {
  margin-right: 10px;
}
.day_checkbox input {
  width: 18px;
  height: 18px;
}
.field_button {
  padding-top: 30px;
}
</style>
