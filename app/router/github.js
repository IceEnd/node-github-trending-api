import GT from '../modal/githubTrending';

const result = {
  retCode: 0,
  retMsg: '',
  retData: {},
};

const getTrending = async (ctx) => {
  const body = result;
  try {
    let data = await GT.findOne({}).sort('-created_at').exec();
    if (!data) {
      data = {};
    }
    body.retData = data;
  } catch (ex) {
    console.warn(ex);
    body.retCode = '10001';
    body.retMsg = 'Oops，服务器忙';
  }
  ctx.body = body;
};

export default {
  getTrending,
};
