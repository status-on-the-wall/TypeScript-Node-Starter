import {BranchStatusTo} from './usecase/to/branch-status-to';
import {BuildConfigurationTo} from './usecase/to/build-configuration-to';
import {BuildResultTo} from './usecase/to/build-result-to';

export interface Reader {
    configure(host: string, port: string, username: string, password: string, topic: string): void;
    start(): void;
}

export interface Processor {
    process(data: BuildResultTo): void;
}

export interface Configuration {
    get(): Array<BuildConfigurationTo>;
}

export interface Status {
    set(buildStatus: BranchStatusTo): void;

    get(branch: string): BranchStatusTo;
}
