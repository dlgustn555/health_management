<template>
  <div class="content">
    <calendar-date-selector />
    <category-selector />
    <calendar-schedule />
  </div>
</template>

<script>
import CONSTANT from '@/common/constant'
import CalendarDateSelector from '@/components/CalendarDateSelector.vue'
import CategorySelector from '@/components/CategorySelector.vue'
import CalendarSchedule from '@/components/CalendarSchedule.vue'

export default {
  layout({ isMobile }) {
    return isMobile ? 'default' : 'default'
  },
  components: {
    CalendarDateSelector,
    CategorySelector,
    CalendarSchedule
  },
  fetch({ store }) {
    store.commit(CONSTANT.SET_LOGIN_INFO, { login: true, userId: 'dlgustn555' })
    store.commit(CONSTANT.SET_CALENDAR)
    store.commit(CONSTANT.SET_SCHEDULE)
  },
  data() {
    return {}
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.content {
  margin: auto;
  width: 95%;
}

div.layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  padding-top: 100px;
}
div.layer .dimmd {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: gray;
  opacity: 0.8;
  filter: alpha(opacity=0.8);
}
div.layer .content {
  position: absolute;
  left: 0;
  right: 0;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  height: auto;
  background-color: #fff;
  border: 1px solid black;
  padding: 50px;
}

.field {
  margin: 10px 0px;
}
</style>
