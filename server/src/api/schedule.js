const Router = require('koa-router');
const Schedule = require('../model/scheduleModel');
const Query = require('../util/query.js');

const router = new Router();

router.get('/', (ctx) => {
  ctx.body = {
    success: true,
    message: 'Schedule API CALL!!'
  };
});

router.post('/user/:userId', async (ctx) => {
  const { userId } = ctx.params;
  const aTemplateId = ctx.request.body;
  const schedule = {}

  // eslint-disable-next-line no-restricted-syntax
  for (const templateId of aTemplateId) {
    // eslint-disable-next-line no-await-in-loop
    const { success, data } = await Query.find(Schedule, { userId, templateId })
    schedule[templateId] = success ? data.aResult : []
  }
  ctx.body = { success: true, data: { schedule } }
});

module.exports = router.routes();
