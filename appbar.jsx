import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import {Button,Typography} from '@mui/material/';
import { useEffect, useState } from "react";

function Appbar(){
    const navigate = useNavigate();
    const [userEmail,setuserEmail] =useState(null); 
    useEffect(()=>{
        function callback2(data) {
          if(data.username){
            setuserEmail(data.username)  
          }
          console.log(data);
        }
        function callback1(res) { 
         
          res.json().then(callback2);
          console.log("callback2 sended");
        }
        fetch("http://localhost:3000/admin/me", {
        method:"GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }).then(callback1) ;
    },[]);

    if(userEmail){
        return <div style={{
        display:"flex",
        justifyContent:"space-between"
    }}>
        <Typography  style={{ height:"22px", width:"55px",}}variant="h2">Course</Typography>
        <div>
       <div>
        {userEmail}
       </div>

                        <Button variant={"contained"} onClick={() => {
                            localStorage.setItem("token",null);
                        }}>Log Out</Button>
        </div>
    </div>
    }
  else {  return <div>
    <div style={{
        display:"flex",
        justifyContent:"space-between"
    }}>
        <Typography  style={{ height:"22px", width:"55px",}}Variant="h2">Course</Typography>
        <div>
        <Button variant={"contained"} onClick={() => {
                            navigate("/signup")
                        }}>Singup</Button>
        <Button variant={"contained"} onClick={() => {
                            navigate("/signin")
                        }}>Signin</Button>
                        <Button variant={"contained"} onClick={() => {
                            navigate("/addcourse")
                        }}>Addcourse</Button>
        </div>
    </div>
    </div>}

}
export default Appbar;
