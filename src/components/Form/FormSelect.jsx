import React from 'react'

const FormSelect = ({ label, name, list, defaultValue }) => {
    return (
        <div className="form-control">
            <label className="label">
                {/* Tampilkan label jika ada */}
                <span className="capitalize label-text">{label}</span>
            </label>
            <select name={name} className="select select-bordered" defaultValue={defaultValue}>
                {list.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default FormSelect
