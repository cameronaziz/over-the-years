module.exports = function() {
  return {
    name: 'webpack-plugin',
    configureWebpack(_config, isServer, utils) {
      const {getStyleLoaders} = utils;
      return {
        resolve: {
          fallback: {
            os: false,
            fs: false,
            module: false,
            process: require.resolve('process'), 
            path: require.resolve('path-browserify'),
            assert: require.resolve('assert'),
          }
        }
      };
    },
  };
}
