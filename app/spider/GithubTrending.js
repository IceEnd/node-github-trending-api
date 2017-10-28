import Spider from '../class/Spider';

export default class GithubTrending extends Spider {
  constructor(props) {
    super(props);
    this.url = 'https://github.com/trending';
    this.protocol = 'https';
  }

  async getData() {
    const $ = await this.getCheerio();
    const $repoList = $('.repo-list li');
    const data = {
      createDate: Date.parse(new Date()),
      repositories: [],
    };
    // const data = [];
    const spaceReg = /\s/ig;
    $repoList.each(function () {
      const $item = $(this);
      const repoText = $item.find('.d-inline-block h3 a').text();
      const contributors = $item.find('.f6.text-gray>span>a').attr('href');
      const $builtBy = $item.find('.f6.text-gray>span>a .avatar');
      const builtBy = [];
      $builtBy.each(function () {
        const $img = $(this);
        builtBy.push({
          avatar: $img.attr('src'),
          userName: $img.attr('title'),
        });
      });
      const starsTotalText = $item.find('.f6.text-gray.mt-2 a').eq(0).text().replace(/\s|,/ig, '');
      const forkTotalText = $item.find('.f6.text-gray.mt-2 a').eq(1).text().replace(/\s|,/ig, '');
      const starsToday = $item.find('.f6.text-gray.mt-2 .d-inline-block.float-sm-right').text().replace(/\s|stars|today|,/ig, '');
      let repoLanguageColor = $item.find('.f6.text-gray.mt-2 .repo-language-color').attr('style');
      if (repoLanguageColor) {
        repoLanguageColor = repoLanguageColor.replace(/^background-color|;$/ig, '');
      } else {
        repoLanguageColor = '';
      }
      data.repositories.push({
        owner: repoText.split(' / ')[0].replace(spaceReg, ''),
        repoName: repoText.split(' / ')[1].replace(spaceReg, ''),
        href: $item.find('.d-inline-block h3 a').attr('href'),
        description: $item.find('.py-1 p').text().replace(/^\s*|\s*$/ig, ''),
        programmingLanguage: $item.find('.f6.text-gray.mt-2 span[itemprop="programmingLanguage"]').text().replace(/\s|,/ig, '') || '',
        repoLanguageColor,
        starsTotal: starsTotalText ? parseInt(starsTotalText, 10) : 0,
        forkTotal: forkTotalText ? parseInt(forkTotalText, 10) : 0,
        starsToday: starsToday ? parseInt(starsToday, 10) : 0,
        contributors,
        builtBy,
      });
    });
    return data;
  }
}
