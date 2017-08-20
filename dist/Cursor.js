'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _readableStream = require('readable-stream');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Cursor extends _readableStream.Readable {

  constructor(collection, namespace, command, options) {
    super({ objectMode: true, highWaterMark: 0 });
    this.db = collection.db;
    this.collection = collection;
    this.namespace = namespace;
    this.command = command;
    this.options = options;
  }

  batchSize(n) {
    this.command.batchSize = n;
    return this;
  }

  connect() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (this._cursor) {
            _context.next = 7;
            break;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(this.db.connect());

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
    }, null, this);
  }

  count() {
    var result;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(this.collection.runCommand('count', { query: this.command.query }));

        case 2:
          result = _context2.sent;
          return _context2.abrupt('return', result.n);

        case 4:
        case 'end':
          return _context2.stop();
      }
    }, null, this);
  }

  destroy() {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (this.cursor) {
            cursor.close();
          }

        case 1:
        case 'end':
          return _context3.stop();
      }
    }, null, this);
  }

  explain() {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          this.command.query = { $query: this.command.query || {}, $explain: 1 };
          _context4.next = 3;
          return regeneratorRuntime.awrap(this.next());

        case 3:
          return _context4.abrupt('return', _context4.sent);

        case 4:
        case 'end':
          return _context4.stop();
      }
    }, null, this);
  }

  forEach(action) {
    var item;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          item = null;

        case 1:
          _context5.next = 3;
          return regeneratorRuntime.awrap(this.next());

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
    }, null, this);
  }

  forEachAsync(action) {
    var item;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          item = null;

        case 1:
          _context6.next = 3;
          return regeneratorRuntime.awrap(this.next());

        case 3:
          if (!(item = _context6.sent)) {
            _context6.next = 8;
            break;
          }

          _context6.next = 6;
          return regeneratorRuntime.awrap(action(item));

        case 6:
          _context6.next = 1;
          break;

        case 8:
        case 'end':
          return _context6.stop();
      }
    }, null, this);
  }

  limit(n) {
    this.command.limit = n;
    return this;
  }

  map(mapFunction) {
    var result, item;
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          result = [];
          item = null;

        case 2:
          _context7.next = 4;
          return regeneratorRuntime.awrap(this.next());

        case 4:
          if (!(item = _context7.sent)) {
            _context7.next = 12;
            break;
          }

          _context7.t0 = result;
          _context7.next = 8;
          return regeneratorRuntime.awrap(mapFunction(item));

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
    }, null, this);
  }

  next() {
    var cursor;
    return regeneratorRuntime.async(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(this.connect());

        case 2:
          cursor = _context8.sent;
          _context8.next = 5;
          return regeneratorRuntime.awrap(new _bluebird2.default(function (resolve, reject) {
            cursor.next(function (error, result) {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            });
          }));

        case 5:
          return _context8.abrupt('return', _context8.sent);

        case 6:
        case 'end':
          return _context8.stop();
      }
    }, null, this);
  }

  rewind() {
    var cursor;
    return regeneratorRuntime.async(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(this.connect());

        case 2:
          cursor = _context9.sent;

          cursor.rewind();

        case 4:
        case 'end':
          return _context9.stop();
      }
    }, null, this);
  }

  size() {
    var options, result;
    return regeneratorRuntime.async(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          options = _lodash2.default.pick(this.command, ['query', 'limit', 'skip']);
          _context10.next = 3;
          return regeneratorRuntime.awrap(this.collection.runCommand('count', options));

        case 3:
          result = _context10.sent;
          return _context10.abrupt('return', result.n);

        case 5:
        case 'end':
          return _context10.stop();
      }
    }, null, this);
  }

  skip(n) {
    this.command.skip = n;
    return this;
  }

  sort(sortObject) {
    this.command.sort = sortObject;
    return this;
  }

  then() {
    // allows awaiting collection.find() directly.
    let promise = this.toArray();
    return promise.then.apply(promise, Array.prototype.slice.call(arguments));
  }

  toArray() {
    var result, item;
    return regeneratorRuntime.async(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          result = [];
          item = null;

        case 2:
          _context11.next = 4;
          return regeneratorRuntime.awrap(this.next());

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
    }, null, this);
  }

  _read() {
    let self = this;
    self.next().then(function (data) {
      self.push(data);
    }, function (error) {
      self.emit('error', error);
    });
  }
}exports.default = Cursor;
;