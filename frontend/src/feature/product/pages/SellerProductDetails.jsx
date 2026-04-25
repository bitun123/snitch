import React from 'react'
import { useParams } from 'react-router-dom'

function SellerProductDetails() {
const { productId } = useParams();
console.log("Product ID from URL:", productId);

  return (
    <div>SellerProductDetails</div>
  )
}

export default SellerProductDetails