/* eslint-disable prettier/prettier */
import CONSTANT from '@/common/constant'
import L from '@/common/lazy'

export const getPart = (schedule, programs, order) => {
  if (!!schedule) {
    return schedule.part
  }
  const index = order % programs.length
  return programs[index].part 
}

export default {
  // 로그인 정보
  [CONSTANT.SET_LOGIN_INFO](state, { login, userId }) {
    state.login = login
    state.userId = userId
  },

  // 템플릿 리스트 셋팅
  [CONSTANT.SET_TEMPLATE_LIST](state, aTemplate) {
    state.aTemplate = aTemplate
    const aTag = aTemplate.map(
      ({ _id, tag }) => ({ _id, tag, isOn: true })
    )
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

    const oDate = new Date('2019-09-22')
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
  [CONSTANT.SET_SCHEDULE](state, oSchedule) {
    state.oSchedule = oSchedule
  },

  [CONSTANT.ADD_SCHEDULE](state, { _id, aSchedule }) {
    state.oSchedule[_id] = aSchedule
  },

  [CONSTANT.UPDATE_SCHEDULE](state, schedule) {
    state.oSchedule[schedule.templateId].splice(schedule.cellIndex, 1, schedule)
  },

  // 다음번 실행할 프로그램 ORDER 저장
  [CONSTANT.SET_ORDER](state, { tagId, order }) {
    state.order[tagId] = order
  },

  [CONSTANT.DELETE_ORDER](state, tagId) {
    delete state.order[tagId]
  },

  [CONSTANT.SET_SCHEDULE_OF_CALENDAR](state) {
    const { aTemplate, oSchedule } = state
    const {
      MAX_ROW,
      MAX_CELL,
      startDay,
      lastDate,
      todayDate
    } = state.oToDay
    
    let order = 0
    const aCalendarDate = Array.apply(
      null,
      Array(MAX_ROW * MAX_CELL)
    ).map(
      (_, cellIndex) => {
        const oCellDate = {
          day: cellIndex % MAX_CELL,
          cellIndex,
          date: 0,
          isShow: false,
          isPast: true,
          aSchedule: []
        }

        // STEP 1: 날짜 Setting
        if (cellIndex === 0 && cellIndex === startDay) {
          oCellDate.date = 1
          oCellDate.isShow = true
        } else if (cellIndex >= startDay) {
          oCellDate.date = cellIndex - startDay + 1
          oCellDate.isShow = oCellDate.date <= lastDate
        }

        // STEP 2: 태그 Setting
        for (const { _id, tag, days, programs } of aTemplate) {
          const schedule= oSchedule[_id][cellIndex]
          const isExerciseDay = days.some(exerciseDay => exerciseDay === oCellDate.day)
          const isShowTag = isExerciseDay && (!!schedule || oCellDate.date >= todayDate)
          // isShowTag: isOn && (!!schedule || oCellDate.date >= todayDate),

          oCellDate.aSchedule.push({
            _id,
            buttonType: !schedule ? 'category_button dotted' : 'category_button fill',
            isShowTag,
            tag,
            part: isShowTag ? getPart(schedule, programs, order++) : '',
            schedule
          })
        }

        return oCellDate
      }
    )
    state.aCalendarDate = aCalendarDate
  }
}
