import React, { useState } from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import FormInput from './Form/FormInput';
import FormSelect from './Form/FormSelect';
import { IoFilter } from "react-icons/io5";

const Filter = () => {
    const { params } = useLoaderData();
    const { name, category } = params;
    const categories = ["Makanan", "Minuman", "Pakaian", "Aksesoris"];
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className="bg-base-200 rounded-md p-4 sm:p-6 w-full mx-auto">
            <Form method="get" className="w-full mb-4">
                <div className="flex flex-wrap items-center gap-2">
                    <div className="flex-grow">
                        <FormInput
                            label="Cari Produk"
                            type="search"
                            name="name"
                            defaultValue={name}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full sm:w-auto  lg:mt-9">Cari</button>
                    <button
                        type="button"
                        className="btn btn-secondary w-full sm:w-auto lg:mt-9"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <IoFilter />
                    </button>
                </div>
                {showFilters && (
                    <div className="bg-white p-4 mt-4 rounded-md shadow-md">
                        <FormSelect
                            label="Select Category"
                            list={categories}
                            name="category"
                            defaultValue={category}
                        />
                        <button type="submit" className="btn btn-success mt-3 w-full sm:w-auto">Apply Filters</button>
                    </div>
                )}
            </Form>
        </div>
    );
};

export default Filter;
