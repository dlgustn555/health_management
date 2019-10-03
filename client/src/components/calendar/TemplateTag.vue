<template>
  <div class="category-selector">
    <template-layer
      v-if="isShow"
      :template="template"
      :template-type="templateType"
      :tag-is-on="tagIsOn"
      @hideLayer="isShow=false" />
    <div>
      <button @click="showRegistTemplateLayer">
        템플릿 추가+
      </button>
      <ul class="template-list">
        <li
          v-for="tag in aTag"
          :key="tag._id">
          <a
            :class="{ fill: tag.isOn }"
            href="#"
            class="category_button"
            @click.prevent="toggleIsOne(tag)">
            {{ tag.tag }}
          </a>
          <img
            src="@/assets/images/modify.png"
            title="수정"
            @click="showEditTemplateLayer(tag)">
          <img 
            src="@/assets/images/delete.png"
            title="삭제"
            @click="deleteTemplate(tag)">
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
      templateType: 'new',
      tagIsOn: true
    }
  },
  computed: mapState(['userId', 'aTemplate', 'aTag']),
  methods: {
    showEditTemplateLayer(tag) {
      const [template] = L.take(
        1,
        L.filter(template => template._id === tag._id, this.aTemplate)
      )
      this.template = cloneDeep(template)
      this.isShow = true
      this.templateType = 'edit'
      this.tagIsOn = tag.isOn
    },

    showRegistTemplateLayer() {
      const programs = createProgram(1, 1)
      this.template = {
        tag: '',
        days: [],
        programs
      }
      this.isShow = true
      this.templateType = 'new'
    },

    async deleteTemplate(tag) {
      if (!confirm(`${tag.tag} 삭제하시겠습니까?`)) {
        return
      }
      const { success, data } = await this.$store.dispatch(
        CONSTANT.DELETE_TEMPLATE,
        tag._id
      )
      const message = success
        ? '삭제되었습니다'
        : `삭제에 실패했습니다.\n${data.error.message}`
      alert(message)
    },

    toggleIsOne(tag) {
      this.$store.commit(CONSTANT.TOGGLE_TAG_ON_OFF, tag)
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
  position: relative;
  display: inline-block;
  padding: 0px 5px;
  margin: 0px 3px;
}
.template-list li img {
  position: absolute;
  top: -12px;
  left: 5px;
  width: 15px;
  height: 15px;
  cursor: pointer;
}
.template-list li img:last-child {
  top: -12px;
  left: 22px;
  width: 15px;
  height: 15px;
}
button {
  float: right;
}
</style>
