/* eslint-disable prettier/prettier */
import CONSTANT from '@/common/constant'
import API from '@/common/api'
import L from '@/common/lazy'

export default {
  // 신규 템플릿 등록
  async [CONSTANT.REGIST_TEMPLATE]({ state, commit }, template) {
    template.userId = state.userId
    const { data } = await this.$axios.post(API.REGIST_TEMPLATE, template)
    if (data.success) {
      const schedule = {}
      schedule[data.data._id] = []
      template._id = data.data._id
      // 1. 신규 템플릿을 추가한다.
      commit(CONSTANT.REGIST_TEMPLATE_LIST, template)
      // 2. 신규 템플릿에 대한 일정은 아직 없으므로 스케줄에 default 로 셋팅한다.
      commit(CONSTANT.SET_SCHEDULE, schedule)
      // 3. 달력의 리스트 정보를 다시 계산한다.
      commit(CONSTANT.SET_SCHEDULE_OF_CALENDAR)
    }
    return data
  },

  // 기존 템플릿 수정
  async [CONSTANT.MODIFY_TEMPLATE]({ commit }, { template, isOn }) {
    const { data } = await this.$axios.patch(
      API.UPDATE_TEMPLATE(template._id),
      template
    )
    if (data.success) {
      commit(CONSTANT.SET_ORDER, { tagId: template._id, order: 0 })
      commit(CONSTANT.UPDATE_TEMPLATE_LIST, { template, isOn })
      commit(CONSTANT.SET_SCHEDULE_OF_CALENDAR)
    }
    return data
  },

  // 기존 템플릿 삭제
  async [CONSTANT.DELETE_TEMPLATE]({ state, commit }, templateId) {
    const { userId } = state
    const { data } = await this.$axios.delete(API.DELETE_TEMPLATE(userId, templateId))
    if (data.success) {
      commit(CONSTANT.DELETE_ORDER, templateId)
      commit(CONSTANT.DELETE_TEMPLATE_LIST, templateId)
      commit(CONSTANT.SET_SCHEDULE_OF_CALENDAR)
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

  async [CONSTANT.REGIST_SCHEDULE](_, schedule) {
    const { data } = await this.$axios.post(API.REGIST_SCHEDULE, schedule)
    return data
  }
}
