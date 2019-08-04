<template>
  <div>
    <schedule-template-layer
      v-show="isShow"
      @hideLayer="isShow=false" />
    <div>
      <ul class="template-list">
        <li
          v-for="category in aCategory"
          :key="category._id">
          {{ category.category }}
        </li>
      </ul>
      <button @click="showScheduleTemplateLayer">
        템플릿 추가+
      </button>
      
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import API from '@/common/api'
import CONSTANT from '@/common/constant'
import ScheduleTemplateLayer from '@/components/layer/ScheduleTemplateLayer.vue'

export default {
  name: 'CategorySelector',
  components: { ScheduleTemplateLayer },
  data() {
    return {
      isShow: false,
      aCategory: []
    }
  },
  computed: {
    ...mapState(['userId'])
  },
  async created() {
    const { data } = await this.$axios.get(API.GET_CATEGORY_LIST(this.userId))
    this.aCategory = data.success ? data.data.aResult : []
  },
  methods: {
    showScheduleTemplateLayer() {
      this.$store.commit(CONSTANT.INIT_PROGRAM, CONSTANT.DEFAULT_TEMPLATE_COUNT)
      this.isShow = true
    }
  }
}
</script>

<style lang="css" scoped>
ul.template-list {
  list-style:none;
  margin:0;
  padding:0;
  float: left;
}
.template-list li {
  display: inline-block;
  padding: 0px 5px;
  margin: 0px 3px;
}
button {
  float: right;
}
</style>
