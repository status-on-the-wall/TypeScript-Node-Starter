import {injectable} from 'inversify';
import winston from 'winston';

import {Status} from '../inversify.interfaces';
import {BranchStatusTo} from './to/branch-status-to';

@injectable()
export class JenkinsStatus implements Status {
    statuses: Map<string, BranchStatusTo> = new Map();

    constructor() {}

    set(branchStatus: BranchStatusTo): void {
        this.statuses.set(branchStatus.branch, branchStatus);

        winston.info('branch status: ' + JSON.stringify(branchStatus));
    }

    get(branch: string): BranchStatusTo {
        return this.statuses.get(branch);
    }
}
