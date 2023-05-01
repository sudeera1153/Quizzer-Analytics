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
import coverImage from '../resources/quizzercover.jpg';
import Sidebar from '../common/SideBar';
import { db } from "../Utility/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where
} from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [values, setValues] = useState({
    name: '',
    email: '',
    message: '',
    category: ''
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
    handleOpenPrompt();
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
      <Sidebar  title = "Add Quiz"/>
      <Box paddingTop="2rem">
        <FormContainer>
          <Typography variant="h4" component="h2" align="center">
            Insert Quiz Details Below
          </Typography>
          <StyledTextField
  name="name"
  label="Name"
  value={values.name}
  onChange={handleChange}
/>
<StyledTextField
  name="email"
  label="Email"
  value={values.email}
  onChange={handleChange}
/>
<StyledTextField
  name="message"
  label="Message"
  value={values.message}
  onChange={handleChange}
  multiline
  rows={4}
/>
<FormControl>
  <InputLabel>Select Category</InputLabel>
  <Select
    name="category"
    value={values.category}
    onChange={handleChange}
  >
    <MenuItem value="programming_in_c">Programming in C</MenuItem>
    <MenuItem value="mathematics_for_computing">Mathematics for Computing</MenuItem>
    <MenuItem value="java">Java</MenuItem>
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