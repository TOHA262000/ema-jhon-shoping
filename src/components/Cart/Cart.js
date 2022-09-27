import React from 'react';

const Cart = (props) => {
    return (
        <div>
            <h3>Order Summary</h3>
                <p>cart{props.cart.length}</p>
        </div>
    );
};

export default Cart;