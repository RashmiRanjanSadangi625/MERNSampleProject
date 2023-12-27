import React ,{createContext, useReducer} from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Register from './components/Register'
import Login from './components/Login'
import Logout from './components/Logout'
import ErrorPage from './components/ErrorPage'
import { BrowserRouter, Route , Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import {intialstate,reducer} from "./reducer/useReducer"
 



export const UserContext = createContext();
const Routing = ()=>
{
  return(
    <Routes>
        <Route path ="/" element={<Home />}></Route>
        <Route path ="/about" element={<About />}></Route>
        <Route path ="/contact" element={<Contact />}></Route>
        <Route path ="/register" element={<Register />}></Route>
        <Route path ="/login" element={<Login />}></Route>
        <Route path ="/logout" element={<Logout />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    )
}

function App() 
{
  const[state,dispatch] = useReducer(reducer,intialstate);
  return (
   <>
   <UserContext.Provider value={{state,dispatch}}>
   <BrowserRouter>
      <Navbar/>
      <Routing/>
    </BrowserRouter>     
    </UserContext.Provider>
   </>
  );
}

export default App;
