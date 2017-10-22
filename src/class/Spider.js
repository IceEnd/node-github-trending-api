import cheerio from 'cheerio';
import https from 'https';
import http from 'http';

class Spider {
  constructor(url, protocol) {
    this.url = url;
    this.protocol = protocol;
  }

  fetchPage() {
    const url = this.url;
    let request;
    if (this.protocol === 'http') {
      request = http;
    } else if (this.protocol === 'https') {
      request = https;
    }
    return (new Promise((resolve, reject) => {
      request.get(url, (res) => {
        let html = '';
        res.on('data', (data) => {
          html += data;
        });
        res.on('end', () => {
          resolve(html);
        }).on('error', (err) => {
          reject(err);
        });
      });
    }));
  }

  async getCheerio() {
    const html = await this.fetchPage();
    const $ = await cheerio.load(html);
    return $;
  }
}

export default Spider;
