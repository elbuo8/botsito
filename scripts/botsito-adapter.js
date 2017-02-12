
// Description:
//   Respond with an adapter from a student
//
// Author:
//   @elbuo8

function Botsito(robot) {

  this.logger = {
    info: robot.logger.info.bind(robot.logger),
    error: robot.logger.error.bind(robot.logger)
  };

  this.listen = function () {
    const listener = arguments[0];
    arguments[0] = function(msg) {
      if (msg.text) {
        return listener(msg);
      }
    };
    robot.listen.apply(robot, arguments);
  };

  this.brain = {
    get: robot.brain.get.bind(robot.brain),
    set: robot.brain.set.bind(robot.brain)
  };

  return this;
}

module.exports = function botistoProxy(robot) {
  const botsito = new Botsito(robot);

  require('./students/elbuo')(botsito);
};
