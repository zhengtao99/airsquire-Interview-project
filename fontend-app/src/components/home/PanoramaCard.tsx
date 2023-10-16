import React, { useState, useEffect } from "react";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
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

interface PanoramaCardProps {
    panoramaId: number,
    panoramaTitle: string,
    uploadedBy: string,
    uploadedDate: string,
    imagePath: string,
    isBookmarked: boolean
}

export default function PanoramaCard(props: PanoramaCardProps) {

    const username = "zhengtao";
    const url = apiEndPoint_PanoramaBookmarks;
    
    const testUrl = "https://timesofindia.indiatimes.com/thumb/msid-70238371,imgsize-89579,width-400,resizemode-4/70238371.jpg";

    const [isBookmarked, setIsBookmarked] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(()=>{
        if(props.isBookmarked)
        {
            setIsBookmarked(1);
        }
    }, [])

    const handleBookmarkClick = (e:any) => {
        e.preventDefault();
       
        (async function() {
            setIsLoading(true);

            // simulate loading
            await sleep(1000);

            const parameters = {
                "PanoramaId": props.panoramaId,
                "Username": "zhengtao",
                "IsBookmarked": isBookmarked == 1 ? false : true
            };

            const result = await api.put(url, parameters);
            console.log(result);
            if(result)
            {
                setIsBookmarked(isBookmarked == 1 ? 0: 1)
            }

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

    return (
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
            sx={{ height: 140 }}
            image={props.imagePath}
            title={props.panoramaTitle}
        />
        <CardContent>
        
            <Typography gutterBottom variant="h5" component="div">
                {props.panoramaTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                uploaded by {props.uploadedBy}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {props.uploadedDate}
            </Typography>
        </CardContent>
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
    );
}