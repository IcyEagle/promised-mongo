'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _mongodbCore = require('mongodb-core');

var _mongodbCore2 = _interopRequireDefault(_mongodbCore);

var _Cursor = require('./Cursor');

var _Cursor2 = _interopRequireDefault(_Cursor);

var _AggregationCursor = require('./AggregationCursor');

var _AggregationCursor2 = _interopRequireDefault(_AggregationCursor);

var _Bulk = require('./Bulk');

var _Bulk2 = _interopRequireDefault(_Bulk);

var _Utils = require('./Utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Code = _mongodbCore2.default.BSON.Code;
const ObjectID = _mongodbCore2.default.BSON.ObjectID;

function indexName(index) {
  return Object.keys(index).map(function (key) {
    return key + '_' + index[key];
  }).join('_');
}

function makeQuery(query) {
  if (typeof query === 'undefined') {
    return {};
  } else if (query instanceof ObjectID || typeof query !== 'object') {
    return { _id: query };
  } else {
    return query;
  }
}

class Collection {
  constructor(db, collectionName) {
    this.db = db;
    this.collectionName = collectionName;
    this.fullCollectionName = db.config.dbName + '.' + collectionName;
    this.defaultWriteOptions = { writeConcern: db.writeConcern, ordered: true };
  }

  aggregate() {
    var pipeline,
        _args = arguments;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          pipeline = Array.prototype.slice.call(_args);
          _context.next = 3;
          return regeneratorRuntime.awrap(this.runCommand('aggregate', { pipeline: pipeline }));

        case 3:
          return _context.abrupt('return', _context.sent.result);

        case 4:
        case 'end':
          return _context.stop();
      }
    }, null, this);
  }

  aggregateCursor() {
    let pipeline = Array.prototype.slice.call(arguments);
    return new _Cursor2.default(this, this.fullCollectionName, {
      aggregate: this.collectionName,
      pipeline: pipeline,
      cursor: { batchSize: 1000 }
    }, { cursor: { batchSize: 1000 } });
  }

  count(query) {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(this.find(query).count());

        case 2:
          return _context2.abrupt('return', _context2.sent);

        case 3:
        case 'end':
          return _context2.stop();
      }
    }, null, this);
  }

  createIndex(index, options) {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          options = _lodash2.default.extend({ name: indexName(index), key: index }, options || {});
          _context3.next = 3;
          return regeneratorRuntime.awrap(this.runCommand('createIndexes', { indexes: [options] }));

        case 3:
          return _context3.abrupt('return', _context3.sent);

        case 4:
        case 'end':
          return _context3.stop();
      }
    }, null, this);
  }

  distinct(key, query) {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(this.runCommand('distinct', { key: key, query: query }));

        case 2:
          return _context4.abrupt('return', _context4.sent.values);

        case 3:
        case 'end':
          return _context4.stop();
      }
    }, null, this);
  }

  drop() {
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(this.runCommand('drop'));

        case 3:
          return _context5.abrupt('return', true);

        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5['catch'](0);

          if (!(_context5.t0.name === 'MongoError' && _context5.t0.message === 'ns not found')) {
            _context5.next = 12;
            break;
          }

          return _context5.abrupt('return', false);

        case 12:
          throw _context5.t0;

        case 13:
        case 'end':
          return _context5.stop();
      }
    }, null, this, [[0, 6]]);
  }

  dropIndex(index) {
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(this.runCommand('dropIndexes', { index: index }));

        case 2:
          return _context6.abrupt('return', _context6.sent);

        case 3:
        case 'end':
          return _context6.stop();
      }
    }, null, this);
  }

  dropIndexes() {
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(this.runCommand('dropIndexes', { index: '*' }));

        case 2:
          return _context7.abrupt('return', _context7.sent);

        case 3:
        case 'end':
          return _context7.stop();
      }
    }, null, this);
  }

  ensureIndex(index, options) {
    return regeneratorRuntime.async(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(this.createIndex(index, options));

        case 2:
          return _context8.abrupt('return', _context8.sent);

        case 3:
        case 'end':
          return _context8.stop();
      }
    }, null, this);
  }

  find(query, projection, options) {
    query = makeQuery(query);
    projection = projection || null;

    options = _lodash2.default.extend({
      find: this.collectionName,
      query: query,
      fields: projection
    }, options || {});

    return new _Cursor2.default(this, this.fullCollectionName, options);
  }

  findAndModify(options) {
    var result;
    return regeneratorRuntime.async(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(this.runCommand('findAndModify', options));

        case 2:
          result = _context9.sent;

          if (!result.lastErrorObject) {
            result.lastErrorObject = { n: 0 };
          }
          return _context9.abrupt('return', result);

        case 5:
        case 'end':
          return _context9.stop();
      }
    }, null, this);
  }

  findOne(query, projection) {
    var cursor, result;
    return regeneratorRuntime.async(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          query = makeQuery(query);
          cursor = this.find(query, projection).limit(1);
          _context10.next = 4;
          return regeneratorRuntime.awrap(cursor.next());

        case 4:
          result = _context10.sent;
          return _context10.abrupt('return', result);

        case 6:
        case 'end':
          return _context10.stop();
      }
    }, null, this);
  }

  getIndexes() {
    var ns;
    return regeneratorRuntime.async(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          ns = this.db.config.dbName + '.system.indexes';
          _context11.next = 3;
          return regeneratorRuntime.awrap(new _Cursor2.default(this, ns, {
            find: ns,
            query: { ns: this.fullCollectionName },
            projection: {}
          }).toArray());

        case 3:
          return _context11.abrupt('return', _context11.sent);

        case 4:
        case 'end':
          return _context11.stop();
      }
    }, null, this);
  }

  group(doc) {
    var cmd;
    return regeneratorRuntime.async(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          cmd = {
            group: {
              ns: this.collectionName,
              key: doc.key,
              initial: doc.initial,
              $reduce: new Code(doc.reduce.toString()),
              out: 'inline',
              cond: doc.cond
            }
          };


          if (doc.finalize) {
            cmd.group.finalize = new Code(doc.finalize.toString());
          }
          if (doc.keys) {
            cmd.group.$keyf = new Code(doc.keys.toString());
          }

          _context12.next = 5;
          return regeneratorRuntime.awrap(this.db.runCommand(cmd));

        case 5:
          return _context12.abrupt('return', _context12.sent.retval);

        case 6:
        case 'end':
          return _context12.stop();
      }
    }, null, this);
  }

  insert(docs) {
    var self, docList, i, server;
    return regeneratorRuntime.async(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          self = this;
          docList = docs;


          if (!Array.isArray(docs)) {
            docList = [docs];
          }

          for (i = 0; i < docList.length; ++i) {
            if (!docList[i]._id) {
              docList[i]._id = ObjectID.createPk();
            }
          }

          _context13.next = 6;
          return regeneratorRuntime.awrap(self.db.connect());

        case 6:
          server = _context13.sent;
          _context13.next = 9;
          return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
            server.insert(self.fullCollectionName, docList, self.defaultWriteOptions, function (error, result) {
              if (error) {
                reject(error);
              } else if (result.result.code) {
                reject((0, _Utils.toError)(result.result));
              } else if (result.result.writeErrors) {
                reject((0, _Utils.toError)(result.result.writeErrors[0]));
              } else {
                resolve(docs);
              }
            });
          }));

        case 9:
          return _context13.abrupt('return', _context13.sent);

        case 10:
        case 'end':
          return _context13.stop();
      }
    }, null, this);
  }

  isCapped() {
    var ns, result;
    return regeneratorRuntime.async(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          ns = this.db.config.dbName + '.system.namespaces';
          _context14.next = 3;
          return regeneratorRuntime.awrap(new _Cursor2.default(this, ns, {
            find: ns,
            query: { name: this.fullCollectionName },
            projection: {}
          }).toArray());

        case 3:
          result = _context14.sent;
          return _context14.abrupt('return', !!(result[0].options && result[0].options.capped));

        case 5:
        case 'end':
          return _context14.stop();
      }
    }, null, this);
  }

  mapReduce(map, reduce, options) {
    return regeneratorRuntime.async(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          options = options || {};
          _context15.next = 3;
          return regeneratorRuntime.awrap(this.runCommand('mapReduce', {
            map: map.toString(),
            reduce: reduce.toString(),
            query: options.query || {},
            out: options.out
          }));

        case 3:
          return _context15.abrupt('return', _context15.sent);

        case 4:
        case 'end':
          return _context15.stop();
      }
    }, null, this);
  }

  reIndex() {
    return regeneratorRuntime.async(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return regeneratorRuntime.awrap(this.runCommand('reIndex'));

        case 2:
          return _context16.abrupt('return', _context16.sent);

        case 3:
        case 'end':
          return _context16.stop();
      }
    }, null, this);
  }

  remove(query, justOne) {
    var self,
        server,
        _args17 = arguments;
    return regeneratorRuntime.async(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          query = makeQuery(query);

          if (_args17.length === 0) {
            query = {};
          }
          if (_args17.length < 2) {
            justOne = false;
          }

          self = this;
          _context17.next = 6;
          return regeneratorRuntime.awrap(self.db.connect());

        case 6:
          server = _context17.sent;
          _context17.next = 9;
          return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
            server.remove(self.fullCollectionName, [{ q: query, limit: justOne ? 1 : 0 }], self.defaultWriteOptions, function (error, result) {
              if (error) {
                reject(error);
              } else {
                resolve(result.result);
              }
            });
          }));

        case 9:
          return _context17.abrupt('return', _context17.sent);

        case 10:
        case 'end':
          return _context17.stop();
      }
    }, null, this);
  }

  runCommand(command, options) {
    var temp;
    return regeneratorRuntime.async(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          temp = {};

          temp[command] = this.collectionName;
          options = _lodash2.default.extend(temp, options || {});
          _context18.next = 5;
          return regeneratorRuntime.awrap(this.db.runCommand(options));

        case 5:
          return _context18.abrupt('return', _context18.sent);

        case 6:
        case 'end':
          return _context18.stop();
      }
    }, null, this);
  }

  save(doc) {
    return regeneratorRuntime.async(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          if (!doc._id) {
            _context19.next = 6;
            break;
          }

          _context19.next = 3;
          return regeneratorRuntime.awrap(this.update({ _id: doc._id }, doc, { upsert: true }));

        case 3:
          return _context19.abrupt('return', doc);

        case 6:
          _context19.next = 8;
          return regeneratorRuntime.awrap(this.insert(doc));

        case 8:
          return _context19.abrupt('return', _context19.sent);

        case 9:
        case 'end':
          return _context19.stop();
      }
    }, null, this);
  }

  stats() {
    return regeneratorRuntime.async(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          _context20.next = 2;
          return regeneratorRuntime.awrap(this.runCommand('collStats'));

        case 2:
          return _context20.abrupt('return', _context20.sent);

        case 3:
        case 'end':
          return _context20.stop();
      }
    }, null, this);
  }

  toString() {
    return this.collectionName;
  }

  update(query, update, options) {
    var self, server;
    return regeneratorRuntime.async(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          query = makeQuery(query);

          self = this;

          if (!options) {
            options = {};
          }

          _context21.next = 5;
          return regeneratorRuntime.awrap(self.db.connect());

        case 5:
          server = _context21.sent;
          _context21.next = 8;
          return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
            options = _lodash2.default.extend({ q: query, u: update }, options);
            server.update(self.fullCollectionName, [options], self.defaultWriteOptions, function (error, result) {
              if (error) {
                reject(error);
              } else if (result.result.code) {
                reject((0, _Utils.toError)(result.result));
              } else if (result.result.writeErrors) {
                reject((0, _Utils.toError)(result.result.writeErrors[0]));
              } else {
                result = result.result;
                // backwards compatibility
                if (!result.updatedExisting && result.nModified === result.n) {
                  result.updatedExisting = true;
                }
                resolve(result);
              }
            });
          }));

        case 8:
          return _context21.abrupt('return', _context21.sent);

        case 9:
        case 'end':
          return _context21.stop();
      }
    }, null, this);
  }
}exports.default = Collection;
;