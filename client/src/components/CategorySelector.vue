<template>
  <div>
    <schedule-template-layer
      v-show="isShow"
      @hideLayer="isShow=false" />
    <div>
      <ul>
        <li
          v-for="category in aCategory"
          :key="category._id">
          {{ category.category }}
        </li>
      </ul>
      <button @click="showScheduleTemplateLayer">
        신규 템플릿+
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
ul {
  border: 1px solid black;
  display: inline;
}
button {
  float: right;
}
</style>
