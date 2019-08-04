import cloneDeep from 'lodash/cloneDeep'
import CONSTANT from '@/common/constant'

export default {
  // 로그인 정보
  [CONSTANT.SET_LOGIN_INFO](state, { login, userId }) {
    state.login = login
    state.userId = userId
  },

  // 템플릿 초기화
  [CONSTANT.INIT_PROGRAM](state, limit) {
    const program = cloneDeep(CONSTANT.PROGRAM)
    for (let i = 0; i < limit; i++) {
      program.templates.push(cloneDeep(CONSTANT.TEMPLATE))
    }
    state.template = {
      userId: state.userId,
      category: '',
      days: [],
      programs: [program]
    }
  },

  [CONSTANT.ADD_PROGRAM](state, count) {
    const order = state.template.programs.length
    for (let i = 1; i <= count; i++) {
      const program = cloneDeep(CONSTANT.PROGRAM)
      program.order = order + i
      for (let i = 0; i < CONSTANT.DEFAULT_TEMPLATE_COUNT; i++) {
        program.templates.push(cloneDeep(CONSTANT.TEMPLATE))
      }
      state.template.programs.push(program)
    }
  },

  [CONSTANT.UPDATE_PROGRAM](state, program) {
    state.template.programs.some(({ order }, index) => {
      if (order === program.order) {
        state.template.programs.splice(index, 1, program)
      }
      return order === program.order
    })
  },

  [CONSTANT.UPDATE_TEMPLATE](state, template) {
    state.template = template
  },

  [CONSTANT.SET_CATEGORY_LIST](state, aTemplate) {
    state.aTemplate = aTemplate
  }
}
