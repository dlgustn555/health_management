import CONSTANT from '@/common/constant'
import API from '@/common/api'

export default {
  async [CONSTANT.REGIST_TEMPLATE]({ getters }) {
    const { data } = await this.$axios.post(
      API.REGIST_TEMPLATE,
      getters.cloneTemplate
    )
    return data
  }
}
