import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "../Website/Context/UserContext";
import { Header } from "../../Components/Header";
import "./home.css";

export default function Home() {
  const [products, setProducts] = useState([]);

  const [runUseEffect] = useState(0);
  const context = useContext(User);
  const token = context.auth.token;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/product/show", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ` + token,
        },
      })
      .then((data) => {
        console.log(data.data);
        setProducts(data.data);
      })
      .catch((err) => console.log(err));
  }, [runUseEffect]);

  const showProducts = products.map((product) => (
    <div className="product-card" key={product.id}>
      <img
        src={product.image || "https://via.placeholder.com/200"}
        alt={product.title}
        className="product-img"
      />
      <div className="product-info">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
      </div>
    </div>
  ));

  return (
    <div>
      <Header />
      <div className="products-container">{showProducts}</div>
    </div>
  );
}
