import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AnalyticsButton from '../components/buttons/AnalyticsButton';
import UploadButton from '../components/buttons/UploadButton';
import PanoramaListing from '../components/home/PanoramaListing'
import BarChartIcon from '@mui/icons-material/BarChart';
import Box from '@mui/material/Box';
import React from 'react';


function Home (){
    return (
        <>
            <Box sx={{mb:2}}>
                <UploadButton sx={{mr:2}} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Upload
                </UploadButton>
                <AnalyticsButton component="label" variant="contained" startIcon={<BarChartIcon />}>
                    Analytics
                </AnalyticsButton>
            
            </Box>
            <PanoramaListing/>
        </>
    )
}

export default Home;