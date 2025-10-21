import axios from "axios";

import "../../../index.css"

import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { User } from "../../Website/Context/UserContext";

export default function CreateProduct(){
    const [title,setTitle] =useState("");
    const [desc,setDesc] =useState("")
    const [image,setImage] =useState("");
   
    const [access,setAccess] =useState(false);
    

   
    const nav= useNavigate();
    const context = useContext(User);
        const token=context.auth.token;
    


   
    async function Submit(e){
        
        e.preventDefault();
        setAccess(true)
        try{
    
                const formData = new FormData();
                formData.append('title', title);
                formData.append('description', desc);
                formData.append('image', image);
                // send data to backend
                let res=await axios
                    .post(`http://127.0.0.1:8000/api/product/create`,
                        formData,{
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                        }
                        
                    );
                        alert("add new product successful!");
                        nav("/dashboard/products");
                        
                        
        }
        catch(err){
            console.log(err);
            setAccess(true);
        }
    }
    return(
        <div>
           
            <div className='parent login' style={{display:'flex', height:'80vh', justifyContent:'center', alignItems:'center'}}>
        <div className="register login" >
                <form  onSubmit={Submit} >
                    <label htmlFor="name">Title:</label>
                    <input  className="error"
                        id="name" 
                        type="text" 
                        placeholder="title"
                        value={title}
                        onChange = {(e)=> setTitle(e.target.value)}
                        
                    />
                    {access&& title ==='' && (<p style={{ color: "red", fontSize: "12px", marginTop:'-8px' }}>Name is required</p>)}
                    <label htmlFor="email">Description:</label>
                    <input 
                        
                        type="text" 
                        placeholder="description" 
                        required
                        value={desc}
                        onChange= {(e)=> setDesc(e.target.value)}
                    />
                    {/* {access &&  && (<p style={{ color: "red", fontSize: "12px", marginTop:'-8px' }}>Email already exists</p>)} */}
                    <label htmlFor="password">image:</label>
                    <input  className="error"
                    
                        id="password" 
                        type="file" 
                        
                        // value={image} 
                        onChange={(e)=> setImage(e.target.files.item(0))}/>

                        {/* {access&& password.length < 8 && (<p style={{ color: "red", fontSize: "12px", marginTop:'-8px' }}>Password must be at least 8 characters long</p>)} */}

                  

                    <div style={{ textAlign: "center" }}>
                        <button type="submit" style={{width:'100%'}} >Create Product</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )  ;
}



