import React from 'react'
import { useParams } from 'react-router-dom'

function ProductDetails() {



    const { productId } = useParams();
    console.log('Product ID from URL:', productId);
  return (
    <div>ProductDetails</div>
  )
}

export default ProductDetails