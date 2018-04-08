import {injectable} from 'inversify';

import {Status} from '../inversify.interfaces';
import {BranchStatusTo} from './to/branch-status-to';

@injectable()
export class JenkinsStatus implements Status {
    statuses: Map<string, BranchStatusTo> = new Map();

    constructor() {}

    set(branchStatus: BranchStatusTo): void {
        this.statuses.set(branchStatus.branch, branchStatus);
    }

    get(branch: string): BranchStatusTo {
        return this.statuses.get(branch);
    }

    getAll(): BranchStatusTo[] {
        const result: BranchStatusTo[] = new Array();

        for (let status of this.statuses.values()) {
            result.push(status);
        }

        return result;
    }
}
