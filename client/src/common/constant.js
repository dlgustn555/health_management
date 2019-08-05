export default {
  MAX_COLS: 7,
  DAYS: {
    START_MONDAY: ['월', '화', '수', '목', '금', '토', '일'],
    START_SUNDAY: ['일', '월', '화', '수', '목', '금', '토']
  },
  DAY_PER_MONTHS: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  DAY_OF_WEEK: ['월', '화', '수', '목', '금', '토', '일'],
  DEFAULT_TEMPLATE_COUNT: 8,
  TEMPLATE: { name: '', set: 1, unit: 'Set' },
  UNIT: ['Set', 'Km', 'Hour', 'Min', 'Sec'],
  PROGRAM: {
    part: '',
    order: 1,
    templates: []
  },

  SET_LOGIN_INFO: '',
  INIT_PROGRAM: 'initProgram',
  ADD_PROGRAM: 'addProgram',
  REMOVE_PROGRAM: 'removeProgram',
  UPDATE_PROGRAM: 'updateProgram',
  REGIST_TEMPLATE: 'registTemplate',
  MODIFY_TEMPLATE: 'modifyTemplate',
  UPDATE_TEMPLATE: 'updateTemplate',
  GET_CATEGORY_LIST: 'getCategoryList',
  SET_CATEGORY_LIST: 'setCategoryList',

  SET_CALENDAR: 'setCalendar',
  SET_SCHEDULE: 'setSchedule'
}
