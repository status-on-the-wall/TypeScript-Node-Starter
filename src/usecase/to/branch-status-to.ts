import {BranchStatusEnum} from '../enum/branch-status-enum';
import {BuildStatusEnum} from '../enum/build-status-enum';

export class BranchStatusTo {
    branch: string;
    status: BranchStatusEnum;
    statuses: Map<string, BuildStatusEnum>;
}
