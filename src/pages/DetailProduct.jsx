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
        cartId : product._id + product.name,
        productId : product._id,
        image : product.image,
        name : product.name,
        price : product.price,
        stock : product.stock,
        amount
    }

    const handleAmount = (e) => {
        setAmount(parseInt(e.target.value))
    }

    const cartHandle = () => {
        // console.log("Keranjang", product, amount);
        dispatch(addItem({product : productCart}))
    }

    useEffect(() => {
        productData()
    }, [])

    return (
        <section>
            <div className="card bg-base-300 shadow-xl lg:card-side">
                <figure>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-[400px] h-[500px] object-cover" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{product.name}</h2>
                    <span className="text-3xl text-accent mt-2 font-bold">{formatHarga(product.price)}</span>
                    <span className="badge badge-primary mt-2">{product.category}</span>
                    <span className="mt-3 font-bold">Stok : {product.stock} </span>
                    <p className="mt-3">{product.description}</p>
                    <div className="card-actions justify-end">
                        <div className="p-8 flex flex-col gap-y-4">
                            <label htmlFor="" className="form-control">
                                <label htmlFor="" className="label">
                                    <span className="capitalize label-text">Amount</span>
                                </label>
                                <select name="amount" className="select select-bordered" id="" onChange={handleAmount}>{generateSelectAmount(product.stock)}</select>
                            </label>
                            <button className="btn btn-primary btn-lg" onClick={cartHandle}><FaPlus />Keranjang</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DetailProduct