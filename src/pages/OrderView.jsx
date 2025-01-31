import React from 'react'
import { toast } from 'react-toastify'
import { redirect } from 'react-router-dom'
import { formatHarga } from '../utils'
import { useLoaderData } from 'react-router-dom'
import API from '../api'

export const loader = (storage) => async () => {
    const user = storage.getState().userState.user
    if (!user) {
        toast.warn('Silahkan login terlebih dahulu')
        return redirect('/login')
    }
    let orders;
    if (user.role !== 'owner') {
        const { data } = await API.get('/order/current/user')
        orders = data.data
    } else {
        const { data } = await API.get('/order')
        orders = data.data
    }
    console.log(orders);
    return { orders }
}
const OrderView = () => {
    const { orders } = useLoaderData()
    if (!orders.length) {
        return (
            <h2 className="text-xl text-center text-primary font-bold py-3 border-b border-secondary">Anda belum melakukan pemesanan</h2>
        )
    }
    return (
        <div className="overflow-x-auto">
            <table className="table table-xs table-pin-rows table-pin-cols">
                <thead>
                    <tr>
                        <td>No</td>
                        <td>Penerima</td>
                        <td>Produk</td>
                        <td>Total</td>
                        <td>Status Pembayaran</td>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((item, index) => (
                        <tr key={item._id} className="hover">
                            <th>{index + 1}</th>
                            <td>{item.firstname} {item.lastname}</td>
                            <td>
                                <ul className="list-disc">
                                    {item.itemsDetail.map(itemProduct => (
                                        <li key={itemProduct.product}>
                                            {itemProduct.name} <br />
                                            <span className="font-bold">Jumlah : {itemProduct.quantity}</span> <br />{" "}
                                            {formatHarga(itemProduct.price)}
                                        </li>
                                    ))}
                                </ul>
                            </td>

                            <td>{formatHarga(item.total)}</td>
                            <td>
                                {(item.status === "pending") ? (
                                    <span className="text-warning">Pending</span>
                                ) : (item.status === "success") ? (
                                    <span className="text-success">Success</span>
                                ) : (
                                    <span className="text-danger">Failed</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default OrderView
