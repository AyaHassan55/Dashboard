import { Route,Routes } from "react-router-dom";
import SignUp from "./Pages/Website/Auth/SignUp";
import './style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Login from "./Pages/Website/Auth/Login";
import Home from "./Pages/Website/Home";
import About from "./Pages/Website/About";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Users from "./Pages/Dashboard/Users/Users";
import UpdateUser from "./Pages/Dashboard/Users/UpdateUser";
import CreateUser from "./Pages/Dashboard/Users/CreateUser";
import RequireAuth from "./Pages/Website/Auth/RequireAuth";
import PersistLogin from "./Pages/Website/Auth/PersistLogin";
import Products from "./Pages/Dashboard/Products/Products";
import CreateProduct from "./Pages/Dashboard/Products/CreateProducts";
import UpdateProduct from "./Pages/Dashboard/Products/UpdateProducts";
export default function App() {
    return (
        <div>
            
            <Routes>
                {/* puplic routes */}
                <Route path="/register" element={<SignUp/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Home/>}/>

                {/* protected routes */}
                <Route element={<PersistLogin/>}>
                <Route element={<RequireAuth/>}>
                    <Route path="/about" element={<About/>}/><Route/>
                    <Route  path="/dashboard" element={<Dashboard/>}>
                        <Route  path="users" element={<Users/>}/>
                        <Route path="users/:id" element={<UpdateUser/>}/>
                        <Route path="user/create" element={<CreateUser/>}/>
                        <Route path="products" element={<Products/>}/>
                        <Route path="products/create" element={<CreateProduct/>}/>
                        <Route path="products/:id" element={<UpdateProduct/>}/>
                    </Route>
                </Route>
                </Route>
            </Routes>
        </div>
    );
}