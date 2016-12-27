
let expect = require('chai').expect
let callbackify = require('./../src/index')

describe('callbackify', function () {
  describe('function', function () {
    it('success', function (done) {
      // ## Setup
      function f (arg) { return Promise.resolve(arg) }
      // ## TEST
      callbackify(f)(1, (err, result) => {
        // ## Assert
        expect(err).to.be.null
        expect(result).to.equal(1)
        // ## End
        done()
      })
    })
    it('error', function (done) {
      // ## Setup
      function f (arg) { return Promise.reject(arg) }
      // ## TEST
      callbackify(f)(1, (err, result) => {
        // ## Assert
        expect(err).to.equal(1)
        // ## End
        done()
      })
    })
    it('unbound `this`', function (done) {
      // ## Setup
      function f () { return Promise.resolve(this) }
      // ## TEST
      callbackify(f).call({x: 1}, (err, result) => {
        // ## Assert
        expect(err).to.be.null
        expect(result).to.deep.equal({x: 1})
        // ## End
        done()
      })
    })
    it('idempotent', function () {
      // ## Setup
      function f (arg) { return Promise.resolve(arg) }
      // ## TEST
      let callbackifiedOnce = callbackify(f)
      let callbackifiedTwice = callbackify(callbackifiedOnce)
      // ## Assert
      expect(callbackifiedTwice).to.equal(callbackifiedOnce)
      // ## End
    })
    describe('keep promise style', function () {
      it('success', function (done) {
        // ## Setup
        function f (arg) { return Promise.resolve(arg) }
        // ## TEST
        callbackify(f)(1).then((result) => {
          // ## Assert
          expect(result).to.equal(1)
          // ## End
        }).then(() => done()).catch(done)
      })
      it('error', function (done) {
        // ## Setup
        function f (arg) { return Promise.reject(arg) }
        // ## TEST
        callbackify(f)(1).catch((err) => {
          // ## Assert
          expect(err).to.equal(1)
          // ## End
        }).then(() => done()).catch(done)
      })
    })
  })
  describe('object methods', function () {
    it('callbackify', function (done) {
      // ## Setup
      let obj = {
        func1 () { return Promise.resolve(this) },
        func2 () { return Promise.resolve(this) }
      }
      // ## TEST
      callbackify(obj, ['func1', 'func2'])
      obj.func1((err, result) => {
        // ## Assert
        expect(err).to.be.null
        expect(result).to.equal(obj)
        // ## TEST
        obj.func2((err, result) => {
          // ## Assert
          expect(err).to.be.null
          expect(result).to.equal(obj)
          // ## End
          done()
        })
      })
    })
    it('keep promise style', function (done) {
      // ## Setup
      let obj = {
        func1 () { return Promise.resolve(this) },
        func2 () { return Promise.resolve(this) }
      }
      // ## TEST
      callbackify(obj, ['func1', 'func2'])
      Promise.all([
        obj.func1().then((result) => {
          // ## Assert
          expect(result).to.equal(obj)
        }),
        // ## TEST
        obj.func2().then((result) => {
          // ## Assert
          expect(result).to.equal(obj)
        })
        // ## End
      ]).then(() => done()).catch(done)
    })
    it('return object', function () {
      // ## Setup
      let obj = {
        func1 () { return Promise.resolve(this) },
        func2 () { return Promise.resolve(this) }
      }
      // ## TEST
      let result = callbackify(obj, ['func1', 'func2'])
      // ## Assert
      expect(result).to.equal(obj)
      // ## End
    })
  })
})
