const Router = require('koa-router')
const health = require('./health')

const router = new Router()
router.use('/health', health)

module.exports = router.routes()
