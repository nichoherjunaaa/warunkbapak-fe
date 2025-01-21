import { useState, useEffect } from 'react'
import { useParams, useNavigate, redirect } from 'react-router-dom'
import API from '../api'
import Loading from '../components/Loading'
import FormInput from '../components/Form/FormInput'
import FormSelect from '../components/Form/FormSelect'
import FormTextArea from '../components/Form/FormTextArea'
import { toast } from 'react-toastify'

export const loader = (store) => async () => {
    const user = store.getState().userState.user
    if (!user) {
        return redirect('/login')
    }
    if (user.role !== 'owner') {
        toast.warn('Anda tidak boleh mengakses halaman ini')
        return redirect('/')
    }
    return null
}

const EditProductView = () => {
    const [product, setProduct] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()
    const categories = ["Makanan", "Minuman", "Pakaian", "Aksesoris"]
    const getProductId = async () => {
        try {
            const { data } = await API.get(`/product/detail/${id}`)
            setProduct(data.data)
        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        const data = Object.fromEntries(formData)
        console.log(data);

        try {
            const response = await API.put(`product/update/${id}`, {
                name: data.name,
                price: data.price,
                stock: data.stock,
                description: data.description,
                category: data.category,
            })
            console.log(response);
            toast.success('Produk berhasil diupdate');
            navigate('/products')
        } catch (error) {
            console.error(error)
            const errMsg = error?.response?.data?.message;
            toast.error(errMsg);
        }
    }

    useEffect(() => {
        getProductId()
    }, [])

    return (
        <>
            {
                product ? (
                    <form onSubmit={handleSubmit} encType="multipart/form-data" >
                        <FormSelect name="category" label="pilih kategori" list={categories} defaultValue={product.category} />
                        <FormInput name="name" label="Nama Produk" type="text" defaultValue={product.name} />
                        <FormInput name="price" label="Harga Produk" type="number" defaultValue={product.price} />
                        <FormInput name="stock" label="Stok Produk" type="number" defaultValue={product.stock} />
                        <FormTextArea name="description" label="Deskripsi Produk" defaultValue={product.description} />
                        <button type="submit" className="btn btn-primary btn-block mt-5 btn-md" value="tambah">Submit</button>
                    </form >
                ) : (
                    <Loading />
                )}
        </>
    )
}

export default EditProductView