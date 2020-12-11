const px2rem = require('postcss-px2rem');

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          px2rem({
            // 作为当前转换的基数
            remUnit: 75,
          }),
        ],
      },
    },
  },
};
