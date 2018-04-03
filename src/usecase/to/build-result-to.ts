import {BuildStatusEnum} from '../enum/build-status-enum';

export class BuildResultTo {
    jobName: string;
    buildNumber: number;
    status: BuildStatusEnum;
    timestamp: Date;
}
