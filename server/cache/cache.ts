import {redis} from "./redis"

const fetch = async<T>(key: string, expires: number, data:T) =>{
    const existing: T = await getFromCache<T>(key)
    if(existing !== null){
        return existing
    }
    return setToCache(key, expires, data)
}

const getFromCache = async<T>(key: string): Promise<T> =>{
    const value: string = await redis.get(key)
    if(value == null){
        return null
    }
    return JSON.parse(value)
}

const setToCache = async<T>(key: string, expires: number, data: T): Promise<T> => {
    const value:T = data
    await redis.set(key, JSON.stringify(value), "EX", expires)
    return value
}

const deleteFromCache = async(key: string): Promise<void> => {
    await redis.del(key)
}

const deleteAllRedisValues = async(): Promise<void> => {
    await redis.flushall()
}

export  {fetch, getFromCache, setToCache, deleteFromCache, deleteAllRedisValues}