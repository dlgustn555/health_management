import cloneDeep from 'lodash/cloneDeep'
import CONSTANT from '@/common/constant'

export default {
  // 로그인 정보
  [CONSTANT.SET_LOGIN_INFO](state, { login, userId }) {
    state.login = login
    state.userId = userId
  },

  // 템플릿 리스트 셋팅
  [CONSTANT.SET_TEMPLATE_LIST](state, aTemplate) {
    state.aTemplate = aTemplate
    const aTag = aTemplate.map(({ _id, tag }) => {
      return { _id, tag, isOn: true }
    })
    state.aTag = aTag
  },

  // 템플릿 리스트 수정
  [CONSTANT.UPDATE_TEMPLATE_LIST](state, template) {
    const { _id, tag, isOne = true } = template
    if (state.aTemplate.length === 0) {
      state.aTemplate = [template]
      state.aTag = [{ _id, tag, isOne }]
      return
    }

    state.aTemplate.some((t, index) => {
      if (t._id === template._id) {
        state.aTemplate.splice(index, 1, template)
        state.aTag.splice(index, 1, { _id, tag, isOne })
      }
      return t._id === template._id
    })
  },

  [CONSTANT.TOGGLE_TAG_ON_OFF](state, tag) {
    tag.isOn = !tag.isOn
    state.aTag.some(({ _id }, index) => {
      if (_id === tag._id) {
        state.aTag.splice(index, 1, tag)
      }
      return _id === tag._id
    })
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

  // 달력의 스캐줄 정보 셋팅
  [CONSTANT.SET_SCHEDULE](state, schedule) {
    state.schedule = schedule
  },

  // 달력의 날짜 정보 셋팅
  [CONSTANT.SET_CALENDAR_DATE_LIST](state, aCalendarDate) {
    state.aCalendarDate = aCalendarDate
  },

  // 가장 마지막 등록된 스케줄 정보 저장
  [CONSTANT.SET_LAST_SCHEDULE](state, lastSchedule) {
    state.lastSchedule[lastSchedule.templateId] = lastSchedule
  },

  // 다음번 실행할 프로그램 ORDER 저장
  [CONSTANT.SET_ORDER](state, { tagId, order }) {
    state.order[tagId] = order
  }
}
