import React from 'react'
import FormAuth from '../../components/FormAuth'
import { toast } from 'react-toastify'
import API from '../../api';
import { registerUser } from '../../features/userSlice';
import { redirect } from 'react-router-dom';

export const action = (store) => async ({ request }) => {
    console.log(store);
    const formInputData = await request.formData();
    const data = Object.fromEntries(formInputData);
    try {
        const response = await API.post('/auth/register', data);
        // console.log(response);
        store.dispatch(registerUser(response.data));
        toast.success('Registrasi Berhasil')
        return redirect('/');
    } catch (error) {
        const errMsg = error?.response?.data?.message;
        toast.error('Semua field harus diisi');
        return null
    }
}
const RegisterView = () => {
    return (
        <main>
            <FormAuth isRegister={true} />
        </main>
    )
}

export default RegisterView