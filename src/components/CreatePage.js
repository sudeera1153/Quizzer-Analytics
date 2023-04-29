import React from 'react'
import { useState, useEffect } from "react";
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
import { UserAuth } from '../context/AuthContext';
import Sidebar from '../common/SideBar';
import { Bar, Line, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





function CreatePage() {
  const [mark1, setMark1] = useState(0);
  const [mark2, setMark2] = useState(0);
  const [mark3, setMark3] = useState(0);
  const [mark4, setMark4] = useState(0);
  const [mark5, setMark5] = useState(0);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const { user } = UserAuth();
  const [totalMarks, setTotalMarks] = useState(0);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const state = {
    labels: ['January', 'February', 'March',
      'April', 'May'],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [totalMarks, mark2, mark3, mark4, mark5]
      }
    ]
  }



  const createUser = async () => {

    if (newName === '' || newAge === '') {
      toast.error('Cannot be empty', {
        position: 'top-left', // position of the toast message
        autoClose: 5000, // auto close duration in milliseconds
        hideProgressBar: false, // whether to hide the progress bar
        closeOnClick: true, // close the toast on click
        pauseOnHover: true, // pause the toast on hover
        draggable: false, // make the toast draggable
        progress: undefined, // custom progress bar component
        // you can customize more options here, refer to the documentation for more details
      })
    }
    else {
      await addDoc(usersCollectionRef, { uid: user.uid, username: user.email, name: newName, age: Number(newAge) });
      const q = query(collection(db, "users"), where("username", "==", "sudeera1153@gmail.com"));
      const querySnapshot = await getDocs(q);
      let total = 0;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        total += data.age;
      });
      setTotalMarks(total);
    }


  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };
  //By This Use Effect the page onLoading will handle
  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(usersCollectionRef);
  //     setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };

  //   const fetchMarks = async () => {
  //     const q = query(collection(db, "users"), where("username", "==", "sudeera1153@gmail.com"));
  //     const querySnapshot = await getDocs(q);
  //     let total = 0;
  //     querySnapshot.forEach((doc) => {
  //       const data = doc.data();
  //       total += data.age;
  //     });
  //     setTotalMarks(total);
  //   };
  //   fetchMarks();  
  //   getUsers();
  // }, []);


  return (
    <div className="App">
      <Sidebar />
      {totalMarks}
      <input
        placeholder="Name..."
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Age..."
        onChange={(event) => {
          setNewAge(event.target.value);
        }}
      />

      <button onClick={createUser}> Create User</button>
      {users.map((user) => {
        return (
          <div>
            {" "}
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <button
              onClick={() => {
                updateUser(user.id, user.age);
              }}
            >
              {" "}
              Increase Age
            </button>
            <button


              onClick={() => {
                deleteUser(user.id);
              }}
            >
              {" "}
              Delete User
            </button>
          </div>
        );
      })}
      <Line
        data={state}
        options={{
          title: {
            display: true,
            text: "Average Rainfall per month",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  )
}

export default CreatePage