import {StatusEnum} from './status-enum';

export class BuildResultTo {
    jobName: string;
    buildNumber: number;
    status: StatusEnum;
    timestamp: Date;
}
