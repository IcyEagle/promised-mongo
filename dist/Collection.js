'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Code = _mongodbCore2.default.BSON.Code;
var ObjectID = _mongodbCore2.default.BSON.ObjectID;

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

var Collection = function () {
  function Collection(db, collectionName) {
    _classCallCheck(this, Collection);

    this.db = db;
    this.collectionName = collectionName;
    this.fullCollectionName = db.config.dbName + '.' + collectionName;
    this.defaultWriteOptions = { writeConcern: db.writeConcern, ordered: true };
  }

  _createClass(Collection, [{
    key: 'aggregate',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var pipeline,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                pipeline = Array.prototype.slice.call(_args);
                _context.next = 3;
                return this.runCommand('aggregate', { pipeline });

              case 3:
                return _context.abrupt('return', _context.sent.result);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function aggregate() {
        return _ref.apply(this, arguments);
      }

      return aggregate;
    }()
  }, {
    key: 'aggregateCursor',
    value: function aggregateCursor() {
      var pipeline = Array.prototype.slice.call(arguments);
      return new _Cursor2.default(this, this.fullCollectionName, {
        aggregate: this.collectionName,
        pipeline: pipeline,
        cursor: { batchSize: 1000 }
      }, { cursor: { batchSize: 1000 } });
    }
  }, {
    key: 'count',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(query) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.find(query).count();

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function count(_x) {
        return _ref2.apply(this, arguments);
      }

      return count;
    }()
  }, {
    key: 'createIndex',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(index, options) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                options = _lodash2.default.extend({ name: indexName(index), key: index }, options || {});
                _context3.next = 3;
                return this.runCommand('createIndexes', { indexes: [options] });

              case 3:
                return _context3.abrupt('return', _context3.sent);

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function createIndex(_x2, _x3) {
        return _ref3.apply(this, arguments);
      }

      return createIndex;
    }()
  }, {
    key: 'distinct',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(key, query) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.runCommand('distinct', { key, query });

              case 2:
                return _context4.abrupt('return', _context4.sent.values);

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function distinct(_x4, _x5) {
        return _ref4.apply(this, arguments);
      }

      return distinct;
    }()
  }, {
    key: 'drop',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return this.runCommand('drop');

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
          }
        }, _callee5, this, [[0, 6]]);
      }));

      function drop() {
        return _ref5.apply(this, arguments);
      }

      return drop;
    }()
  }, {
    key: 'dropIndex',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(index) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.runCommand('dropIndexes', { index });

              case 2:
                return _context6.abrupt('return', _context6.sent);

              case 3:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function dropIndex(_x6) {
        return _ref6.apply(this, arguments);
      }

      return dropIndex;
    }()
  }, {
    key: 'dropIndexes',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.runCommand('dropIndexes', { index: '*' });

              case 2:
                return _context7.abrupt('return', _context7.sent);

              case 3:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function dropIndexes() {
        return _ref7.apply(this, arguments);
      }

      return dropIndexes;
    }()
  }, {
    key: 'ensureIndex',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(index, options) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.createIndex(index, options);

              case 2:
                return _context8.abrupt('return', _context8.sent);

              case 3:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function ensureIndex(_x7, _x8) {
        return _ref8.apply(this, arguments);
      }

      return ensureIndex;
    }()
  }, {
    key: 'find',
    value: function find(query, projection, options) {
      query = makeQuery(query);
      projection = projection || null;

      options = _lodash2.default.extend({
        find: this.collectionName,
        query: query,
        fields: projection
      }, options || {});

      return new _Cursor2.default(this, this.fullCollectionName, options);
    }
  }, {
    key: 'findAndModify',
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(options) {
        var result;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.runCommand('findAndModify', options);

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
          }
        }, _callee9, this);
      }));

      function findAndModify(_x9) {
        return _ref9.apply(this, arguments);
      }

      return findAndModify;
    }()
  }, {
    key: 'findOne',
    value: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(query, projection) {
        var cursor, result;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                query = makeQuery(query);
                cursor = this.find(query, projection).limit(1);
                _context10.next = 4;
                return cursor.next();

              case 4:
                result = _context10.sent;
                return _context10.abrupt('return', result);

              case 6:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function findOne(_x10, _x11) {
        return _ref10.apply(this, arguments);
      }

      return findOne;
    }()
  }, {
    key: 'getIndexes',
    value: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        var ns;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                ns = this.db.config.dbName + '.system.indexes';
                _context11.next = 3;
                return new _Cursor2.default(this, ns, {
                  find: ns,
                  query: { ns: this.fullCollectionName },
                  projection: {}
                }).toArray();

              case 3:
                return _context11.abrupt('return', _context11.sent);

              case 4:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function getIndexes() {
        return _ref11.apply(this, arguments);
      }

      return getIndexes;
    }()
  }, {
    key: 'group',
    value: function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(doc) {
        var cmd;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
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
                return this.db.runCommand(cmd);

              case 5:
                return _context12.abrupt('return', _context12.sent.retval);

              case 6:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function group(_x12) {
        return _ref12.apply(this, arguments);
      }

      return group;
    }()
  }, {
    key: 'insert',
    value: function () {
      var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(docs) {
        var self, docList, i, server;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
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
                return self.db.connect();

              case 6:
                server = _context13.sent;
                _context13.next = 9;
                return new Promise(function (resolve, reject) {
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
                });

              case 9:
                return _context13.abrupt('return', _context13.sent);

              case 10:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function insert(_x13) {
        return _ref13.apply(this, arguments);
      }

      return insert;
    }()
  }, {
    key: 'isCapped',
    value: function () {
      var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        var ns, result;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                ns = this.db.config.dbName + '.system.namespaces';
                _context14.next = 3;
                return new _Cursor2.default(this, ns, {
                  find: ns,
                  query: { name: this.fullCollectionName },
                  projection: {}
                }).toArray();

              case 3:
                result = _context14.sent;
                return _context14.abrupt('return', !!(result[0].options && result[0].options.capped));

              case 5:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function isCapped() {
        return _ref14.apply(this, arguments);
      }

      return isCapped;
    }()
  }, {
    key: 'mapReduce',
    value: function () {
      var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(map, reduce, options) {
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                options = options || {};
                _context15.next = 3;
                return this.runCommand('mapReduce', {
                  map: map.toString(),
                  reduce: reduce.toString(),
                  query: options.query || {},
                  out: options.out
                });

              case 3:
                return _context15.abrupt('return', _context15.sent);

              case 4:
              case 'end':
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function mapReduce(_x14, _x15, _x16) {
        return _ref15.apply(this, arguments);
      }

      return mapReduce;
    }()
  }, {
    key: 'reIndex',
    value: function () {
      var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return this.runCommand('reIndex');

              case 2:
                return _context16.abrupt('return', _context16.sent);

              case 3:
              case 'end':
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function reIndex() {
        return _ref16.apply(this, arguments);
      }

      return reIndex;
    }()
  }, {
    key: 'remove',
    value: function () {
      var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(query, justOne) {
        var self,
            server,
            _args17 = arguments;
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
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
                return self.db.connect();

              case 6:
                server = _context17.sent;
                _context17.next = 9;
                return new Promise(function (resolve, reject) {
                  server.remove(self.fullCollectionName, [{ q: query, limit: justOne ? 1 : 0 }], self.defaultWriteOptions, function (error, result) {
                    if (error) {
                      reject(error);
                    } else {
                      resolve(result.result);
                    }
                  });
                });

              case 9:
                return _context17.abrupt('return', _context17.sent);

              case 10:
              case 'end':
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function remove(_x17, _x18) {
        return _ref17.apply(this, arguments);
      }

      return remove;
    }()
  }, {
    key: 'runCommand',
    value: function () {
      var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(command, options) {
        var temp;
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                temp = {};

                temp[command] = this.collectionName;
                options = _lodash2.default.extend(temp, options || {});
                _context18.next = 5;
                return this.db.runCommand(options);

              case 5:
                return _context18.abrupt('return', _context18.sent);

              case 6:
              case 'end':
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function runCommand(_x19, _x20) {
        return _ref18.apply(this, arguments);
      }

      return runCommand;
    }()
  }, {
    key: 'save',
    value: function () {
      var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(doc) {
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                if (!doc._id) {
                  _context19.next = 6;
                  break;
                }

                _context19.next = 3;
                return this.update({ _id: doc._id }, doc, { upsert: true });

              case 3:
                return _context19.abrupt('return', doc);

              case 6:
                _context19.next = 8;
                return this.insert(doc);

              case 8:
                return _context19.abrupt('return', _context19.sent);

              case 9:
              case 'end':
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      function save(_x21) {
        return _ref19.apply(this, arguments);
      }

      return save;
    }()
  }, {
    key: 'stats',
    value: function () {
      var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
        return regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.next = 2;
                return this.runCommand('collStats');

              case 2:
                return _context20.abrupt('return', _context20.sent);

              case 3:
              case 'end':
                return _context20.stop();
            }
          }
        }, _callee20, this);
      }));

      function stats() {
        return _ref20.apply(this, arguments);
      }

      return stats;
    }()
  }, {
    key: 'toString',
    value: function toString() {
      return this.collectionName;
    }
  }, {
    key: 'update',
    value: function () {
      var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(query, _update, options) {
        var self, server;
        return regeneratorRuntime.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                query = makeQuery(query);

                self = this;

                if (!options) {
                  options = {};
                }

                _context21.next = 5;
                return self.db.connect();

              case 5:
                server = _context21.sent;
                _context21.next = 8;
                return new Promise(function (resolve, reject) {
                  options = _lodash2.default.extend({ q: query, u: _update }, options);
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
                });

              case 8:
                return _context21.abrupt('return', _context21.sent);

              case 9:
              case 'end':
                return _context21.stop();
            }
          }
        }, _callee21, this);
      }));

      function update(_x22, _x23, _x24) {
        return _ref21.apply(this, arguments);
      }

      return update;
    }()
  }]);

  return Collection;
}();

exports.default = Collection;
;