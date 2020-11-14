import stackTrace from 'stack-trace';
import winston from 'winston';
import path from 'path';

// This will add DailyRotateFile to winston.transports.
// It is needed. Do not remote this line.
import _ from 'winston-daily-rotate-file';
import WinstonCloudwatch from 'winston-cloudwatch';
import AWS from 'aws-sdk';
import config from "../../config";
import {type} from "os";

const format = winston.format;

function getConsoleFormat() {
    return format.combine(format.colorize(), getFileFormat());
}

function getFileFormat() {
    return format.printf((info) =>
        `${info.timestamp} ${info.level}: ${info.message.trim()}`,
    );
}

function getConsoleTransport() {
    return new winston.transports.Console({
        format: getConsoleFormat(),
    });
}

function getCloudwatchTransport(prefix: string) {
    AWS.config.update({
        region: config.aws.region,
        credentials: new AWS.Credentials(config.aws.accessKeyId, config.aws.secretAccessKey),
    });

    return new WinstonCloudwatch({
        logGroupName: config.aws.cloudwatch.logGroupName,
        logStreamName: prefix,
    });
}

function createLogger(transports: winston.transport[]) {
    return winston.createLogger({
        level: 'verbose',
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            format.json(),
        ),
        transports,
    });
}

function stringify(object: any) {
    if (object.stack) {
        // For error objects.
        return object.stack;
    } else if (object.toString) {
        // For those who can be string.
        return object.toString();
    } else if (object) {
        // For an object.
        return JSON.stringify(object);
    } else {
        // Invalid.
        return typeof object;
    }
}

function formatLog(message: string, showCaller=true) {
    const caller = stackTrace.get()[2]; /* to get a real caller */

    if (showCaller) {
        return `${path.basename(caller.getFileName())}:${caller.getFunctionName()}:${caller.getLineNumber()}:${caller.getColumnNumber()}: ${stringify(message)}`;
    } else {
        return `${stringify(message)}`;
    }
}

export default {
    getConsoleTransport,
    getCloudwatchTransport,

    createLogger,

    stringify,
    formatLog,
};
