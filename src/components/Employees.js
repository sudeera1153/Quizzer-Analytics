import React, { useState } from 'react';
import { TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    await addDoc(quizzesCollectionRef, { quizname: values.name});
    console.log(values);
  };

  return (
    <PageContainer>
    <Sidebar/>
      <Box paddingTop="2rem">
        <FormContainer>
          <Typography variant="h4" component="h2" align="center">
            Add Quiz
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
          <SubmitButton type="submit" variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </SubmitButton>
        </FormContainer>
      </Box>
    </PageContainer>
  );
}

// import React, { useState } from 'react';
// import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';

// const SearchPage = () => {
//   const [searchText, setSearchText] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [selectedOption, setSelectedOption] = useState('');

//   const handleSearchClick = () => {
//     // TODO: Implement search logic with Firebase
//     // Update searchResults state with the retrieved documents
//   };

//   const handleDeleteClick = (documentId) => {
//     // TODO: Implement delete logic with Firebase
//     // Remove the document with the provided documentId from the database
//   };

//   return (
//     <div>
//       {/* Dropdown component */}
//       <FormControl>
//         <InputLabel>Select an option</InputLabel>
//         <Select
//           value={selectedOption}
//           onChange={(e) => setSelectedOption(e.target.value)}
//         >
//           <MenuItem value="option1">Option 1</MenuItem>
//           <MenuItem value="option2">Option 2</MenuItem>
//           <MenuItem value="option3">Option 3</MenuItem>
//         </Select>
//       </FormControl>

//       {/* Search button */}
//       <Button variant="contained" color="primary" onClick={handleSearchClick}>
//         Search
//       </Button>

//       {/* Table */}
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Document Name</TableCell>
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {/* Render searchResults data */}
//           {searchResults.map((document) => (
//             <TableRow key={document.id}>
//               <TableCell>{document.name}</TableCell>
//               <TableCell>
//                 {/* Delete button */}
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   onClick={() => handleDeleteClick(document.id)}
//                   startIcon={<DeleteIcon />}
//                 >
//                   Delete
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default SearchPage;

