<template>
  <div class="category-selector">
    <template-layer
      v-if="isShow"
      :template="template"
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
            class="category_button fill"
            @click.prevent="showEditScheduleTemplateLayer(template._id)">
            {{ template.tag }}
          </a>
          <button>x</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import API from '@/common/api'
import CONSTANT from '@/common/constant'
import { createProgram } from '@/common'
import cloneDeep from 'lodash/cloneDeep'
import L from '@/common/lazy'

import TemplateLayer from '@/components/layer/TemplateLayer.vue'

export default {
  name: 'TemplateTag',
  components: { TemplateLayer },
  data() {
    return {
      isShow: false,
      template: null,
      templateType: 'new'
    }
  },
  computed: mapState(['userId', 'aTemplate']),
  methods: {
    showEditScheduleTemplateLayer(templateId) {
      const [template] = L.take(
        1,
        L.filter(template => template._id === templateId, this.aTemplate)
      )
      this.template = cloneDeep(template)
      this.isShow = true
      this.templateType = 'edit'
    },

    showRegistScheduleTemplateLayer() {
      const [program] = createProgram(1, 1)
      this.template = {
        tag: '',
        days: [],
        programs: [program]
      }
      this.isShow = true
      this.templateType = 'new'
    }
  }
}
</script>

<style lang="css" scoped>
.category-selector {
  height: auto;
  min-height: 50px;
}
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
