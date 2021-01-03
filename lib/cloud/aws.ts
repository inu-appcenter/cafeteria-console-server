/**
 * This file is part of INU Cafeteria.
 *
 * Copyright (C) 2020 INU Global App Center <potados99@gmail.com>
 *
 * INU Cafeteria is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * INU Cafeteria is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import AWS from 'aws-sdk';
import config from "../../config";
import {GetLogEventsResponse} from "aws-sdk/clients/cloudwatchlogs";

const cwl = new AWS.CloudWatchLogs({apiVersion: '2010-08-01'});

export function setupAWS() {
    setupAWSGlobalConfig();
}

function setupAWSGlobalConfig() {
    AWS.config.update({
        region: config.aws.region,
        credentials: new AWS.Credentials(config.aws.accessKeyId, config.aws.secretAccessKey),
    });
}

export function getCloudWatchLogs(params: { logGroupName: string, logStreamName: string, startTime: number }): Promise<GetLogEventsResponse> {
    return new Promise((resolve, reject) => {
        cwl.getLogEvents(params, (err, data) => {
            if (err) {
              reject();
            } else {
              resolve(data);
            }
        });
    });
}
