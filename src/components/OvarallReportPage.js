import React, { useState, useEffect } from 'react';
import { Grid, Button, TextField, Modal, CircularProgress , Typography } from '@mui/material';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import Sidebar from '../common/SideBar';
import coverImage from '../resources/quizzercover.jpg';
import { styled } from '@mui/system';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../Utility/firebase';


let averagePercentage_programming
let averagePercentage_computationaltheory
let averagePercentage_dataandquerrying
let averagePercentage_aiandml

let averagePercentage_below18
let averagePercentage_18to20
let averagePercentage_20to22
let averagePercentage_above22

let averagePercentage_csse
let averagePercentage_ds
let averagePercentage_nt
let averagePercentage_csec
let averagePercentage_infsys

let averagePercentage_home
let averagePercentage_unihos
let averagePercentage_extbording

const ChartsPage = () => {

    const [isLoading, setIsLoading] = useState(true);
    
    const [ovrl_marks_programming, setOvrl_marks_programming] = useState(null)
    const [ovrl_marks_comptheory, setOvrl_marks_comptheory] = useState(null)
    const [ovrl_marks_dtandqry, setOvrl_marks_dtandqry] = useState(null)
    const [ovrl_marks_aiml, setOvrl_marks_aiml] = useState(null)
    const [averageCorrectPercentage, setAverageCorrectPercentage] = useState(null);


    async function getcount(){
      
      setIsLoading(false)
     
          const gradesRef = collection(db, 'Grades');
          const queryRef = query(gradesRef, where('quizcoreArea', '==', 'programming'));
          const queryRef2 = query(gradesRef, where('quizcoreArea', '==', 'computationaltheory'));
          const queryRef3 = query(gradesRef, where('quizcoreArea', '==', 'dataandquerrying'));
          const queryRef4 = query(gradesRef, where('quizcoreArea', '==', 'aiandml'));

          const queryRef5 = query(gradesRef, where('agegroup', '==', 'Below 18'));
          const queryRef6 = query(gradesRef, where('agegroup', '==', '18-20'));
          const queryRef7 = query(gradesRef, where('agegroup', '==', '20-22'));
          const queryRef8 = query(gradesRef, where('agegroup', '==', 'Above 22'));
   
          const queryRef9 = query(gradesRef, where('department', '==', 'Com Sc and Soft Eng'));
          const queryRef10 = query(gradesRef, where('department', '==', 'Data Science'));
          const queryRef11 = query(gradesRef, where('department', '==', 'Networking'));
          const queryRef12 = query(gradesRef, where('department', '==', 'Computer Security'));
          const queryRef13 = query(gradesRef, where('department', '==', 'Info. Systems'));

          const queryRef14 = query(gradesRef, where('accomodation', '==', 'Home'));
          const queryRef15 = query(gradesRef, where('accomodation', '==', 'University Hostel'));
          const queryRef16 = query(gradesRef, where('accomodation', '==', 'External Hostel'));
    
          try {
            const querySnapshot = await getDocs(queryRef);
            const querySnapshot2 = await getDocs(queryRef2);
            const querySnapshot3 = await getDocs(queryRef3);
            const querySnapshot4 = await getDocs(queryRef4);
            const querySnapshot5 = await getDocs(queryRef5);
            const querySnapshot6 = await getDocs(queryRef6);
            const querySnapshot7 = await getDocs(queryRef7);
            const querySnapshot8 = await getDocs(queryRef8);
            const querySnapshot9 = await getDocs(queryRef9);
            const querySnapshot10 = await getDocs(queryRef10);
            const querySnapshot11 = await getDocs(queryRef11);
            const querySnapshot12 = await getDocs(queryRef12);
            const querySnapshot13 = await getDocs(queryRef13);
            const querySnapshot14 = await getDocs(queryRef14);
            const querySnapshot15 = await getDocs(queryRef15);
            const querySnapshot16 = await getDocs(queryRef16);

    
            let totalCorrectPercentage_programming = 0;
            let totalCorrectPercentage_computationaltheory = 0;
            let totalCorrectPercentage_dataandquerrying = 0;
            let totalCorrectPercentage_aiandml = 0;

            let totalCorrectPercentage_below18 = 0;
            let totalCorrectPercentage_18to20 = 0;
            let totalCorrectPercentage_20to22 = 0;
            let totalCorrectPercentage_above22 = 0;
   
            let totalCorrectPercentage_csse = 0;
            let totalCorrectPercentage_ds = 0;
            let totalCorrectPercentage_nt = 0;
            let totalCorrectPercentage_csec = 0;
            let totalCorrectPercentage_infsys = 0;

            let totalCorrectPercentage_home= 0;
            let totalCorrectPercentage_unihos = 0;
            let totalCorrectPercentage_extbording = 0;

            
            let documentCount_home = 0;
            let documentCount_unihos = 0;
            let documentCount_extbording= 0;

            let documentCount_csse = 0;
            let documentCount_ds = 0;
            let documentCount_nt= 0;
            let documentCount_csec= 0;
            let documentCount_infsys= 0;

            let documentCount_programing = 0;
            let documentCount_computationaltheory = 0;
            let documentCount_dataandquerrying = 0;
            let documentCount_aiandml= 0;

            let documentCount_below18 = 0;
            let documentCount_18to20 = 0;
            let documentCount_20to22 = 0;
            let documentCount_above22= 0;
    
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              const correctPercentage_programming = data.correctpercentage;
              totalCorrectPercentage_programming += parseInt(correctPercentage_programming,10);
              documentCount_programing++;
            });
            console.log(documentCount_programing)
            console.log(totalCorrectPercentage_programming)
                
            averagePercentage_programming = documentCount_programing > 0 ? totalCorrectPercentage_programming / documentCount_programing : 0;
            // const xx = averagePercentage_programming
            setAverageCorrectPercentage(averagePercentage_programming)

            querySnapshot2.forEach((doc) => {
              const data = doc.data();
              const correctPercentage_computationaltheory = data.correctpercentage;
              totalCorrectPercentage_computationaltheory += parseInt(correctPercentage_computationaltheory,10);
              documentCount_computationaltheory++;
            });
            console.log(documentCount_computationaltheory)
            console.log(totalCorrectPercentage_computationaltheory)
                
            averagePercentage_computationaltheory= documentCount_computationaltheory > 0 ? totalCorrectPercentage_computationaltheory / documentCount_computationaltheory : 0;
            
            setAverageCorrectPercentage(averagePercentage_programming)

            querySnapshot3.forEach((doc) => {
              const data = doc.data();
              const correctPercentage_dataandquerrying = data.correctpercentage;
              totalCorrectPercentage_dataandquerrying += parseInt(correctPercentage_dataandquerrying,10);
              documentCount_dataandquerrying++;
            });
            console.log(documentCount_dataandquerrying)
            console.log(totalCorrectPercentage_dataandquerrying)
                
            averagePercentage_dataandquerrying= documentCount_dataandquerrying > 0 ? totalCorrectPercentage_dataandquerrying / documentCount_dataandquerrying : 0;
            
            setAverageCorrectPercentage(averagePercentage_programming)

            querySnapshot4.forEach((doc) => {
              const data = doc.data();
              const correctPercentage_aiandml = data.correctpercentage;
              totalCorrectPercentage_aiandml += parseInt(correctPercentage_aiandml,10);
              documentCount_aiandml++;
            });
            console.log(documentCount_aiandml)
            console.log(totalCorrectPercentage_aiandml)
                
            averagePercentage_aiandml= documentCount_aiandml > 0 ? totalCorrectPercentage_aiandml/ documentCount_aiandml : 0;
            
            setAverageCorrectPercentage(averagePercentage_programming)

            querySnapshot5.forEach((doc) => {
              const data = doc.data();
              const correctPercentage_below18 = data.correctpercentage;
              totalCorrectPercentage_below18 += parseInt(correctPercentage_below18,10);
              documentCount_below18++;
            });
            console.log(documentCount_below18)
            console.log(totalCorrectPercentage_below18)
                
            averagePercentage_below18= documentCount_below18 > 0 ? totalCorrectPercentage_below18/ documentCount_below18 : 0;
            
            setAverageCorrectPercentage(averagePercentage_programming)

            querySnapshot6.forEach((doc) => {
              const data = doc.data();
              const correctPercentage_18to20 = data.correctpercentage;
              totalCorrectPercentage_18to20 += parseInt(correctPercentage_18to20,10);
              documentCount_18to20++;
            });
            console.log(documentCount_18to20)
            console.log(totalCorrectPercentage_18to20)
                
            averagePercentage_18to20= documentCount_18to20 > 0 ? totalCorrectPercentage_18to20/ documentCount_18to20 : 0;
            
            setAverageCorrectPercentage(averagePercentage_programming)
          
            querySnapshot7.forEach((doc) => {
              const data = doc.data();
              const correctPercentage_20to22 = data.correctpercentage;
              totalCorrectPercentage_20to22 += parseInt(correctPercentage_20to22,10);
              documentCount_20to22++;
            });
            console.log(documentCount_20to22)
            console.log(totalCorrectPercentage_20to22)
                
            averagePercentage_20to22= documentCount_20to22 > 0 ? totalCorrectPercentage_20to22/ documentCount_20to22 : 0;
            
            setAverageCorrectPercentage(averagePercentage_programming)

            querySnapshot8.forEach((doc) => {
              const data = doc.data();
              const correctPercentage_above22 = data.correctpercentage;
              totalCorrectPercentage_above22 += parseInt(correctPercentage_above22,10);
              documentCount_above22++;
            });
            console.log(documentCount_above22)
            console.log(totalCorrectPercentage_above22)
                
            averagePercentage_above22= documentCount_above22 > 0 ? totalCorrectPercentage_above22/ documentCount_above22 : 0;
            
            setAverageCorrectPercentage(averagePercentage_programming)

            querySnapshot9.forEach((doc) => {
              const data = doc.data();
              const correctPercentage_csse = data.correctpercentage;
              totalCorrectPercentage_csse += parseInt(correctPercentage_csse,10);
              documentCount_csse++;
            });
            console.log(documentCount_csse)
            console.log(totalCorrectPercentage_csse)
                
            averagePercentage_csse= documentCount_csse > 0 ? totalCorrectPercentage_csse/ documentCount_csse : 0;
            
            setAverageCorrectPercentage(averagePercentage_programming)

            querySnapshot10.forEach((doc) => {
              const data = doc.data();
              const correctPercentage_ds = data.correctpercentage;
              totalCorrectPercentage_ds += parseInt(correctPercentage_ds,10);
              documentCount_ds++;
            });
            console.log(documentCount_ds)
            console.log(totalCorrectPercentage_ds)
                
            averagePercentage_ds= documentCount_ds> 0 ? totalCorrectPercentage_ds/ documentCount_ds : 0;
            
            setAverageCorrectPercentage(averagePercentage_programming)

            querySnapshot11.forEach((doc) => {
              const data = doc.data();
              const correctPercentage_nt = data.correctpercentage;
              totalCorrectPercentage_nt += parseInt(correctPercentage_nt,10);
              documentCount_nt++;
            });
            console.log(documentCount_nt)
            console.log(totalCorrectPercentage_nt)
                
            averagePercentage_nt= documentCount_nt> 0 ? totalCorrectPercentage_nt/ documentCount_nt : 0;
            
            setAverageCorrectPercentage(averagePercentage_programming)

            querySnapshot12.forEach((doc) => {
              const data = doc.data();
              const correctPercentage_csec = data.correctpercentage;
              totalCorrectPercentage_csec += parseInt(correctPercentage_csec,10);
              documentCount_csec++;
            });
            console.log(documentCount_csec)
            console.log(totalCorrectPercentage_csec)
                
            averagePercentage_csec= documentCount_csec> 0 ? totalCorrectPercentage_csec/ documentCount_csec : 0;
            
            setAverageCorrectPercentage(averagePercentage_programming)

            querySnapshot13.forEach((doc) => {
              const data = doc.data();
              const correctPercentage_infsys = data.correctpercentage;
              totalCorrectPercentage_infsys  += parseInt(correctPercentage_infsys,10);
              documentCount_infsys ++;
            });
            console.log(documentCount_infsys )
            console.log(totalCorrectPercentage_infsys )
                
            averagePercentage_infsys = documentCount_infsys > 0 ? totalCorrectPercentage_infsys / documentCount_infsys  : 0;
            
            setAverageCorrectPercentage(averagePercentage_programming)

            querySnapshot14.forEach((doc) => {
              const data = doc.data();
              const correctPercentage_home = data.correctpercentage;
              totalCorrectPercentage_home  += parseInt(correctPercentage_home,10);
              documentCount_home ++;
            });
            console.log(documentCount_home )
            console.log(totalCorrectPercentage_home )
                
            averagePercentage_home = documentCount_home > 0 ? totalCorrectPercentage_home / documentCount_home  : 0;
            
            setAverageCorrectPercentage(averagePercentage_programming)

            querySnapshot15.forEach((doc) => {
              const data = doc.data();
              const correctPercentage_unihos = data.correctpercentage;
              totalCorrectPercentage_unihos  += parseInt(correctPercentage_unihos,10);
              documentCount_unihos++;
            });
            console.log(documentCount_unihos )
            console.log(totalCorrectPercentage_unihos )
                
            averagePercentage_unihos = documentCount_unihos > 0 ? totalCorrectPercentage_unihos / documentCount_unihos  : 0;
            
            setAverageCorrectPercentage(averagePercentage_programming)

            querySnapshot16.forEach((doc) => {
              const data = doc.data();
              const correctPercentage_extbording = data.correctpercentage;
              totalCorrectPercentage_extbording  += parseInt(correctPercentage_extbording,10);
              documentCount_extbording++;
            });
            console.log(documentCount_extbording )
            console.log(totalCorrectPercentage_extbording )
                
            averagePercentage_extbording = documentCount_extbording > 0 ? totalCorrectPercentage_extbording / documentCount_extbording  : 0;
            
            setAverageCorrectPercentage(averagePercentage_programming)

            setIsLoading(true)

        
          } catch (error) {
            console.log('Error fetching average correct percentage:', error);
          }
          
          
         
       }

       useEffect(() => {
        getcount();
      }, []);

    const handleButtonClick = () => {
        // Handle the button press action here
        setIsLoading(true)
        
        // Add your desired logic
      };

      console.log(averagePercentage_programming)
      
  const lineChartData = {
    labels: ['Programming', 'Comp.Theory', 'Data & Querrying', 'AI & ML'],
    datasets: [
      {
        label: 'Bar Chart',
        data: [averagePercentage_programming, averagePercentage_computationaltheory, averagePercentage_dataandquerrying, averagePercentage_aiandml],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
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
    labels: ['Below 18', '18-20', '20-22', 'Above 22'],
    datasets: [
      {
        label: '',
        data: [averagePercentage_below18, averagePercentage_18to20, averagePercentage_20to22, averagePercentage_above22],
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
    labels: ['CS & SE', 'Data Science', 'Networking' , 'Computer Security' , 'Information Systems'],
    datasets: [
      {
        label: '',
        data: [averagePercentage_csse, averagePercentage_ds, averagePercentage_nt, averagePercentage_csec,averagePercentage_infsys],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        
      },
    ],
  };

  const pieChartData = {
    labels: ['Home', 'University Hostel', 'Ext. Bording'],
    datasets: [
      {
        label: 'Pie Chart',
        data: [averagePercentage_home, averagePercentage_unihos, averagePercentage_extbording],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
        ],
      },
    ],
  };

  const chartOptions1 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Core Area Wise Gradings',
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
        text: 'Age Group Wise Grading',
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
        text: 'Department Wise Grading',
        font: {
          size: 25,
          weight: 'bold',
        },
      },
    },
  };

  const chartOptions4 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Accomodation Status Wise Grading',
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
  <Sidebar title="Overall Report" />
    <Modal open={!isLoading} disableBackdropClick disableEscapeKeyDown>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ backgroundColor: '#fff', padding: '20px', display: 'flex', alignItems: 'center', borderRadius: '8px', boxShadow: '10 20px 40px rgba(0, 0, 0, 0.2)' }}>
          <CircularProgress color="primary" size={30} style={{ marginRight: '10px' }} />
          <span>Loading...</span>
        </div>
      </div>
    </Modal>


   
    <Grid container>
      <Grid xs={6}>
        <div style={{ border: '8px solid rgba(0, 0, 0, 0.5)', padding: '10px' }}>
          <Bar data={lineChartData} options={chartOptions1} height={250} />
        </div>
      </Grid>
      <Grid xs={6}>
        <div style={{ border: '8px solid rgba(0, 0, 0, 0.5)', padding: '10px' }}>
          <Bar data={barChartData} options={chartOptions2} height={250} />
        </div>
      </Grid>
      <Grid xs={6}>
        <div style={{ border: '8px solid rgba(0, 0, 0, 0.5)', padding: '10px' }}>
          <Doughnut data={doughnutChartData} options={chartOptions3} height={250} />
        </div>
      </Grid>
      <Grid xs={6}>
        <div style={{ border: '8px solid rgba(0, 0, 0, 0.5)', padding: '10px' }}>
          <Pie data={pieChartData} options={chartOptions4} height={250} />
        </div>
      </Grid>
      {/* <Grid xs={6}>
        <div style={{ border: '8px solid rgba(0, 0, 0, 0.5)', padding: '10px' }}>
          <Pie data={pieChartData} options={chartOptions} height={250} />
        </div>
      </Grid>
      <Grid xs={6}>
        <div style={{ border: '8px solid rgba(0, 0, 0, 0.5)', padding: '10px' }}>
          <Pie data={pieChartData} options={chartOptions} height={250} />
        </div>
      </Grid> */}
      
    </Grid>
    {/* <Grid xs={6}>
        <div style={{ border: '8px solid rgba(0, 0, 0, 0.5)', padding: '10px' }}>
          <Pie data={pieChartData} options={chartOptions} height={250} />
        </div>
      </Grid> */}
  </div>
</PageContainer>
  );
};

export default ChartsPage;
