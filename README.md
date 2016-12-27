# callbackify

Minimalist callbackification 👍

[![npm](https://img.shields.io/npm/v/@alexbinary/callbackify.svg)](https://www.npmjs.com/package/@alexbinary/callbackify)
[![GitHub release](https://img.shields.io/github/release/alexbinary/callbackify.svg?label="github")](https://github.com/alexbinary/callbackify/releases/latest)

## Install

Install using npm or yarn :

```bash
npm install @alexbinary/callbackify
# or
yarn add @alexbinary/callbackify
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

## Licence

MIT
