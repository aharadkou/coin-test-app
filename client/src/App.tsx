import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import './App.css';
import { ProfileComponent } from './components/profile/ProfileComponent';
import { LoginComponent } from './components/login/LoginComponent';
import { HeaderComponent } from './components/header/HeaderComponent';

function App() {
  const [userInfo, setUserInfo] = useState();

  return (
    <Router>
      <div className='app'>
        <HeaderComponent userInfo={userInfo}/>
        <Routes>
          <Route path='/' element={<LoginComponent setUserInfo={setUserInfo}/>}></Route>
          <Route path='/profile' element={<ProfileComponent userInfo={userInfo}/>}></Route>
        </Routes>
        <ToastContainer autoClose={2000} />
      </div>
    </Router>
  );
}



export default App;
