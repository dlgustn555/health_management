const Router = require('koa-router');
const Template = require('../model/templateModel');
const Query = require('../util/query.js');

const router = new Router();

router.get('/', (ctx) => {
  ctx.body = {
    success: true,
    message: 'Template API CALL!!'
  };
});

// 템플릿 등록
router.post('/', async (ctx) => {
  const { userId } = ctx.params;
  const modDate = new Date();
  const template = new Template({ userId, ...ctx.request.body, modDate });
  ctx.body = await Query.save(template);
});

// ALL 템플릿 조회
router.get('/user/:userId', async (ctx) => {
  const { userId } = ctx.params;
  ctx.body = await Query.find(Template, { userId });
})

// 특정ID 템플릿 조회
router.get('/:templateId', async (ctx) => {
  const { templateId } = ctx.params;
  ctx.body = await Query.findById(Template, templateId);
})

// 특정ID 템플릿 수정
router.patch('/:templateId', async (ctx) => {
  const { templateId: id } = ctx.params;
  const { body: update } = ctx.request;
  ctx.body = await Query.findByIdAndUpdate(Template, id, update);
})

module.exports = router.routes();
