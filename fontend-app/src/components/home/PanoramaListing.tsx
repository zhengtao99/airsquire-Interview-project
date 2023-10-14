import Grid from '@mui/material/Grid';
import React, { useState, useEffect } from "react";
import api from "../../hooks/request";
import PanoramaCard from './PanoramaCard';
import { apiEndPoint_Panoramas } from '../../config';



interface ParonomaListingProps{
  isRefresh: boolean,
  searchTitle: string
}

function PanoramaListing(props:ParonomaListingProps){
  
  const username = "zhengtao";
  const url = apiEndPoint_Panoramas + `?username=${username}`;

  const [data, setData] = useState<any>([]);
  
  useEffect(() => {
    refresh();
  }, [props.isRefresh])

  function refresh(){
    let finalUrl = url;
    if(props.searchTitle != "")
    {
        finalUrl = url + `&title='${props.searchTitle}'`;
    }
    (async function() {
      const apiData = await api.get(finalUrl);
      setData(apiData);
    })()
  }
  
    return(
       
          <Grid container spacing={2}>
          {data.map((panorama:any) => {
            console.log(panorama)
            return(
              <Grid item xs={6} md={4}  key={panorama.panoramaId}>
                <PanoramaCard 
                
                  panoramaId = {panorama.panoramaId}
                  imageTitle = {panorama.imageTitle}
                  uploadedBy = {panorama.uploadedBy}
                  uploadedDate = {panorama.uploadedDate}
                  imagePath = {panorama.imagePath}
                  isBookmarked = {panorama.isBookmarked}
                />
              </Grid>
            )
          })}
         </Grid>
      
    )
}

export default PanoramaListing;