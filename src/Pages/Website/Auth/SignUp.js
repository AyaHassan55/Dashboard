import axios from "axios";
import React, { useContext} from "react";
import { User } from "../Context/UserContext";
import "../../../index.css"
// import { Navigate } from "react-router-dom";
// import { User } from "../../Pages/Website/Context/UserContext";
import { Header } from "../../../Components/Header";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
export default function SignUp(){
    const [name,setName] =React.useState("");
    const [email,setEmail] =React.useState("")
    const [password,setPassword] =React.useState("");
    const [repeatPassword,setRepeatPassword] =React.useState("");
    const [access,setAccess] =React.useState(false);
    const [emailError, setEmailError] = React.useState(false);

    const cookie= new Cookies();

    const userNow= useContext(User);
    const nav= useNavigate();


   
    async function Submit(e){
        
        e.preventDefault();
        setAccess(true)
        try{
    
                // send data to backend
                let res=await axios
                    .post(`http://127.0.0.1:8000/api/register`,{
                        name:name,
                        email:email,
                        password:password,
                        password_confirmation:repeatPassword
                    });
                  
                        const token = res.data.data.token;
                        cookie.set('Bearer', token);
                        const userDetails = res.data.data.user;
                        
                        userNow.setAuth({token, userDetails});
                        alert("Registration successful!");
                        nav("/dashboard");
                        
                        // console.log('donnnnnnnnnnne')
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
            <Header/>
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
                        <button type="submit" style={{width:'100%'}} >Register</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )  ;
}


// import { Header } from "../../../Components/Header";
// import Forms from "../../../Components/Forms/Forms";

// export default function SignUp() {
    
//     return (
//         <div>
//             <Header/>
//             <div className="parent" style={{display:'flex', height:'80vh', justifyContent:'center', alignItems:'center'}}>
//                 <Forms button="Register"
//                 endPoint="register"
//                 navigateTo="/"
//                 styleRegister={true}
                
                
//                 />
//             </div>
//         </div>
//     );
// }

