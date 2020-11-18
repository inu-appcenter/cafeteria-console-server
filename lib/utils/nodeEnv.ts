import getEnv from "./env";

const envName = 'NODE_ENV';

export function isProduction() {
    return getEnv(envName) === 'production';
}

export function isDebug() {
    return getEnv(envName) === 'DEBUG';
}

export function isTest() {
    return getEnv(envName) === 'test';
}
