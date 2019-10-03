<template>
  <div class="week week_head">
    <div
      v-for="({ name }, index) in DAYS.START_SUNDAY"
      :key="index"
      class="cell_head">
      <span>{{ name }}</span>
    </div>
  </div>
</template>

<script>
import CONTANT from '@/common/constant'

export default {
  name: 'WeekHead',
  data() {
    return {
      DAYS: CONTANT.DAYS
    }
  }
}
</script>
<style lang="css" scoped>
.week {
  display: flex;
  height: 140px;
}
.week.week_head {
  height: 60px;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
}
.cell_head {
  background: cornflowerblue;
  border: 1px solid black;
  padding: 10px;
  flex: 1;
  min-width: 200px;
  opacity: 0.8;
  filter: alpha(opacity=0.8);
}
</style>
