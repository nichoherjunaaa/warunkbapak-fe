import React from 'react'
import CartTotal from '../components/CartTotal'
import { useSelector, useDispatch } from 'react-redux'
import FormInput from '../components/Form/FormInput'
import { useEffect } from 'react'
import API from '../api'
import { toast } from 'react-toastify'
import { clearCartItem } from '../features/cartSlice'
import { useNavigate, redirect } from 'react-router-dom'

const insertSnapScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = 'https://app.sandbox.midtrans.com/snap/snap.js'
        script.setAttribute("data-client-key", import.meta.env.VITE_CLIENT_MIDTRANS)
        script.onload = () => {
            resolve()
        }
        document.body.appendChild(script)
    })
}

export const loader = (storage) => () => {
    const user = storage.getState().userState.user
    if(!user){
        toast.warn('Silahkan login terlebih dahulu')
        return redirect('/login')
    }
    return null
}

const CheckoutView = () => {
    const user = useSelector((state) => state.userState.user)
    const carts = useSelector((state) => state.cartState.CartItems)
    // console.log(carts);
    // console.log(user);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleCheckout = async (e) => {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        const data = Object.fromEntries(formData)
        const newArrayCart = carts.map((item) => {
            return {
                product: item.productId,
                quantity: item.amount
            }
        })

        try {
            const response = await API.post('/order', {
                email: data.email,
                firstname: data.firstname,
                lastname: data.lastname,
                phone: data.phone,
                cartItem: newArrayCart
            })

            const snapToken = response.data.token

            window.snap.pay(snapToken.token, {
                // Optional
                onSuccess: function (result) {
                    console.log(result);
                    dispatch(clearCartItem())
                    navigate('/orders')
                    toast.success('Pesanan Berhasil Diproses')
                },
                // Optional
                onPending: function (result) {
                    console.log(result);
                    alert('Pending')
                },
                // Optional
                onError: function (result) {
                    console.log(result);
                    alert('Error')
                }
            })
            toast.success('Pesanan Berhasil Diproses')
        } catch (error) {
            const errMsg = error?.response?.data?.message;
            toast.error(errMsg);
        }
    }


    useEffect(() => {
        insertSnapScript()
    }, [])

    return (
        <>
            <div className="border-b border-primary pb-5 mt-5">
                <h2 className="text-2xl font-bold capitalize">Checkout Products</h2>
            </div>
            <div className="mt-8 grid gap-y-8 gap-x-2 lg:grid-cols-12">
                <div className="lg:col-span-8">
                    <form method="POST" className="bg-base-300 grid gap-y-5 p-5 items-center rounded-2xl" onSubmit={handleCheckout}>
                        <div className="grid grid-cols-2 gap-x-4">
                            <FormInput label="first name" type="name" name="firstname" />
                            <FormInput label="last name" type="name" name="lastname" />
                        </div>
                        <FormInput label="email" type="email" name="email" defaultValue={user.email} />
                        <FormInput label="phone" type="phone" name="phone" />
                        <button type="submit" className="btn btn-primary mt-8">Bayar</button>
                    </form>
                </div>
                <div className="lg:col-span-4 lg:pl-4">
                    <CartTotal />
                </div>
            </div>
        </>
    )
}

export default CheckoutView