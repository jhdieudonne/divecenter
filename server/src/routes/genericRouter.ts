import {NextFunction, Request, Response, Router} from 'express';
import { GenericModel } from '../models/generic';

export default class GenericRouter {
    router: Router;
    ds: any;
    kind: string;
    not_indexed: string[];

    constructor(object: string, not_indexed?: string[]) {
        this.router = Router();
        this.init();
        this.kind = object;
        this.not_indexed = not_indexed != null ? not_indexed : [];
      }

    create(req: Request, res: Response, next: NextFunction) {
      const sm: GenericModel = new GenericModel(this.kind);
      sm.create(req.body, (err: any, data: any) => {
        if (err) {
          next(err);
          return;
        }
        res.status(200).json(data.id);
      }, this.not_indexed);
    }

    get(req: Request, res: Response, next: NextFunction) {
      const sm: GenericModel = new GenericModel(this.kind);
      sm.get(parseInt(req.params.id, 10), (err: any, data: any) => {
        if (err) {
          console.log(err);
          next(err);
          return;
        }
        if (!data || data === undefined) {
          res.status(404).end('NOT_FOUND');
          return;
        }
        res.status(200).json(data);
      })
    }

    list(req: Request, res: Response, next: NextFunction) {
      const sm: GenericModel = new GenericModel(this.kind);
      sm.list((err: any, entities: any, cursor: any) => {
        if (err) {
          console.log(err);
          next(err);
          return;
        }
        res.status(200).json(entities);
      });
    }

    update() {
      // TODO
    }

    delete(req: Request, res: Response, next: NextFunction) {
      const sm: GenericModel = new GenericModel(this.kind);
      sm.delete(parseInt(req.params.id, 10), (err: any, result: any) => {
        if (err) {
          next(err);
          return;
        } else if (result.indexUpdates === 0) {
          res.status(404).end(JSON.stringify({status: 'NOT_FOUND'}));
        } else {
          res.status(200).end(JSON.stringify({status: 'OK'}));
        }
      });
    }

    init() {
        this.router.post('/', this.create.bind(this));
        this.router.get('/:id', this.get.bind(this));
        this.router.get('/', this.list.bind(this));
        this.router.patch('/:id', this.update.bind(this));
        this.router.delete('/:id', this.delete.bind(this));
      }
}
