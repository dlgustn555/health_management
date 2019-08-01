const Router = require('koa-router');

const router = new Router();

router.get('/', (ctx) => {
  ctx.body = {
    success: true,
    message: 'First API CALL!!'
  };
});

module.exports = router.routes();
