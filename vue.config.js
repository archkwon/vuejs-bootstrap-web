module.exports = {
    runtimeCompiler: true,
    productionSourceMap: false,
    publicPath: './',
    lintOnSave: false,
    chainWebpack: config => config.resolve.symlinks(false),
    devServer: {
    public: 'localhost:8081',
    }
};