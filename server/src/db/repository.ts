import { MongoClient, Collection, ObjectId } from "mongodb";
import { Entity } from "./model";
import { config } from "../utils/config.provider";

export abstract class Repository<TEntity extends Entity> {
    private url: string;

    public constructor(private collection: string) {
        this.url = config.database.url;
    }

    public findOne(query: any): Promise<TEntity> {
        return this.execute<TEntity>((collection, resolve, reject) => {
            collection.findOne(query, (err, res) => {
                if (err) {
                    reject(err);
                }

                resolve(res);
            });
        });
    }

    public findAll(query: any): Promise<TEntity[]> {
        return this.execute<TEntity[]>((collection, resolve, reject) => {
            collection.find(query).toArray((err, res) => {
                if (err) {
                    reject(err);
                }

                resolve(res);
            });
        });
    }

    public add(entity: TEntity): Promise<TEntity> {
        return this.execute<TEntity>((collection, resolve, reject) => {
            let now = new Date();
            entity.createTime = now;
            entity.updateTime = now;
            
            collection.insertOne(entity, (err, res) => {
                if (err) {
                    reject(err);
                }

                collection.findOne({_id: res.insertedId}, (err, newEntity) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(newEntity);
                });
            });
        });
    }

    public remove(entityId: string): Promise<void> {
        return this.execute((collection, resolve, reject) => {
            collection.deleteOne({_id: new ObjectId(entityId)}, (err, res) => {
                if (err) {
                    reject(err);
                }

                resolve();
            });
        });
    }

    public update(entityId: string, entity: TEntity): Promise<TEntity> {
        return this.execute<TEntity>((collection, resolve, reject) => {
            entity.updateTime = new Date();
            collection.updateOne({_id: new ObjectId(entityId)}, entity, (err, res) => {
                if (err) {
                    reject(err);
                }

                collection.findOne({_id: entityId}, (err, newEntity) => {
                    if (err) {
                        reject(err);
                    }
                    
                    resolve(newEntity);
                });
            });
        });
    }

    private execute<TResult>(operation: (collection: Collection, resolve: (res?: TResult) => void, reject: (err: any) => void) => void): Promise<TResult> {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url, (err, db) => {
                if (err) {
                    reject(err);
                }

                operation(db.collection(this.collection), resolve, reject);
                db.close();
            });
        });
    }
}