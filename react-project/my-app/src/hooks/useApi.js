import React, { useState, useEffect } from 'react';

const getList = (query) => {
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            console.log('####query', query);
            resolve([6, 6, 6, 6, 6]);
        }, 3000)
    })
}

const useApi = () =>{
    const [data, setData] = useState([1, 2, 3, 4, 5]);
    const [query, setQuery] = useState('');
    
    useEffect(() =>{
        (async () => {
            const value = await getList(query);
            setData(value)
        })()
    }, [query])
    return [ { data }, setQuery ];
}
export default useApi;
