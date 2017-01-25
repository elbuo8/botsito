// Description:
//   Respond with Hubot uptime
//
// Dependencies:
//   "ms": "0.7.2"
//
// Author:
//   @elbuo8

const ms = require('ms');
const startTime = Date.now();

module.exports = function healthcheck(robot) {
  robot.router.get('/health', (req, res) => {
    return res.json({
      uptime: ms(Date.now() - startTime),
      autoSave: robot.brain.autoSave
    });
  });

  robot.logger.debug('health endpoint mounted');
}
