// import axios from "axios";
// import React, { useContext, useEffect } from "react";
// import "../../index.css"
// import { User } from "../../Pages/Website/Context/UserContext";

// export default function Forms(props){
//     const [name,setName] =React.useState("");
//     const [email,setEmail] =React.useState("")
//     const [password,setPassword] =React.useState("");
//     const [repeatPassword,setRepeatPassword] =React.useState("");
//     const [access,setAccess] =React.useState(false);
//     const [emailError, setEmailError] = React.useState(false);

//     const userNow= useContext(User);

//     const styleRegister={
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: "40px"
//     }
//     const form={
//         boxShadow:" 0 2px 15px rgb(0 0 0 / 10%)",
//         width:"400px",
//     }
//     const buttonStyle={
//         width:"100%"
//     }

//     useEffect(()=>{
//         setName(props.name);
//         setEmail(props.email)
//     },[props.name, props.email]);

//     async function Submit(e){
//         let flag=true;
//         e.preventDefault();
//         setAccess(true)
//         if(name ==='' || password.length <8 || repeatPassword !== password){
//             flag=false;
            
//         }else{
//             flag=true;
//         }
//         try{
//             if(flag){
//                 // send data to backend
//                 let res=await axios
//                     .post(`http://127.0.0.1:8000/api/${props.endPoint}`,{
//                         name:name,
//                         email:email,
//                         password:password,
//                         password_confirmation:repeatPassword
//                     });
//                     // if(res.status===200){
//                     //    props.hasLocalStorage && window.localStorage.setItem("email",email);
                         
//                     //     window.location.pathname=`${props.navigateTo}`;
//                     // }
//                     if(props.endPoint ==="register" && res.status===200){
//                         const token = res.data.data.token;
//                         const userDetails = res.data.data.user;
//                         userNow.setAuth({token, userDetails});
//                     }
                   
//                 }
//         }
//         catch(err){
//             if(err.response.status === 422){
//                 setEmailError(true);
//             }
//             setAccess(true);
//         }
//     }
//     return(
//         <div className="register" style={props.styleRegister && styleRegister}>
//                 <form  onSubmit={Submit}  style={props.styleRegister && form}>
//                     <label htmlFor="name">Name:</label>
//                     <input  className="error"
//                         id="name" 
//                         type="text" 
//                         placeholder="name"
//                         value={name}
//                         onChange = {(e)=> setName(e.target.value)}
                        
//                     />
//                     {access&& name ==='' && (<p style={{ color: "red", fontSize: "12px", marginTop:'-8px' }}>Name is required</p>)}
//                     <label htmlFor="email">Email:</label>
//                     <input 
//                         id="email"  
//                         type="text" 
//                         placeholder="email" 
//                         required
//                         value={email}
//                         onChange= {(e)=> setEmail(e.target.value)}
//                     />
//                     {access && emailError === 422 && (<p style={{ color: "red", fontSize: "12px", marginTop:'-8px' }}>Email already exists</p>)}
//                     <label htmlFor="password">Password:</label>
//                     <input  className="error"
                    
//                         id="password" 
//                         type="password" 
//                         placeholder="password.... "
//                         value={password} 
//                         onChange={(e)=> setPassword(e.target.value)}/>
//                         {access&& password.length < 8 && (<p style={{ color: "red", fontSize: "12px", marginTop:'-8px' }}>Password must be at least 8 characters long</p>)}

//                     <label htmlFor="repeat password">Repeat Password:</label>
//                     <input  className="error"
                    
                    
//                         id="repeat password" 
//                         type="password" 
//                         placeholder=" repeat password...."
//                         value={repeatPassword}
//                         onChange={(e)=> setRepeatPassword(e.target.value)}/>
//                         {access&&repeatPassword.length > 0 && repeatPassword !== password && (<p style={{ color: "red", fontSize: "12px", marginTop:'-8px' }}>Passwords do not match</p>)}

//                     <div style={{ textAlign: "center" }}>
//                         <button type="submit" style={props.buttonStyle && buttonStyle} >{props.button} </button>
//                     </div>
//                 </form>
//             </div>
//     )  ;
// }