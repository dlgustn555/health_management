import cloneDeep from 'lodash/cloneDeep'

export default {
  cloneTemplate(state) {
    return cloneDeep(state.template)
  }
}
