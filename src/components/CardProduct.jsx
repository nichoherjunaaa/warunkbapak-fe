import React from 'react';
import { Link, useRevalidator } from 'react-router-dom';
import { formatHarga } from '../utils';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import API from '../api';
import { toast } from 'react-toastify';

const CartProduct = ({ item, user }) => {
    const { revalidate } = useRevalidator();
    const handleDelete = async () => {
        const confirm = window.confirm('Are you sure to delete this product?');
        if (confirm) {
            try {
                await API.delete(`/product/delete/${item._id}`);
                toast.success('Product Deleted');
                revalidate();
            } catch (error) {
                toast.error('Product gagal terhapus');
            }
        }
    };
    return (
        <div className="card bg-base-300 shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
            <figure>
                <div className="relative w-full aspect-square">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-t-lg"
                    />
                    {item.stock < 1 && (
                        <span className="absolute top-0 right-0 bg-error text-xs sm:text-sm lg:text-xl rounded-md font-bold p-2">Sold Out</span>
                    )}
                </div>
            </figure>
            <div className="card-body p-3 sm:p-5 flex flex-col">
                {user && user.role === "owner" && (
                    <div className="flex justify-end gap-x-2 sm:gap-x-3">
                        <FaTrash onClick={handleDelete} className="text-red-500 cursor-pointer text-sm sm:text-base lg:text-lg" />
                        <Link to={`/product/${item._id}/edit`}>
                            <FaPencilAlt className="text-info cursor-pointer text-sm sm:text-base lg:text-lg" />
                        </Link>
                    </div>
                )}
                <h2 className="card-title text-sm sm:text-lg lg:text-2xl font-extrabold">{item.name}</h2>
                <p className="font-bold text-xs sm:text-sm lg:text-xl">{formatHarga(item.price)}</p>
                <p className="text-xs sm:text-sm lg:text-lg hidden lg:block">
                    {item.description.length > 50
                        ? `${item.description.substring(0, 50)}...`
                        : item.description}
                </p>
                <div className="card-actions justify-center lg:justify-end mt-3 sm:mt-5 items-center">
                    <Link to={`/product/detail/${item._id}`} className="btn btn-primary btn-sm sm:btn-sm md:btn-md lg:btn-lg flex justify-center items-center text-center">
                        Lihat Produk
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartProduct;
