import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getShopingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Products from '../Products/Products';
import './Shopes.css'
const Shopes = () => {
    const products = useLoaderData();
    const [cart,setCart]=useState([]);

    const clearCart =()=>{
        setCart([]);
        deleteShoppingCart();
    }


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
                <Cart 
                cart={cart}
                clearCart={clearCart}
                ><Link to="/orders"><button>Review Order</button></Link></Cart>
            </div>
        </div>
    );
};

export default Shopes;