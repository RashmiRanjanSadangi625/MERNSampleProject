import React , { useState }from 'react'
import { NavLink ,useNavigate} from 'react-router-dom'
function Register() {
  const navigate = useNavigate();

  // usestate hook
 const [user,setUser] = useState({
  name:"",email:"",work:"",phone:"",password:"",cpassword:""
 }) 

  const handleInputs =(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }


  const PostData = async (e)=>
  {
    e.preventDefault();

    const {name,email,work,phone,password,cpassword} = user;

    const res = await fetch("/register",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          name,email,work,phone,password,cpassword
        })
      });

    const data = await res.json();

    if(res.status === 422 || !data)
      {
        window.alert("Invalid Registartion !");
        console.log("Invalid Registartion !")
      }
      else
      {
        window.alert("Successfully Registered !");
        console.log("Successfully Registered !");
        navigate("/login");
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
                  <h5 className="text-uppercase text-center mb-2">Create an account</h5>

                  <form method="POST">
                    <div className="form-outline mb-3">
                     <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        className="form-control form-control-lg"
                        value={user.name}
                        onChange={handleInputs} />
                    </div>

                    <div className="form-outline mb-3">
                     <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                      <input
                         type="email" 
                         name="email" 
                         id="email" 
                         className="form-control form-control-lg"
                         value={user.email}
                         onChange={handleInputs} />                 
                    </div>
                    <div className="form-outline mb-3">
                     <label className="form-label" htmlFor="form3Example1cg">Phone</label>
                      <input
                         type="text" 
                         name="phone" 
                         id="phone" 
                         className="form-control form-control-lg"
                         value={user.phone}
                         onChange={handleInputs} />
                    </div>
                    <div className="form-outline mb-3">
                     <label className="form-label" htmlFor="form3Example1cg">Work</label>
                      <input
                         type="text" 
                         name="work" 
                         id="work" 
                         className="form-control form-control-lg"
                         value={user.work}
                         onChange={handleInputs} />
                    </div>
                    <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form3Example4cg">Password</label>
                      <input
                         type="password" 
                         name="password" 
                         id="password" 
                         className="form-control form-control-lg"
                         value={user.password}
                         onChange={handleInputs} />
                    </div>
                    <div className="form-outline mb-3">
                     <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label>
                      <input
                         type="password" 
                         name="cpassword" 
                         id="cpassword" 
                         className="form-control form-control-lg"
                         value={user.cpassword}
                         onChange={handleInputs} />
                    </div>

                    <div className="d-flex justify-content-center">
                      <input type="submit" value="Register" name="signup" id="signup" onClick={PostData}/>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">Have already an account? <NavLink to="/login"
                        className="fw-bold text-body"><u>Login here</u></NavLink></p>

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

export default Register;
