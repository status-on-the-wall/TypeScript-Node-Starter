import 'reflect-metadata';

import {Container} from 'inversify';

import {JenkinsReader} from './actor/jenkins-reader';
import {Configuration, Processor, Reader, Status} from './inversify.interfaces';
import {TYPES} from './inversify.types';
import {JenkinsConfiguration} from './usecase/jenkins-configuration';
import {JenkinsProcessor} from './usecase/jenkins-processor';
import {JenkinsStatus} from './usecase/jenkins-status';

const myContainer = new Container();
myContainer.bind<Processor>(TYPES.Processor).to(JenkinsProcessor);
myContainer.bind<Reader>(TYPES.Reader).to(JenkinsReader);
myContainer.bind<Configuration>(TYPES.Configuration).to(JenkinsConfiguration);
myContainer.bind<Status>(TYPES.Status).to(JenkinsStatus);

export {myContainer};
