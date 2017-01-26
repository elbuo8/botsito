const request = require('request');
const cheerio = require('cheerio');

const docsURL = 'https://nodejs.org/dist/latest/docs/api/';

module.exports = function nodejsDocs(robot) {
  request('https://nodejs.org/dist/latest/docs/api/', (err, res, body) => {
    if (err || res.statusCode !== 200) {
      return robot.logger.error('could not mount nodejs docs script');
    }

    const $ = cheerio.load(body);
    const apis = $('#apicontent').find('ul').eq(1).find('a').map(function(i, el) {
      return $(el).attr('href').split('.')[0];
    }).get();


    robot.logger.debug('nodejs docs installed');
    robot.respond(new RegExp(`(node) (${apis.join('|')})`, 'i'), (msg) => {
      const api = msg.match[2];
      return msg.send(`${docsURL}${api}.html`);
    });
  });
};
