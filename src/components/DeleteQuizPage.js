import React, { useState, useEffect } from 'react';
import { Grid, Button, TextField, Modal, CircularProgress , Typography } from '@mui/material';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import Sidebar from '../common/SideBar';
import coverImage from '../resources/quizzercover.jpg';
import { styled } from '@mui/system';




const ChartsPage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const handleButtonClick = () => {
        // Handle the button press action here
        setIsLoading(true)
        
        // Add your desired logic
      };

  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Line Chart',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  
const PageContainer = styled('div')({
    // background: `url(${coverImage})`, // Replace with the actual path to your background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  });

  const StyledTextField = styled(TextField)({
    width: '70%',
    height: '5% '// Adjust the width as desired
  });
  

  const barChartData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'Bar Chart',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
      },
    ],
  };

  const doughnutChartData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'Doughnut Chart',
        data: [300, 50, 100],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
        ],
      },
    ],
  };

  const pieChartData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'Pie Chart',
        data: [300, 50, 100],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Line Chart Heading',
        font: {
          size: 25,
          weight: 'bold',
        },
      },
    },
  };

  return (
    <PageContainer>
  <div>
    <Sidebar />
    <Modal open={!isLoading} disableBackdropClick disableEscapeKeyDown>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ backgroundColor: '#fff', padding: '20px', display: 'flex', alignItems: 'center', borderRadius: '8px', boxShadow: '10 20px 40px rgba(0, 0, 0, 0.2)' }}>
          <CircularProgress color="primary" size={30} style={{ marginRight: '10px' }} />
          <span>Loading...</span>
        </div>
      </div>
    </Modal>

    <Typography variant="h4" align="center" style={{ marginTop: '5px', marginBottom: '5px', fontWeight: 'bold', color: '#2e2e2e', textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)' }}>
  Quizzer Usage Report
</Typography>


    <Grid xs={6} sm={10}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ }}>
          <StyledTextField name="name" label="Name" style={{ marginRight: '10px', height: '1px' , marginBottom: '70px' }} />
          <Button onClick={handleButtonClick} color="primary" style={{ height: '55px', backgroundColor: 'blue', color: 'white' }}>
      Submit
    </Button>
        </div>
      </div>
    </Grid>

    <Grid container>
      <Grid xs={6}>
        <div style={{ border: '8px solid rgba(0, 0, 0, 0.5)', padding: '10px' }}>
          <Line data={lineChartData} options={chartOptions} height={250} />
        </div>
      </Grid>
      <Grid xs={6}>
        <div style={{ border: '8px solid rgba(0, 0, 0, 0.5)', padding: '10px' }}>
          <Bar data={barChartData} options={chartOptions} height={250} />
        </div>
      </Grid>
      <Grid xs={6}>
        <div style={{ border: '8px solid rgba(0, 0, 0, 0.5)', padding: '10px' }}>
          <Doughnut data={doughnutChartData} options={chartOptions} height={250} />
        </div>
      </Grid>
      <Grid xs={6}>
        <div style={{ border: '8px solid rgba(0, 0, 0, 0.5)', padding: '10px' }}>
          <Pie data={pieChartData} options={chartOptions} height={250} />
        </div>
      </Grid>
    </Grid>
  </div>
</PageContainer>
  );
};

export default ChartsPage;
