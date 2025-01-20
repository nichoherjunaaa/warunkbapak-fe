import React from 'react'
import { Link, useRouteError } from 'react-router-dom'

const ErrorView = () => {
    const error = useRouteError()
    if (error.status === 404) {
        return (
            <main className="grid min-h-[100vh] place-items-center px-8">
                <div className="text-center">
                    <h1 className="text-9xl font-bold text-primary">404</h1>
                    <p className="text-lg leading-7 mt-6">Halaman yang Anda cari tidak ditemukan.</p>
                    <div className="mt-10">
                        <Link to="/" className="btn btn-primary">Kembali ke Beranda</Link>
                    </div>
                </div>
            </main>
        )
    } else if (error.status === 500) {
        return (
            <main className="grid min-h-[100vh] place-items-center px-8">
                <div className="text-center">
                    <h1 className="text-9xl font-bold text-primary">500</h1>
                    <p className="text-lg leading-7 mt-6">Terjadi kesalahan pada server, coba beberapa saat lagi</p>
                </div>
            </main>
        )
    }
}

export default ErrorView