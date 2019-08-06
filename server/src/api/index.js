const Router = require('koa-router');
const template = require('./template');

const router = new Router();

router.use('/exercise/template', template);

module.exports = router.routes();
