const Koa = require('koa');
const mongoose = require('mongoose');
const api = require('./api');

const app = new Koa();
app.use(api);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/exercise', { useNewUrlParser: true })
  .then(() => console.log('Successfully connected to mongoDB!'))
  .catch(e => console.error(e));

app.listen(1702, () => {
  console.log('Health Server Listening PORT : 1702');
});