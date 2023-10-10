import React, { useState, useEffect } from "react";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

interface PanoramaCardProps {
    id: number,
    imageTitle: string,
    uploadedBy: string,
    uploadedDate: string,
    isBookmarked: boolean
    // imagePath: string,
    // uploadedBy: string,
    // uploadedDate: string
}

export default function PanoramaCard(props: PanoramaCardProps) {

    const [isBookmarked, setIsBookmarked] = useState<number>(0);

    useEffect(()=>{
        if(props.isBookmarked)
        {
            setIsBookmarked(1);
        }
    }, [])

    const handleClick = (e:any) => {
        e.preventDefault();
        if(isBookmarked == 0)
        {
            setIsBookmarked(1);
        }
        else
        {
            setIsBookmarked(0);
        }
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
            <Button size="small" onClick={handleClick}><Rating name="customized-10" defaultValue={0} value={isBookmarked!} max={1} />Bookmark</Button>
        </CardActions>
        </Card>
    );
}