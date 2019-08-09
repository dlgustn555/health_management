const Router = require('koa-router');
const Schedule = require('../model/scheduleModel');
const Query = require('../util/query.js');

const getSchedule = (cellCnt, aResult) => {
  const aSchedule = Array(...Array(cellCnt)).map(_ => null);
  aResult.forEach((result) => { aSchedule[result.cellIndex] = result });
  return aSchedule;
};

const router = new Router();

router.get('/', (ctx) => {
  ctx.body = {
    success: true,
    message: 'Schedule API CALL!!'
  };
});

// 스케줄 등록
router.post('/', async (ctx) => {
  const modDate = new Date();
  const schedule = new Schedule({ ...ctx.request.body, modDate });
  ctx.body = await Query.save(schedule);
});

// ALL 스케즐 조회
router.post('/user/:userId', async (ctx) => {
  const { userId } = ctx.params;
  const {
    aTemplateId, year, month, cellCnt
  } = ctx.request.body;
  const schedule = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const templateId of aTemplateId) {
    // eslint-disable-next-line no-await-in-loop
    const { success, data } = await Query.find(Schedule, {
      userId, templateId, year, month
    });
    schedule[templateId] = success ? getSchedule(cellCnt, data.aResult) : [];
  }
  ctx.body = { success: true, data: { schedule } };
});


module.exports = router.routes();
