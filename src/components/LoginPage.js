import React , {useState} from 'react';
import firebase from 'firebase/compat/app';
import { Modal } from "@mui/material";
import { CircularProgress } from "@mui/material";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { HomeMaxOutlined } from '@mui/icons-material';
import { Navigate, NavLink, Router, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import coverImage from '../resources/quizzercover.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from "../Utility/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc
} from "firebase/firestore";

// Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyAGgouSE05Cm_tfLyzwQwTxAC6w3X8L3Oo",
//   authDomain: "quizzer-77675.firebaseapp.com",
//   projectId: "quizzer-77675",
//   storageBucket: "quizzer-77675.appspot.com",
//   messagingSenderId: "1051955775110",
//   appId: "1:1051955775110:web:bd05817fd06149bdf53307",
//   measurementId: "G-DMTGPV2TRY"
// };

// firebase.initializeApp(firebaseConfig);

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {signIn} = UserAuth();
  const [rememberMe, setRememberMe] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async(e) => {
    setLoading(true);
    e.preventDefault();
    setError('')
    const userDocRef = doc(db, 'users', email);

    await getDoc(userDocRef)
      .then((doc) => {
        if (doc.exists()) {
          const data = doc.data();
          const userType = data.usertype;
          console.log(`User type: ${userType}`);
          if(data.usertype === 'admin'){
            signin();
          }
          else{
            toast.error('User Does Not Have Administrator Previlages', {
              position: 'top-left', 
              autoClose: 5000, 
              hideProgressBar: false, 
              closeOnClick: true, 
              pauseOnHover: true, 
              draggable: false,
              progress: undefined, 
            });
          }
        } else {
          toast.error('User Does Not Exist!', {
            position: 'top-left', 
            autoClose: 5000, 
            hideProgressBar: false, 
            closeOnClick: true, 
            pauseOnHover: true, 
            draggable: false,
            progress: undefined, 
          });
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });   
      setLoading(false);
  };

  const signin = async() => {
    try{
      await signIn(email,password,rememberMe)
      toast.success('Login Success', {
        position: 'top-center', 
        autoClose: 1000, 
        hideProgressBar: false, 
        closeOnClick: true, 
        pauseOnHover: false,
        draggable: false, 
        progress: undefined,
      });
      navigate('/homepage')
    }
    catch(e){
      setError(e.message)
      console.log(e.message)
      toast.error('Invalid username or password. Please try again.', {
        position: 'top-left', // position of the toast message
        autoClose: 5000, // auto close duration in milliseconds
        hideProgressBar: false, // whether to hide the progress bar
        closeOnClick: true, // close the toast on click
        pauseOnHover: true, // pause the toast on hover
        draggable: false, // make the toast draggable
        progress: undefined, // custom progress bar component
        // you can customize more options here, refer to the documentation for more details
      });
    }

  }
  const theme = createTheme();
  return (
    
    <ThemeProvider theme={theme}>
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
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${coverImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <HomeMaxOutlined />
            </Avatar> */}
            <Typography component="h1" variant="h5" sx={{mt:15}}>
              Welcome To Quizzer - Analytics
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                label="Remember me"
              />
              <Button
      onClick={handleLogin}
      fullWidth
      variant="contained"
      sx={{
        mt: 3,
        mb: 2,
        backgroundColor: 'red', // change background color
        color: 'white', // change text color
        borderRadius: '10px', // change border radius
        '&:hover': {
          backgroundColor: 'blue', // change background color on hover
        },
      }}
    >
                Sign In
              </Button>
              
              
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LoginPage;



// firebase
//       .auth()
//       .signInWithEmailAndPassword(email, password)
//       .then((userCredential) => {
//         // Handle successful login
        
//       })
//       .catch((error) => {
//         // Handle login error
//         console.error("Login error:", error);
//       });