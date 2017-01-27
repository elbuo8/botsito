// Description:
//   Find HTML documentation
//
// Commands:
//   hubot html <element>
//
// Examples:
//   hubot html a
//
// Author:
//   @elbuo8

const docsURL = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/';

module.exports = function htmlDocs(robot) {
  robot.logger.debug('html docs installed');
  robot.respond(new RegExp('(html) ([^\s]+)', 'i'), (msg) => {
    const api = msg.match[2];
    return msg.send(`${docsURL}${api}`);
  });
};
