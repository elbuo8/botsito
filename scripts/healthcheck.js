// Description:
//   Respond with Hubot uptime
//
// Dependencies:
//   "ms": "0.7.2"
//
// Author:
//   @elbuo8

const fs = require('fs');
const ms = require('ms');
const Nightmare = require('nightmare');

const startTime = Date.now();

module.exports = function healthcheck(robot) {
  robot.router.get('/health', (req, res) => {
    return res.json({
      uptime: ms(Date.now() - startTime),
      autoSave: robot.brain.autoSave
    });
  });

  robot.respond('/statuspage/i', (res) => {
    robot.logger.info(res);
    let n = Nightmare({ show: false });
    n.goto('http://status.botsito.elbou.net/')
      .screenshot('./statuspage.png')
      .end()
      .then(() => {
        robot.logger.debug('image loaded from statuspage');
        res.send('Uploading...');
        robot.adapter.client.web.files.upload('statuspage', {
          file: fs.createReadStream('./statuspage.png'),
          channels: [res.message.room]
        }, (err) => {
          if (err) {
            res.send('Oups...');
          }
        });
      })
      .catch((err) => {
        robot.logger.error(err);
        return res.reply('Something went wrong brah');
      });
  });
};
