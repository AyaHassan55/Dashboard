import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "../../Website/Context/UserContext";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [runUseEffect, setRun] =useState(0);
    const context =useContext(User);
    const token = context.auth.token;
    console.log(context);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/user/show",{
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer `+token
            }   
        })
        .then((data) => setUsers(data.data))
        .catch((err) => console.log(err));
    }, [runUseEffect]);

    function confirmDelete(id) {
        setUserToDelete(id);
        setShowModal(true);
    }

    async function deleteUser(){
        try{
            const res = await axios.delete(`http://127.0.0.1:8000/api/user/delete/${userToDelete}`,{
                headers: {
                
                    Authorization: `Bearer`+token
                }
            });
            if(res.status === 200  || res.status === 204){
                setUsers(users.filter((user) => user.id !== userToDelete));
                setShowModal(false);
                setUserToDelete(null);
                setRun(prev => prev + 1);
            }
        }
        catch(err)
        {console.log(err);}
    }
    const showUsers = users.map((user, index) => (
    <tr key={user.id}>
        <td>{index + 1}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
            <Link to={`${user.id}`}>
                <i
                
                className="fa-solid fa-pen-to-square"
                style={{color: "#74afb9", fontSize: "20px",paddingRight: "10px",cursor: "pointer", }}></i>
            </Link>
            

            <i
                onClick={() => confirmDelete(user.id)}
                className="fa-solid fa-trash"
                style={{ color: "red", fontSize: "20px", cursor: "pointer" }}></i>
        </td>
    </tr>
    ));
   
    return (
        <div style={{ padding: "20px" }}>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Users</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{showUsers}</tbody>
            </table>
            {/* <button onClick={refresh} style={{marginTop:'20px', padding:'10px', backgroundColor:'#74afb9', color:'white', border:'none', borderRadius:'5px', cursor:'pointer'}}>Refresh Token</button> */}

    
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>هل أنت متأكد من الحذف؟</h3>
                        <div style={{ marginTop: "20px" }}>
                            <button className="delete-button" onClick={deleteUser}>
                                احذف
                            </button>
                            <button className="cancel-button" onClick={() => setShowModal(false)}>
                                إلغاء
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
