import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewIteam from '../ReviewIteam/ReviewIteam';

const Orders = () => {
    const {products,initialCard} = useLoaderData();
    const [cart,setCart]=useState(initialCard);

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
            </div>
            <div className='order-container'>
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Orders;