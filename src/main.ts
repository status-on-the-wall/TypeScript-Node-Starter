import app from './app';
import {JenkinsReader} from './actor/jenkins-reader';
import dotenv from 'dotenv';
import path from 'path';
import {JenkinsProcessor} from './usecase/jenkins-processor';

// Load environment variables from .env file, where matt connection is configured
dotenv.config({path: '.env'});

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), () => {
    console.log(
        'App is running at http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env')
    );
    console.log('Press CTRL-C to stop\n');
});

/**
 * Start jenkins reader
 */
const host = process.env.MQTT_HOST;
const port = process.env.MQTT_PORT;
const username = process.env.MQTT_USERNAME;
const password = process.env.MQTT_PASSWORD;
const topic = process.env.MQTT_TOPIC;

const processor = new JenkinsProcessor();
const reader = new JenkinsReader(host, port, username, password, topic);
reader.start(processor);
