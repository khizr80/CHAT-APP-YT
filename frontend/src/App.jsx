/* eslint-disable no-unused-vars */
// import './App.css';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../src/pages/login/Login";
import SignUp from "../src/pages/signup/SignUp";
import Home from "../src/pages/home/Home";
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from "../context/AuthContext";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      
        <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
				<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
			
        </Routes>
      
      <Toaster />
    </div>
  );
}

export default App;
