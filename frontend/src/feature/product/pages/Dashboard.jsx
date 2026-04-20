import React, { useEffect } from 'react'
import { useProduct } from '../hooks/useproduct'
import { useSelector } from 'react-redux';


function Dashboard() {
    const { fetchAllProducts } = useProduct();
    const sellerProduct  = useSelector((state) => state.product);
    useEffect(() => {
        fetchAllProducts();
    }, []);

    console.log(sellerProduct);

    return (
        <div>Dashboard</div>
    )
}

export default Dashboard