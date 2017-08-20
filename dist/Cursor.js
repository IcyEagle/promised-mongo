'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _readableStream = require('readable-stream');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cursor = function (_Readable) {
  _inherits(Cursor, _Readable);

  function Cursor(collection, namespace, command, options) {
    _classCallCheck(this, Cursor);

    var _this = _possibleConstructorReturn(this, (Cursor.__proto__ || Object.getPrototypeOf(Cursor)).call(this, { objectMode: true, highWaterMark: 0 }));

    _this.db = collection.db;
    _this.collection = collection;
    _this.namespace = namespace;
    _this.command = command;
    _this.options = options;
    return _this;
  }

  _createClass(Cursor, [{
    key: 'batchSize',
    value: function batchSize(n) {
      this.command.batchSize = n;
      return this;
    }
  }, {
    key: 'connect',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this._cursor) {
                  _context.next = 7;
                  break;
                }

                _context.next = 3;
                return this.db.connect();

              case 3:
                _context.t0 = this.namespace;
                _context.t1 = this.command;
                _context.t2 = this.options;
                this._cursor = _context.sent.cursor(_context.t0, _context.t1, _context.t2);

              case 7:
                return _context.abrupt('return', this._cursor);

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function connect() {
        return _ref.apply(this, arguments);
      }

      return connect;
    }()
  }, {
    key: 'count',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.collection.runCommand('count', { query: this.command.query });

              case 2:
                result = _context2.sent;
                return _context2.abrupt('return', result.n);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function count() {
        return _ref2.apply(this, arguments);
      }

      return count;
    }()
  }, {
    key: 'destroy',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this.cursor) {
                  cursor.close();
                }

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function destroy() {
        return _ref3.apply(this, arguments);
      }

      return destroy;
    }()
  }, {
    key: 'explain',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.command.query = { $query: this.command.query || {}, $explain: 1 };
                _context4.next = 3;
                return this.next();

              case 3:
                return _context4.abrupt('return', _context4.sent);

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function explain() {
        return _ref4.apply(this, arguments);
      }

      return explain;
    }()
  }, {
    key: 'forEach',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(action) {
        var item;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                item = null;

              case 1:
                _context5.next = 3;
                return this.next();

              case 3:
                if (!(item = _context5.sent)) {
                  _context5.next = 7;
                  break;
                }

                action(item);
                _context5.next = 1;
                break;

              case 7:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function forEach(_x) {
        return _ref5.apply(this, arguments);
      }

      return forEach;
    }()
  }, {
    key: 'forEachAsync',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(action) {
        var item;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                item = null;

              case 1:
                _context6.next = 3;
                return this.next();

              case 3:
                if (!(item = _context6.sent)) {
                  _context6.next = 8;
                  break;
                }

                _context6.next = 6;
                return action(item);

              case 6:
                _context6.next = 1;
                break;

              case 8:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function forEachAsync(_x2) {
        return _ref6.apply(this, arguments);
      }

      return forEachAsync;
    }()
  }, {
    key: 'limit',
    value: function limit(n) {
      this.command.limit = n;
      return this;
    }
  }, {
    key: 'map',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(mapFunction) {
        var result, item;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                result = [];
                item = null;

              case 2:
                _context7.next = 4;
                return this.next();

              case 4:
                if (!(item = _context7.sent)) {
                  _context7.next = 12;
                  break;
                }

                _context7.t0 = result;
                _context7.next = 8;
                return mapFunction(item);

              case 8:
                _context7.t1 = _context7.sent;

                _context7.t0.push.call(_context7.t0, _context7.t1);

                _context7.next = 2;
                break;

              case 12:
                return _context7.abrupt('return', result);

              case 13:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function map(_x3) {
        return _ref7.apply(this, arguments);
      }

      return map;
    }()
  }, {
    key: 'next',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var cursor;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.connect();

              case 2:
                cursor = _context8.sent;
                _context8.next = 5;
                return new _bluebird2.default(function (resolve, reject) {
                  cursor.next(function (error, result) {
                    if (error) {
                      reject(error);
                    } else {
                      resolve(result);
                    }
                  });
                });

              case 5:
                return _context8.abrupt('return', _context8.sent);

              case 6:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function next() {
        return _ref8.apply(this, arguments);
      }

      return next;
    }()
  }, {
    key: 'rewind',
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var cursor;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.connect();

              case 2:
                cursor = _context9.sent;

                cursor.rewind();

              case 4:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function rewind() {
        return _ref9.apply(this, arguments);
      }

      return rewind;
    }()
  }, {
    key: 'size',
    value: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var options, result;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                options = _lodash2.default.pick(this.command, ['query', 'limit', 'skip']);
                _context10.next = 3;
                return this.collection.runCommand('count', options);

              case 3:
                result = _context10.sent;
                return _context10.abrupt('return', result.n);

              case 5:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function size() {
        return _ref10.apply(this, arguments);
      }

      return size;
    }()
  }, {
    key: 'skip',
    value: function skip(n) {
      this.command.skip = n;
      return this;
    }
  }, {
    key: 'sort',
    value: function sort(sortObject) {
      this.command.sort = sortObject;
      return this;
    }
  }, {
    key: 'then',
    value: function then() {
      // allows awaiting collection.find() directly.
      var promise = this.toArray();
      return promise.then.apply(promise, Array.prototype.slice.call(arguments));
    }
  }, {
    key: 'toArray',
    value: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        var result, item;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                result = [];
                item = null;

              case 2:
                _context11.next = 4;
                return this.next();

              case 4:
                if (!(item = _context11.sent)) {
                  _context11.next = 8;
                  break;
                }

                result.push(item);
                _context11.next = 2;
                break;

              case 8:
                return _context11.abrupt('return', result);

              case 9:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function toArray() {
        return _ref11.apply(this, arguments);
      }

      return toArray;
    }()
  }, {
    key: '_read',
    value: function _read() {
      var self = this;
      self.next().then(function (data) {
        self.push(data);
      }, function (error) {
        self.emit('error', error);
      });
    }
  }]);

  return Cursor;
}(_readableStream.Readable);

exports.default = Cursor;
;