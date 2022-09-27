import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Products from '../Products/Products';
import './Shopes.css'
const Shopes = () => {
    const [products,setProducts]=useState([]);
    const [cart,setCart]=useState([]);


    useEffect(()=>{
        fetch('products.json')
        .then(res=>res.json())
        .then(data=>setProducts(data));
    },[]);

    const handleAddToCart=(product)=>{
        // console.log(product);
        const newCart =[...cart,product];
        setCart(newCart);
    }
    return (
        <div className='shop-container'>
            <div className='products-container'>
                {products.map(product=><Products 
                key={product.id}
                product={product}
                handleAddToCart={handleAddToCart}

                ></Products>)}
            </div>
            <div className='order-container'>
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shopes;