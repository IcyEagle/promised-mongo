'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toError = toError;

var _mongodbCore = require('mongodb-core');

function toError(error) {
  if (error instanceof Error) {
    return error;
  }

  var msg = error.err || error.errmsg || error.errMessage || error;
  var e = new _mongodbCore.MongoError(msg);

  // Get all object keys
  var keys = typeof error == 'object' ? Object.keys(error) : [];

  if (typeof error === 'object') {
    var _keys = Object.keys(error);

    for (var i = 0; i < _keys.length; i++) {
      e[_keys[i]] = error[_keys[i]];
    }
  }

  return e;
};