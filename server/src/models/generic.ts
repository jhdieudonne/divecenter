import Datastore = require('@google-cloud/datastore');
import { Query, QueryCallback } from '@google-cloud/datastore/query';
import { GetCallback } from '@google-cloud/datastore/request';
import { DatastoreKey } from '@google-cloud/datastore/entity';

export class GenericModel {
    ds: Datastore;
    kind: string;

    constructor(kind: string = '') {
        this.ds = new Datastore({});
        this.kind = kind;
    }

    fromDatastore (obj: any) {
        if (obj[Datastore.KEY]) {
            obj.id = obj[Datastore.KEY].id;
            return obj;
        }
        return {};
    }

    toDatastore (obj: any, nonIndexed: string[]) {
        nonIndexed = nonIndexed || [];
        const results: any[] = [];
        Object.keys(obj).forEach((k) => {
            if (obj[k] === undefined) {
            return;
            }
            results.push({
            name: k,
            value: obj[k],
            excludeFromIndexes: nonIndexed.indexOf(k) !== -1
            });
        });
        return results;
    }

    public list(cb: any, limit: number = -1, order: string = '', start: string = '') {
        const q: Query = this.ds.createQuery(this.kind).limit(100);

        this.ds.runQuery(q, (err, entities: any, nextQuery) => {
            const hasMore = nextQuery.moreResults !== Datastore.NO_MORE_RESULTS ? nextQuery.endCursor : false;
            cb(null, entities.map(this.fromDatastore), hasMore);
        });
    }

    public create(data: any, cb: any, notIndexed: string[]= []) {
        const key = this.ds.key([this.kind]);
        const entity = {
          key: key,
          data: this.toDatastore(data, notIndexed)
        };
        this.ds.save(
          entity,
          (err) => {
            data.id = entity.key.id;
            cb(err, err ? null : data);
          }
        );
    }

    public get(id: number, cb: any) {
        const key: DatastoreKey = this.ds.key([this.kind, id]);
        this.ds.get(key, (err, entity) => {
          if (!err && (!entity || entity === undefined)) {
            cb(null);
          } else if (err) {
            cb(err);
          } else {
            cb(null, this.fromDatastore(entity));
          }
        });
    }

    public delete(id: number, cb: any) {
        const key = this.ds.key([this.kind, id]);
        this.ds.delete(key, cb);
    }
}
