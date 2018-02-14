import { NextFunction, Request, Response, Router } from 'express';
import genericRouter from './genericRouter';

export class ApiRouter {
  router: Router;

  constructor() {
    this.router = Router();
    const shopRouter = new genericRouter('shop');
    const blenderLogRouter = new genericRouter('blenderLog', ['signature']);
    const bottleRouter = new genericRouter('bottle');
    this.router.use('/shop', shopRouter.router);
    this.router.use('/blenderLog', blenderLogRouter.router);
    this.router.use('/bottle', bottleRouter.router);
  }
}

const apiRouter = new ApiRouter();

export default apiRouter.router;
