'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mongodbCore = require('mongodb-core');

var _mongodbCore2 = _interopRequireDefault(_mongodbCore);

var _parseMongoUrl = require('parse-mongo-url');

var _parseMongoUrl2 = _interopRequireDefault(_parseMongoUrl);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Collection = require('./Collection');

var _Collection2 = _interopRequireDefault(_Collection);

var _Cursor = require('./Cursor');

var _Cursor2 = _interopRequireDefault(_Cursor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Server = _mongodbCore2.default.Server;
const ReplSet = _mongodbCore2.default.ReplSet;
const MongoCR = _mongodbCore2.default.MongoCR;

class Database {
  constructor(connectionString, options, collections) {
    let self = this;

    if (Array.isArray(options)) {
      collections = options;
      options = {};
    }

    self.options = options || {};

    if (typeof connectionString === 'string') {
      self.config = (0, _parseMongoUrl2.default)(connectionString);
    } else {
      self.config = connectionString;
    }

    let db_options = self.config.db_options;
    let writeConcern = { w: 1 };

    if (db_options) {
      writeConcern = _lodash2.default.pick(db_options, ['w', 'j', 'fsync', 'wtimeout']);

      if (writeConcern.w === undefined) {
        writeConcern.w = 1;
      }
    }

    Object.defineProperty(self, 'writeConcern', {
      writable: false,
      value: writeConcern
    });

    if (collections) {
      collections.forEach(function (collection) {
        self[collection] = self.collection(collection);

        // set up members to enable db.foo.bar.collection
        let parts = collection.split('.');
        let last = parts.pop();
        let parent = parts.reduce(function (parent, currentPart) {
          return parent[currentPart] = parent[currentPart] || {};
        }, self);

        parent[last] = self.collection(last);
      });
    }
  }

  addUser(user) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(createUser(user));

        case 2:
          return _context.abrupt('return', _context.sent);

        case 3:
        case 'end':
          return _context.stop();
      }
    }, null, this);
  }

  close() {
    var self;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          self = this;
          // don't open a connection just to close it again

          if (!self._serverPromise) {
            _context2.next = 6;
            break;
          }

          _context2.next = 4;
          return regeneratorRuntime.awrap(self._serverPromise);

        case 4:
          _context2.sent.destroy();

          self._serverPromise = null;

        case 6:
        case 'end':
          return _context2.stop();
      }
    }, null, this);
  }

  collection(collectionName) {
    return new _Collection2.default(this, collectionName);
  }

  connect() {
    let self = this;

    // only connect once
    if (self._serverPromise) {
      return self._serverPromise;
    } else {
      return self._serverPromise = new _bluebird2.default(function (resolve, reject) {
        let options = null,
            server = null;
        let config = self.config;

        // create server connection for single server or replica set
        if (config.servers.length === 1) {
          options = config.server_options;
          options.host = config.servers[0].host || 'localhost';
          options.port = config.servers[0].port || 27017;
          options.reconnect = true;
          options.reconnectInterval = 50;
          // values specified in self.options override everything else
          options = _lodash2.default.extend({}, options, self.options);
          server = new Server(options);
        } else {
          options = config.rs_options;
          options.setName = options.rs_name;
          options.reconnect = true;
          options.reconnectInterval = 50;
          options = _lodash2.default.extend({}, options, self.options);
          server = new ReplSet(config.servers, options);
        }

        if (config.auth) {
          server.addAuthProvider('mongocr', new MongoCR());
          // authenticate on connect
          server.on('connect', function (server) {
            server.auth('mongocr', config.dbName, config.auth.user, config.auth.password, function (error, server) {
              if (error) {
                reject(error);
              } else {
                resolve(server);
              }
            });
          });
        } else {
          server.on('connect', function (server) {
            resolve(server);
          });
        }

        server.on('error', function (error) {
          reject(error);
        });

        server.on('timeout', function (error) {
          reject(error);
        });

        server.connect();
      });
    }
  }

  createCollection(name, options) {
    var cmd;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          cmd = _lodash2.default.extend({ create: name }, options || {});
          _context3.next = 3;
          return regeneratorRuntime.awrap(this.runCommand(cmd));

        case 3:
          return _context3.abrupt('return', _context3.sent);

        case 4:
        case 'end':
          return _context3.stop();
      }
    }, null, this);
  }

  createUser(user) {
    var cmd;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (!(typeof user !== 'object')) {
            _context4.next = 2;
            break;
          }

          throw new Error('user param should be an object');

        case 2:
          cmd = _lodash2.default.extend({ createUser: user.user }, user);

          delete cmd.user;
          _context4.next = 6;
          return regeneratorRuntime.awrap(this.runCommand(cmd));

        case 6:
          return _context4.abrupt('return', _context4.sent);

        case 7:
        case 'end':
          return _context4.stop();
      }
    }, null, this);
  }

  dropDatabase() {
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(this.runCommand('dropDatabase'));

        case 2:
          return _context5.abrupt('return', _context5.sent);

        case 3:
        case 'end':
          return _context5.stop();
      }
    }, null, this);
  }

  dropUser(username) {
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(this.runCommand({ dropUser: username }));

        case 2:
          return _context6.abrupt('return', _context6.sent);

        case 3:
        case 'end':
          return _context6.stop();
      }
    }, null, this);
  }

  getCollectionNames() {
    var collection, names;
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          collection = this.collection('system.namespaces');
          _context7.next = 3;
          return regeneratorRuntime.awrap(collection.find({ name: /^((?!\$).)*$/ }).toArray());

        case 3:
          names = _context7.sent;
          return _context7.abrupt('return', names.map(function (name) {
            // trim dbname from front of collection name
            return name.name.substr(name.name.indexOf('.') + 1);
          }));

        case 5:
        case 'end':
          return _context7.stop();
      }
    }, null, this);
  }

  getLastError() {
    return regeneratorRuntime.async(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(this.runCommand('getLastError'));

        case 2:
          return _context8.abrupt('return', _context8.sent.err);

        case 3:
        case 'end':
          return _context8.stop();
      }
    }, null, this);
  }

  getLastErrorObj() {
    return regeneratorRuntime.async(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(this.getLastError());

        case 2:
          return _context9.abrupt('return', _context9.sent);

        case 3:
        case 'end':
          return _context9.stop();
      }
    }, null, this);
  }

  removeUser(username) {
    return regeneratorRuntime.async(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(this.dropUser(username));

        case 2:
          return _context10.abrupt('return', _context10.sent);

        case 3:
        case 'end':
          return _context10.stop();
      }
    }, null, this);
  }

  getSiblingDb(dbName, collections) {
    var db2;
    return regeneratorRuntime.async(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          db2 = new Database(_lodash2.default.assign({}, this.config, { dbName: dbName }), collections);
          _context11.next = 3;
          return regeneratorRuntime.awrap(this.connect());

        case 3:
          db2._serverPromise = _context11.sent;
          return _context11.abrupt('return', db2);

        case 5:
        case 'end':
          return _context11.stop();
      }
    }, null, this);
  }

  runCommand(options) {
    var self, cmd, server;
    return regeneratorRuntime.async(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          self = this;


          if (typeof options === 'string') {
            cmd = options;

            options = {};
            options[cmd] = 1;
          }

          _context12.next = 4;
          return regeneratorRuntime.awrap(self.connect());

        case 4:
          server = _context12.sent;
          _context12.next = 7;
          return regeneratorRuntime.awrap(new _bluebird2.default(function (resolve, reject) {
            server.command(self.config.dbName + '.$cmd', options, function (error, result) {
              if (error) {
                reject(error);
              } else {
                resolve(result.result);
              }
            });
          }));

        case 7:
          return _context12.abrupt('return', _context12.sent);

        case 8:
        case 'end':
          return _context12.stop();
      }
    }, null, this);
  }

  runCommandCursor(command, options) {
    if (!options) {
      options = {};
      options[command] = 1;
    }
    let ns = '$cmd.' + command;
    let collection = new _Collection2.default(this, ns);
    return new _Cursor2.default(collection, this.config.dbName + '.' + ns, options);
  }

  stats(scale) {
    return regeneratorRuntime.async(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          if (scale === undefined) {
            scale = 1;
          }
          _context13.next = 3;
          return regeneratorRuntime.awrap(this.runCommand({ dbStats: 1, scale: scale }));

        case 3:
          return _context13.abrupt('return', _context13.sent);

        case 4:
        case 'end':
          return _context13.stop();
      }
    }, null, this);
  }

  toString() {
    return regeneratorRuntime.async(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          return _context14.abrupt('return', this.config.dbName);

        case 1:
        case 'end':
          return _context14.stop();
      }
    }, null, this);
  }
}exports.default = Database;
;