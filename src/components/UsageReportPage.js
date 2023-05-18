import React, { useState, useEffect } from 'react';
import { Grid, Button, TextField, Modal, CircularProgress , Typography } from '@mui/material';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import Sidebar from '../common/SideBar';
import coverImage from '../resources/quizzercover.jpg';
import { styled } from '@mui/system';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../Utility/firebase';



const ChartsPage = () => {

  const [usercount19_1 , setUsercount19_1] = useState(null);
  const [usercount19_2 , setUsercount19_2] = useState(null);
  const [usercount20_1 , setUsercount20_1] = useState(null);
  const [usercount20_2 , setUsercount20_2] = useState(null);
  const [agegroup_b18 , setAgegroup_b18] = useState(null);
  const [agegroup_18_20 , setAgegroup_18_20] = useState(null);
  const [agegroup_20_22 , setAgegroup_20_22] = useState(null);
  const [agegroup_a22 , setAgegroup_a22] = useState(null);
  const [degreecount_comsc , setDegreecount_comsc] = useState(null);
  const [degreecount_se , setDegreecount_se] = useState(null);
  const [degreecount_dsc , setDegreecount_dsc] = useState(null);
  const [degreecount_cn , setDegreecount_cn] = useState(null);
  const [degreecount_cs , setDegreecount_cs] = useState(null);
  const [degreecount_mis , setDegreecount_mis] = useState(null);
  const [deptcount_csse , setDeptcount_csse] = useState(null);
  const [deptcount_dsc , setDeptcount_dsc] = useState(null);
  const [deptcount_net , setDeptcount_net] = useState(null);
  const [deptcount_csec , setDeptcount_csec] = useState(null);
  const [deptcount_infsys , setDeptcount_infsys] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsersCount();
  }, []);

  async function getUsersCount() {

    const usersRef = collection(db, 'users');

const queries = [  { field: 'intake', values: ['19.1', '19.2', '20.1', '20.2'] },
  { field: 'agegroup', values: ['Below 18', '18-20', '20-22', 'Above 22'] },
  { field: 'degree', values: ['Computer Science', 'Software Engineering', 'Data Science', 'Computer Networking', 'Computer Security', 'Management Info Systems'] },
  { field: 'department', values: ['Com Sc and Soft Eng', 'Data Science', 'Networking', 'Computer Security', 'Info. Systems'] }
];

const snapshots = await Promise.all(
  queries.map(async ({ field, values }) => {
    const queries = values.map(value => query(usersRef, where(field, '==', value),where('usertype','==','default user')));
    const snapshots = await Promise.all(queries.map(getDocs));
    return snapshots.map(snapshot => snapshot.size);
  })
);

const [  [usercount19_1, usercount19_2, usercount20_1, usercount20_2],
  [agegroup_b18, agegroup_18_20, agegroup_20_22, agegroup_a22],
  [degreecount_comsc, degreecount_se, degreecount_dsc, degreecount_cn, degreecount_cs, degreecount_mis],
  [deptcount_csse, deptcount_dsc, deptcount_net, deptcount_csec, deptcount_infsys]
] = snapshots;

setUsercount19_1(usercount19_1);
setUsercount19_2(usercount19_2);
setUsercount20_1(usercount20_1);
setUsercount20_2(usercount20_2);

setAgegroup_b18(agegroup_b18);
setAgegroup_18_20(agegroup_18_20);
setAgegroup_20_22(agegroup_20_22);
setAgegroup_a22(agegroup_a22);

setDegreecount_comsc(degreecount_comsc);
setDegreecount_se(degreecount_se);
setDegreecount_dsc(degreecount_dsc);
setDegreecount_cn(degreecount_cn);
setDegreecount_cs(degreecount_cs);
setDegreecount_mis(degreecount_mis);

setDeptcount_csse(deptcount_csse);
setDeptcount_dsc(deptcount_dsc);
setDeptcount_net(deptcount_net);
setDeptcount_csec(deptcount_csec);
setDeptcount_infsys(deptcount_infsys);

  

    setLoading(false)
    
  }

    const [isLoading, setIsLoading] = useState(true);
    const handleButtonClick = () => {
        // Handle the button press action here
        setIsLoading(true)
        
        // Add your desired logic
      };

  const lineChartData = {
    labels: ['19.1', '19.2', '20.1', '20.2'],
    datasets: [
      {
        label: '19.2',
        data: [usercount19_1, usercount19_2, usercount20_1, usercount20_2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
      },
    ],
  };

  
const PageContainer = styled('div')({
    // background: `url(${coverImage})`, 
    backgroundPosition: 'center',
  });

  const StyledTextField = styled(TextField)({
    width: '70%',
    height: '5% '
  });
  

  const barChartData = {
    labels: ['Below 18', '18 - 20', '20 - 22', 'Above 22'],
    datasets: [
      {
        label: 'Bar Chart',
        data: [agegroup_b18, agegroup_18_20, agegroup_20_22, agegroup_a22],
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
    labels: ['CSSE', 'Data Science', 'Netwoking' , 'Com Security' , 'Info Systems'],
    datasets: [
      {
        label: 'Doughnut Chart',
        data: [deptcount_csse, deptcount_dsc,deptcount_net,deptcount_csec,deptcount_infsys],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
        ],
      },
    ],
  };

  const pieChartData = {
    labels: ['Com Sc', 'SE', 'DSc' , 'CN', 'CS', 'MiS'],
    datasets: [
      {
        label: 'Pie Chart',
        data: [degreecount_comsc, degreecount_se, degreecount_dsc,degreecount_cn,degreecount_cs,degreecount_mis],
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

  const chartOptions4 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Degree Wise Users',
        font: {
          size: 25,
          weight: 'bold',
        },
      },
    },
  };

  const chartOptions3 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Department Wise Users',
        font: {
          size: 25,
          weight: 'bold',
        },
      },
    },
  };

  const chartOptions2 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Age Group Wise Users',
        font: {
          size: 25,
          weight: 'bold',
        },
      },
    },
  };

  const chartOptions1 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Batch Wise Users',
        font: {
          size: 25,
          weight: 'bold',
        },
      },
    },
  };

  return (
    
    <PageContainer>
    <Modal open={loading} onClose={() => {}}>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "rgba(0, 0, 0, 0.5)",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <CircularProgress color="primary" size={80} />
        <Typography
          variant="h6"
          component="div"
          style={{ marginTop: "20px", color: "#fff" }}
        >
          Loading...
        </Typography>
      </div>
    </div>
  </Modal>
  <div>
    <Sidebar title={"Usage Report"} />
    <Modal open={!isLoading} disableBackdropClick disableEscapeKeyDown>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ backgroundColor: '#fff', padding: '20px', display: 'flex', alignItems: 'center', borderRadius: '8px', boxShadow: '10 20px 40px rgba(0, 0, 0, 0.2)' }}>
          <CircularProgress color="primary" size={30} style={{ marginRight: '10px' }} />
          <span>Loading...</span>
        </div>
      </div>
    </Modal>


   

    <Grid container>
      <Grid xs={6} sm={6} md={6}>
        <div style={{ border: '8px solid rgba(0, 0, 0, 0.5)', padding: '10px' }}>
          <Bar data={lineChartData} options={chartOptions1} height={250} />
        </div>
      </Grid>
      <Grid xs={6} sm={6} md={6}>
        <div style={{ border: '8px solid rgba(0, 0, 0, 0.5)', padding: '10px' }}>
          <Bar data={barChartData} options={chartOptions2} height={250} />
        </div>
      </Grid>
      <Grid xs={6} sm={6} md={6}>
        <div style={{ border: '8px solid rgba(0, 0, 0, 0.5)', padding: '10px' }}>
          <Doughnut data={doughnutChartData} options={chartOptions3} height={250} />
        </div>
      </Grid>
      <Grid xs={6} sm={6} md={6}>
        <div style={{ border: '8px solid rgba(0, 0, 0, 0.5)', padding: '10px' }}>
          <Pie data={pieChartData} options={chartOptions4} height={250} />
        </div>
      </Grid>
    </Grid>
  </div>
</PageContainer>
  );
};

export default ChartsPage;
