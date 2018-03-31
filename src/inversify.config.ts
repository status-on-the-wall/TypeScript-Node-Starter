import 'reflect-metadata';

import { Container } from 'inversify';

import { JenkinsReader } from './actor/jenkins-reader';
import { Processor, Reader } from './interfaces';
import { TYPES } from './types';
import { JenkinsProcessor } from './usecase/jenkins-processor';

const myContainer = new Container();
myContainer.bind<Processor>(TYPES.Processor).to(JenkinsProcessor);
myContainer.bind<Reader>(TYPES.Reader).to(JenkinsReader);

export {myContainer};
