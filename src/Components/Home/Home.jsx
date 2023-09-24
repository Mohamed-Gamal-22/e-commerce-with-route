import React, { useEffect } from "react";
import style from "./Home.module.css";
import FeaturedProducts from "./../FeaturedProducts/FeaturedProducts";
import axios from "axios";

export default function Home() {
  async function getFeaturedProducts() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    console.log(data.data);
  }

  useEffect(() => {
    getFeaturedProducts();
  }, []);

  return (
    <>
      <h1>Home</h1>
      <FeaturedProducts />
    </>
  );
}
