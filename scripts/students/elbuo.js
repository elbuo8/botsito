module.exports = function elbuo(botsito) {
  botsito.logger.info('elbuo was mounted');

  botsito.listen(function(msg) {
    return msg.text.indexOf('pi time') !== -1;
  }, function(res) {
    return res.reply('PIEEEE TIMEEEE: ' + Math.PI);
  });
};
