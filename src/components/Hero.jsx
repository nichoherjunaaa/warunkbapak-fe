import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
const Hero = () => {
    const { products } = useLoaderData()
    return (
        <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="">
                <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">Selamat Datang di JunShop</h1>
                <p className="mt-8 max-w-xl text-lg leading-8">Dimana kalian bisa membeli barang yang kalian inginkan !</p>
                <div className="mt-10">
                    <Link to="/products" className="btn btn-primary">Produk Kami</Link>
                </div>
            </div>
            <div className="hidden lg:carousel carousel-center bg-neutral rounded-box space-x-4 p-4">
                {products.map((item) => (
                    <div className="carousel-item" key={item._id}>
                        <img
                            src={item.image}
                            alt="Product"
                            className="rounded-box w-full h-full object-contain"
                            style={{ maxWidth: '300px', maxHeight: '400px' }}
                        />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Hero