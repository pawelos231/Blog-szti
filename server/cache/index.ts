import mongoose from "mongoose";
import {setToCache, getFromCache} from '@server/cache/cache'
//@ts-ignore
mongoose.Query.prototype.cache = async function(){
    this.useCache = true
    return this
}

const exec = mongoose.Query.prototype.exec 


mongoose.Query.prototype.exec = async function(): Promise<any>{

    if(!this.useCache) {
        return exec.apply(this, arguments)
    }
    
    const key: string = JSON.stringify(
        Object.assign({}, this.getQuery(), {
            collection: this.mongooseCollection.name
        })
    )
    
    const cachedValue: any = await getFromCache(key)
   

    if(cachedValue && cachedValue.length !== 0){
        console.log("FROM CACHE")
        const mongoDoc: any = JSON.parse(cachedValue)
      
        const result: any =  Array.isArray(mongoDoc) 
            ? mongoDoc.map(((item: any) => new this.model(item))) 
            : new this.model(mongoDoc)

        return result

    }
   
    const CACHE_TIME = 60
    const result: any = await exec.apply(this, arguments)
    setToCache(key, CACHE_TIME, JSON.stringify(result))
    console.log("FROM MONGO")

    return result
}