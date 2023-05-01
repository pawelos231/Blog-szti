import { useState, useEffect, useRef } from "react";
import * as METHODS from "@constants/reqMeth"
import { NextRouter } from "next/router";
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
          console.log(fetchOptions)

          try{
            const res: Response = await fetch(url, fetchOptions)

            if(res.status === UNATHORIZED && router){
              router.push("/")
              abortControllerRef.current?.abort();
            }
            
            const dataFromFetch: T = await res.json()

            setData(dataFromFetch)

          } 
          catch(err){
            setError(err)
          } finally {
            setLoading(false)
          }
       
    }
    fetchData()
    clearState()
    return () => {
        abortControllerRef.current?.abort();
      };
 }, [url])

 return {data, loading, error}

}

export default useFetch;
