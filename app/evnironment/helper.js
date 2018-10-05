const serverConfigs = require("./server.json").configs



module.exports = {
    config: function (configName) {
        config = serverConfigs.find((config) => {
            return config.name == configName
        })
        if (config)
            return config;
        else
            throw new Error("Config missing - " + configName)
    },
    configs: [].concat(serverConfigs)
};