
let expect = require('chai').expect

let callbackify = require('./../src/index')

describe('callbackify', function () {
  describe('callbackify function', function () {
    it('when function returns success', function (done) {
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
    it('when function returns error', function (done) {
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
    it('keep unbound `this`', function (done) {
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
    it('is idempotent', function (done) {
      // ## Setup
      function f (arg) { return Promise.resolve(arg) }
      // ## TEST
      let callbackifiedOnce = callbackify(f)
      let callbackifiedTwice = callbackify(callbackifiedOnce)
      // ## Assert
      expect(callbackifiedTwice).to.equal(callbackifiedOnce)
      // ## End
      done()
    })
    describe('keep promise style', function () {
      it('function returns success', function (done) {
        // ## Setup
        function f (arg) { return Promise.resolve(arg) }
        // ## TEST
        callbackify(f)(1).then((result) => {
          // ## Assert
          expect(result).to.equal(1)
          // ## End
        }).then(() => done()).catch(done)
      })
      it('function returns error', function (done) {
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
  describe('callbackify object methods', function () {
    it('callbackify methods', function (done) {
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
  })
})
