import {connect, MqttClient} from 'mqtt';
import winston from 'winston';
import {JenkinsProcessor} from '../usecase/jenkins-processor';
import {BuildResultTo} from '../usecase/build-result-to';

export class JenkinsReader {
    client: MqttClient;

    host: string;
    port: string;
    username: string;
    password: string;
    topic: string;

    constructor(host: string, port: string, username: string, password: string, topic: string) {
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
        this.topic = topic;
    }

    start(processor: JenkinsProcessor) {
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
            processor.process(messageAsJson);
        });

        this.client.on('error', (error) => {
            winston.error('error: ' + error.message);
        });
    }
}
