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

  // 프로그램 추가
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

  // 프로그램 수정
  [CONSTANT.UPDATE_PROGRAM](state, program) {
    state.template.programs.some(({ order }, index) => {
      if (order === program.order) {
        state.template.programs.splice(index, 1, program)
      }
      return order === program.order
    })
  },

  // 템플릿 수정
  [CONSTANT.UPDATE_TEMPLATE](state, template) {
    state.template = template
  },

  // 템플릿 리스트 수정
  [CONSTANT.SET_TEMPLATE_LIST](state, aTemplate) {
    state.aTemplate = aTemplate
  },

  // 오늘 날짜 정보 셋팅
  [CONSTANT.SET_TODAY](state) {
    const { oToDay } = state

    const oDate = new Date()
    oToDay.year = oDate.getFullYear()
    oToDay.month = oDate.getMonth()
    oToDay.todayDate = oDate.getDate()

    const SUNDAY = 0
    oToDay.startDay = new Date(oToDay.year, oToDay.month, 1).getDay()
    if (state.START_DAY_TYPE === 'MONDAY') {
      oToDay.startDay = oToDay.startDay === SUNDAY ? 6 : oToDay.startDay - 1
    }
    oToDay.lastDate = CONSTANT.DAY_PER_MONTHS[oToDay.month]
    if (
      (oToDay.month === 1 &&
        (oToDay.year % 100 !== 0 && oToDay.year % 4 === 0)) ||
      oToDay.year % 400 === 0
    ) {
      oToDay.lastDate += 1
    }

    oToDay.MAX_ROW = Math.ceil((oToDay.startDay + oToDay.lastDate) / 7)
  },

  // 스케줄 정보를 셋팅
  [CONSTANT.SET_CALENDAR_DATE_LIST](state, aCalendarDate) {
    state.aCalendarDate = aCalendarDate
  }
}
