import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title="Find books that you love"
      description=""
      className="container-fluid"
    >
      <Search />

      <h2 className="titles">New Arrivals</h2>
      <div className="row row-sizing">
        {productsByArrival.map((product, i) => (
          <div key={i}>
            <Card product={product} />
          </div>
        ))}
      </div>

      <h2 className="titles">Best Sellers</h2>
      <div className="row">
        {productsBySell.map((product, i) => (
          <div key={i}>
            <Card product={product} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
