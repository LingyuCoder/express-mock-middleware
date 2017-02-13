'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _gaze = require('gaze');

var _gaze2 = _interopRequireDefault(_gaze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (config) {
  var mockGlob = config.glob;
  var gaze = new _gaze2.default(mockGlob);
  var mock = {};

  function updateMock() {
    mock = {};
    glob.sync(mockGlob).map(function (file) {
      try {
        var filePath = path.resolve(file);
        var res = require(filePath);
        delete require.cache[require.resolve(filePath)];
        return res;
      } catch (e) {
        return null;
      }
    }).filter(function (v) {
      return !!v;
    }).reduce(function (res, file) {
      return res.concat((0, _keys2.default)(file).map(function (api) {
        return {
          method: api.split(' ')[0],
          uri: api.split(' ')[1],
          fn: file[api]
        };
      }));
    }, []).forEach(function (api) {
      mock[api.uri] = mock[api.uri] || {};
      mock[api.uri][api.method] = api.fn;
    });
  }
  gaze.on('ready', updateMock);
  gaze.on('all', updateMock);
  return function (req, res, next) {
    if (mock[req.path] && mock[req.path][req.method]) {
      mock[req.path][req.method](req, res);
    } else {
      next();
    }
  };
};

module.exports = exports['default'];