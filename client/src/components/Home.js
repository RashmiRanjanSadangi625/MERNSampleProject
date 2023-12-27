import React ,{useEffect, useState }from 'react'
import '../App.css'
function Home() {

  const [data,setData] = useState({name:""});
 const fetchData =async ()=>
 {
      try
      {
        const res = await fetch("/home",{
          method : "GET",
          headers:{
            "Content-Type":"application/json"
          }      
        })

        const data = await res.json();

        if(!data)
        {
          console.log("Data not available")
        }
        else
        {
          setData({name:data.name});
        }
      }
      catch(err)
      {
        console.log(err);
      }
 }
 useEffect(() => {
    fetchData();
  },[])



  return (
    <div className ="home">
      <div className="home-div">
        <p>Welcome !</p>
        <h1>{data.name}</h1>
        <h5>Mr. MERN Developer </h5>
      </div>
    </div>   
  );
}

export default Home;
