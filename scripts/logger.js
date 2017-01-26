if (process.env.LOG_KEY) {
  require('now-logs')(process.env.LOG_KEY);
}

module.exports = function noop() {};
