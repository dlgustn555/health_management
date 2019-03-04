<template>
  <b-modal
    id="createScheduleTemplate"
    title="※ 템플릿 등록하기 ※"
    ok-only
    ok-title="등록"
    no-close-on-backdrop
    size="lg"
    @hide="initScheduleTemplate">
    
    <label for="type">♣운동타입♣ 을 등록하세요.</label>
    <b-form-input
      id="type"
      v-model="type"
      type="text"
      placeholder="(ex) 헬스/복싱/요가/유산소.." />

    <b-form-group label="♣운동요일♣ 을 등록하세요.">
      <b-form-checkbox-group v-model="days">
        <b-form-checkbox
          v-for="day in DAY_OF_WEEK"
          :key="day"
          :value="day">{{ day }}요일</b-form-checkbox>
      </b-form-checkbox-group>
    </b-form-group>

    <b-form-select v-model="once">
      <option
        v-for="count in 7"
        :key="count"
        :value="count">{{ count }}일차</option>
    </b-form-select>
    <div
      v-swiper:createScheduleTemplateSwiper="swiperOption"
      class="createScheduleTemplateSwiper">
      <div class="swiper-wrapper">
        <ScheduleTemplateForm
          v-for="(template, index) in once"
          ref="scheduleTemplateForm"
          :key="index"
          :once="index + 1"
          class="swiper-slide" />
      </div>
      <div class="swiper-pagination" />
    </div>
  </b-modal>
</template>
<script>
import ScheduleTemplateForm from '~/components/form/ScheduleTemplateForm.vue'

export default {
  name: 'CreateScheduleTemplateModal',
  components: { ScheduleTemplateForm },
  data() {
    return {
      DAY_OF_WEEK: ['월', '화', '수', '목', '금', '토', '일'],
      templates: [],
      type: '',
      days: [],
      once: 1,
      swiperOption: {
        spaceBetween: 7,
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  watch: {
    days() {
      const result = this.days.length - this.templates.length
      if (result > 0) {
      }
    }
  },
  created() {
    this.templates.push({})
  },
  destroyed() {
    console.log('CALL!!')
  },
  methods: {
    toggleDayofWeek(checked) {
      this.days = checked ? [...this.DAY_OF_WEEK] : []
    },
    initScheduleTemplate() {
      this.type = ''
      this.days = []
      this.once = 1
      const scheduleTemplateForm = this.$refs.scheduleTemplateForm[0]
      scheduleTemplateForm.initTemplateForm()
    }
  }
}
</script>
<style scoped>
.createScheduleTemplateSwiper {
  width: 100%;
}
</style>
