import React ,{useState,useEffect,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {UserContext} from "../App.js"

const Logout =() =>
{
	const {state,dispatch} = useContext(UserContext);
	const navigate = useNavigate();

	const logout = async ()=>
	{
		try
		{
			const res = await fetch('/logout',{
				method:"GET",
				headers:{
					Accept:"application/json",
					"Content-Type" : "application/json",
				},
				credentials :"include" 
			})
			const data = await res.json();
			dispatch({type:"USER",payload:false})
			console.log(data);
			if(!res.status === 200)
			{
			    throw new Error(res.err);
			}
		}
		catch(err)
		{
			console.log(err);
			navigate("/login");
		}
	}


	useEffect(()=>
		{
			logout();

		},[])


	return(
		<>
		 	<h1>Logout</h1>
		</>
		)
}

export default Logout