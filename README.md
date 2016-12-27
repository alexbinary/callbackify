# callbackify

Minimalist callbackification 👍

## Install

Install with npm/yarn :

```
$ npm install https://github.com/alexbinary/callbackify.git

$ yarn add https://github.com/alexbinary/callbackify.git
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
