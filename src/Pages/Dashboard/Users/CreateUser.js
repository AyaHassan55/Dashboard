import axios from "axios";

import "../../../index.css"

import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { User } from "../../Website/Context/UserContext";

export default function CreateUser(){
    const [name,setName] =useState("");
    const [email,setEmail] =useState("")
    const [password,setPassword] =useState("");
    const [repeatPassword,setRepeatPassword] =useState("");
    const [access,setAccess] =useState(false);
    const [emailError, setEmailError] = useState(false);

   
    const nav= useNavigate();
    const context = useContext(User);
    const token=context.auth.token;


   
    async function Submit(e){
        
        e.preventDefault();
        setAccess(true)
        try{
    
                // send data to backend
                let res=await axios
                    .post(`http://127.0.0.1:8000/api/user/create`,{
                        name:name,
                        email:email,
                        password:password,
                        password_confirmation:repeatPassword
                    },{
                        headers: {
                            Authorization: `Bearer ${token}`,
                    },
                    }
                );
                        alert("add new user successful!");
                        nav("/dashboard/users");
                        
                        
        }
        catch(err){
            if(err.response.status === 422){
                setEmailError(true);
            }
            setAccess(true);
        }
    }
    return(
        <div>
           
            <div className='parent login' style={{display:'flex', height:'80vh', justifyContent:'center', alignItems:'center'}}>
        <div className="register login" >
                <form  onSubmit={Submit} >
                    <label htmlFor="name">Name:</label>
                    <input  className="error"
                        id="name" 
                        type="text" 
                        placeholder="name"
                        value={name}
                        onChange = {(e)=> setName(e.target.value)}
                        
                    />
                    {access&& name ==='' && (<p style={{ color: "red", fontSize: "12px", marginTop:'-8px' }}>Name is required</p>)}
                    <label htmlFor="email">Email:</label>
                    <input 
                        id="email"  
                        type="text" 
                        placeholder="email" 
                        required
                        value={email}
                        onChange= {(e)=> setEmail(e.target.value)}
                    />
                    {access && emailError === 422 && (<p style={{ color: "red", fontSize: "12px", marginTop:'-8px' }}>Email already exists</p>)}
                    <label htmlFor="password">Password:</label>
                    <input  className="error"
                    
                        id="password" 
                        type="password" 
                        placeholder="password.... "
                        value={password} 
                        onChange={(e)=> setPassword(e.target.value)}/>
                        {access&& password.length < 8 && (<p style={{ color: "red", fontSize: "12px", marginTop:'-8px' }}>Password must be at least 8 characters long</p>)}

                    <label htmlFor="repeat password">Repeat Password:</label>
                    <input  className="error"
                    
                    
                        id="repeat password" 
                        type="password" 
                        placeholder=" repeat password...."
                        value={repeatPassword}
                        onChange={(e)=> setRepeatPassword(e.target.value)}/>
                        {access&&repeatPassword.length > 0 && repeatPassword !== password && (<p style={{ color: "red", fontSize: "12px", marginTop:'-8px' }}>Passwords do not match</p>)}

                    <div style={{ textAlign: "center" }}>
                        <button type="submit" style={{width:'100%'}} >Create User</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )  ;
}



