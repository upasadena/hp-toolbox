module.exports = {
  publicPath: process.env.VITE_BASE_URL || './',

  // Add this line to sync BASE_URL with publicPath
  configureWebpack: {
    base: process.env.VITE_BASE_URL || './',
  }
};

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('publicPath will be:', process.env.NODE_ENV === 'production' ? '/hp-toolbox/' : '/');
console.log('publicPath2 will be:', process.env.VITE_BASE_URL || '/');
