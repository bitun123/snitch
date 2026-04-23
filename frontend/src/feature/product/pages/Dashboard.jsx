import React, { useEffect } from 'react'
import { useProduct } from '../hooks/useproduct'
import { useSelector } from 'react-redux';


function Dashboard() {
    const { fetchAllProducts } = useProduct();
    const sellerProducts = useSelector((state) => state.product.allProducts);


    useEffect(() => {
        fetchAllProducts();
    }, []);

    console.log(sellerProducts);

    return (
        <div>Dashboard</div>
    )
}

export default Dashboard