// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom';
// import { UserAuth } from '../context/AuthContext'
// import Sidebar from '../common/SideBar';



// const HomePage = () => {
//   const { user, logout } = UserAuth();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate('/');
//       console.log('You are logged out')
//     } catch (e) {
//       console.log(e.message);
//     }
//   };

//   return (
//     <div>
//     <Sidebar title="Home" />
//       <p>User Email: {user && user.email}</p>
//       <p>User uid: {user && user.uid}</p>
//       <Link to={'/newpage'}>NEw</Link>
//       <Link to={'/createpage'}>Create</Link>

//       <button onClick={handleLogout}>
//         Logout
//       </button>
//     </div>
//   );
// };

// export default HomePage

// import Companies from "../components/homepagesub/Companies";
// import Guide from "../components/homepagesub/Guide";
// import Hero from "../components/homepagesub/Hero";
// import Properties from "../components/homepagesub/Properties";
// import Details from "../components/homepagesub/Details";
// import GetStarted from "../components/homepagesub/GetStarted";
// import Footer from "../components/homepagesub/Footer";
// import Sidebar from "../common/SideBar";

// function HomePage() {
//   return (
    
//     <><Sidebar/>
//       <Hero />
//       {/* <Companies />
//       <Guide />
//       <Properties />
//       <Details />
//       <GetStarted /> */}
//       {/* <Footer /> */}
//     </>
//   );
// }

// export default HomePage;

import { Box, Button, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import heroImg from "../resources/hero_illustration.png";
import CustomButton from "../components/homepagesub/CustomButton";
import Sidebar from "../common/SideBar";
import { getAuth, signOut } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const auth = getAuth();

const HomePage = () => {

  const HandlesignOut = () => {

    signOut(auth)
  .then(() => {
    toast.success('Successfuly Signed Out', {
      position: 'top-center', 
      autoClose: 1000, 
      hideProgressBar: false, 
      closeOnClick: true, 
      pauseOnHover: false,
      draggable: false, 
      progress: undefined,
    });
  })
  .catch((error) => {
    // An error happened.
    console.log(error);
  });
  }
  
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  return (
   
    <Box sx={{ backgroundColor: "#E6F0FF", minHeight: "80vh" }}>
     <Sidebar/>
      <Container>
        {/* <Navbar /> */}
        <CustomBox>
          <Box sx={{ flex: "1" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "18px",
                color: "#687690",
                fontWeight: "500",
                mt: 10,
                mb: 4,
              }}
            >
              Welcome to Quizzer Analytics
            </Typography>
            <Title variant="h1">
            Grading made simple. Insights made powerful.
            </Title>
            <Typography
              variant="body2"
              sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
            >
              Streamline grading and drive student success with our powerful quiz analytics and admin tools. Get insights to improve teaching and boost engagement
            </Typography>

           
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#fff',
                color: '#000',
                fontWeight: "700",
                fontSize: "14px",
                cursor: "pointer",
                padding: "0.5rem 1.25rem",
                borderRadius: "7px",
                textTransform: "none",
                display: "block",
                border: "2px solid transparent",
                position: "absolute", 
                top: 15,
                right: 10,
                "&:hover": {
                  backgroundColor: '#000',
                  color: '#fff',
                  borderColor: '#fff',
                },
              }}
              onClick={HandlesignOut}
            >
              Log Out
            </Button>
          </Box>

          <Box sx={{ flex: "1.25" }}>
            <img
              src={heroImg}
              alt="heroImg"
              style={{ maxWidth: "100%",maxHeight:"80%", marginBottom: "2rem" }}
            />
          </Box>
        </CustomBox>
      </Container>
    </Box>
  );
};

export default HomePage;
