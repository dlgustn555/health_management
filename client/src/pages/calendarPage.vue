<template>
  <div>
    <ScheduleCalendar />
    <div>
      <h1>Vuex Test</h1>
      <p>{{ name }}</p>
      <p>{{ getName }}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ScheduleCalendar from '~/components/ScheduleCalendar.vue'

export default {
  layout({ isMobile }) {
    return isMobile ? 'default' : 'default'
  },
  components: { ScheduleCalendar },
  data() {
    return {}
  },
  computed: {
    ...mapState(['name']),
    ...mapGetters(['getName'])
  },
  mounted() {
    setTimeout(() => {
      this.$store.dispatch('TEST')
    }, 1000 * 10)
  }
}
</script>

<style>
</style>
