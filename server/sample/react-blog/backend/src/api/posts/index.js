const Router = require('koa-router')

const posts = new Router()

const printInfo = (ctx) => {
  const {
    method,
    path,
    params,
    query
  } = ctx

  ctx.body = {
    method, path, params, query
  }
}

posts.get('/', printInfo)
posts.post('/', printInfo)
posts.get('/:id', printInfo)
posts.delete('/:id', printInfo)
posts.put('/:id', printInfo)
posts.patch('/:id', printInfo)

module.exports = posts