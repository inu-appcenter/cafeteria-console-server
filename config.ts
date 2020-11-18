import getEnv from "./lib/utils/env";

const allowedHosts = {
    DEBUG: 'http://localhost:9090',
    production: 'https://manage.inu-cafeteria.app',
};

const cookieDomain = {
    DEBUG: 'localhost:9090',
    production: 'inu-cafeteria.app',
};

export default {

    server: {
        port: Number(getEnv('PORT')) || 8081,
    },

    cors: {
        // @ts-ignore
        allow: allowedHosts[getEnv('NODE_ENV')] || allowedHosts.DEBUG
    },

    cookie: {
        // @ts-ignore
        domain: cookieDomain[getEnv('NODE_ENV')] || cookieDomain.DEBUG
    },

    aws: {
        cloudwatch: {
            logGroupName: 'cafeteria-management-server',
        },
        region: 'ap-northeast-2',
        accessKeyId: getEnv('AWS_ACCESS_KEY_ID') || 'an_aws_id',
        secretAccessKey: getEnv('AWS_SECRET_ACCESS_KEY') || 'blahblah',
    },

    sequelize: {
        database: 'cafeteria',
        username: getEnv('DB_USERNAME') || 'potados',
        password: getEnv('DB_PASSWORD') || '1234',
        host: getEnv('DB_HOST') || 'localhost',
        dialect: 'mysql',
        timezone: '+09:00',
        logging: false,
        repositoryMode: true
    },

    auth: {
        key: getEnv('JWT_SECRET_KEY') || 'whatever',
        expiresIn: '24h',

        adminId: getEnv('ADMIN_ID') || 'potados',
        adminPassword: getEnv('ADMIN_PW') || '1234'
    }

}
