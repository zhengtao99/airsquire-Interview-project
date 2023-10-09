import React, { useState, useEffect } from "react";
import api from "../hooks/request";

type Paronoma = {

}

function ParonamaListing(){
    const url = "https://localhost:44301/api/paronamas";

    const [data, setData] = useState([]);

    const requestOptions = {
        // method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ title: 'React POST Request Example' })
    };

    

    // const fetchInfo = () => {
    //     return fetch(url, requestOptions)
    //     .then((res) => res.json())
    //     .then((d) => setData(d))
    // }


  useEffect(() => {
    (async function() {
        const user = await api.post(url, requestOptions);
        console.log(user)
    })()
  }, []);
  
    return(
        <>
         
        </>
    )
}

export default ParonamaListing;