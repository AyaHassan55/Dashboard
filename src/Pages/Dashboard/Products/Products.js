import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "../../Website/Context/UserContext";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [runUseEffect, setRun] =useState(0);
    const context =useContext(User);
    const token = context.auth.token;
    console.log(context);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/product/show",{
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer `+token
            }   
        })
        .then((data) => setProducts(data.data))
        .catch((err) => console.log(err));
    }, [runUseEffect]);

    function confirmDelete(id) {
        setProductToDelete(id);
        setShowModal(true);
    }

    async function deleteProduct(){
        try{
            const res = await axios.delete(`http://127.0.0.1:8000/api/product/delete/${productToDelete}`,{
                headers: {
                
                    Authorization: `Bearer `+token
                }
            });
            if(res.status === 200  || res.status === 204){
                setProducts(products.filter((user) => user.id !== productToDelete));
                setShowModal(false);
                setProductToDelete(null);
                setRun(prev => prev + 1);
            }
        }
        catch(err)
        {console.log(err);}
    }
    const showProducts = products.map((product, index) => (
    <tr key={product.id}>
        <td>{index + 1}</td>
        <td>{product.title}</td>
        <td>{product.description}</td>
        <td>
            <Link to={`${product.id}`}>
                <i
                
                className="fa-solid fa-pen-to-square"
                style={{color: "#74afb9", fontSize: "20px",paddingRight: "10px",cursor: "pointer", }}></i>
            </Link>
            

            <i
                onClick={() => confirmDelete(product.id)}
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
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{showProducts}</tbody>
            </table>
            {/* <button onClick={refresh} style={{marginTop:'20px', padding:'10px', backgroundColor:'#74afb9', color:'white', border:'none', borderRadius:'5px', cursor:'pointer'}}>Refresh Token</button> */}

    
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>هل أنت متأكد من حذف هذا المنتج ؟</h3>
                        <div style={{ marginTop: "20px" }}>
                            <button className="delete-button" onClick={deleteProduct}>
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
