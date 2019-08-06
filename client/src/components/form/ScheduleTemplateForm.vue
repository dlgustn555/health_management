<template>
  <div class="template-form">
    <div class="field">
      <label><span>♣</span> {{ program.order }} 일차 프로그램</label>
      :
      <input
        v-model="program.part"
        placeholder="가슴 / 등 / 하체"
        type="text"
        @input="inputPartFiled">
      <button>x</button>
      <span>♣</span>
    </div>
    <div
      v-for="(template, index) in program.templates"
      :key="`template_${index}`"
      :class="`template_field ${index % 2 ? 'even' : 'odd'}`">
      <input
        v-model="template.name"
        placeholder="벤치 프레스"
        type="text"
        @input="inputTemplateFiled('name', index, $event)">
      :
      <span>총</span>
      <input
        v-model="template.set"
        @input="inputTemplateFiled('set', index, $event)"
      >
      <select
        v-model="template.unit"
        @change="inputTemplateFiled('unit', index, $event)">
        <option
          v-for="(unit, index) in UNIT"
          :key="`unit_${index}`">
          {{ unit }}
        </option>
      </select>
      <button>+</button>
      <button>-</button>
      <button>X</button>
    </div>
  </div>
</template>

<script>
import CONSTANT from '@/common/constant'

export default {
  name: 'ScheduleTemplateForm',
  props: {
    program: {
      type: Object,
      required: true,
      default: null
    }
  },
  data() {
    return {
      UNIT: CONSTANT.UNIT
    }
  },
  methods: {
    inputPartFiled({ target }) {
      this.program.part = target.value
      this.$store.commit(CONSTANT.UPDATE_PROGRAM, this.program)
    },

    inputTemplateFiled(property, index, { target }) {
      this.program.templates[index][property] = target.value
      this.$store.commit(CONSTANT.UPDATE_PROGRAM, this.program)
    },

    deleteProgram(index) {
      this.aProgram.splice(index, 1)
    },

    addProgram() {
      this.aProgram.push({ ...this.oProgram })
    },

    initTemplateForm() {
      this.aProgram = []
      for (let i = 0; i < this.DEFAULT_PROGRAM; i++) {
        this.addProgram()
      }
    }
  }
}
</script>

<style scoped>
.template_field {
  padding: 10px 5px;
}
.template_field.odd {
  background-color: rgba(162, 233, 255, 0.3);
}
.template_field.even {
  background-color: rgba(162, 201, 255, 0.3);
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
