import React from 'react'; 
import './App.css';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import { store } from '@app/redux/store'
import { useAppDispatch, useAppSelector } from './hooks';
import { changeText } from '@app/redux/authenReducer';
import LoginScreen from '@app/screens/login/login.screen';
import { MsalProvider,  } from '@azure/msal-react';
import { pca } from '@app/azure/configs';
import RouteGuard from './guards/auth.guard';


function App() {
  return (
    <MsalProvider instance={pca}>

    <Provider store={store}> 
       <Router>
       <Routes> 
          <Route path="/" element={ <RouteGuard/>} > 
              <Route  path='/' element={<LoginScreen/>}/>   
          </Route> 
          <Route path="/login" element={ <LoginScreen/>} />
        </Routes>
    </Router>
    </Provider>
    </MsalProvider>
  );
}
 
export default App;
