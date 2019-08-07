import CONSTANT from '@/common/constant'
import cloneDeep from 'lodash/cloneDeep'

const createProgram = (count, order) => {
  const aProgram = []
  for (let i = 0; i < count; i++) {
    const program = cloneDeep(CONSTANT.PROGRAM)
    program.order = order + i
    for (let j = 0; j < CONSTANT.DEFAULT_TEMPLATE_COUNT; j++) {
      program.course.push(cloneDeep(CONSTANT.COURSE))
    }
    aProgram.push(program)
  }
  return aProgram
}

export { createProgram }
