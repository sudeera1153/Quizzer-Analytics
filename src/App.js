import './App.css';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider, UserAuth } from './context/AuthContext';
import ProtectedRoute from './security/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import NewPage from './components/AnalyticPage';
import CreatePage from './components/CreatePage';
import AddQuizPage from './components/AddQuizPage';
import  DeleteQuizPage  from './components/DeleteQuizPage';
import UsageReportPage from './components/UsageReportPage';
import OverallReportPage from './components/OvarallReportPage';
import StudentReportPage from './components/StudentReportPage';


// import { AuthProvider } from './Utility/Auth';


function App() {
  return (
    <div>
    <ToastContainer/>
    <AuthContextProvider>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/homepage' element={<ProtectedRoute><HomePage/></ProtectedRoute>} />
          <Route path='/newpage' element={<ProtectedRoute><NewPage/></ProtectedRoute>} />
          <Route path='/createpage' element={<ProtectedRoute><CreatePage/></ProtectedRoute>} />
          <Route path='/addquizpage' element={<ProtectedRoute><AddQuizPage/></ProtectedRoute>} />
          <Route path='/deletequizpage' element={<ProtectedRoute><DeleteQuizPage/></ProtectedRoute>} />
          <Route path='/reports/usage' element={<ProtectedRoute><UsageReportPage/></ProtectedRoute>} />
          <Route path='/reports/overall' element={<ProtectedRoute><OverallReportPage/></ProtectedRoute>} />
          <Route path='/reports/student' element={<ProtectedRoute><StudentReportPage/></ProtectedRoute>} />
        </Routes>
    </AuthContextProvider>
    </div>
    
    
  );
}

export default App;
