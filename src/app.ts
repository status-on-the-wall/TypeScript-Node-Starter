import express from 'express';
import path from 'path';

import * as homeController from './controllers/home';

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public'), {maxAge: 31557600000}));

/**
 * Primary app routes.
 */
app.get('/', homeController.index);

export default app;
