import winston from 'winston';

import {BuildResultTo} from './build-result-to';
import {Processor} from '../interfaces';
import {injectable} from 'inversify';

@injectable()
export class JenkinsProcessor implements Processor {
    constructor() {}

    process(data: BuildResultTo): void {
        winston.info('json: ' + JSON.stringify(data));
        const decodedJobName = decodeURIComponent(data.jobName);

        winston.info('decodedJobName: ' + decodedJobName);
    }
}
