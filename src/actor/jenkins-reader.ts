import {inject, injectable} from 'inversify';
import {connect, MqttClient} from 'mqtt';
import winston from 'winston';

import {Processor, Reader} from '../interfaces';
import {TYPES} from '../types';
import {BuildResultTo} from '../usecase/build-result-to';

@injectable()
export class JenkinsReader implements Reader {
    @inject(TYPES.Processor) private processor: Processor;

    private client: MqttClient;

    host: string;
    port: string;
    username: string;
    password: string;
    topic: string;

    configure(host: string, port: string, username: string, password: string, topic: string): void {
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
        this.topic = topic;
    }

    start(): void {
        this.client = connect({
            host: this.host,
            port: this.port,
            username: this.username,
            password: this.password,
        });

        this.client.on('connect', () => {
            winston.info('connected');
            this.client.subscribe(this.topic);
        });

        this.client.on('message', (topic, message) => {
            const messageAsJson: BuildResultTo = JSON.parse(message.toString());
            this.processor.process(messageAsJson);
        });

        this.client.on('error', (error) => {
            winston.error('error: ' + error.message);
        });
    }
}
