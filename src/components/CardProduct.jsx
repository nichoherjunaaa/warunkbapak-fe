import React from 'react'
import { Link, useRevalidator } from 'react-router-dom'
import { formatHarga } from '../utils'
import { FaTrash, FaPencilAlt } from 'react-icons/fa'
import API from '../api'
import { toast } from 'react-toastify'

const CartProduct = ({ item, user }) => {
    const { revalidate } = useRevalidator()
    const handleDelete = async () => {
        const confirm = window.confirm('Are you sure to delete this product?')
        if (confirm) {
            try {
                await API.delete(`/product/delete/${item._id}`)
                toast.success('Product Deleted')
                revalidate()
            } catch (error) {
                toast.error('Product gagal terhapus')
            }
        }
    }
    return (
        <>
            <div className="card bg-base-300 shadow-xl" key={item._id}>
                <figure>
                    <div className="relative aspect-square">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                        {
                            item.stock < 1 && (
                                <span className="absolute top-0 right-0 bg-error text-xl rounded-md font-bold p-2">Sold Out</span>
                            )
                        }
                    </div>
                </figure>
                <div className="card-body">
                    {user && user.role === "owner" && (
                        <div className="flex justify-end gap-x-3">
                            <FaTrash onClick={handleDelete} className="text-red-500 cursor-pointer" />
                            <Link to={`/product/${item._id}/edit`}>
                                <FaPencilAlt className="text-info cursor-pointer" />
                            </Link>
                        </div>
                    )}
                    <h2 className="card-title text-pretty text-xs font-extrabold lg:text-2xl">{item.name}</h2>
                    <p className="font-bold text-pretty text-xs lg:text-xl">{formatHarga(item.price)}</p>
                    <p className="text-xs lg:text-lg hidden lg:block">
                        {item.description.length > 50
                            ? `${item.description.substring(0, 50)}...`
                            : item.description}
                    </p>
                    <div className="card-actions justify-center lg:justify-end mt-5 items-center">
                        <Link to={`/product/detail/${item._id}`} className="btn btn-primary btn-xs lg:btn-md p-4 flex justify-center items-center text-center pb-6">
                            Lihat Produk
                        </Link>
                    </div>
                </div>

            </div>
        </>
    )
}

export default CartProduct