/* eslint-disable prettier/prettier */
import CONSTANT from '@/common/constant'
import API from '@/common/api'
import L from '@/common/lazy'

export default {
  async [CONSTANT.REGIST_TEMPLATE]({ state, commit }, template) {
    template.userId = state.userId
    const { data } = await this.$axios.post(API.REGIST_TEMPLATE, template)
    if (data.success) {
      template._id = data.data._id
      commit(CONSTANT.UPDATE_TEMPLATE_LIST, template)
    }
    return data
  },

  async [CONSTANT.MODIFY_TEMPLATE]({ commit }, template) {
    const { data } = await this.$axios.patch(
      API.UPDATE_TEMPLATE(template._id),
      template
    )
    if (data.success) {
      commit(CONSTANT.UPDATE_TEMPLATE_LIST, template)
    }
    return data
  },

  async [CONSTANT.GET_TEMPLATE_LIST]({ state, commit }) {
    const { data } = await this.$axios.get(API.GET_TEMPLATE_LIST(state.userId))
    const aTemplate = data.success ? data.data.aResult : []
    commit(CONSTANT.SET_TEMPLATE_LIST, aTemplate)
  },

  async [CONSTANT.GET_SCHEDULE]({ state, commit }) {
    const aTemplateId = state.aTemplate.map(({ _id }) => _id)
    const { data } = await this.$axios.post(
      API.GET_SCHEDULE_LIST(state.userId),
      aTemplateId
    )

    const schedule = data.success ? data.data.schedule : null
    commit(CONSTANT.SET_SCHEDULE, schedule)
  },

  async [CONSTANT.SET_SCHEDULE_OF_CALENDAR]({ state, commit }) {
    const { oToDay, aTemplate, schedule, lastSchedule, order } = state

    const aCalendarDate = Array.apply(
      null,
      Array(oToDay.MAX_ROW * oToDay.MAX_CELL)
    ).map((_, cellIndex) => {
      const oCellDate = {
        date: 0,
        day: cellIndex % oToDay.MAX_CELL,
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
          schedule: null
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
          commit(CONSTANT.SET_LAST_SCHEDULE, scheduleOfcell)
          commit(CONSTANT.SET_ORDER, { tagId, order: scheduleOfcell.order })

          // CASE 2. 현재
        } else if (oCellDate.date === oToDay.todayDate && template.days.some(day => day === oCellDate.day)) {
          oCellDate.aSchedule[tagId].isShowTag = true
          oCellDate.aSchedule[tagId].isFill = !!scheduleOfcell
          // 오늘 등록한게 있다.
          if (!!scheduleOfcell) {
            oCellDate.aSchedule[tagId].part = scheduleOfcell.part
            commit(CONSTANT.SET_LAST_SCHEDULE, scheduleOfcell)
            commit(CONSTANT.SET_ORDER, { tagId, order: scheduleOfcell.order })
            continue
          }

          // 과거 언전게 마지막으로 등록한게 있다.
          if (!!lastSchedule[tagId]) {
            template.programs[0].part = lastSchedule[tagId].part
            commit(CONSTANT.SET_ORDER, { tagId, order: lastSchedule[tagId].order })
            continue
          }

          oCellDate.aSchedule[tagId].part = template.programs[0].part
          commit(CONSTANT.SET_ORDER, { tagId, order: template.programs[0].order })

          // CASE 3. 미래
        } else if (oCellDate.date > oToDay.todayDate && template.days.some(day => day === oCellDate.day)) {
          oCellDate.aSchedule[tagId].isShowTag = true
          oCellDate.aSchedule[tagId].isDotted = true
          
          if (template.programs.length === 1) {
            oCellDate.aSchedule[tagId].part = template.programs[0].part
            continue
          }

          const nowOrder = order[tagId] || 0

          oCellDate.aSchedule[tagId].part = template.programs[nowOrder].part
          const nextOrder = (nowOrder + 1) % template.programs.length
          commit(CONSTANT.SET_ORDER, { tagId, order: nextOrder })
        }
      }

      return oCellDate
    })

    commit(CONSTANT.SET_CALENDAR_DATE_LIST, aCalendarDate)
  }
}
