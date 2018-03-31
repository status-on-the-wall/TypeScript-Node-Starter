import {BuildResultTo} from './usecase/build-result-to';

export interface Reader {
    configure(host: string, port: string, username: string, password: string, topic: string): void;
    start(): void;
}

export interface Processor {
    process(data: BuildResultTo): void;
}
