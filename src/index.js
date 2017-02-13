import Gaze from 'gaze';
export default config => {
  const mockGlob = config.glob;
  const gaze = new Gaze(mockGlob);
  let mock = {};

  function updateMock() {
    mock = {};
    glob.sync(mockGlob)
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
  gaze.on('ready', updateMock);
  gaze.on('all', updateMock);
  return (req, res, next) => {
    if (mock[req.path] && mock[req.path][req.method]) {
      mock[req.path][req.method](req, res);
    } else {
      next();
    }
  };
};
