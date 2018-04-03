import {injectable} from 'inversify';

import {Configuration} from '../inversify.interfaces';
import {BuildConfigurationTo} from './to/build-configuration-to';

@injectable()
export class JenkinsConfiguration implements Configuration {
    builds: Array<BuildConfigurationTo> = new Array();

    constructor() {
        this.builds.push({
            branch: 'master',
            fromLed: 1,
            toLed: 10,
        });

        this.builds.push({
            branch: 'RELEASE-1',
            fromLed: 11,
            toLed: 20,
        });

        this.builds.push({
            branch: 'RELEASE-2',
            fromLed: 21,
            toLed: 30,
        });

        this.builds.push({
            branch: 'PUMANEXT-1858',
            fromLed: 31,
            toLed: 40,
        });
    }

    get() {
        return this.builds;
    }
}
