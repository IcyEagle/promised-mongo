'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Cursor = require('./Cursor.js');

var _Cursor2 = _interopRequireDefault(_Cursor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AggregationCursor extends _Cursor2.default {

  constructor(collection, config) {
    super(collection, config);
  }

  connect() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
        case 'end':
          return _context.stop();
      }
    }, null, this);
  }
}exports.default = AggregationCursor;
;