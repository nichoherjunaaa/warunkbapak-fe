import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CartList from '../components/CartList'
import CartTotal from '../components/CartTotal'

const CartView = () => {
    const user = useSelector((state) => state.userState.user)
    const numIteminCart = useSelector((state) => state.cartState.numItemsInCart)
    if (numIteminCart === 0) {
        return (
            <>
                <h1 className="text-center font-bold text-3xl">Belum ada barang di keranjang</h1>
            </>
        )
    }
    return (
        <>
            <div className="border-b border-primary pb-5 mt-5">
                <h2 className="text-2xl font-bold capitalize">Produk di Keranjang</h2>
            </div>
            <div className="mt-8 grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-8">
                    <CartList/>
                </div>
                <div className="lg:col-span-4 lg:pl-4">
                    <CartTotal/>
                    {user ? (
                        <Link to= '/checkout' className="btn btn-primary btn-block mt-8">Checkout</Link>
                    ) : (
                        <Link to="/login" className="btn btn-primary btn-block mt-8">Login to Checkout</Link>
                    )}
                </div>
            </div>
        </>
    )
}

export default CartView