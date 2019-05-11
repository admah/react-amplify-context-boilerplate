/* craco.config.js */

module.exports = {
    plugins: [
      {
        plugin: require("craco-antd"),
        options: {
          lessLoaderOptions: {
            noIeCompat: true
          }
        }
      }
    ]
  };