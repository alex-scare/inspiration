module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'babel-plugin-module-resolver',
        {
          alias: {
            '@app/components': './packages/components',
            '@app/screens': './packages/screens',
            '@app/core': './packages/core',
            '@app/theme': './packages/theme',
            '@app/app': './packages/app',
          },
        },
      ],
    ],
  };
};
