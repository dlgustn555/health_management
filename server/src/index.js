const Koa = require('koa')
const api = require('./api')

const app = new Koa()
app.use(api)

app.listen(1702, () => {
  console.log('Health Server Listening PORT : 1702')
})