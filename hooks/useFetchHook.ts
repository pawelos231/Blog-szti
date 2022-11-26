import { useState, useEffect } from "react";
//to implement
/*
class Fetcher{
    constructor(){

    }
}
*/
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
export function useFetch<T>(url: string, token: string) : [boolean, boolean, any, T]{

    const [loading, loadingHandle] = useState<boolean>(true)
    const [data, setDataHandle] = useState<T>(null)
    const [err, setErrHandler] = useState<boolean>(false)
    const [errMessage, setErrorMessage] = useState<any>("")

    const clearState: () => void = () => {
        loadingHandle(true)
        setDataHandle(null)
        setErrHandler(false)
    }
   

    const FetchDataFunction = async () => {
        
       await fetch(url, {
        headers: {
            Authorization: token
        }
       }).then((res : Response)=> {
            if(!res.ok){
                setErrHandler(true)
            }
            return res.json();
        })
        .then((data:T) => {
            setDataHandle(data)
            loadingHandle(false)
        })
        .catch((err: any) => {
            setErrorMessage(err)
            setErrHandler(true)
        })
    }
   

    useEffect(() => {
        FetchDataFunction()
		clearState()
	}, [url]);

    return [loading, err, errMessage, data];
}
export default useFetch;
