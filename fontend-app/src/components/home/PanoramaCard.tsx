import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import CircularProgress from '@mui/material/CircularProgress';
import { sleep } from "../../utilities";
import api from '../../hooks/request';
import {apiEndPoint_PanoramaBookmarks} from "../../config";
import axios from 'axios';
import Chip from '@mui/material-next/Chip';
import Stack from '@mui/material/Stack';
import Panorama360View from "../Panorama360View";
import {connect} from "react-redux";

interface PanoramaCardProps {
    panoramaId: number,
    panoramaTitle: string,
    uploadedBy: string,
    uploadedDate: string,
    imagePath: string,
    isBookmarked: boolean,
    data: any[],
    setData: React.Dispatch<any>
}

const mapStateToProps = (state) =>{
    return {
        username: state.username
    }
  }

function PanoramaCard(props:PanoramaCardProps) {

    const url = apiEndPoint_PanoramaBookmarks;

    const [isBookmarked, setIsBookmarked] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [fileType, setFileType] = useState<string>("");
    const [imageDimension, setImageDimension] = useState<string>("");
    const [isOpenDialogue, setIsOpenDialogue]= useState<boolean>(false);

    useEffect(()=>{
        console.log(props.isBookmarked);
        if(props.isBookmarked)
        {
            setIsBookmarked(1);
        }

        if( props.imagePath.split('.').pop() == "jpg")
        {
            setFileType("JPEG");
        }
        
        if( props.imagePath.split('.').pop() == "png")
        {
            setFileType("PNG");
        }
       
        

        (async function() {
            try{
                let image = new Image()
                image.src = props.imagePath.replace("panoramas-small", "panoramas");
                await image.decode();
                setImageDimension(`${image.width} x ${image.height}`);
            }
            catch(err:any){
            }
        })()
    }, [])

    const handleBookmarkClick = (e:any) => {
        e.preventDefault();
       
        (async function() {
            setIsLoading(true);

            // simulate loading
            await sleep(1000);

            const parameters = {
                "PanoramaId": props.panoramaId,
                "Username": props.username,
                "IsBookmarked": isBookmarked == 1 ? false : true
            };

            const result = await api.put(url, parameters);
            if(result)
            {
                const objIndex = props.data.findIndex((obj => obj.panoramaId == props.panoramaId));
                if(isBookmarked == 1)
                {
                    setIsBookmarked(0)
                    props.data[objIndex].isBookmarked = false;
                }
                else{
                    setIsBookmarked(1)
                    props.data[objIndex].isBookmarked = true;
                }
            }
            props.setData([...props.data]);
           
            setIsLoading(false);
        })()   
    }

    const handleDownloadClick = (e:any) => {
        e.preventDefault();
        
        (async function() {
            const imageUrl_HD = props.imagePath.replace("panoramas-small", "panoramas");
            let results = await axios({
                url: imageUrl_HD,
                method: 'GET',
                responseType: 'blob'
             })
             let hidden_a = document.createElement('a');
             hidden_a.href = window.URL.createObjectURL(new Blob([results.data]));
             hidden_a.setAttribute('download', `${props.panoramaTitle}.jpg`);
             document.body.appendChild(hidden_a);
             hidden_a.click();
        })()
    }


    const handleCardClick = (e:any) => {
       setIsOpenDialogue(true);
    }   

    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={handleCardClick}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={props.imagePath}
                    title={props.panoramaTitle}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.panoramaTitle}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{mb:2}}>
                        <Chip size="small" label={fileType} color="tertiary" variant="filled" />
                        {imageDimension != "" &&
                            <Chip size="small" label={imageDimension} color="primary" variant="filled" />
                        }
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                        uploaded by {props.uploadedBy}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {props.uploadedDate}
                    </Typography>
                </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" onClick={handleBookmarkClick}>
                    
                        {isLoading ? (
                            <CircularProgress size={12} thickness={10}/>
                        ):(
                            <Rating name="customized-10" defaultValue={0} value={isBookmarked!} max={1} />
                        )}
                        Bookmark
                    
                    </Button> 
                    <Button onClick={handleDownloadClick} size="small">Download</Button>
                </CardActions>
            </Card>
            <Panorama360View imagePath = {props.imagePath.replace("panoramas-small", "panoramas")} isOpenDialogue={isOpenDialogue} setIsOpenDialogue ={setIsOpenDialogue}/>
        </>
    );
}

export default connect(mapStateToProps, null)(PanoramaCard);