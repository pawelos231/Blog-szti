import { useState, useEffect, useRef } from "react";
import * as METHODS from "@constants/reqMeth"
import { NextRouter } from "next/router";
import { StatusType, isUserAuthorized } from "@helpers/IsUserAuthorized";
import { UNATHORIZED } from "@constants/statusCodes";

type Methods = typeof METHODS[keyof typeof METHODS]
type FetchOptions = {
    method?: Methods
    headers?: { [key: string]: string };
    body?: string
    signal?: AbortSignal
}

const promise = (ms: number) => new Promise((res, rej) => setTimeout(()=> res(true), ms))


const useFetch = <T>(url: string, headers ={}, router: NextRouter = null) => {

 const [data, setData] = useState<T>(null)
 const [loading, setLoading] = useState<boolean>(true)
 const [error, setError] = useState<Error | null>(null);
console.log(headers)
 const clearState = (): void => {
    setData(null)
    setLoading(true)
    setError(null)
 }

 const abortControllerRef = useRef<AbortController>()

 useEffect(() => {

    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    const fetchData = async (): Promise<void> => {
        const fetchOptions: FetchOptions = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              ...headers,
            },
            signal
          };

          try{
            const res: Response = await fetch(url, fetchOptions)

            isUserAuthorized(res.status as StatusType, router)

            const dataFromFetch: T = await res.json()

            setData(dataFromFetch)

          } 
          catch(err){
            setError(err)
          } finally {
            setLoading(false)
          }
       
    }
    clearState()
    fetchData()
    return () => {
        abortControllerRef.current?.abort();
      };
 }, [url, headers])

 return {data, loading, error}

}

export default useFetch;
