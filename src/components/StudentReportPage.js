import React, { useState, useEffect } from 'react';
import { Grid, Button, TextField, Modal, CircularProgress , Typography } from '@mui/material';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import Sidebar from '../common/SideBar';
import coverImage from '../resources/quizzercover.jpg';
import { styled } from '@mui/system';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../Utility/firebase';


let total_correct
let total_incorrect

let averagePercentage_programming
let averagePercentage_computationaltheory
let averagePercentage_dataandquerrying
let averagePercentage_aiandml

let beginner_count
let intermidiate_count
let pro_count
let master_count

let programming_count
let computationaltheory_count
let dataandquerrying_count
let aiandml_count

const ChartsPage = () => {

    const [isLoading, setIsLoading] = useState(true);
    
    const [ovrl_marks_programming, setOvrl_marks_programming] = useState(null)
    const [ovrl_marks_comptheory, setOvrl_marks_comptheory] = useState(null)
    const [ovrl_marks_dtandqry, setOvrl_marks_dtandqry] = useState(null)
    const [ovrl_marks_aiml, setOvrl_marks_aiml] = useState(null)
    const [averageCorrectPercentage, setAverageCorrectPercentage] = useState(null);


    async function getcount(studentmail){
      
      setIsLoading(false)
     
          const gradesRef = collection(db, 'Grades');
          const queryRef = query(gradesRef, where('email', '==', studentmail));

          const queryRef1 = query(gradesRef, where('quizcoreArea', '==', 'programming') , where('email', '==', studentmail));
          const queryRef2 = query(gradesRef, where('quizcoreArea', '==', 'computationaltheory') , where('email', '==', studentmail));
          const queryRef3 = query(gradesRef, where('quizcoreArea', '==', 'dataandquerrying') , where('email', '==', studentmail));
          const queryRef4 = query(gradesRef, where('quizcoreArea', '==', 'aiandml'), where('email', '==', studentmail));


          
    
          
            const querySnapshot = await getDocs(queryRef);
            const querySnapshot1 = await getDocs(queryRef1);
            const querySnapshot2 = await getDocs(queryRef2);
            const querySnapshot3 = await getDocs(queryRef3);
            const querySnapshot4 = await getDocs(queryRef4);

            let totalCorrectPercentage_programming = 0;
            let totalCorrectPercentage_computationaltheory = 0;
            let totalCorrectPercentage_dataandquerrying = 0;
            let totalCorrectPercentage_aiandml = 0;

            let documentCount_programing = 0;
            let documentCount_computationaltheory = 0;
            let documentCount_dataandquerrying = 0;
            let documentCount_aiandml= 0;



    
            let totalCorrect = 0;
            let totalIncorrect = 0;            
    
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              const correctPercentage_programming = data.correctanswers;
              totalCorrect += parseInt(correctPercentage_programming,10);
            });
            // console.log(documentCount_programing)
            // console.log(totalCorrectPercentage_programming)
                
            total_correct = totalCorrect
            // const xx = averagePercentage_programming
            // setAverageCorrectPercentage(tot)      
          
          
          
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const correctPercentage_programming = data.incorrectanswers;
            totalIncorrect += parseInt(correctPercentage_programming,10);
          });
          // console.log(documentCount_programing)
          // console.log(totalCorrectPercentage_programming)
              
          total_incorrect = totalIncorrect
          // const xx = averagePercentage_programming
          // setAverageCorrectPercentage(averagePercentage_programming)      
        
          console.log(total_correct,total_incorrect)

          querySnapshot1.forEach((doc) => {
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


          setAverageCorrectPercentage(totalCorrect)

          const q = query(collection(db, 'Grades'), where('email', '==', studentmail), where('quizlevel', '==', 'beginner'));
          const querySnapshot5 = await getDocs(q);
          
          beginner_count = querySnapshot5.size;  
          
          const q1 = query(collection(db, 'Grades'), where('email', '==', studentmail), where('quizlevel', '==', 'intermidiate'));
          const querySnapshot6 = await getDocs(q1);
          
          intermidiate_count = querySnapshot6.size; 

          const q2 = query(collection(db, 'Grades'), where('email', '==', studentmail), where('quizlevel', '==', 'pro'));
          const querySnapshot7 = await getDocs(q2);
          
          pro_count = querySnapshot7.size;

          const q3 = query(collection(db, 'Grades'), where('email', '==', studentmail), where('quizlevel', '==', 'master'));
          const querySnapshot8 = await getDocs(q3);
          
          master_count = querySnapshot8.size; 

          const q4 = query(collection(db, 'Grades'), where('email', '==', studentmail), where('quizcoreArea', '==', 'programming'));
          const querySnapshot9 = await getDocs(q4);
          
          programming_count = querySnapshot9.size;

          const q5 = query(collection(db, 'Grades'), where('email', '==', studentmail), where('quizcoreArea', '==', 'computationaltheory'));
          const querySnapshot10 = await getDocs(q5);
          
          computationaltheory_count = querySnapshot10.size;

          const q6 = query(collection(db, 'Grades'), where('email', '==', studentmail), where('quizcoreArea', '==', 'dataandquerrying'));
          const querySnapshot11 = await getDocs(q6);
          
          dataandquerrying_count = querySnapshot11.size;

          const q7 = query(collection(db, 'Grades'), where('email', '==', studentmail), where('quizcoreArea', '==', 'aiandml'));
          const querySnapshot12 = await getDocs(q7);
          
          aiandml_count = querySnapshot12.size;




          setIsLoading(true)
       }

      //  useEffect(() => {
      //   getcount();
      // }, []);

    const handleButtonClick = () => {
        // Handle the button press action here
        // setIsLoading(true)
        getcount('shashi@gmail.com')
        
        // Add your desired logic
      };

      // console.log(averagePercentage_programming)
      console.log(total_correct,total_incorrect)
  const lineChartData = {
    labels: ['Total Correct', 'Total Incorrect'],
    datasets: [
      {
        label: 'Bar Chart',
        data: [total_correct, total_incorrect],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)'
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
    labels: ['Programming', 'Comp.Theory', 'Data & Querrying', 'AI & ML'],
    datasets: [
      {
        label: '',
        data: [averagePercentage_programming, averagePercentage_computationaltheory, averagePercentage_dataandquerrying, averagePercentage_aiandml],
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
    labels: ['Beginner', 'Intermidiate', 'Pro' , 'Master'],
    datasets: [
      {
        label: '',
        data: [beginner_count, intermidiate_count, pro_count,master_count],
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
    labels: ['Programming', 'Comp.Theory', 'Data & Querrying', 'AI & ML'],
    datasets: [
      {
        label: 'Pie Chart',
        data: [programming_count, computationaltheory_count, dataandquerrying_count,aiandml_count],
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
        text: 'Total Correct vs Incorrect Grades',
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
        text: 'Core Area Wise Gradings',
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
        text: 'Level Wise Quiz Activity',
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
        text: 'Core Area Wise Activity',
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
  <Sidebar title="Student Evaluation Report" />
    <Modal open={!isLoading} disableBackdropClick disableEscapeKeyDown>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ backgroundColor: '#fff', padding: '20px', display: 'flex', alignItems: 'center', borderRadius: '8px', boxShadow: '10 20px 40px rgba(0, 0, 0, 0.2)' }}>
          <CircularProgress color="primary" size={30} style={{ marginRight: '10px' }} />
          <span>Loading...</span>
        </div>
      </div>
    </Modal>


    <Grid xs={6} sm={10}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ }}>
        <StyledTextField
          name="name"
          label="Name"
          style={{ marginTop: '5px', marginRight: '10px', height: '1px', marginBottom: '70px' }}
          // onChange={handleInputChange}
        />
          <Button onClick={handleButtonClick} color="primary" style={{ marginTop: '5px', height: '55px', backgroundColor: 'blue', color: 'white' }}>
      Submit
    </Button>
        </div>
      </div>
    </Grid>

    <Grid container>
      <Grid xs={6}>
        <div style={{ border: '8px solid rgba(0, 0, 0, 0.5)', padding: '10px' }}>
          <Pie data={lineChartData} options={chartOptions1} height={250} />
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
          <Bar data={pieChartData} options={chartOptions4} height={250} />
        </div>
      </Grid>
    </Grid>
  </div>
</PageContainer>
  );
};

export default ChartsPage;
