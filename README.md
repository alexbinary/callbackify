# callbackify

Minimalist callbackification 👍

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
