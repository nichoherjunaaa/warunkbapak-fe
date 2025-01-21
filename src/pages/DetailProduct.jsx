import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import API from '../api'
import { FaPlus } from 'react-icons/fa'
import { generateSelectAmount, formatHarga } from '../utils'
import { useDispatch } from 'react-redux'
import { addItem } from '../features/cartSlice'

const DetailProduct = () => {
    let { id } = useParams()
    const [product, setProduct] = useState("")
    const [amount, setAmount] = useState(1)


    const dispatch = useDispatch()

    const productData = async () => {
        const { data } = await API.get(`/product/detail/${id}`)
        // console.log(data.data);
        setProduct(data.data)
    }

    const productCart = {
        cartId: product._id + product.name,
        productId: product._id,
        image: product.image,
        name: product.name,
        price: product.price,
        stock: product.stock,
        amount
    }

    const handleAmount = (e) => {
        setAmount(parseInt(e.target.value))
    }

    const cartHandle = () => {
        // console.log("Keranjang", product, amount);
        dispatch(addItem({ product: productCart }))
    }

    useEffect(() => {
        productData()
    }, [])

    return (
            <section>
                <div className="card bg-base-300 shadow-xl lg:card-side h-[500px]">
                    <figure className="flex-1">
                        <div className="relative w-full h-full flex justify-center items-center">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="object-cover w-full h-full"
                            />
                            {product.stock < 1 && (
                                <span className="absolute top-0 right-0 bg-error text-3xl rounded-md font-bold p-2">
                                    Sold Out
                                </span>
                            )}
                        </div>
                    </figure>
                    <div className="card-body flex-1 flex flex-col justify-between">
                        <div>
                            <h2 className="card-title text-2xl">{product.name}</h2>
                            <span className="text-3xl text-accent mt-2 font-bold">{formatHarga(product.price)}</span>
                            <span className="badge badge-primary mt-2 mx-3">{product.category}</span>
                            <span className="mt-3 font-bold">Stok: {product.stock}</span>
                            <p className="mt-3">{product.description}</p>
                        </div>
                        <div className="card-actions justify-end">
                            {product.stock > 0 && (
                                <div className="p-4 flex flex-col gap-y-4">
                                    <label htmlFor="" className="form-control">
                                        <label htmlFor="" className="label">
                                            <span className="capitalize label-text">Amount</span>
                                        </label>
                                        <select
                                            name="amount"
                                            className="select select-bordered"
                                            onChange={handleAmount}
                                        >
                                            {generateSelectAmount(product.stock)}
                                        </select>
                                    </label>
                                    <button className="btn btn-primary btn-lg" onClick={cartHandle}>
                                        <FaPlus /> Keranjang
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>        
    )
}

export default DetailProduct