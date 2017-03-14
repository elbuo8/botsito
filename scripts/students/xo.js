function checkIfDone(game, x, y) {
  // check vertical
  if (game[0][x] === game[1][x] && game[2][x] === game[1][x]) {
    return true;
  }
  // check horizontal
  if (game[y][0] === game[y][1] && game[y][2] === game[y][1]) {
    return true;
  }
  // dirty diagonal check
  if (game[1][1] === '.') {
    return false;
  }
  // check diagonal left to right
  if (game[0][0] === game[1][1] && game[2][2] === game[1][1]) {
    return true;
  }
  // check diagonal right to left
  if (game[0][2] === game[1][1] && game[2][2] === game[2][0]) {
    return true;
  }
  return false;
}

function makeMove(game) {
  var played = false;
  var x;
  var y;
  while(!played) {
    x = Math.floor(Math.random() * 3);
    y = Math.floor(Math.random() * 3);
    if (game[y][x] === '.') {
      played = true;
    }
  }

  return {x: x, y: y};
}

function buildBoard(game) {
  return '\n' + game[0].join(' ') + '\n' + game[1].join(' ') + '\n' + game[2].join(' ');
}

function xo(botsito) {
  botsito.logger.info('xo: module loaded');

  botsito.listen(function(msg) {
    var matched = false;
    if (msg.text.indexOf('xo ') !== -1) {
      matched = true;
    }
    return matched;
  }, function (res) {
    var username = res.envelope.user.name;
    var game = botsito.brain.get('xo:' + username);
    if (!game) {
      game = [
        ['.', '.', '.'],
        ['.', '.', '.'],
        ['.', '.', '.']
      ];
    }

    var coordinates = res.message.text.split('xo').pop();
    var x = coordinates.split(',')[0];
    var y = coordinates.split(',')[1];

    x = parseInt(x, 10);
    y = parseInt(y, 10);

    if (x > 2 || x < 0 || y > 2 || y < 0) {
      return res.reply(':poop: numbers out of range');
    }

    if (game[y][x] !== '.') {
      return res.reply('someone already played that!');
    }

    game[y][x] = 'X';

    if (checkIfDone(game, x, y)) {
      botsito.brain.set('xo:' + username, null);
      return res.reply(username + ' you won!');
    }

    var botMove = makeMove(game);
    game[botMove.y][botMove.x] = '0';
    if (checkIfDone(game, botMove.x, botMove.y)) {
      botsito.brain.set('xo:' + username, null);
      return res.reply(username + ' I won!');
    }

    botsito.brain.set('xo:' + username, game);
    var board = buildBoard(game);
    return res.reply(board);
  });
}

module.exports = xo;
