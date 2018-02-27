import { NextFunction, Request, Response, Router } from 'express';
import genericRouter from './genericRouter';

export class ApiRouter {
  router: Router;

  constructor() {
    this.router = Router();
    const shopRouter = new genericRouter('shop');
    const blenderLogRouter = new genericRouter('blender-blenderMix', ['signature']);
    const bottleRouter = new genericRouter('blender-bottle');
    this.router.use('/shop', shopRouter.router);
    this.router.use('/blender-blenderMix', blenderLogRouter.router);
    this.router.use('/blender-bottle', bottleRouter.router);
  }
}

const apiRouter = new ApiRouter();

export default apiRouter.router;
