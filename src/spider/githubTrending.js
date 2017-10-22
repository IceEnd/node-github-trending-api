import Spider from '../class/Spider';

class GithubTrending extends Spider {
  constructor(props) {
    super(props);
    this.url = 'https://github.com/trending';
    this.protocol = 'https';
  }

  async getData() {
    const $ = await this.getCheerio();
    const $repoList = $('.repo-list li');
    // const data = [];
    $repoList.each(function () {
      const $item = $(this);
      console.log($item.html());
    });
  }
}

const gt = new GithubTrending();

gt.getData();
