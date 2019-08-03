const Koa = require('koa');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const api = require('./api');

// 1. 몽고 DB 연동
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/exercise', { useNewUrlParser: true })
  .then(() => console.log('Successfully connected to mongoDB!'))
  .catch(e => console.error(e));

// 2. 미들웨어 등록
const app = new Koa();
app.use(bodyParser());
app.use(api);

// 3. 노드 서버 실행
app.listen(1702, () => {
  console.log('Health Server Listening PORT : 1702');
});