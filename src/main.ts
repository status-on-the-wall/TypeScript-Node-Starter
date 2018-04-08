import dotenv from 'dotenv';
import {Request, Response} from 'express';
import path from 'path';

import app from './app';
import {myContainer} from './inversify.config';
import {Reader, StatusPage} from './inversify.interfaces';
import {TYPES} from './inversify.types';

// Load environment variables from .env file, where matt connection is configured
dotenv.config({path: '.env'});

/**
 * Configure and start Express server.
 */
const statusPage = myContainer.get<StatusPage>(TYPES.StatusPage);
app.use('/', (req: Request, res: Response) => {
    statusPage.handle(req, res);
});
const server = app.listen(app.get('port'), () => {
    console.log(
        'App is running at http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env')
    );
    console.log('Press CTRL-C to stop\n');
});

/**
 * Start reader
 */
const host = process.env.MQTT_HOST;
const port = process.env.MQTT_PORT;
const username = process.env.MQTT_USERNAME;
const password = process.env.MQTT_PASSWORD;
const topic = process.env.MQTT_TOPIC;

const reader = myContainer.get<Reader>(TYPES.Reader);

reader.configure(host, port, username, password, topic);
reader.start();
