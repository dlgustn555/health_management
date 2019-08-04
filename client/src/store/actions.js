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

  async [CONSTANT.GET_CATEGORY_LIST]({ state, commit }) {
    const { data } = await this.$axios.get(API.GET_CATEGORY_LIST(state.userId))
    const aTemplate = data.success ? data.data.aResult : []
    commit(CONSTANT.SET_CATEGORY_LIST, aTemplate)
  }
}
