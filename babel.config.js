module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
    env: {
      production: {
        plugins: ['transform-remove-console'],
      },
      // development: {  // Apply the plugin in development
      //   plugins: ['transform-remove-console'],
      // },
    },
  };
};
