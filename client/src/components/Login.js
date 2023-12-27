import React , { useState,useContext } from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import {UserContext} from "../App.js"
function Login() {

  const {state,dispatch} = useContext(UserContext);

  const navigate = useNavigate();

  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");

  const userLogin = async (e)=>
  {
    e.preventDefault();

    const res=await fetch("/signin",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        email,password
      })
    })
     const data = await res.json();

    if(res.status === 400 || !data)
      {
        window.alert("Invalid Credentials !");
        console.log("Invalid Credentials !")
      }
      else
      {
        dispatch({type:"USER",payload:true})
        window.alert("Successfully Logged In !");
        console.log("Successfully Logged In !");
        navigate("/");
      }
  }

  return (
    <section className="vh-50 bg-image">
      <div className="mask d-flex align-items-center h-50 gradient-custom-3">
        <div className="container h-50">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card mt-2">
                <div className="card-body p-2">
                  <h5 className="text-uppercase text-center mb-2">Login</h5>
                  <form method="POST">
                    <div className="form-outline mb-3">
                     <label className="form-label" for="form3Example3cg">Your Email</label>
                      <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        value={email}
                        onChange={(e) => { setEmail(e.target.value)}}
                        className="form-control form-control-lg" />                 
                    </div>
                    <div className="form-outline mb-3">
                    <label className="form-label" for="form3Example4cg">Password</label>
                      <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        value={password}
                        onChange={(e) => { setPassword(e.target.value)}}
                        className="form-control form-control-lg" />
                    </div>
                    <div className="d-flex justify-content-center">
                      <input type="submit" onClick = {userLogin} value = "Login" name="login" id="login" />
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">Have already an account? <NavLink to="/register"
                        className="fw-bold text-body"><u>Register Here !</u></NavLink></p>

                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </section>
  );
}

export default Login;
