<template>
  <div>
    <schedule-template-layer
      v-show="isShow"
      :template-type="templateType"
      @hideLayer="isShow=false" />
    <div>
      <button @click="showRegistScheduleTemplateLayer">
        템플릿 추가+
      </button>
      <ul class="template-list">
        <li
          v-for="template in aTemplate"
          :key="template._id">
          <a
            href="#"
            title="수정"
            @click.prevent="showEditScheduleTemplateLayer(template._id)">
            {{ template.category }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import API from '@/common/api'
import CONSTANT from '@/common/constant'
import L from '@/common/lazy'
import ScheduleTemplateLayer from '@/components/layer/ScheduleTemplateLayer.vue'

export default {
  name: 'CategorySelector',
  components: { ScheduleTemplateLayer },
  data() {
    return {
      isShow: false,
      templateType: 'new'
    }
  },
  computed: {
    ...mapState(['userId', 'aTemplate'])
  },
  async created() {
    this.$store.dispatch(CONSTANT.GET_CATEGORY_LIST)
  },
  methods: {
    showEditScheduleTemplateLayer(templateId) {
      const [template] = L.take(
        1,
        L.filter(template => template._id === templateId, this.aTemplate)
      )
      this.$store.commit(CONSTANT.UPDATE_TEMPLATE, template)
      this.isShow = true
      this.templateType = 'edit'
    },
    showRegistScheduleTemplateLayer() {
      this.$store.commit(CONSTANT.INIT_PROGRAM, CONSTANT.DEFAULT_TEMPLATE_COUNT)
      this.isShow = true
      this.templateType = 'new'
    }
  }
}
</script>

<style lang="css" scoped>
ul.template-list {
  list-style:none;
  margin:0;
  padding:0;
  float: right;
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
