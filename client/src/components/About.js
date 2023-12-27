import React ,{ useEffect ,useState } from 'react'
import {useNavigate} from 'react-router-dom'

function About() {

  const navigate = useNavigate();
  const [userData,setUserData]= useState({});

  const fetchData = async () =>
  {
    try
    {
      const res  = await fetch("/about",
        {
            method:"GET",
            headers : {
              Accept:"application/json",
              "Content-Type" : "application/json"
            },
            credentials:"include"
        })
      const data = await res.json();
      console.log(data);
      setUserData(data);

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
    fetchData();
  },[])
  return (
     <section className="vh-50 bg-image">
     <form method="GET">
      <div className="mask d-flex align-items-center h-50 gradient-custom-3">
        <div className="container h-50">
        <h5 className="text-uppercase text-center mb-2">About Me</h5>
         <div className="d-flex align-items-center justify-content-center  info">
              <div className ="data">
                <label>Name</label>
                <p>{userData.name}</p>          
              </div>

              <div className ="data">
                <label>Email</label>
                <p>{userData.email}</p>          
              </div>

              <div className ="data">
                <label>Work:-</label>
                <p>{userData.work}</p>          
              </div>

              <div className ="data">
                <label>Phone</label>
                <p>{userData.phone}</p>          
              </div>
            </div>
        </div>
      </div>
      </form>
  </section>
  );
}

export default About;
