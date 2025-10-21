import axios from "axios";
import React, { useContext} from "react";
import { User } from "../Context/UserContext";
import "../../../index.css"

import { Header } from "../../../Components/Header";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
export default function SignUp(){
  
    const [email,setEmail] =React.useState("")
    const [password,setPassword] =React.useState("");
    
    const [access,setAccess] =React.useState(false);
    const [Err, setErr] = React.useState(false);

    const userNow= useContext(User);
    const nav= useNavigate();

     // cookie
        const cookie = new Cookies();
    async function Submit(e){
        
        e.preventDefault();
        setAccess(true)
        try{
    
                let res=await axios
                    .post(`http://127.0.0.1:8000/api/login`,{
                        
                        email:email,
                        password:password,
                      
                    });
                  
                        const token = res.data.data.token;
                        cookie.set('Bearer', token);
                        const userDetails = res.data.data.user;
                        
                        userNow.setAuth({token, userDetails});
                        
                        alert("login successful!");
                        nav("/dashboard");
                        
                        // console.log('donnnnnnnnnnne')
        }
        catch(err){
            if(err.response.status === 401){
                setErr(true);
            }
            setAccess(true);
        }
    }
    return(
        <div>
            <Header/>
            <div className='parent login' style={{display:'flex', height:'80vh', justifyContent:'center', alignItems:'center'}}>
        <div className="register login" >
                <form  onSubmit={Submit} >
                
                    
                    <label htmlFor="email">Email:</label>
                    <input 
                        id="email"  
                        type="text" 
                        placeholder="email" 
                        required
                        value={email}
                        onChange= {(e)=> setEmail(e.target.value)}
                    />
                  
                    <label htmlFor="password">Password:</label>
                    <input  className="error"
                    
                        id="password" 
                        type="password" 
                        placeholder="password.... "
                        value={password} 
                        onChange={(e)=> setPassword(e.target.value)}/>
                        {access&& password.length < 8 && (<p style={{ color: "red", fontSize: "12px", marginTop:'-8px' }}>Password must be at least 8 characters long</p>)}

                    <div style={{ textAlign: "center" }}>
                        <button type="submit" style={{width:'100%'}} >Login</button>
                    </div>
                    {access && Err === 422 && (<p style={{ color: "red", fontSize: "12px", marginTop:'-8px' }}>Wrong Email Or Password</p>)}
                </form>
            </div>
        </div>
        </div>
    )  ;
}





