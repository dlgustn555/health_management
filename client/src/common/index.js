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

const createSchedule = course => {
  const schedule = cloneDeep(CONSTANT.SCHEDULE)
  for (const cs of course) {
    const newCourse = cloneDeep(CONSTANT.SCHEDULE_COURSE)
    for (let i = 0, end = parseInt(cs.set, 10); i < end; i++) {
      newCourse.aSet.push(cloneDeep(CONSTANT.SCHEDULE_SET))
    }
    schedule.aCourse.push(newCourse)
  }
  return schedule
}

export { createProgram, createSchedule }
