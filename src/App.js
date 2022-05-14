import React from 'react';
// import { BrowserRouter, Route, Routes, Navigate,  } from 'react-router-dom';
// require('dotenv').config();

import Flowchart from './pages/Flowchart';
// import { Test } from './pages/Test';
// import { Login } from './pages/Login';

import './App.css';
import './bootstrap/css/bootstrap.min.css';
// import { api } from './services/api';
// import { Admi } from './pages/Admin';
// import { Error404 } from './pages/error/404';

const App = () => {
  // const [token, setToken] = useState(localStorage.getItem('token'));

  // const getToken = (tk) => {
  //   setToken(tk);
  //   localStorage.setItem('token', tk);
  // }
  // let navigate = useHref();

  // if (token == undefined || localStorage.getItem('token') == null) {
  //   // localStorage.setItem('token', token);
  //   return <Login setToken={getToken} />
  // }

  // useEffect(async () => {
    
  //   console.log("🚀 ~ file: App.js ~ line 19 ~ useEffect ~ navigate", navigate)
  //   if (localStorage.getItem('token')) {
  //     await api.get('/user', {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         "Accept": "application/json",
  //         "Authorization": "Bearer " + localStorage.getItem('token'),
  //       }
  //     }).then(res => {
  //       // console.log(res.data);
  //       setToken(localStorage.getItem('token'));
  //       console.log(token);
  //     }).catch(err => {
  //       // console.log(err);
  //     });
  //     // setToken()
  //   }
  // }, [token]);
  // console.log(token);

  return (
    <Flowchart />
    // <BrowserRouter>
    //     <Routes>
    //     <Route exact path="/" element={<Navigate to="/login" />} />
    //     <Route exact path="/login/" element={<Login setToken={getToken}/>} />
    //       <Route exact path="/flowchart" element={token ? <Flowchart /> : <Navigate to="/login" />}/>
    //       {/* <Route exact path="/flowchart" element={<Flowchart />}/> */}
    //     {/* <Route exact path="/test" element={token ? <Test /> : <Navigate to="/login" />}/> */}
    //     {/* <Route exact path="/admin" element={token ? <Admi /> : <Navigate to="/login" />}/> */}
    //       <Route exact path="*" element={<Error404/>}/>
    //     </Routes>
    //   </BrowserRouter>
  );
}
export default App;