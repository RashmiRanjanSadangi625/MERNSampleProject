import React ,{ useState, useEffect} from 'react'
import { NavLink ,useNavigate} from 'react-router-dom'
function Contact() {

  const navigate = useNavigate();
  const [userData,setUserData]= useState({name:"",email:"",phone:"",message:""});

  const userContact = async () =>
  {
    try
    {
      const res  = await fetch("/getdata",
        {
            method:"GET",
            headers : {
              "Content-Type" : "application/json"
            }
        })
      const data = await res.json();
      console.log(userData);
      setUserData({...userData,name:data.name,email:data.email,phone:data.phone});
      if(!res.status === 200)
        {
          throw new Error(res.err);
        }
    }
    catch (err){
      console.log(err);
      navigate("/login");
    }
  }

  useEffect(() => {
    userContact();
  },[])

  const handleInputs = (e) =>
  {
    setUserData({...userData,[e.target.name]:e.target.value});
  }
  const submitContactForm = async (e)=>
  {
    e.preventDefault();
    const {name , email , phone, message} = userData;
    const res = await fetch("/contact",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,email,phone,message
      })
    });

    const data= await res.json();

    if(!data)
    {
      console.log("Message not sent !")
    }
    else
    {
      alert("Message sent !");
      setUserData({...userData,message:""})
    }
  }
  return (
    <section className="vh-50 bg-image">
      <div className="mask d-flex align-items-center h-50 gradient-custom-3">
        <div className="container h-50">
        <h5 className="text-uppercase text-center mb-2">Contact Form</h5>
         <div className="d-flex align-items-center justify-content-center  info">
              <div>
                <p>Phone</p>
                <p>{userData.phone}</p>
              </div>
              <div>
                <p>Email</p>
                <p>{userData.email}</p>
              </div>
              <div>
                <p>Address</p>
                <p>Pune,MH</p>
              </div>
            </div>
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card mt-2">
                <div className="card-body p-2">
                  

                  <form method="POST" id="contact_form">
                    <div className="form-outline mb-3">
                     <label className="form-label" for="form3Example1cg">Your Name</label>
                      <input
                        type="text" 
                        name="name" 
                        id="name" 
                        className="form-control form-control-md" 
                        onChange = {handleInputs}
                        value={userData.name} 
                        required="true"/>
                    </div>
                    <div className="form-outline mb-3">
                     <label className="form-label" for="form3Example3cg">Your Email</label>
                      <input
                        type="email" 
                        name="email" 
                        id="email" 
                        className="form-control form-control-md" 
                        onChange = {handleInputs}
                        value={userData.email} 
                        required="true"/>                 
                    </div>
                     <div className="form-outline mb-3">
                     <label className="form-label" for="form3Example1cg">Phone</label>
                      <input
                        type="text" 
                        name="phone" 
                        id="phone" 
                        className="form-control form-control-md" 
                        onChange = {handleInputs}
                        value={userData.phone} 
                        required="true"/>
                    </div>
                     <div className="form-outline mb-3">
                     <label className="form-label label-size" for="form3Example1cg">Message</label>
                     <textarea rows="5" cols="65"
                        name="message" 
                        onChange = {handleInputs}
                        value={userData.message}  
                        id="message"></textarea>
                    </div>
                    <div className="d-flex justify-content-center">
                      <input
                        type="submit" onClick={submitContactForm} value = "Send" name="send" id="send"/>
                    </div>
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

export default Contact;
