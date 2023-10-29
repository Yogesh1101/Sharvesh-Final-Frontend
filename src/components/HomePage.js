import React, { useEffect, useState } from "react";
import { API } from "../API_LINK";
import Dashboard from "../Dashboard";
import { connect } from "react-redux";
import { addToCart } from "../redux/actions";
import { products } from "../redux/products";
import ProductCard from "./ProductCard";

const HomePage = ({ addToCart }) => {
  const [name, setName] = useState("");
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const res = await fetch(`${API}/user/details`, {
      method: "GET",
      headers: { "x-auth-token": localStorage.getItem("token") },
    });
    const data = await res.json();
    setName(data.data);
  };
  return (
    <Dashboard title={name}>
      <section className="py-5">
        <div className="container px-3 px-lg-3 mt-0">
          <div className="row gx-3 gx-lg-4 row-cols-1 row-cols-md-2 row-cols-xl-3 justify-content-start">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                data={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>
    </Dashboard>
  );
};

export default connect(null, { addToCart })(HomePage);
