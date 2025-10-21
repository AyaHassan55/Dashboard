
import axios from 'axios';
import {Link} from 'react-router-dom';
import Cookies from 'universal-cookie';
export function Header() {
    const cookie= new Cookies();
    const token = cookie.get('Bearer');
    // console.log(token);


    async function handleLogOut(){
            await axios.post(`http://127.0.0.1:8000/api/logout`,null,{
                headers: {
                    Authorization: `Bearer `+ token
                }
            });
            cookie.remove('Bearer');
            alert("Logged out successfully");
            window.location.pathname="/";  
    }
    return (
        <div className="container shadow">
            <nav className="d-flex " >
                <div className="d-flex flex-1 " style={{gap:'20px',fontWeight:'bold', fontSize:'20px',paddingTop:'20px',paddingBottom:'20px'}}>
                    
                    <Link to="/" style={{ textDecoration: 'none' ,color:'#555'}}>Home</Link>
                    <Link to="/about" style={{ textDecoration: 'none' ,color:'#555'}}>About</Link>
                    
                    
                </div>
                <div  className="d-flex ">
                    
                        
                            {
                                !token ?(
                                    <>
                                        <Link to={"/register"} className="register-nav" style={{textAlign:'center'}}>Register</Link>
                                        <Link to={"/login"} className="register-nav" style={{textAlign:'center'}}>Login</Link>
                                    </>
                                ):(
                                    <>
                                        <Link to={"/dashboard"} className="register-nav" style={{textAlign:'center'}}>Dashboard</Link>
                                        <div className='register-nav' onClick={handleLogOut}>Logout</div>
                            
                                    </>
                                )
                            
                            
                                
                                
                            }
                        
                </div>
                
            </nav>
        </div>
    );
}