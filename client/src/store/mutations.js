/* eslint-disable prettier/prettier */
import CONSTANT from '@/common/constant'
import L from '@/common/lazy'

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

  // 템플릿 리스트에 템플릿 추가
  [CONSTANT.REGIST_TEMPLATE_LIST](state, template) {
    const { _id, tag } = template
    state.aTemplate.push(template)
    state.aTag.push({ _id, tag, isOn: true })
  },

  // 템플릿 리스트 수정
  [CONSTANT.UPDATE_TEMPLATE_LIST](state, { template, isOn }) {
    const { _id, tag } = template
    state.aTemplate.some((t, index) => {
      if (t._id === template._id) {
        state.aTemplate.splice(index, 1, template)
        state.aTag.splice(index, 1, { _id, tag, isOn })
      }
      return t._id === template._id
    })
  },

  // 템플릿 리스트 삭제
  [CONSTANT.DELETE_TEMPLATE_LIST](state, templateId) {
    state.aTemplate.some((template, index) => {
      if (template._id === templateId) {
        state.aTemplate.splice(index, 1)
        state.aTag.splice(index, 1)
      }
      return template._id === templateId
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

  [CONSTANT.ADD_SCHEDULE](state, { _id, aSchedule }) {
    state.schedule[_id] = aSchedule
  },

  [CONSTANT.UPDATE_SCHEDULE](state, schedule) {
    state.schedule[schedule.templateId].splice(schedule.cellIndex, 1, schedule)
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
  },

  [CONSTANT.DELETE_ORDER](state, tagId) {
    delete state.order[tagId]
  },

  [CONSTANT.SET_SCHEDULE_OF_CALENDAR](state) {
    const { oToDay, aTemplate, schedule, lastSchedule, order } = state
    const aCalendarDate = Array.apply(
      null,
      Array(oToDay.MAX_ROW * oToDay.MAX_CELL)
    ).map((_, cellIndex) => {
      const oCellDate = {
        date: 0,
        day: cellIndex % oToDay.MAX_CELL,
        cellIndex,
        isShow: false,
        isBiggerThanToDay: false,
        aSchedule: {}
      }

      if (cellIndex === 0 && cellIndex === oToDay.startDay) {
        oCellDate.date = 1
        oCellDate.isShow = true
      } else if (cellIndex >= oToDay.startDay) {
        oCellDate.date = cellIndex - oToDay.startDay + 1
        oCellDate.isShow = oCellDate.date <= oToDay.lastDate
        oCellDate.isBiggerThanToDay = oCellDate.date > oToDay.todayDate
      }

      for (const tagId in schedule) {
        const scheduleOfcell = schedule[tagId][cellIndex]
        oCellDate.aSchedule[tagId] = {
          isShowTag: false, // true: 태그를 보여준다. v-show=true
          isFill: false, // true: 태그에 클래스 fill 를 붙인다. = 꽉찬 태그
          isDotted: false,
          schedule: scheduleOfcell
        }

        const [template] = L.take(
          1,
          L.filter(template => template._id === tagId, aTemplate)
        )

        //  CASE1. 과거인데 운동한 적이 있다.
        if (oCellDate.date < oToDay.todayDate && !!scheduleOfcell) {
          oCellDate.aSchedule[tagId].isShowTag = true
          oCellDate.aSchedule[tagId].isFill = true
          oCellDate.aSchedule[tagId].part = scheduleOfcell.part
          state.lastSchedule[scheduleOfcell.templateId] = scheduleOfcell
          state.order[tagId] = scheduleOfcell.order
          // CASE 2. 현재 : 만약 템플릿 삭제한 경우, 과의것만 보여주고, 오늘부터는 안보여 준다.
        } else if (oCellDate.date === oToDay.todayDate && template && template.days.some(day => day === oCellDate.day)) {
          oCellDate.aSchedule[tagId].isShowTag = true
          oCellDate.aSchedule[tagId].isFill = !!scheduleOfcell
          // 오늘 등록한게 있다.
          if (!!scheduleOfcell) {
            oCellDate.aSchedule[tagId].part = scheduleOfcell.part
            state.lastSchedule[scheduleOfcell.templateId] = scheduleOfcell
            state.order[tagId] = scheduleOfcell.order
            continue
          }

          // 과거 언젠가 마지막으로 등록한게 있다.
          if (!!lastSchedule[tagId]) {
            template.programs[0].part = lastSchedule[tagId].part
            state.order[tagId] = lastSchedule[tagId].order
            continue
          }

          oCellDate.aSchedule[tagId].part = template.programs[0].part
          state.order[tagId] = template.programs[0].order
          // CASE 3. 미래 : 만약 템플릿 삭제한 경우, 과의것만 보여주고, 오늘부터는 안보여 준다.
        } else if (oCellDate.date > oToDay.todayDate && template &&  template.days.some(day => day === oCellDate.day)) {
          oCellDate.aSchedule[tagId].isShowTag = true
          oCellDate.aSchedule[tagId].isDotted = true
          
          if (template.programs.length === 1) {
            oCellDate.aSchedule[tagId].part = template.programs[0].part
            continue
          }

          const nowOrder = order[tagId] || 0
          oCellDate.aSchedule[tagId].part = template.programs[nowOrder].part
          const nextOrder = (nowOrder + 1) % template.programs.length
          state.order[tagId] = nextOrder
        }
      }

      return oCellDate
    })
    state.aCalendarDate = aCalendarDate
  }
}
