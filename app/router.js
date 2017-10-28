import Router from 'koa-router';
import Github from './router/github';

export default () => {
  const router = new Router({
    prefix: '/api',
  });
  router.get('/github/trending', Github.getTrending);

  return router;
};
