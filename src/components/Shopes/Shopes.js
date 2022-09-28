import React, { useEffect, useState } from 'react';
import { addToDb, getShopingCart } from '../../utilities/fakedb';
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

    const handleAddToCart=(selectedProduct)=>{
        let newCart=[];
        const exist = cart.find(product=>product.id===selectedProduct.id);
        if(exist){
            const rest = cart.filter(product=>product.id!==selectedProduct.id);
            exist.quantity=exist.quantity+1;
            newCart=[...rest,exist];
        } 
        else{
            selectedProduct.quantity=1;
            newCart =[...cart,selectedProduct];
        }
        setCart(newCart);
        addToDb(selectedProduct.id);
    }
    useEffect(()=>{
       const shoppingCart = getShopingCart();
       const saveCart = [];
       for(const id in shoppingCart){
            const storeCard = products.find(product => product.id === id)
            if(storeCard){
                const quantity = shoppingCart[id]
                storeCard.quantity = quantity;
                saveCart.push(storeCard);
            }    
       }
       setCart(saveCart);
    },[products])
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