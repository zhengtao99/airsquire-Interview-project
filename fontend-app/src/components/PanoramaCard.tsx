import React, { useState, useEffect } from "react";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import api from '../hooks/request';

interface PanoramaCardProps {
    panoramaId: number,
    imageTitle: string,
    uploadedBy: string,
    uploadedDate: string,
    isBookmarked: boolean
}

export default function PanoramaCard(props: PanoramaCardProps) {

    const username = "zhengtao";
    const url = `https://localhost:44301/api/panoramabookmarks`;

    

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
       
        setIsLoading(true);
        (async function() {
            const parameters = {
                "PanoramaId": props.panoramaId,
                "Username": "zhengtao",
                "IsBookmarked": isBookmarked == 1 ? false : true
            };

            const result = await api.put(url, parameters);
            if(result == "success")
            {
                setIsBookmarked(isBookmarked == 1 ? 0: 1)
                console.log("yes")
            }
            console.log(result)
        })()
        setIsLoading(false);
    }


    return (
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
            sx={{ height: 140 }}
            image={require("../images/building.jpg")}
            title={props.imageTitle}
        />
        <CardContent>
        
            <Typography gutterBottom variant="h5" component="div">
                {props.imageTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Uploaded by {props.uploadedBy}
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