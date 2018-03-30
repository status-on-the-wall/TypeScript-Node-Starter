import winston from 'winston';

import {BuildResultTo} from './build-result-to';

export class JenkinsProcessor {
    constructor() {}

    process(data: BuildResultTo) {
        winston.info(JSON.stringify(data));
    }
}
