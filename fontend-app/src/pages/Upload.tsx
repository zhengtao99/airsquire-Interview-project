import React from "react";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import OrangeButton from '../components/buttons/OrangeButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link} from 'react-router-dom'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import api from "../hooks/request";
import { useState, useEffect } from "react";

function Upload(){

    const url = `https://localhost:44301/api/panoramas`;

    const [selectedImage, setSelectedImage] = useState<any>();

    function handleFileuploadChange(e:any){   
        
        setSelectedImage(e.target.files[0]);
    }

    function handleUploadClick(e:any){
        e.preventDefault();
        const formData = new FormData();

        formData.append('file', selectedImage);
        console.log(selectedImage);
        (async function() {
          const apiData = await api.post(url, formData);
        })()
      }
    return(
        <>
            <Link to='/'>
                <OrangeButton sx={{mr:2}} component="label" variant="contained" startIcon={<ArrowBackIcon />}>
                    Back
                </OrangeButton>
            </Link>
             <Grid sx={{mt:4}} container>
                <Grid item xs={0} md={3}></Grid>
                <Grid item xs={12} md={6}>
                    <Paper variant="elevation" sx={{height:500}} >
                        <Box sx={{py:10, px:4}}>
                            <Typography  variant="h6" sx={{mb:4}} >
                                Upload a Panorama
                            </Typography>
                            <TextField sx={{mb:4}} label="Panorama Title" size="small" fullWidth/>
                            <Typography  variant="subtitle2" gutterBottom>
                                Please ensure the image to have static width:height pixel ratio at 2:1.
                            </Typography>

                            <input
                               
                                type="file"
                                name="myImage"
                                onChange={handleFileuploadChange}
                            />

                            <OrangeButton onClick={handleUploadClick}  sx={{mt:4}} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                Upload
                            </OrangeButton>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={0} md={3}></Grid>
            </Grid>
        </>
    )
}

export default Upload;