import React from 'react';
import { Form, Link } from 'react-router-dom';
import FormInput from './Form/FormInput';

const FormAuth = ({ isRegister }) => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Form method="POST" className="card w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8 bg-base-300 shadow-lg flex flex-col gap-y-2">
                <h4 className="text-center text-2xl sm:text-3xl font-bold">{isRegister ? "REGISTER" : "LOGIN"}</h4>
                {isRegister && <FormInput type="text" name="name" label="Username" />}
                <FormInput type="email" name="email" label="Email" />
                <FormInput type="password" name="password" label="Password" />
                <div className="mt-4">
                    <button type="submit" className="btn btn-primary w-full">{isRegister ? "Register" : "Login"}</button>
                </div>
                <div className="flex justify-start px-1 mt-2">
                    {isRegister ? (
                        <p className="text-center text-sm sm:text-base">
                            Sudah punya akun?
                            <Link to="/login" className="ml-2 link link-hover link-accent capitalize">Login</Link>
                        </p>
                    ) : (
                        <p className="text-center text-sm sm:text-base">
                            Belum punya akun?
                            <Link to="/register" className="ml-2 link link-hover link-accent capitalize">Register</Link>
                        </p>
                    )}
                </div>
            </Form>
        </div>
    );
};

export default FormAuth;
