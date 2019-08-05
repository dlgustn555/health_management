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
  [CONSTANT.SET_CATEGORY_LIST](state, aTemplate) {
    state.aTemplate = aTemplate
  },

  // 달력 정보 셋팅
  [CONSTANT.SET_CALENDAR](state) {
    const { calendar } = state

    const oDate = new Date()
    calendar.year = oDate.getFullYear()
    calendar.month = oDate.getMonth()
    calendar.todayDate = oDate.getDate()

    const SUNDAY = 0
    calendar.startDay = new Date(calendar.year, calendar.month, 1).getDay()
    if (state.START_DAY_TYPE === 'MONDAY') {
      calendar.startDay =
        calendar.startDay === SUNDAY ? 6 : calendar.startDay - 1
    }
    calendar.lastDate = CONSTANT.DAY_PER_MONTHS[calendar.month]
    if (
      (calendar.month === 1 &&
        (calendar.year % 100 !== 0 && calendar.year % 4 === 0)) ||
      calendar.year % 400 === 0
    ) {
      calendar.lastDate += 1
    }

    calendar.MAX_ROW = Math.ceil((calendar.startDay + calendar.lastDate) / 7)
  },

  // 스케줄 정보 셋팅
  [CONSTANT.SET_SCHEDULE](state) {
    const { calendar } = state
    state.aSchedule = Array.apply(
      null,
      Array(calendar.MAX_ROW * calendar.MAX_CELL)
    ).map((_, index) => {
      const oCellDate = {
        date: 0,
        isShow: false
      }

      if (index === 0 && index === calendar.startDay) {
        oCellDate.date = 1
        oCellDate.isShow = true
      } else if (index >= calendar.startDay) {
        oCellDate.date = index - calendar.startDay + 1
        oCellDate.isShow = oCellDate.date <= calendar.lastDate
      }
      return { index, oCellDate }
    })
  }
}
