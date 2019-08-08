<template>
  <div class="template-form">
    <div class="field">
      <label>
        <span>♣</span>
        {{ program.order }} 일차 프로그램
        <span>♣</span>
      </label>
    </div>
    <div class="field">
      <input
        v-model="program.part"
        placeholder="가슴 / 등 / 하체"
        type="text"
        class="part_input"
        @input="inputPartFiled">
      <button @click="deleteProgram(program.order)">삭제</button>
    </div>
    <div class="course_list">
      <div
        v-for="(course, courseIndex) in program.course"
        :key="`template_${courseIndex}`"
        :class="`template_field ${courseIndex % 2 ? 'even' : 'odd'}`">
        <input
          v-model="course.name"
          placeholder="벤치 프레스"
          type="text"
          @input="inputTemplateFiled('name', courseIndex, $event)">
        :
        <span>총</span>
        <input
          v-model="course.set"
          type="number"
          min="1"
          class="set_input"
          @input="inputTemplateFiled('set', courseIndex, $event)"
        >
        <span>Set</span>
        <select
          v-model="course.unit"
          @change="inputTemplateFiled('unit', courseIndex, $event)">
          <option
            v-for="(unit, unitIndex) in UNIT"
            :key="`unit_${unitIndex}`"
            :value="unit">
            {{ unit }}
          </option>
        </select>
        <button @click="deleteCourse(courseIndex)">X</button>
      </div>
    </div>
    <div
      class="template_field add_course"
      @click="addCourse">
      + 추가
    </div>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import CONSTANT from '@/common/constant'

export default {
  name: 'TemplateWriteForm',
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
    },

    inputTemplateFiled(property, index, { target }) {
      this.program.course[index][property] =
        property === 'set' ? parseInt(target.value || 0, 10) : target.value
    },

    deleteProgram(programIndex) {
      if (confirm(`${programIndex}일차 프로그램을 삭제하시겠습니까?`)) {
        this.$emit('deleteProgram', programIndex)
      }
    },

    deleteCourse(index) {
      this.program.course.splice(index, 1)
    },

    addCourse() {
      this.program.course.push(cloneDeep(CONSTANT.COURSE))
    }
  }
}
</script>

<style scoped>
.template-form .course_list {
  max-height: 500px;
  overflow: scroll;
}
.template_field {
  padding: 10px 5px;
}
.template_field.odd {
  background-color: rgba(162, 233, 255, 0.3);
}
.template_field.even {
  background-color: rgba(162, 201, 255, 0.3);
}
.add_course:hover {
  cursor: pointer;
  background-color: rgba(115, 84, 201, 0.3);
}
.part_input {
  width: 300px;
}
.set_input {
  width: 60px;
  text-align: right;
  padding-right: 5px;
}
</style>
