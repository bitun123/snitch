import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useProduct } from '../hooks/useproduct';

function Home() {
const products = useSelector((state) => state.product.products);
console.log("Products in Home component:", products);

const { getAllProducts } = useProduct();

useEffect(()=>{
    getAllProducts();
},[])

  return (
    <div>Home</div>
  )
}

export default Home