import React from 'react'
import { Link } from 'react-router-dom'
import { formatHarga } from '../utils'

const CartProduct = ({ item }) => {
    return (
        <>
            <div className="card bg-base-300 shadow-xl" key={item._id}>
                <figure>
                    <img
                        src={item.image}
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-primary">{item.name}</h2>
                    <p className="font-bold text-accent">{formatHarga(item.price)}</p>
                    <p>{item.description.substring(0, 50)}</p>
                    <div className="card-actions justify-end">
                        <Link to={`/product/detail/${item._id}`} className="btn btn-primary">Buy Now</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartProduct