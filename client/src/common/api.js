/* eslint-disable prettier/prettier */
export default {
  GET_TEMPLATE_LIST: userId => `/exercise/template/user/${userId}`,
  REGIST_TEMPLATE: '/exercise/template',
  DELETE_TEMPLATE: (userId, templateId) => `/exercise/template/${userId}/${templateId}`,
  UPDATE_TEMPLATE: templateId => `/exercise/template/${templateId}`,
  GET_SCHEDULE_LIST: userId => `/exercise/schedule/user/${userId}`
}
