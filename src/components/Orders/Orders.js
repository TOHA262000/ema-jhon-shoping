import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewIteam from '../ReviewIteam/ReviewIteam';

const Orders = () => {
    const {initialCard} = useLoaderData();
    const [cart,setCart]=useState(initialCard);

    const clearCart =()=>{
        setCart([]);
        deleteShoppingCart();
    }

    const handleRemoveItem =(id)=>{
        const remainingItem = cart.filter(product=>id!==product.id);
        setCart(remainingItem);
        removeFromDb(id);
    }
    return (
        <div className='shop-container'>
            <div className='orders-container'>
                {
                    cart.map(product=><ReviewIteam  
                        key={product.id} 
                        product={product}
                        handleRemoveItem={handleRemoveItem}
                        ></ReviewIteam>)
                }
                {
                  cart.length===0&&<h2>No item are not available for review <Link to="/">Shope More</Link></h2>
                }
            </div>
            <div className='order-container'>
                <Cart cart={cart}
                clearCart={clearCart}></Cart>
            </div>
        </div>
    );
};

export default Orders;