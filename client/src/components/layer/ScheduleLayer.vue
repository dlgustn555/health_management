<template>
  <div class="layer">
    <div class="dimmd" />
    <div class="content">
      <div class="field">
        <h5>{{ oToDay.year }}. {{ oToDay.month + 1 }}. {{ oCellDate.date }}. {{ DAYS[oCellDate.day].name }}요일.</h5>
        <div class="field">
          <h3>♣ 프로그램 1일차 - 가슴 ♣</h3>
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
  computed: mapState(['oToDay'])
}
</script>

<style lang="css" scoped>
.content {
  min-width: 800px;
  max-width: 800px;
}
</style>
