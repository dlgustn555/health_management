<template>
  <b-modal
    id="createScheduleTemplate"
    title="※ 템플릿 등록하기 ※"
    ok-only
    ok-title="등록"
    no-close-on-backdrop
    size="lg">
    <label for="type">♣운동타입♣ 을 등록하세요.</label>
    <b-form-input
      id="type"
      v-model="type"
      type="text"
      placeholder="(ex) 헬스/복싱/요가/유산소.." />

    <b-form-group label="♣운동요일♣ 을 등록하세요.">
      <b-form-checkbox-group
        v-model="days"
        :options="DAY_OF_WEEK" />
    </b-form-group>

    <b-form-select
      v-model="once"
      :options="ONCE_OF_WEEK" />

    <div
      v-swiper:createScheduleTemplateSwiper="swiperOption"
      class="createScheduleTemplateSwiper">
      <div class="swiper-wrapper">
        <div
          v-for="(template, index) in once"
          :key="index"
          class="swiper-slide">{{ index + 1 }}</div>
      </div>
      <div class="swiper-pagination" />
    </div>
  </b-modal>
</template>
<script>
export default {
  name: 'CreateScheduleTemplateModal',
  data() {
    return {
      DAY_OF_WEEK: [
        { text: '월요일', value: '월' },
        { text: '화요일', value: '화' },
        { text: '수요일', value: '수' },
        { text: '목요일', value: '목' },
        { text: '금요일', value: '금' },
        { text: '토요일', value: '토' },
        { text: '일요일', value: '일' }
      ],
      ONCE_OF_WEEK: [
        { text: '1일차', value: 1 },
        { text: '2일차', value: 2 },
        { text: '3일차', value: 3 },
        { text: '4일차', value: 4 },
        { text: '5일차', value: 5 },
        { text: '6일차', value: 6 },
        { text: '7일차', value: 7 }
      ],
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
  methods: {
    toggleDayofWeek(checked) {
      this.days = checked ? ['월', '화', '수', '목', '금', '토', '일'] : []
    }
  }
}
</script>
<style scoped>
.createScheduleTemplateSwiper {
  width: 100%;
  height: 300px;
}
</style>
