const Router = require('koa-router');
const Template = require('../model/templateModel');
const { save, find, findById } = require('../util/util.js');

const router = new Router();

router.get('/', (ctx) => {
  ctx.body = {
    success: true,
    message: 'First API CALL!!'
  };
});

// 템플릿 등록
router.post('/template/:userId', async (ctx) => {
  const { userId } = ctx.params;
  const modDate = new Date();
  const template = new Template({ userId, ...ctx.request.body, modDate });
  ctx.body = await save(template);
});

// ALL 템플릿 조회
router.get('/template/user/:userId', async (ctx) => {
  const { userId } = ctx.params;
  ctx.body = await find(Template, { userId });
})

// 특정ID 템플릿 조회
router.get('/template/:templateId', async (ctx) => {
  const { templateId } = ctx.params;
  ctx.body = await findById(Template, templateId);
})

module.exports = router.routes();
