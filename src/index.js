import Gaze from 'gaze';
import Glob from 'glob';
import path from 'path';
const DEFAULT_CONFIG = {
  glob: 'mock/**/*.js'
};
export default config => {
  config = {
    ...config,
    ...DEFAULT_CONFIG
  };
  const mockGlob = config.glob;
  const gaze = new Gaze(mockGlob);
  let mock = {};

  function update() {
    mock = {};
    Glob.sync(mockGlob)
      .map(file => {
        try {
          const filePath = path.resolve(file);
          const res = require(filePath);
          delete require.cache[require.resolve(filePath)];
          return res;
        } catch (e) {
          return null;
        }
      })
      .filter(v => !!v)
      .reduce((res, file) => res.concat(Object.keys(file).map(api => ({
        method: api.split(' ')[0],
        uri: api.split(' ')[1],
        fn: file[api]
      }))), [])
      .forEach(api => {
        mock[api.uri] = mock[api.uri] || {};
        mock[api.uri][api.method] = api.fn;
      });
  }
  gaze.on('ready', update);
  gaze.on('all', update);
  update();
  return (req, res, next) => {
    if (mock[req.path] && mock[req.path][req.method]) {
      mock[req.path][req.method](req, res);
    } else {
      next();
    }
  };
};
