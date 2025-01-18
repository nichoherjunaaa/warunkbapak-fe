import React from 'react'
import { useSelector } from 'react-redux'
import CartListItems from './CartListItems'
const CartList = () => {
    const carts = useSelector((state) => state.cartState.CartItems)
    return (
        <>
            {carts.map((item) => {
                return (
                    <CartListItems key={item.cartId} cartItem={item} />
                )}
            )}
        </>
    )
}

export default CartList