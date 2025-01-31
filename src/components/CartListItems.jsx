import React from 'react';
import { generateSelectAmount, formatHarga } from '../utils';
import { FaTrash } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { editItem, removeItem } from '../features/cartSlice';

const CartListItems = ({ cartItem }) => {
    const { cartId, name, price, image, amount, stock } = cartItem;
    const dispatch = useDispatch();
    
    const handleAmount = (e) => {
        dispatch(editItem({ cartId, amount: parseInt(e.target.value) }));
    };
    
    const removeProductHandle = () => {
        dispatch(removeItem({ cartId }));
    };
    
    return (
        <article key={cartId} className="mb-12 grid grid-cols-2 gap-4 sm:flex sm:flex-row sm:items-center flex-wrap border-b border-base-300 pb-6 last:border-b-0">
            <img src={image} alt={name} className="h-24 w-24 sm:w-32 sm:h-32 rounded-lg object-cover mx-auto sm:mx-0" />
            <div className="sm:ml-6 sm:w-48 text-center sm:text-left">
                <h2 className="capitalize font-semibold">{name}</h2>
                <span className="font-bold block mt-2">Jumlah Produk: {amount}</span>
            </div>
            <p className="font-bold text-center sm:text-left">{formatHarga(price)}</p>
            <div className="flex flex-col items-center sm:items-start">
                <div className="form-control w-full max-w-xs">
                    <select
                        name="amount"
                        className="select select-bordered w-full"
                        value={amount}
                        onChange={handleAmount}
                    >
                        {generateSelectAmount(stock)}
                    </select>
                </div>
                <button className="mt-2 btn btn-secondary btn-block flex items-center justify-center w-full" onClick={removeProductHandle}>
                    <FaTrash className="text-lg" />
                </button>
            </div>
        </article>
    );
};

export default CartListItems;
