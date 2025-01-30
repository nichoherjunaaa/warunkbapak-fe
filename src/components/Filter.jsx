import React, { useState } from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import FormInput from './Form/FormInput';
import FormSelect from './Form/FormSelect';
import { HiRefresh } from 'react-icons/hi';
import { IoFilter } from "react-icons/io5";

const Filter = () => {
    const { params } = useLoaderData();
    const { name, category } = params;
    const categories = ["Makanan", "Minuman", "Pakaian", "Aksesoris"];
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className="bg-base-200 rounded-r-md flex flex-col px-10 py-5">
            <Form method="get" className="w-full mb-7">
                <div className="flex w-full items-center gap-2">
                    <FormInput
                        label="Cari Produk"
                        type="search"
                        name="name"
                        defaultValue={name}
                    />
                    <button type="submit" className="btn btn-primary mt-9 w-24">Cari</button>
                    <button 
                        type="button" 
                        className="btn btn-secondary mt-9" 
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
                        {/* <FormInput
                            label="Min Price"
                            type="number"
                            name="minPrice"
                            defaultValue=""
                        />
                        <FormInput
                            label="Max Price"
                            type="number"
                            name="maxPrice"
                            defaultValue=""
                        /> */}
                        <button type="submit" className="btn btn-success mt-3">Apply Filters</button>
                    </div>
                )}
            </Form>
        </div>
    );
};

export default Filter;
