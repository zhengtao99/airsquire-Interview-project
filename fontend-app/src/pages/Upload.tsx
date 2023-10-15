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
import {apiEndPoint_Panoramas} from "../config";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { sleep } from '../utilities';

function Upload(){
    const [selectedImage, setSelectedImage] = useState<any>();
    const [panoramaTitle, setPanoramaTitle] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function handleFileuploadChange(e:any){   
        setIsSuccess(false);
        setErrorMsg("");
        setSelectedImage(e.target.files[0]);
      
    }

    function handlePanoramaTitleClick(e:any)
    {
        setIsSuccess(false);
        setErrorMsg("");
    }

    function validateFile(){
        if(panoramaTitle == "")
        {
            const msg = "Please enter a panorama title.";
            setErrorMsg(msg)
            return msg;
        }
        if(selectedImage === undefined || !(selectedImage.type == "image/jpeg" || selectedImage.type ==  "image/png"))
        {
            const msg = "Please upload jpeg or png file only.";
            setErrorMsg(msg)
            return msg;
        }
        
        return "";
    }

    function handleUploadClick(e:any){
        e.preventDefault();  
        const errMsg = validateFile();
        if(errMsg != "")
        {
            console.log("yes")
            return;

        }

        console.log(selectedImage);

        const formData = new FormData();

        formData.append('File', selectedImage);
        formData.append('PanoramaTitle', panoramaTitle);
        formData.append('UploadedBy', "zhengtao");


        (async function() {

            setIsLoading(true);

            // simulate loading
            await sleep(1000);
            
            const apiData:any = await api.post(apiEndPoint_Panoramas, formData);
            if(apiData.success)
            {
                setIsSuccess(true);
            }

            setIsLoading(false);
        })()
    }

    function handlePanoramaTitleChange(e:any)
    {
        setPanoramaTitle(e.target.value);
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
                            <TextField onClick={handlePanoramaTitleClick} onBlur={handlePanoramaTitleChange} sx={{mb:4}} label="Panorama Title" size="small" fullWidth/>
                            <Typography  variant="subtitle2" gutterBottom>
                                Please ensure the image to have static width:height pixel ratio at 2:1.
                            </Typography>

                            <input
                               
                                type="file"
                                name="myImage"
                                onChange={handleFileuploadChange}
                            />
                            {isLoading &&
                            <Box>
                                <CircularProgress  sx={{mt:4}} size={30}/>
                            </Box>
                            }
                            {errorMsg != "" &&
                                <Alert sx={{mt:2}} severity="error">
                                    <strong>{errorMsg}</strong>
                                </Alert>
                            }
                            {isSuccess &&
                                <Alert sx={{mt:2}} severity="success">
                                    <strong>The panorama has been successfully uploaded.</strong>
                                </Alert>
                            }
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