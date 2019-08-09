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
  COURSE: { name: '', set: 1, unit: 'Kg' },
  UNIT: ['Kg', 'Km', 'Hour', 'Min', 'Sec'],
  PROGRAM: {
    order: 1,
    part: '',
    course: []
  },
  SCHEDULE: {
    _id: '',
    userId: '',
    templateId: '',
    order: 0,
    part: '',
    year: 2019,
    month: 0,
    date: 1,
    aCourse: []
  },
  SCHEDULE_SET: { weigth: '', repeat: 0 },
  SCHEDULE_COURSE: {
    name: '',
    aSet: [],
    condition: ''
  },

  SET_LOGIN_INFO: '',
  SET_TODAY: 'SetToday',

  INIT_PROGRAM: 'initProgram',
  ADD_PROGRAM: 'addProgram',
  REMOVE_PROGRAM: 'removeProgram',
  UPDATE_PROGRAM: 'updateProgram',

  REGIST_TEMPLATE: 'registTemplate',
  DELETE_TEMPLATE: 'deleteTemplate',
  MODIFY_TEMPLATE: 'modifyTemplate',
  UPDATE_TEMPLATE: 'updateTemplate',

  TOGGLE_TAG_ON_OFF: 'toggleTagOnOff',

  GET_TEMPLATE_LIST: 'getTemplateList',
  SET_TEMPLATE_LIST: 'setTemplateList',
  REGIST_TEMPLATE_LIST: 'registTemplateList',
  UPDATE_TEMPLATE_LIST: 'updateTemplateList',
  DELETE_TEMPLATE_LIST: 'deleteTemplateList',

  GET_SCHEDULE: 'getSchedule',
  SET_SCHEDULE: 'setSchedule',
  SET_SCHEDULE_OF_CALENDAR: 'setScheduleOfCalendar',
  SET_SCHEDULE_OF_CALEDAR: 'setScheduleOfCaledar',

  SET_CATEGORY_LIST: 'setCategoryList',
  SET_CALENDAR_DATE_LIST: 'setCalendarDateList',

  SET_LAST_SCHEDULE: 'setLastSchedule',
  SET_ORDER: 'setOrder',
  DELETE_ORDER: 'deleteOrder',
  _SET_CELL_DATE_OF_CALENDAR: '_setCellDateOfCalendar',
  _SET_CELL_DATE_OF_SCHEDULE: '_setCellDateOfTemplate'
}
