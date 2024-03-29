import mongoose from "mongoose";
import { setToCache, getFromCache } from "@server/cache/cache";

type CacheOptions = {
  TIME: number;
};

const execQuery = mongoose.Query.prototype.exec;
const execAggregate = mongoose.Aggregate.prototype.exec;

//@ts-ignore
mongoose.Aggregate.prototype.cache = async function (
  cacheOptions: CacheOptions = { TIME: 60 }
) {
  this.useCache = true;
  this.cacheOptions = cacheOptions;
  return this;
};

//@ts-ignore
mongoose.Query.prototype.cache = async function (
  cacheOptions: CacheOptions = { TIME: 60 }
) {
  this.useCache = true;
  this.cacheOptions = cacheOptions;
  return this;
};

mongoose.Aggregate.prototype.exec = async function (): Promise<any> {
  if (!this.useCache) {
    return execAggregate.call(this, ...arguments);
  }

  const key: string = JSON.stringify(
    Object.assign({}, this.pipeline(), {
      cacheOptions: this.cacheOptions,
    })
  );
  const cachedValue: any = await getFromCache(key);

  if (cachedValue && cachedValue.length !== 0) {
    console.log("FROM CACHE");
    const mongoDoc: any = JSON.parse(cachedValue);

    const result: any = Array.isArray(mongoDoc)
      ? mongoDoc.map((item: any) => new this.model(item))
      : new this.model(mongoDoc);

    return result;
  }

  const result: any = await execAggregate.apply(this, arguments);
  setToCache(key, this.cacheOptions.TIME, JSON.stringify(result));
  console.log("FROM MONGO");

  return result;
};

mongoose.Query.prototype.exec = async function (): Promise<any> {
  if (!this.useCache) {
    return execQuery.apply(this, arguments);
  }

  const key: string = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );

  const cachedValue: any = await getFromCache(key);

  if (cachedValue && cachedValue.length !== 0) {
    console.log("FROM CACHE");
    const mongoDoc = JSON.parse(cachedValue);

    const result: any = Array.isArray(mongoDoc)
      ? mongoDoc.map((item) => new this.model(item))
      : new this.model(mongoDoc);

    return result;
  }

  const result: any = await execQuery.call(this, ...arguments);
  setToCache(key, this.cacheOptions.TIME, JSON.stringify(result));
  console.log("FROM MONGO");

  return result;
};
