import * as React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {faker} from '@faker-js/faker';
import PurpleButton from '../components/buttons/PurpleButton';
import {Link} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { sleep } from '../utilities';
import { apiEndPoint_PanoramaBookmarksAnalytics } from '../config';
import api from "../hooks/request";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Top Bookmarked Chart',
      },
    },
  };
  
 

const Analytics = () => {


  //const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const [data, setData] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(true);
  

  function refresh(){

    // retrieve data from api
    (async function() {
      
      // simulate loading
      await sleep(1000);
      try{
        const apiData:any = await api.get(apiEndPoint_PanoramaBookmarksAnalytics);
        apiData.reverse();
        const labels = apiData.map(function (x) { return x.panoramaTitle; });
        const bookmarkedCount = apiData.map(function (x) { return x.bookmarkedCount; });
        const unbookmarkedCount = apiData.map(function (x) { return x.unbookmarkedCount; });
        updateChart(labels, bookmarkedCount, unbookmarkedCount);
      }catch{
        
      }
    })()


    
  }

  function updateChart(labels, bookmarkedCount, unbookmarkedCount)
  {
    const temp = {
      labels,
      datasets: [
        {
          label: 'Unbookmarked',
          data: unbookmarkedCount,
          backgroundColor: '#FFC0CB',
        },
        {
          label: 'Bookmarked',
          data: bookmarkedCount,
          backgroundColor: '#9c27b0',
        },
      ],
    };

    setData(temp);
    setIsLoading(false);
  }

  useEffect(() => {
   refresh();
  },[])

  return (
      <>
          <Link to='/'>
              <PurpleButton sx={{mr:2}} component="label" variant="contained" startIcon={<ArrowBackIcon />}>
                  Back
              </PurpleButton>
          </Link>
          {isLoading ? (
            <Container maxWidth="md" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '30vh',
            }}>
                <CircularProgress size={100}/>
            </Container>
            ):(
            <Bar options={options} data={data} />
          )}
      </>
  )
}

export default Analytics