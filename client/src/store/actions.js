import CONSTANT from '@/common/constant'
import API from '@/common/api'

export default {
  async [CONSTANT.REGIST_TEMPLATE]({ state }) {
    const { data } = await this.$axios.post(API.REGIST_TEMPLATE, state.template)
    return data
  },

  async [CONSTANT.MODIFY_TEMPLATE]({ state }) {
    const { data } = await this.$axios.patch(
      API.UPDATE_TEMPLATE(state.template._id),
      state.template
    )
    return data
  },

  async [CONSTANT.GET_TEMPLATE_LIST]({ state, commit }) {
    const { data } = await this.$axios.get(API.GET_TEMPLATE_LIST(state.userId))
    const aTemplate = data.success ? data.data.aResult : []
    commit(CONSTANT.SET_TEMPLATE_LIST, aTemplate)
  },

  async [CONSTANT.SET_SCHEDULE_OF_CALENDAR]({ state, commit, dispatch }) {
    const { oToDay } = state

    // 1. API를 호출해서 schedule 정보를 조회하여 세팅한다.
    const registSchedule = []
    const lastRegistSchedule = registSchedule.map(schedule => {
      const [lastScedule] = schedule.filter(schedule => schedule).reverse()
      return lastScedule
    })

    // 2. 해당 월의 날짜 정보를 셋팅한다.
    const aCalendarDate = Array.apply(
      null,
      Array(oToDay.MAX_ROW * oToDay.MAX_CELL)
    ).map((_, cellIndex) => {
      const oCellDate = {
        date: 0,
        day: cellIndex % oToDay.MAX_CELL,
        isShow: false,
        aSchedule: []
      }

      // Step 1: 날짜 정보 셋팅
      if (cellIndex === 0 && cellIndex === oToDay.startDay) {
        oCellDate.date = 1
        oCellDate.isShow = true
      } else if (cellIndex >= oToDay.startDay) {
        oCellDate.date = cellIndex - oToDay.startDay + 1
        oCellDate.isShow = oCellDate.date <= oToDay.lastDate
      }

      // Step 2: 날짜의 스캐줄 정보를 셋팅
      dispatch(CONSTANT._SET_CELL_DATE_OF_SCHEDULE, {
        cellIndex,
        oCellDate,
        registSchedule,
        lastRegistSchedule
      })

      return oCellDate
    })

    commit(CONSTANT.SET_CALENDAR_DATE_LIST, aCalendarDate)
  },

  // 날짜의 스캐줄 정보를 셋팅
  [CONSTANT._SET_CELL_DATE_OF_SCHEDULE](
    { state },
    { cellIndex, oCellDate, registSchedule, lastRegistSchedule }
  ) {
    const { aTemplate, oToDay } = state
    const isFillCategoryButton = !!registSchedule[cellIndex]
    let isShowDateField =
      oCellDate.date >= oToDay.todayDate || !!registSchedule[cellIndex]

    oCellDate.aSchedule = aTemplate.map(({ _id, category, days, programs }) => {
      isShowDateField =
        isShowDateField && days.some(day => day === oCellDate.day)

      let nextOrder = 0
      lastRegistSchedule.some(({ templateId, order }) => {
        if (templateId === _id) {
          nextOrder = order
        }
        return templateId === _id
      })

      if (oCellDate.date >= oToDay.todayDate) {
        nextOrder += (oCellDate.date - oToDay.todayDate) % programs.length
      }

      const part = isFillCategoryButton
        ? registSchedule[cellIndex].part
        : programs[nextOrder].part

      const order = isFillCategoryButton
        ? registSchedule[cellIndex].order
        : nextOrder + 1

      return {
        isShow: isShowDateField,
        isFill: isFillCategoryButton,
        templateId: _id,
        category,
        part,
        order,
        data: registSchedule[cellIndex] || null
      }
    })
  }
}
