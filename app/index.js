import 'babel-polyfill';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from 'koa-cors';
import mongoose from 'mongoose';
import CONFIG from './config.json';
import Router from './router';
import schedule from './schedule/schedule';

mongoose.Promise = global.Promise;

const {
  host,
  port,
  database,
  username,
  password,
} = CONFIG.mongodb;

const url = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=${database}`;
mongoose.connect(url, {
  useMongoClient: true,
});

const app = new Koa();
const router = Router();

app.use(logger());
app.use(cors());
app.use(bodyParser());

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(8888, () => {
  console.info('Baka is running on port 8888, excited');
});

// 定时爬取github treding
schedule.githubTrending();
