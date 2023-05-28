import React from 'react'; 
import './App.css';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import { store } from '@app/redux/store'
import { useAppDispatch, useAppSelector } from './hooks';
import { changeText } from '@app/redux/authenReducer';
import LoginScreen from '@app/screens/login/login.screen';
import { MsalProvider,  } from '@azure/msal-react';
import { pca } from '@app/azure/configs';
import * as Tooltip from '@radix-ui/react-tooltip';
import { ToastContainer } from 'react-toastify';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import RouteGuard from './guards/auth.guard';
import DashboardScreen from './screens/dashboard/dashboard.screen';
import IndexScreen from './screens/index/index.screen';
import SearchScreen from './screens/search/search.screen';

import i18n from './i18n'; 
import 'react-toastify/dist/ReactToastify.css';
let persistor = persistStore(store)

function App() {
  return (
    <MsalProvider instance={pca}>
        <I18nextProvider i18n={ i18n }>
        <Tooltip.Provider >
    <Provider store={store} > 
    <PersistGate persistor={persistor}>
       <Router>
       <Routes> 
          <Route path="/" element={ <RouteGuard/>} > 
              <Route  path='/' element={<DashboardScreen/>}/>   
              <Route  path='/index' element={<IndexScreen/>}/>   
              <Route  path='/search' element={<SearchScreen/>}/>   
          </Route> 
          <Route path="/dash" element={ <DashboardScreen/>} />
          <Route path="/login" element={ <LoginScreen/>} />
        </Routes>
    </Router>
    <ToastContainer/>
    </PersistGate>
    </Provider>
     </Tooltip.Provider>
  
    </I18nextProvider>
    </MsalProvider>
  );
}
 
export default App;
