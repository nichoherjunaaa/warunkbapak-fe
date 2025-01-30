import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import Logo from '../assets/logo.png'

const Hero = () => {
    const { products } = useLoaderData()
    return (
        <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="">
                <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">Selamat Datang di Warung Bapak - <span className="flex mt-2">Rumahnya Produk UMKM Terbaik!</span></h1>
                <p className="mt-8 max-w-xl text-lg leading-8">Temukan berbagai produk unggulan 
                    dari pelaku usaha kecil dan menengah di seluruh Indonesia! Dari makanan khas daerah, kerajinan 
                    tangan unik, fashion etnik, hingga produk kecantikan alami – semua tersedia untuk memenuhi kebutuhan Anda.</p>
                <div className="mt-10">
                    <Link to="/products" className="btn btn-primary">Produk Kami</Link>
                </div>
            </div>
            <div className="hidden rounded-box p-4  lg:flex items-center justify-center">
                <img src={Logo} alt="" className="w-4/5"/>
                {/* {products.map((item) => (
                    <div className="carousel-item" key={item._id}>
                        <img
                            src={item.image}
                            alt="Product"
                            className="rounded-box w-full h-full object-contain"
                            style={{ maxWidth: '300px', maxHeight: '400px' }}
                        />
                    </div>
                ))} */}
            </div>

        </div>
    )
}

export default Hero