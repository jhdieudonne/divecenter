import Datastore = require('@google-cloud/datastore');
import { Query, QueryCallback } from '@google-cloud/datastore/query';
import { GetCallback } from '@google-cloud/datastore/request';
import { DatastoreKey } from '@google-cloud/datastore/entity';

var mysql      = require('mysql');
    
        const mySQLconnection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'Sch3ng4n$',
            database : 'abyss'
          });
          mySQLconnection.connect(function(err: any) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        
        console.log('connected as id ' + mySQLconnection.threadId);
    });


export class GenericModelMySQL {
    kind: string;
    constructor(kind:string = "") {
        this.kind = kind;
    }

    public list(cb: any, limit: number = -1, order: string = '', start: string = '') {
        const query = "select * from `"+this.kind+"`;";
        mySQLconnection.query(query, function (error:any, results:any, fields: any) {
            if (error) throw error;
            cb (null, results, true);
          });
    }

    public create(data: any, cb: any, notIndexed: string[]= []) {
        
    }

    public get(id: number, cb: any) {
      
    }

    public delete(id: number, cb: any) {
       
    }
}
