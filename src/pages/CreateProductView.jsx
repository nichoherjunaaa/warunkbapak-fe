import FormInput from '../components/Form/FormInput'
import FormSelect from '../components/Form/FormSelect'
import FormTextArea from '../components/Form/FormTextArea'
import API from '../api'
import { toast } from 'react-toastify'
import { useNavigate, redirect } from 'react-router-dom'

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

const CreateProductView = () => {
    const categories = ["Sepatu", "Baju", "Kemeja", "Celana"]
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        const data = Object.fromEntries(formData)
        try {
            const responseFile = await API.post('/product/upload', { image: data.image }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            await API.post('/product/create', {
                name: data.name,
                price: data.price,
                stock: data.stock,
                description: data.description,
                category: data.category,
                image: responseFile.data.url
            })
            console.log(responseFile.data.url);
            toast.success('Produk berhasil ditambahkan');
            navigate('/products')
        } catch (error) {
            const errMsg = error?.response?.data?.message;
            toast.error(errMsg);
        }

    }
    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label className="form-control">
                <label className="label">
                    <span className="label-text capitalize">image</span>
                </label>
                <input
                    type="file"
                    name="image"
                    className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
            </label >
            <FormSelect name="category" label="pilih kategori" list={categories} />
            <FormInput name="name" label="Nama Produk" type="text" />
            <FormInput name="price" label="Harga Produk" type="number" />
            <FormInput name="stock" label="Stok Produk" type="number" />
            <FormTextArea name="description" label="Deskripsi Produk" />
            <button type="submit" className="btn btn-primary btn-block mt-5 btn-md" value="tambah">Submit</button>
        </form>
    )
}

export default CreateProductView