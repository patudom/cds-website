module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
          args[0].title = "Cosmic Data Stories";
          return args;
      });
  },
  publicPath: process.env.NODE_ENV === "production" ? "/cds-website/" : "/",
};
