import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext'
import Sidebar from '../common/SideBar';



const HomePage = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log('You are logged out')
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
    <Sidebar title="Home" />
      <p>User Email: {user && user.email}</p>
      <p>User uid: {user && user.uid}</p>
      <Link to={'/newpage'}>NEw</Link>
      <Link to={'/createpage'}>Create</Link>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default HomePage