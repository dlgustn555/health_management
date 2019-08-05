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

  [CONSTANT.SET_CALENDAR_SCHEDULE]({ commit }) {
    // 1. API를 호출해서 schedule 정보를 조회하여 세팅한다.

    // 2. 스케줄 정보를 셋팅한다.
    commit(CONSTANT.SET_SCHEDULE)
  }
}
