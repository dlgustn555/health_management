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
  name: 'CalendarPage',
  layout({ isMobile }) {
    return isMobile ? 'default' : 'default'
  },
  components: {
    CalendarDateSelector,
    CategorySelector,
    CalendarSchedule
  },
  async fetch({ store }) {
    store.commit(CONSTANT.SET_LOGIN_INFO, { login: true, userId: 'dlgustn555' })
    store.commit(CONSTANT.SET_TODAY)
    await store.dispatch(CONSTANT.GET_TEMPLATE_LIST)
    await store.dispatch(CONSTANT.SET_SCHEDULE_OF_CALENDAR)
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
  min-width: 1450px;
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
.field_button {
  padding-top: 30px;
}
.category_button {
  margin: 0px 2px;
  text-decoration: none;
  padding: 3px 7px;
  border-radius: 20px;
  color: black;
  font-weight: bold;
  border: 1px solid #3ac1a4;
}
.category_button.fill {
  background: #3ac1a4;
}
.category_button.dotted {
  border: 1px dotted #3ac1a4;
}

.category_button.dotted:hover {
  border: 2px solid #3ac1a4;
  padding: 2px 6px;
}

.category_button:hover {
  cursor: pointer;
}
.opacity_6 {
  opacity: 0.6;
  filter: alpha(opacity=0.6);
}
input {
  padding-left: 10px;
}
select {
  padding: 5px;
}
input,
select {
  height: 30px;
}
</style>
