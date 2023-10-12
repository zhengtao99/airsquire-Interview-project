import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AnalyticsButton from '../components/buttons/AnalyticsButton';
import UploadButton from '../components/buttons/UploadButton';
import PanoramaListing from '../components/home/PanoramaListing'
import BarChartIcon from '@mui/icons-material/BarChart';

import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { useState, useEffect } from "react";

function Home (){

    const [isRefresh, setIsRefresh] = useState<boolean>(false);
    const [searchTitle, setSearchTitle] = useState<string>("");

    const handleSearchClick = (e:any) => {
        e.preventDefault();
        setIsRefresh(!isRefresh);
    }

    const handleSearchTitleChange = (e:any) => {
        setSearchTitle(e.target.value)
    }

    return (
        <>
            <Grid sx={{mb:2}} container spacing={2} >
                <Grid item xs={12} md={4}>
                    <UploadButton sx={{mr:2}} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload
                    </UploadButton>
                    <AnalyticsButton component="label" variant="contained" startIcon={<BarChartIcon />}>
                        Analytics
                    </AnalyticsButton>
                </Grid>
                <Grid item xs={0} md={4}>

                </Grid>
                <Grid item xs={12} md={4}>
                <Paper
                    component="form"
                    sx={{display: 'flex', alignItems: 'center', height:36}}
                >
                    <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Panorama Titles"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    onChange = {handleSearchTitleChange}
                    />
                    <IconButton onClick={handleSearchClick} type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                    </IconButton>
                </Paper>
                </Grid>
            </Grid>
            <PanoramaListing isRefresh = {isRefresh} searchTitle={searchTitle}/>
        </>
    )
}

export default Home;