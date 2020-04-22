let config = {};

Object.keys(process.env).forEach(key => {
    if (key.startsWith('COMMERCE_')) {
        config[key] = String(process.env[key]);
    }
});

export function setConfig(_config) {
    config = {
        ...config,
        ..._config,
    };
}

export function getConfig() {
    return config;
}
