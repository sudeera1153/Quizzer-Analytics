import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { styled } from '@mui/system';
import coverImage from '../resources/coverpage.jpg';
import Sidebar from '../common/SideBar';
import { db , storage} from "../Utility/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  setDoc,
  deleteDoc,
  doc,
  query,
  where
} from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
  
} from "firebase/storage";
import { Padding } from '@mui/icons-material';
import Swal from 'sweetalert2';




const quizzesCollectionRef = collection(db, "Quizzes");

const PageContainer = styled('div')({
  background: `url(${coverImage})`, // Replace with the actual path to your background image
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const FormContainer = styled('div')({
  display: 'grid',
  gap: '1rem',
  maxWidth: '600px',
  margin: '0 auto',
  padding: '2rem',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  borderRadius: '4px',
  backgroundColor: '#fff',
});

const StyledTextField = styled(TextField)({
  width: '100%', // Adjust the width as desired
});

const SubmitButton = styled(Button)({
  marginTop: '1rem',
});

export default function ModerateForm() {

  // const currentQuizId = Math.floor(100000 + Math.random() * 9000).toString();

  // const [currquizid,setCurrquizid] = useState(null)
  const [imageUpload, setImageUpload] = useState(null);
  let currquizid = '';
  const [currentQuizId, setCurrquizid] = useState('')

  

  const uploadFile = async() => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name}`);
    await uploadBytes(imageRef, imageUpload).then((snapshot) => {
    console.log("image uploaded")
    });
    await getFileURL();
    

  };

  let imageUrl = ''
  const getFileURL = async() => {
    const imageRef = ref(storage, `images/${imageUpload.name}`)
    imageUrl = await getDownloadURL(ref(storage, imageRef))
    console.log(imageUrl)
  }
  

  const [values, setValues] = useState({
    title: '',
    description:'',
    corearea: '',
    subject:'',
    level:'',
  });

  const [openPrompt, setOpenPrompt] = useState(false);
  
  const [promptValues, setPromptValues] = useState({
    Question: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    input6: ''
  });

  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handlePromptChange = (e) => {
    const { name, value } = e.target;
    setPromptValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {

    // let crquid = Math.floor(100000 + Math.random() * 9000).toString()
    

    if(values.title == "" || values.description == "" || values.corearea == "" || values.subject == "" || values.level == "" )
    {
      toast.error('Please Fill Out All The Input Fields', {
        position: 'top-left', 
        autoClose: 5000, 
        hideProgressBar: false, 
        closeOnClick: true,
        pauseOnHover: true, 
        draggable: false, 
        progress: undefined, 
       
      });
    }
    else{
      currquizid = Math.floor(100000 + Math.random() * 9000).toString();
      await setDoc(doc(db, "Quizzes", currquizid), {
        title: values.title,
        description: values.description,
        coreArea: values.corearea,
        subject: values.subject,
        level: values.level
      }).then(
        console.log(currquizid),
        setCurrquizid(currquizid)
      );
      handleOpenPrompt();
    }

    
  };

  const handleOpenPrompt = () => {
    setOpenPrompt(true);
  };

  const handleClosePrompt = () => {
    setOpenPrompt(false);
  };

  const handleAddPrompt = async() => {
    let currentQuestionId = Math.floor(100000 + Math.random() * 9000,).toString();

    if(promptValues.Question === "" || promptValues.input2 === "" || promptValues.input4 === "" || promptValues.input5 === "" || promptValues.input6 === "" )
   {
    toast.error('Please Fill All The Blanks', 
    {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });

   }
   else{
    if (
      promptValues.input2 !== promptValues.input4 &&
      promptValues.input2 !== promptValues.input5 &&
      promptValues.input2 !== promptValues.input6
    ) {
      await uploadFile().then(async()=>{
        const quizzesRef = doc(db, 'Quizzes',currentQuizId, 'QNA', currentQuestionId);
        console.log(currquizid)
        await setDoc(quizzesRef, {
          question:promptValues.Question,
          correct_answer: promptValues.input2,
          incorrect_answers: [promptValues.input4, promptValues.input5, promptValues.input6],
          imageUrl: imageUrl
        }
        );
      }
      )
      setPromptValues({
        Question: '',
        input2: '',
        input3: '',
        input4: '',
        input5: '',
        input6: ''
      });
      document.getElementById('fileInput').value = null;
      setImageUpload(null);
      imageUrl=''
      

    } 
    else{
      toast.success('Error Eroor', 
      {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  }
};

  const handleDonePrompt = () => {
    handleClosePrompt();
    Swal.fire("Quiz Added!", "Quiz has been succesfully added!.", "success").then(()=>{
      setValues({
        title: '',
        description:'',
        corearea: '',
        subject:'',
        level:''
      })      
    })
  };

    return (
    <PageContainer>
      <Sidebar  title = "Add Quiz"/>
      <Box paddingTop="2rem">
        <FormContainer>
          <Typography variant="h4" component="h2" align="center">
            Insert Quiz Details Below
          </Typography>
          <StyledTextField
  name="title"
  label="Enter Quiz Title"
  value={values.title}
  onChange={handleChange}
/>
<StyledTextField
  name="description"
  label="Enter Quiz Description"
  value={values.description}
  onChange={handleChange}
  multiline
  rows={4}
/>

<FormControl>
  <InputLabel>Select Core Area</InputLabel>
  <Select
    name="corearea"
    value={values.corearea}
    onChange={handleChange}
  >
    <MenuItem value="programming">Programming</MenuItem>
    <MenuItem value="computationaltheory">Computational Theory</MenuItem>
    <MenuItem value="dataandquerrying">Data & Querrying</MenuItem>
    <MenuItem value="aiandml">AI & Machine Learning</MenuItem>
  </Select>
</FormControl>

<FormControl>
  <InputLabel>Select Subject</InputLabel>
  <Select
    name="subject"
    value={values.subject}
    onChange={handleChange}
  >
    <MenuItem value="csharp">C#</MenuItem>
    <MenuItem value="python">Python</MenuItem>
    <MenuItem value="comuter_architecture">Computer Architecture</MenuItem>
    <MenuItem value="java">Java</MenuItem>
    <MenuItem value="scala">Scala</MenuItem>
    <MenuItem value="advanced_sql">Advanced SQL</MenuItem>
    <MenuItem value="cryptography">Cryptography</MenuItem>
    <MenuItem value="networking_fundamentals">Networking Fundamentals</MenuItem>
  </Select>
</FormControl>

<FormControl>
  <InputLabel>Select Difficulty</InputLabel>
  <Select
    name="level"
    value={values.level}
    onChange={handleChange}
  >
    <MenuItem value="Beginner">Beginner</MenuItem>
    <MenuItem value="Intermidiate">Intermidiate</MenuItem>
    <MenuItem value="Pro">Pro</MenuItem>
    <MenuItem value="Master">Master</MenuItem>
  </Select>
</FormControl>

<SubmitButton
  type="submit"
  variant="contained"
  color="primary"
  onClick={handleSubmit}
>
  Submit
</SubmitButton>
<Dialog open={openPrompt} onClose={handleClosePrompt}>
  <DialogTitle>Add Questions</DialogTitle>
  <DialogContent>
    <StyledTextField
      name="Question"
      label="Enter The Question"
      value={promptValues.Question}
      onChange={handlePromptChange}
      style={{ margin: '0.5rem 0' }}
    />

  <div>
  <Typography>Insert Image (Not Requied)</Typography>
      <input
        type="file"
        id='fileinput'
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      {/* <button onClick={uploadFile}> Upload Image</button> */}  
  </div>

    <StyledTextField
      name="input2"
      label="Enter The Correct Answer"
      value={promptValues.input2}
      onChange={handlePromptChange}
      style={{ margin: '0.5rem 0' }}
    />
    <StyledTextField
      name="input4"
      label="Enter MCQ Answer 2"
      value={promptValues.input4}
      onChange={handlePromptChange}
      style={{ margin: '0.5rem 0' }}
    />
    <StyledTextField
      name="input5"
      label="Enter MCQ Answer 3"
      value={promptValues.input5}
      onChange={handlePromptChange}
      style={{ margin: '0.5rem 0' }}
    />
    <StyledTextField
      name="input6"
      label="Enter MCQ Answer 4"
      value={promptValues.input6}
      onChange={handlePromptChange}
      style={{ margin: '0.5rem 0' }}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleAddPrompt}>Add</Button>
    <Button onClick={handleDonePrompt}>Done</Button>
  </DialogActions>
</Dialog>

</FormContainer>
</Box>
</PageContainer>
);
}
  