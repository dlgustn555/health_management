export default {
  GET_TEMPLATE_LIST: userId => `/exercise/template/user/${userId}`,
  REGIST_TEMPLATE: '/exercise/template',
  UPDATE_TEMPLATE: templateId => `/exercise/template/${templateId}`,
  GET_SCHEDULE_LIST: userId => `/exercise/schedule/user/${userId}`
}
