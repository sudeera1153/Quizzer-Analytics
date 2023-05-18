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
import { Modal } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { styled } from '@mui/system';
import coverImage from '../resources/coverpage.jpg';
import Sidebar from '../common/SideBar';
import { db } from "../Utility/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
  query,
  where
} from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const quizzesCollectionRef = collection(db, "Quizzes");
const auth = getAuth();

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
  const [values, setValues] = useState({
    email: '',
    password: '',
    retypepassword: '',
    name: '',
    designation: '',
    employmenttype:'',
    });

  const [openPrompt, setOpenPrompt] = useState(false);
  
  const [promptValues, setPromptValues] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    input6: ''
  });

  const [loading, setLoading] = useState(false);

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
    setLoading(true)
    if(values.email==''|| values.password=='' || values.retypepassword=='' || values.name=='' || values.designation=='' || values.employmenttype==''){
      toast.error('Please Fill Out All The Input Fields', {
        position: 'top-left', 
        autoClose: 5000, 
        hideProgressBar: false, 
        closeOnClick: true,
        pauseOnHover: true, 
        draggable: false, 
        progress: undefined, 
       
      });
    }else{
     if(values.password === values.retypepassword){
      if(values.password.length>6){
        createUserWithEmailAndPassword(auth,(values.email),(values.password)).then(
          await setDoc(doc(db, "users", values.email), {
              name: values.name,
              designation: values.designation,
              employmenttype: values.employmenttype,
              usertype: 'admin'}).then(
                setLoading(false)
              )
        )
        // await setDoc(doc(db, "users", values.email), {
        //   name: values.name,
        //   designation: values.designation,
        //   employmenttype: values.employmenttype,
        //   usertype: 'admin'
        // }).then(
        //   createUserWithEmailAndPassword(auth, values.email, values.password).then(
          
        //   ).catch(err =>
        //             toast.error(err, {
        //   position: 'top-left', 
        //   autoClose: 5000, 
        //   hideProgressBar: false, 
        //   closeOnClick: true,
        //   pauseOnHover: true, 
        //   draggable: false, 
        //   progress: undefined, 
        // })
        //   ),
        // )
      }else{
        toast.error('Password Must be At-Least 6 Char Long', {
          position: 'top-left', 
          autoClose: 5000, 
          hideProgressBar: false, 
          closeOnClick: true,
          pauseOnHover: true, 
          draggable: false, 
          progress: undefined, 
        });
      }
     }
     else{
      toast.error('Please recheck the passwords', {
        position: 'top-left', 
        autoClose: 5000, 
        hideProgressBar: false, 
        closeOnClick: true,
        pauseOnHover: true, 
        draggable: false, 
        progress: undefined, 
      });
     }

    }
    values.username =''
    values.password =''
    values.retypepassword = ''
    values.name =''
    values.employmenttype = ''
    values.designation = ''
    setLoading(false)
  };

  const handleOpenPrompt = () => {
    setOpenPrompt(true);
  };

  const handleClosePrompt = () => {
    setOpenPrompt(false);
  };

  const handleAddPrompt = () => {
    if (
      promptValues.input2 !== promptValues.input3 &&
      promptValues.input2 !== promptValues.input4 &&
      promptValues.input2 !== promptValues.input5 &&
      promptValues.input2 !== promptValues.input6
    ) {
      // Error toast message
      toast.error('Error', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    } else {
      // Success toast message
      toast.success('Success', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });

      setPromptValues({
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        input5: '',
        input6: ''
      });
    }
    
    
  };

  const handleDonePrompt = () => {
    // Perform any necessary action when the "Done" button is clicked in the prompt modal
    // Example: Close the prompt modal and proceed with form submission

    handleClosePrompt();
    console.log(values);
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
      <Sidebar  title = "Add Administrator"/>
      <Box paddingTop="2rem">
        <FormContainer>
          <Typography variant="h4" component="h2" align="center">
            Insert Admin User Details Below
          </Typography>
          <StyledTextField
            name="email"
            label="Enter Email"
            value={values.email}
            onChange={handleChange}
          />
          <StyledTextField
            name="password"
            label="Enter Your Password"
            value={values.password}
            onChange={handleChange}
          />
          <StyledTextField
            name="retypepassword"
            label="Please Retype Password"
            value={values.message}
            onChange={handleChange}
          />
          <FormControl>
            <InputLabel>Employment Type</InputLabel>
            <Select
              name="employmenttype"
              value={values.employmenttype}
              onChange={handleChange}
            >
              <MenuItem value="Acedemic">Acedemic</MenuItem>
              <MenuItem value="Non-Acedemic">Non-Acedemic</MenuItem>
            </Select>
          </FormControl>
          {/* <FormControl>
            <InputLabel>Select Faculty</InputLabel>
            <Select
              name="faculty"
              value={values.faculty}
              onChange={handleChange}
            >
              <MenuItem value="Computing">Faculty of Computing</MenuItem>
              <MenuItem value="Engineering">Faculty of Engineering</MenuItem>
              <MenuItem value="Business">Faculty of Business</MenuItem>
            </Select>
          </FormControl> */}
          <StyledTextField
            name="name"
            label="Please Enter Your Name"
            value={values.name}
            onChange={handleChange}
          />
          <StyledTextField
            name="designation"
            label="Enter Your Designation"
            value={values.message}
            onChange={handleChange}
          />
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
      name="input1"
      label="Enter The Question"
      value={promptValues.input1}
      onChange={handlePromptChange}
      style={{ margin: '0.5rem 0' }}
    />
    <StyledTextField
      name="input2"
      label="Enter The Correct Answer"
      value={promptValues.input2}
      onChange={handlePromptChange}
      style={{ margin: '0.5rem 0' }}
    />
    <StyledTextField
      name="input3"
      label="Enter MCQ Answer 1"
      value={promptValues.input3}
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