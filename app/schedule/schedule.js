import schedule from 'node-schedule';
import GithubTrendingSpider from '../spider/GithubTrending';
import GT from '../modal/githubTrending';
import { spider } from '../config.json';

const githubTrending = async () => {
  const interval = spider.interval.githubTrending;
  const rule = new schedule.RecurrenceRule();
  const minute = [];
  for (let i = 0; i < 60; i += interval) {
    minute.push(i);
  }
  rule.minute = minute;
  schedule.scheduleJob(rule, async () => {
    const date = new Date();
    console.log(`${date}爬取github treding`);
    try {
      const gtSpider = new GithubTrendingSpider();
      const data = await gtSpider.getData();
      const gt = new GT(data);
      await gt.save();
      console.log(`${date}爬取github treding，成功！`);
    } catch (ex) {
      console.warn(ex);
      console.log(`${date}爬取github treding，失败！`);
    }
  });
};

export default {
  githubTrending,
};
