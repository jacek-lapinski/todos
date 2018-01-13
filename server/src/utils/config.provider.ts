interface AppConfig {
    port: number;
}

interface DatabaseConfig {
    url: string
}

interface MainConfig {
    app: AppConfig,
    database: DatabaseConfig
}

let environment = process.env.NODE_ENV.trim();
let json: MainConfig;
switch(environment) {
    case "development":
        json = <MainConfig>require("json-loader!../../config/development.config.json");
        break;
    default:
        throw `Unknown environment '${environment}'. Cannot load configuration.`
}

export const config = json;