import Grid from '@mui/material/Grid';
import React, { useState, useEffect } from "react";
import api from "../../hooks/request";
import PanoramaCard from './PanoramaCard';
import { apiEndPoint_Panoramas } from '../../config';
import { sleep } from '../../utilities';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';

interface ParonomaListingProps{
  isRefresh: boolean,
  searchTitle: string
}

function PanoramaListing(props:ParonomaListingProps){
  
  const username = "zhengtao";
  const url = apiEndPoint_Panoramas + `?username=${username}`;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [data, setData] = useState<any>([]);
  
  useEffect(() => {
    refresh();
  }, [props.isRefresh])

  function refresh(){
    let finalUrl = url;
    if(props.searchTitle != "")
    {
        finalUrl = url + `&title=${props.searchTitle}`;
    }
    (async function() {
      setIsLoading(true);

      // simulate loading
      await sleep(1000);

      const apiData = await api.get(finalUrl);
      setData(apiData);

      setIsLoading(false);
    })()
  }
  
    return(
       
          <Grid container spacing={2}>

            {isLoading ? (
              <Container maxWidth="md" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '30vh',
              }}>
                  <CircularProgress size={100}/>
              </Container>
            ):(
              data.map((panorama:any) => {
              console.log(panorama)
              return(
                <Grid item xs={6} md={4}  key={panorama.panoramaId}>
                  <PanoramaCard 
                  
                    panoramaId = {panorama.panoramaId}
                    panoramaTitle = {panorama.panoramaTitle}
                    uploadedBy = {panorama.uploadedBy}
                    uploadedDate = {panorama.uploadedDate}
                    imagePath = {panorama.imagePath}
                    isBookmarked = {panorama.isBookmarked}
                  />
                </Grid>
              )
            })
          )}
         </Grid>
      
    )
}

export default PanoramaListing;