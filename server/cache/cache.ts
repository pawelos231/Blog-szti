import {redis} from "./redis"

const fetch = async<T>(key: string, expires: number, data:T) =>{
    const existing: T = await get<T>(key)
    if(existing !== null){
        return existing
    }
    return set(key, expires, data)
}

const get = async<T>(key: string): Promise<T> =>{
    const value: string = await redis.get(key)
    if(value == null){
        return null
    }
    return JSON.parse(value)
}

const set = async<T>(key: string, expires: number, data: T) => {
    const value:T = data
    await redis.set(key, JSON.stringify(value), "EX", expires)
    return value
}

const del = async(key: string): Promise<void> => {
    await redis.del(key)
}

export  {fetch, get, set, del}