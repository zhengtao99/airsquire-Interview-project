import React from "react";
import { Outlet } from "react-router-dom";
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { ReactComponent as MyLogo } from '../images/static/mylogo.svg'
import {connect} from "react-redux";
import { updateUsername } from "../redux/actions";
import { useState, useEffect } from "react";

const mapStateToProps = (state) =>{
    return {
        username: state.username
    }
}

const Layout = (props) => {

    const handleUsernameChange = (e:any) =>{
        props.dispatch(updateUsername(e.target.value));
        
    }

    return (
        <>
            <Container maxWidth="md" sx={{mt:2}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <MyLogo />
                    </Grid>
                    <Grid item xs={0} md={4}> </Grid>
                    <Grid item xs={12} md={4}  style = {{ display: "flex", flexDirection: "column", justifyContent: "center"}}>                  
                        <TextField onChange={handleUsernameChange}  label="Username" size="small" defaultValue={props.username} fullWidth/>
                    </Grid>
                </Grid>
                <Divider sx={{mt:2, mb:2}}/>
                <Outlet />
            </Container>
        </>
    )
};

export default connect(mapStateToProps, null)(Layout);