import getEnv from "./lib/utils/env";

export default {

    server: {
        port: Number(getEnv('PORT')) || 8080,
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
    }

}
