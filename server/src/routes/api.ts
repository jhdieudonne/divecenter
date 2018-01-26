import { NextFunction, Request, Response, Router } from 'express';
import genericRouter from './genericRouter';

export class ApiRouter {
  router: Router;

  constructor() {
    this.router = Router();
    const shopRouter = new genericRouter('shop');
    const blenderLogRouter = new genericRouter('blenderLog');
    this.router.use('/shop', shopRouter.router);
    this.router.use('/blenderLog', blenderLogRouter.router);

  }
}

const apiRouter = new ApiRouter();

export default apiRouter.router;
