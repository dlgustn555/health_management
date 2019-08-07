const Router = require('koa-router');
const template = require('./template');
const schedule = require('./schedule');

const router = new Router();

router.use('/exercise/template', template);
router.use('/exercise/schedule', schedule);

module.exports = router.routes();
