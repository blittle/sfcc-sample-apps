var nodeExternals = require('webpack-node-externals');

module.exports = {
    webpack: config => {
        return addExternals(config);
    },
    webpackDevMiddleware: config => {
        return addExternals(config);
    },
};

function addExternals(config) {
    if (config.target === 'web') {
        config.externals = [...config.externals, 'dns', 'fs', 'net', 'tls'];
    }

    return config;
}
