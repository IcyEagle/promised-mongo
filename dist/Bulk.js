'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongodbCore = require('mongodb-core');

var _mongodbCore2 = _interopRequireDefault(_mongodbCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bulk = function () {
  function Bulk(collection, ordered) {
    _classCallCheck(this, Bulk);

    this.collection = collection;
    this.ordered = ordered;
    this._currentCommand = null;
    this._commands = [];
  }

  _createClass(Bulk, [{
    key: 'execute',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var self, result, i, cmd, cmdResult;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                self = this;
                result = {
                  writeErrors: [],
                  writeConcernErrors: [],
                  nInserted: 0,
                  nUpdated: 0,
                  nMatched: 0,
                  nModified: 0,
                  nRemoved: 0,
                  upserted: []
                };


                self._commands.push(self._currentCommand);

                i = 0;

              case 4:
                if (!(i < self._commands.length)) {
                  _context.next = 13;
                  break;
                }

                cmd = self._commands[i];
                _context.next = 8;
                return self.collection.db.runCommand(cmd);

              case 8:
                cmdResult = _context.sent;


                if (cmd.update) {
                  result.nUpdated += cmdResult.result.n;
                } else if (cmd.insert) {
                  result.nInserted += cmdResult.result.n;
                } else if (cmd.delete) {
                  result.nRemoved += cmdResult.result.n;
                }

              case 10:
                ++i;
                _context.next = 4;
                break;

              case 13:

                result.ok = 1;
                return _context.abrupt('return', result);

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function execute() {
        return _ref.apply(this, arguments);
      }

      return execute;
    }()
  }, {
    key: 'find',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(query) {
        var findObject, self, remove, update;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                findObject = {};
                self = this;

                remove = function remove(limit) {
                  if (!self._currentCommand) {
                    self._currentCommand = {
                      delete: self.collection.collectionName,
                      deletes: [],
                      ordered: self.ordered,
                      writeConcern: { w: 1 }
                    };
                  } else if (!self._currentCommand.delete) {
                    self._commands.push(self._currentCommand);
                    self._currentCommand = {
                      delete: self.collection.collectionName,
                      deletes: [],
                      ordered: self.ordered,
                      writeConcern: { w: 1 }
                    };
                  }
                  self._currentCommand.deletes.push({ q: query, limit: limit });
                };

                update = function update(updateObject, multiple) {
                  if (!self._currentCommand) {
                    self._currentCommand = {
                      update: self.collection.collectionName,
                      updates: [],
                      ordered: self.ordered,
                      writeConcern: { w: 1 }
                    };
                  } else if (!self._currentCommand.update) {
                    self._commands.push(self._currentCommand);
                    self._currentCommand = {
                      update: self.collection.collectionName,
                      updates: [],
                      ordered: self.ordered,
                      writeConcern: { w: 1 }
                    };
                  }
                  self._currentCommand.updates.push({ q: query, u: updateObject, multi: mulitple, upsert: false });
                };

                findObject.remove = function () {
                  remove(0);
                };
                findObject.removeOne = function () {
                  remove(1);
                };
                findObject.update = function (updateObject) {
                  update(updateObject, true);
                };
                findObject.updateOne = function (updateObject) {
                  update(updateObject, false);
                };

                return _context2.abrupt('return', findObject);

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function find(_x) {
        return _ref2.apply(this, arguments);
      }

      return find;
    }()
  }, {
    key: 'insert',
    value: function insert(doc) {
      var self = this;

      if (!self._currentCommand) {
        self._currentCommand = {
          insert: self.collection.collectionName,
          documents: [],
          ordered: self.ordered,
          writeConcern: { w: 1 }
        };
      } else if (!self._currentCommand.insert) {
        self._commands.push(self._currentCommand);
        self._currentCommand = {
          insert: self.collection.collectionName,
          documents: [],
          ordered: self.ordered,
          writeConcern: { w: 1 }
        };
      }

      if (!doc._id) {
        doc._id = _mongodbCore2.default.BSON.ObjectID.createPk();
      }
      this._currentCommand.documents.push(doc);
    }
  }, {
    key: 'tojson',
    value: function tojson() {
      var result = {
        nInsertOps: 0,
        nUpdateOps: 0,
        nRemoveOps: 0,
        nBatches: this._commands.length
      };

      this._commands.forEach(function (cmd) {
        if (cmd.update) {
          result.nUpdateOps += cmd.updates.length;
        } else if (cmd.insert) {
          result.nInsertOps += cmd.documents.length;
        } else if (cmd.delete) {
          result.nRemoveOps += cmd.deletes.length;
        }
      });

      return result;
    }
  }]);

  return Bulk;
}();

exports.default = Bulk;
;