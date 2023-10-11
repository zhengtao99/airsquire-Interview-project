



import Grid from '@mui/material/Grid';
import React, { useState, useEffect } from "react";
import api from "../hooks/request";
import PanoramaCard from './PanoramaCard';

type Paronoma = {

}

function PanoramaListing(){
  
  const username = "zhengtao";
  const url = `https://localhost:44301/api/panoramas?username=${username}`;

  const [data, setData] = useState<any>([]);

  const requestOptions = {
      // method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({ title: 'React POST Request Example' })
      Username: "zhengtao"
  };

  

  useEffect(() => {
    (async function() {
        const apiData = await api.get(url);
        setData(apiData);
    })()
  }, []);

  useEffect(() => {
    (async function() {
        const user = await api.post(url, requestOptions);
        console.log(user)
    })()
  }, []);
  
    return(
       
          <Grid container spacing={2}>
          {data.map((panorama:any, index:any) => {
            return(
              // <Rating name="customized-10" defaultValue={1} max={1} />
              <Grid item xs={4} md={4}>
                <PanoramaCard 
                  panoramaId = {panorama.PanoramaId}
                  imageTitle = {panorama.ImageTitle}
                  uploadedBy = {panorama.UploadedBy}
                  uploadedDate = {panorama.UploadedDate}
                  isBookmarked = {panorama.IsBookmarked}
                />
              </Grid>
            )
          })}
         </Grid>
      
    )
}

export default PanoramaListing;