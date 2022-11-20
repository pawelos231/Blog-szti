import { useState, useEffect } from "react";

//to implement
/*
class Fetcher{
    constructor(){

    }
}
*/

const useFetch = (url: string, token: string) : [boolean, boolean, any, any] =>{

    const [loading, loadingHandle] = useState<boolean>(true)
    const [data, setDataHandle] = useState<any>({})
    const [err, setErrHandler] = useState<boolean>(false)
    const [errMessage, setErrorMessage] = useState<any>("")

    const clearState = () =>{
        loadingHandle(true)
        setDataHandle({})
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
        .then((data:any) => {
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
