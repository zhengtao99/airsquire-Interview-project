import { Refresh } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import React, { useState, useEffect } from "react";
import api from "../../hooks/request";
import PanoramaCard from './PanoramaCard';

interface ParonomaListingProps{
  isRefresh: boolean,
  searchTitle: string
}

function PanoramaListing(props:ParonomaListingProps){
  
  const username = "zhengtao";
  const url = `https://localhost:44301/api/panoramas?username=${username}&title=${props.searchTitle}`;

  const [data, setData] = useState<any>([]);
  
  useEffect(() => {
    refresh();
  }, [props.isRefresh])

  function refresh(){
    (async function() {
      const apiData = await api.get(url);
      setData(apiData);
    })()
  }
  
    return(
       
          <Grid container spacing={2}>
          {data.map((panorama:any, index:any) => {
            return(
              // <Rating name="customized-10" defaultValue={1} max={1} />
              <Grid item xs={6} md={4}>
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