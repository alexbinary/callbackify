
let symCallbackified = Symbol.for('alexbinary.callbackified')

function callbackify (arg1, arg2) {
  if (arg2) {
    // callbackify(obj, ['method1', 'method2'])
    arg2.forEach(name => {
      arg1[name] = callbackifyFunction(arg1[name])
    })
    return arg1
  } else {
    // callbackify(func)
    return callbackifyFunction(arg1)
  }
}

function callbackifyFunction (f) {
  if (f[symCallbackified]) return f
  let result = function () {
    let last = arguments[arguments.length - 1]
    let cb = typeof last === 'function' ? last : () => {}
    let p = f.call(this, ...arguments)
    p.then((result) => {
      cb(null, result)
    }).catch((err) => {
      cb(err)
    })
    return p
  }
  result[symCallbackified] = true
  return result
}

module.exports = callbackify
