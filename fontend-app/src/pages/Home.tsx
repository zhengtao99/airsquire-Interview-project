import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PurpleButton from '../components/buttons/PurpleButton';
import OrangeButton from '../components/buttons/OrangeButton';
import PanoramaListing from '../components/home/PanoramaListing'
import BarChartIcon from '@mui/icons-material/BarChart';

import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';
import {Link} from 'react-router-dom'
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
            <Grid sx={{mb:4}} container spacing={2} >
                <Grid item xs={12} md={4}>
                    <Link to='/upload'>
                        <OrangeButton sx={{mr:2}} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            Upload
                        </OrangeButton>
                    </Link>
                    <PurpleButton component="label" variant="contained" startIcon={<BarChartIcon />}>
                        Analytics
                    </PurpleButton>
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
                    onBlur = {handleSearchTitleChange}
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