import Grid from '@mui/material/Grid';
import React, { useState, useEffect } from "react";
import api from "../../hooks/request";
import PanoramaCard from './PanoramaCard';
import { apiEndPoint_Panoramas } from '../../config';
import { sleep } from '../../utilities';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface ParonomaListingProps{
  isRefresh: boolean,
  searchTitle: string
}

function PanoramaListing(props:ParonomaListingProps){
  
  const username = "zhengtao";
  const url = apiEndPoint_Panoramas + `?username=${username}`;
  const [isBookedmarkedChecked, setIsBookmarkedChecked] = useState<boolean>(true);
  const [isUnbookmarkedChecked, setIsUnbookmarkedChecked] = useState<boolean>(true);
  const [bookmarkedCount, setBookmarkedCount]  = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [data, setData] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>([]);
  
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

      const apiData:any = await api.get(finalUrl);
      setData(apiData);
      setBookmarkedCount([...apiData].filter(x => x.isBookmarked).length)
      setIsLoading(false);
    })()
  }

  useEffect(() => {
    if(isBookedmarkedChecked && isUnbookmarkedChecked)
    {
      setFilteredData(data);
    }
    else if(isBookedmarkedChecked)
    {
      setFilteredData([...data].filter(x => x.isBookmarked))
    }
    else if(isUnbookmarkedChecked)
    {
      setFilteredData([...data].filter(x => x.isBookmarked == false))
    }
    else{
      setFilteredData([])
    }
   
  }, [data, isBookedmarkedChecked, isUnbookmarkedChecked])
  
  const handleBookmarkedCheckedChange = (e:any) => {
    setIsBookmarkedChecked(!isBookedmarkedChecked);
  }

  const handleUnbookmarkedCheckedChange = (e:any) => {
    setIsUnbookmarkedChecked(!isUnbookmarkedChecked);
  }
    return(
        <>
          <Grid sx={{mb:2}} container spacing={2} >
            <Grid item xs={12} md={12}>
              <FormGroup row>
                  <FormControlLabel control={<Checkbox onChange={handleBookmarkedCheckedChange} checked={isBookedmarkedChecked} />} label={`Bookmarked (${bookmarkedCount})`} />
                  <FormControlLabel control={<Checkbox onChange={handleUnbookmarkedCheckedChange} checked={isUnbookmarkedChecked} />} label={`Un-bookmarked (${data.length - bookmarkedCount})`} />
              </FormGroup>
              </Grid>
            </Grid>
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
              filteredData.map((panorama:any) => {
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
                    bookmarkedCount = {bookmarkedCount}
                    setBookmarkedCount = {setBookmarkedCount}
                  />
                </Grid>
              )
            })
          )}
         </Grid>
        </>
    )
}

export default PanoramaListing;