import React from 'react';

const FormInput = ({ label, name, type, defaultValue }) => {
    return (
        <label className="form-control w-full">
            <label className="label">
                <span className="label-text capitalize">{label}</span>
            </label>
            <input 
                type={type} 
                name={name} 
                defaultValue={defaultValue} 
                className="input input-bordered w-full text-sm sm:text-base md:text-lg"
            />
        </label>
    );
};

export default FormInput;
