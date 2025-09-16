module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/hp-toolbox/' : '/',

  // Add this line to sync BASE_URL with publicPath
  configureWebpack: {
    base: process.env.NODE_ENV === 'production' ? '/hp-toolbox/' : '/',
  }
};

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('publicPath will be:', process.env.NODE_ENV === 'production' ? '/hp-toolbox/' : '/');
