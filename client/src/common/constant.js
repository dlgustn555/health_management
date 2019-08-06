export default {
  MAX_COLS: 7,
  DAYS: {
    START_MONDAY: [
      { name: '월', value: 1 },
      { name: '화', value: 2 },
      { name: '수', value: 3 },
      { name: '목', value: 4 },
      { name: '금', value: 5 },
      { name: '토', value: 6 },
      { name: '일', value: 0 }
    ],
    START_SUNDAY: [
      { name: '일', value: 0 },
      { name: '월', value: 1 },
      { name: '화', value: 2 },
      { name: '수', value: 3 },
      { name: '목', value: 4 },
      { name: '금', value: 5 },
      { name: '토', value: 6 }
    ]
  },
  DAY_PER_MONTHS: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
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
  GET_TEMPLATE_LIST: 'getTemplateList',
  SET_TEMPLATE_LIST: 'setTemplateList',

  SET_TODAY: 'SetToday',
  SET_SCHEDULE_OF_CALENDAR: 'setScheduleOfCalendar',
  SET_CATEGORY_LIST: 'setCategoryList',
  SET_CALENDAR_DATE_LIST: 'setCalendarDateList',
  SET_SCHEDULE_OF_CALEDAR: 'setScheduleOfCaledar',

  _SET_CELL_DATE_OF_SCHEDULE: '_setCellDateOfTemplate'
}
