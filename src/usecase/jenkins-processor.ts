import {inject, injectable} from 'inversify';
import winston from 'winston';

import {Configuration, Processor, Status} from '../inversify.interfaces';
import {TYPES} from '../inversify.types';
import {BranchStatusEnum} from './enum/branch-status-enum';
import {BuildStatusEnum} from './enum/build-status-enum';
import {BranchStatusTo} from './to/branch-status-to';
import {BuildConfigurationTo} from './to/build-configuration-to';
import {BuildResultTo} from './to/build-result-to';

@injectable()
export class JenkinsProcessor implements Processor {
    @inject(TYPES.Configuration) private configuration: Configuration;
    @inject(TYPES.Status) private status: Status;

    process(data: BuildResultTo): void {
        winston.info('json: ' + JSON.stringify(data));

        const buildsConfiguration = this.configuration.get();
        for (let buildConfiguration of buildsConfiguration) {
            if (data.jobName.match(new RegExp(buildConfiguration.branch, 'g'))) {
                winston.info('build configuration found for branch: ' + buildConfiguration.branch);
                this.updateBuildStatus(buildConfiguration, data);
            }
        }
    }

    updateBuildStatus(buildConfiguration: BuildConfigurationTo, buildResult: BuildResultTo): void {
        winston.info('updating build status');

        var branchStatus: BranchStatusTo = this.status.get(buildConfiguration.branch);

        if (branchStatus) {
            branchStatus.statuses.set(buildResult.jobName, buildResult.status);
            switch (buildResult.status) {
                case BuildStatusEnum.CHANGED:
                case BuildStatusEnum.SUCCESS:
                    if (branchStatus.status !== BranchStatusEnum.ALL_SUCCESS) {
                        branchStatus.status = this.calculateBranchStatus(branchStatus.statuses);
                    }
                    break;
                case BuildStatusEnum.FAILURE:
                case BuildStatusEnum.UNSTABLE:
                    if (branchStatus.status !== BranchStatusEnum.ALL_FAILURE) {
                        branchStatus.status = this.calculateBranchStatus(branchStatus.statuses);
                    }
                    break;
                default:
                    new Error('Unknown build status: ' + buildResult.status);
            }
        } else {
            const statuses = new Map().set(buildResult.jobName, buildResult.status);
            branchStatus = {
                branch: buildConfiguration.branch,
                status: this.calculateBranchStatus(statuses),
                statuses: statuses
            };
        }

        winston.info('branch status: ' + JSON.stringify(branchStatus));
        this.status.set(branchStatus);
    }

    calculateBranchStatus(statuses: Map<string, BuildStatusEnum>): BranchStatusEnum {
        var foundSuccess = false;
        var foundFailure = false;

        for (let status of statuses.values()) {
            switch (status) {
                case BuildStatusEnum.CHANGED:
                case BuildStatusEnum.SUCCESS:
                    foundSuccess = true;
                    break;
                case BuildStatusEnum.FAILURE:
                case BuildStatusEnum.UNSTABLE:
                    foundFailure = true;
                    break;
                default:
                    new Error('Unknown build status: ' + status);
            }
            winston.info('status: ' + status + ', foundSuccess: ' + foundSuccess + ', foundFailure: ' + foundFailure);
        }

        if (foundSuccess && !foundFailure) {
            return BranchStatusEnum.ALL_SUCCESS;
        } else if (!foundSuccess && foundFailure) {
            return BranchStatusEnum.ALL_FAILURE;
        } else {
            return BranchStatusEnum.MIXED;
        }
    }
}
