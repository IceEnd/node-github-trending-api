import xml2js from 'xml2js';

const parseXMLAsync = (xml) => {
  if (xml) {
    return new Promise((resolve, reject) => {
      xml2js.parseString(xml, {
        trim: true,
        explicitArray: false,
      }, (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(content);
        }
      });
    });
  }
  return {};
};

export default {
  parseXMLAsync,
};
