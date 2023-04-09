import { useEffect, useState } from "react";


export default function useFetch(url){
    const [data,setData] = useState([])
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        setLoading(true)
        fetch(url).then(response=>response.json())
        .then(response=>{
            setData(response)
            setLoading(false)
        })
        .catch(err=>setError(err))
    },[url])
    return { data, error, loading }
}