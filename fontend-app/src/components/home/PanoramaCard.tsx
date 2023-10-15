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
    

    const [isBookmarked, setIsBookmarked] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(()=>{
        if(props.isBookmarked)
        {
            setIsBookmarked(1);
        }
    }, [])

    const handleClick = (e:any) => {
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

    async function refresh(){
        
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
            <Button size="small" onClick={handleClick}>
              
                {isLoading ? (
                    <CircularProgress size={12} thickness={10}/>
                ):(
                    <Rating name="customized-10" defaultValue={0} value={isBookmarked!} max={1} />
                )}
                Bookmark
               
            </Button>
        </CardActions>
        </Card>
    );
}