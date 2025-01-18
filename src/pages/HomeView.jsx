import API from '../api'
import CartProduct from '../components/CartProduct'
import { useLoaderData } from 'react-router-dom'
import Hero from '../components/Hero'
export const loader = async (request) => {
    const { data } = await API.get('/product/products?limit=3')
    const products = data.data
    return { products }
}
const HomeView = () => {

    const { products } = useLoaderData()

    return (
        <>
            <div>
                <Hero/>
            </div>
            <div className="border-b border-primary pb-5 mt-5">
                <h2 className="text-2xl font-bold capitalize">
                    Daftar Produk
                </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                {products.map(item => (
                    <CartProduct item={item} key={item._id} />
                ))}
            </div>
        </>
    )
}

export default HomeView