<template>
  <div>
    <b-container fluid>
      <b-row class="m-1">
        <label for="name">{{ once }}일차</label> :
        <b-col sm="4">
          <b-form-input
            id="name"
            v-model="program"
            type="text"
            size="sm"
            placeholder="(ex) 가슴/등/어깨.." />
        </b-col>
      </b-row>
      <div style="position:relative; overflow-y:auto; height:425px; padding-bottom:20px;">
        <b-row
          v-for="(program, index) in aProgram"
          :key="index"
          class="m-2">
          <b-col sm="4">
            <b-form-input
              v-model="program.name"
              type="text"
              size="sm"
              placeholder="(ex) 벤치 프레스" />
          </b-col>
          총
          <b-col sm="2">
            <b-form-select
              v-model="program.count"
              size="sm">
              <option
                v-for="set in 10"
                :key="set"
                :value="set">{{ set }}</option>
            </b-form-select>
          </b-col>
          <b-col sm="2">
            <b-form-select
              v-model="program.unit"
              size="sm">
              <option
                v-for="unit in UNIT"
                :key="unit"
                :value="unit">{{ unit }}</option>
            </b-form-select>
          </b-col>
          <b-button
            variant="light"
            size="sm"
            @click="deleteProgram(index)">X</b-button>
        </b-row>
        <b-row class="m-1">
          <b-col sm="8">
            <b-button
              block
              variant="outline-primary"
              @click="addProgram">+ 추가하기</b-button>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>
<script>
export default {
  name: 'ScheduleTemplateForm',
  props: {
    once: {
      type: Number,
      required: true,
      default: 1
    }
  },
  data() {
    return {
      UNIT: ['Set', 'Km', 'Hour', 'Min', 'Sec'],
      DEFAULT_PROGRAM: 9,
      program: '',
      oProgram: {
        name: '',
        count: 1,
        unit: 'Set'
      },
      aProgram: [],
      set: 1
    }
  },
  created() {
    this.initTemplateForm()
  },
  methods: {
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
