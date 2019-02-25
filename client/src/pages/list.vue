<template>
  <ScheduleCalendar />
</template>

<script>
import ScheduleCalendar from '~/components/ScheduleCalendar.vue'

export default {
  layout({ isMobile }) {
    return isMobile ? 'default' : 'default'
  },
  components: {
    ScheduleCalendar
  },
  data() {
    return {}
  }
}
</script>

<style>
</style>
