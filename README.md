# callbackify

Minimalist callbackification 👍

[![npm](https://img.shields.io/npm/v/@alexbinary/callbackify.svg)](https://www.npmjs.com/package/@alexbinary/callbackify)
[![GitHub release](https://img.shields.io/github/release/alexbinary/callbackify.svg?label="github")](https://github.com/alexbinary/callbackify/releases/latest)

## Install

Install using npm or yarn :

```bash
$ npm install @alexbinary/callbackify
# or
$ yarn add @alexbinary/callbackify
```

## Usage

```javascript
let callbackify = require('@alexbinary/callbackify')

function f () { return Promise.resolve('ok') }

callbackify(f)((err, result) => {
  if (err) console.error(err)
  else console.log(result)  // 'ok'
})

```

## Documentation

```javascript
let callbackify = require('@alexbinary/callbackify')
```

### callbackify(function)

Returns a function that forwards all its arguments to `function` and takes a callback as last argument.

`function` is expected to return a Promise.
If the promise rejects then the callback is called with the error as first argument.
If the promise resolves then the callback is called with null as first argument and then all the resolved arguments (node callback style).

The returned function can still be used with a Promise approach as it still returns the Promise returned by `function` and the callback can be omitted.

This method is idempotent, i.e. if `function` is the result of calling `callbackify` then the returned value is `function` itself. This is done by defining a Symbol property on the returned object and checking for that property before processing.

### callbackify(object, methods)

Replaces methods in given `object` whose names are listed in `methods` by the result of `callbackify(method)`.

Returns `object`.

## Licence

MIT
