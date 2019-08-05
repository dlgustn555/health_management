<template>
  <div class="layer">
    <div class="dimmd" />
    <div class="content">
      <div class="field">
        <h3>{{ calendar.year }}. {{ calendar.month + 1 }}. {{ oCellDate.date }}. {{ DAYS[oCellDate.day] }}요일.</h3>
      </div>
      <div>
        <button>등록</button>
        <button @click="$emit('hideLayer')">닫기</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CONSTANT from '@/common/constant'

export default {
  name: 'ScheduleLayer',
  props: {
    oCellDate: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      DAYS: CONSTANT.DAYS.START_SUNDAY
    }
  },
  computed: mapState(['calendar'])
}
</script>

<style lang="css" scoped>
</style>
