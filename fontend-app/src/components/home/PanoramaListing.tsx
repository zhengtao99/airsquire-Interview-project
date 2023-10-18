import Grid from '@mui/material/Grid';
import React, { useState, useEffect, useRef  } from "react";
import api from "../../hooks/request";
import PanoramaCard from './PanoramaCard';
import { apiEndPoint_Panoramas } from '../../config';
import { sleep } from '../../utilities';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ConnectionError from '../ConnectionError';
import {connect} from "react-redux";
import {store} from '../../redux/store';

interface ParonomaListingProps{
  isRefresh: boolean,
  searchTitle: string
}

const mapStateToProps = (state) =>{
  return {
      username: state.username
  }
}


function PanoramaListing(props:ParonomaListingProps){

  const isFirstRender = useRef(true);
  const [isBookedmarkedChecked, setIsBookmarkedChecked] = useState<boolean>(true);
  const [isUnbookmarkedChecked, setIsUnbookmarkedChecked] = useState<boolean>(true);
  const [bookmarkedCount, setBookmarkedCount]  = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const [data, setData] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>([]);
  
  // refresh when search clicked
  useEffect(() => {
    refresh();
  }, [props.isRefresh])

  function refresh(){

    setIsLoading(true);
    setIsError(false);
    
    const url = apiEndPoint_Panoramas + `?username=${props.username}`;
    

    let finalUrl = url;
    if(props.searchTitle != "")
    {
        finalUrl = url + `&title=${props.searchTitle}`;
    }
    (async function() {
      
      // simulate loading
      await sleep(1000);
      try{
        const apiData:any = await api.get(finalUrl);
        setData(apiData);
      }catch{
        setIsError(true);
        setIsLoading(false);
      }
    })()
  }

  // refresh when username changed
  useEffect(()=>{
    refresh();
  },[props.username])


  // filtered by bookmarks and un-bookmarks
  useEffect(() => {
    
    setBookmarkedCount([...data].filter(x => x.isBookmarked).length)
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

    // only stop loading after mounting
    if(!isFirstRender.current){
      setIsLoading(false);
    }
    else{
      isFirstRender.current = false;
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
            {isError && 
              <Grid item xs={12} md={12}>
                <ConnectionError />
              </Grid>}
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
              return(
                <Grid item xs={6} md={4}  key={panorama.panoramaId}>
                  <PanoramaCard 
                  
                    panoramaId = {panorama.panoramaId}
                    panoramaTitle = {panorama.panoramaTitle}
                    uploadedBy = {panorama.uploadedBy}
                    uploadedDate = {panorama.uploadedDate}
                    imagePath = {panorama.imagePath}
                    isBookmarked = {panorama.isBookmarked}
                    data = {data}
                    setData = {setData}
                  />
                </Grid>
              )
            })
          )}
         </Grid>
        </>
    )
}

export default connect(mapStateToProps, null)(PanoramaListing);