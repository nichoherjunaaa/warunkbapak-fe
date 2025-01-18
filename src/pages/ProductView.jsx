import API from "../api"
import { useLoaderData } from 'react-router-dom'
import Filter from "../components/Filter"
import CartProduct from "../components/CartProduct"
import Pagination from "../components/Pagination"

// loader function
export const loader = async ({ request }) => {
    const url = new URL(request.url)  // Ambil URL dari request
    const params = Object.fromEntries(new URLSearchParams(url.search)) // Ambil query params

    try {
        const { data } = await API.get('/product/products', { params })
        // console.log(request);
        const products = data.data
        const pagination = data.pagination
        return { products, params, pagination }
    } catch (error) {
        console.error("API Error:", error)
        throw error
    }
}

const ProductView = () => {
    const { products, pagination } = useLoaderData()

    return (
        <>
            <Filter />
            <h3 className="text-lg text-primary font-bold text-right my-3">Jumlah Product : {pagination.totalProduct} Products</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
                {!products.length ? (
                    <div className="col-span-full flex justify-center items-center mt-5">
                        <h1 className="font-bold text-3xl">Sorry, Product Not Found!</h1>
                    </div>
                ) : (
                    products.map((item) => (
                        <CartProduct item={item} key={item._id} />
                    )
                    ))}
            </div>
            <div className="mt-5 flex justify-center">
                <Pagination />
            </div>
        </>
    )
}

export default ProductView
