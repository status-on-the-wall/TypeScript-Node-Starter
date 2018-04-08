import {Request, Response} from 'express';
import {injectable} from 'inversify';

import {StatusPage} from '../inversify.interfaces';

@injectable()
export class JenkinsStatusPage implements StatusPage {
    constructor() {}

    handle(req: Request, res: Response): void {
        res.render('home', {
            title: 'Home with status',
        });
    }
}
