<template>
  <div>
    {{ date }}
    <div v-for="{_id, schedule, isShowTag, buttonType, tag, part} in aSchedule" :key="_id">
      <a v-if="isShowTag" :class="buttonType" @click="showScheduleLayer(schedule)">
        {{ tag }} - {{ part }}
      </a>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'CalendarCellDate',
  props: {
    date: Number,
    aSchedule: Array
  },
  computed: {},
  methods: {
    showScheduleLayer(schedule) {
      this.$emit('showScheduleLayer', schedule)
    }
  }
}
</script>
