const Router = require('koa-router');
const exercise = require('./exercise');

const router = new Router();

router.use('/exercise', exercise);

module.exports = router.routes();
