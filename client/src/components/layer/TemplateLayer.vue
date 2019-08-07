<template>
  <div class="layer">
    <div class="dimmd" />
    <div class="content template-lyaer">
      <div class="field">
        <label><span>●</span> 운동타입</label>
        :
        <input
          :value="template.tag"
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
            class="all"
            for="day_checkbox_all">ALL</label>
        </span>
        <span
          v-for="({ name, value }, index) in DAYS.START_SUNDAY"
          :key="`day_${index}`"
          class="day_checkbox">
          <input
            v-model="template.days"
            :id="`day_checkbox_${index}`"
            :value="value"
            type="checkbox">
          <label
            :for="`day_checkbox_${index}`">{{ name }}</label>
        </span>
      </div>
      <div class="field">
        <span>●</span> 총
        <select
          @change="changeProgramCount">
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
          {{ `${order === 1 ? '' : ', '}${part === '' ? '____' : part}` }}
        </span>
      </div>

      <div
        v-swiper:templateWriteFromSwiper="swiperOption"
        class="templateWriteFromSwiper field">
        <div class="swiper-wrapper">
          <template-write-form
            v-for="(program, index) in template.programs"
            ref="templateForm"
            :key="`programForm_${index}`"
            :program="program"
            class="swiper-slide"
          />
        </div>
      </div>
      <div class="field_button">
        <button @click="templateType ==='new' ? registTemplate() : modifyTemplate()">
          {{ templateType === 'new' ? '등록' : '수정' }}
        </button>
        <button @click="closeLayer">닫기</button>
      </div>
    </div>
  </div>
</template>

<script>
import CONSTANT from '@/common/constant'
import { createProgram } from '@/common'
import TemplateWriteForm from '@/components/form/TemplateWriteForm.vue'

export default {
  name: 'TemplateLayer',
  components: { TemplateWriteForm },
  props: {
    template: {
      type: Object,
      default: null
    },
    templateType: {
      type: String,
      default: 'new'
    }
  },
  data() {
    return {
      isAll: false,
      DAYS: CONSTANT.DAYS,
      swiperOption: {
        spaceBetween: 7,
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  watch: {
    'template.days'(newValue) {
      this.isAll = newValue.length === 7
    }
  },
  methods: {
    toggleDays() {
      this.isAll = !this.isAll
      const allDays = this.DAYS.START_SUNDAY.map(({ value }) => value)
      this.template.days = this.isAll ? allDays : []
    },

    inputCategoryField({ target }) {
      this.template.tag = target.value
    },

    changeProgramCount({ target }) {
      const newCount = target.value
      const beforeCount = this.template.programs.length
      const gap = newCount - beforeCount
      if (gap > 0) {
        const order = this.template.programs[beforeCount - 1].order + 1
        const programs = createProgram(gap, order)
        for (const program of programs) {
          this.template.programs.push(program)
        }
      } else {
        this.template.programs = this.template.programs.slice(0, gap)
      }
    },

    async registTemplate() {
      const { data, success } = await this.$store.dispatch(
        CONSTANT.REGIST_TEMPLATE,
        this.template
      )
      const message = success
        ? '등록되었습니다.'
        : `등록에 실패했습니다.\n${data.error.message}`
      alert(message)
      this.closeLayer()
    },

    async modifyTemplate() {
      const { data, success } = await this.$store.dispatch(
        CONSTANT.MODIFY_TEMPLATE,
        this.template
      )
      const message = success
        ? '수정되었습니다.'
        : `수정에 실패했습니다.\n${data.error.message}`
      alert(message)
      this.closeLayer()
    },

    closeLayer() {
      this.$emit('hideLayer')
    }
  }
}
</script>

<style scoped>
.content.template-lyaer {
  width: 810px;
  min-width: 810px;
  max-width: 810ox;
}
input {
  width: 50%;
}
select {
  padding: 5px;
}
.templateWriteFromSwiper {
  width: 100%;
}
.day_checkbox {
  margin-right: 10px;
}
.day_checkbox input {
  width: 18px;
  height: 18px;
}
.day_checkbox label {
  padding-right: 10px;
  font-size: 17px;
  font-weight: bold;
}
.day_checkbox label.all {
  padding: 0;
}
</style>
