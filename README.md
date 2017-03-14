# Botsito extension

Extending `botsito` is pretty straight forward. Within the `scripts/students` directory, create a new file. In the file, declare a _named function_. Let's use `a` for the purposes of example.

```js
function a() {

}
```

In order to interact with `botsito`, our function will receive it as a parameter.

```js
function a(botsito) {

}
```

Having `botsito` within our _function scope_ allows us to interact with it. The following methods are available:

### `botsito.logger.info`
Logs to the console. Helpful for debugging.

Takes in a single parameter.
The value of what is gonna be logged.

Returns `undefined`.

```js
function a(botsito) {
  botsito.logger.info('function "a" is being loaded');
}
```
### `botsito.logger.error`
Logs to the console. It's used when we want to inform ourselves that something went wrong.

Takes in a single parameter.
The value of what is gonna be logged.

Returns `undefined`.

```js
function a(botsito) {
  botsito.logger.error(new Error('omg something went wrong'));
}
```

### `botsito.brain.get`
Looks for a previously stored value in `botsito`.

It takes a single parameter.
The `key` used to fetch the value;

Returns the value previously stored.

```js
function a(botsito) {
  var b = botsito.brain.get('my key');
  if (!b) {
    return botsito.logger.error(new Error('b is undefined!'));
  }
}
```

### `botsito.brain.set`
Stores a value within `botsito`.

Takes two parameters.
First parameter is the `key` for which you will look for it later via `botsito.brain.get`.
The second parameter is the value you wish `botsito` to store.

```js
function a(botsito) {
  botsito.brain.set('my key', 'my valueeee');
  var b = botsito.brain.get('my key');
  if (!b) {
    return botsito.logger.error(new Error('b is undefined!'));
  }

  botsito.logger.info(b);
}
```

# `botsito.listen`
Interface in which `botsito` receives messages and acts upon them.

Takes two parameters. Both are functions.

First parameter function receives a single parameter called `msg`. It holds properties like `text` (the message posted) and `user` (the poster of the message). In this function you will determine if you will act upon the `msg` received. This function must return `true` or `false`.

Second parameter function receives a single parameter called `response`. It holds the method `reply` which allows us to write to the channel. This is where you will put the bulk of your logic will live. This function will only be called if the first parameter function returned `true`.

```js
function a(botsito) {

  function validator(msg) {
    var willReply = false;
    if (msg.text.indexOf('pi time') !== -1) {
      willReply = true;
    }
    return willReply;
  }

  function postBack(response) {
    return response.reply('PI TIMEEEEE');
  }

  botsito.listen(validator, postBack);
}
```

This function will listen for messages that include the phrase `pi time` and will reply with `PI TIMEEEEE` to the channel.

## Exposing the function

Once you are satisfied with your function, we need to make it readable. To do so, add the following line at the end of your file:

```js
module.exports = a;
```

That's it! Now your function is ready to join `botsito`.
