import React, { useState } from 'react';

export default function Dashboard() {
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() !== '') {
            setItems([...items, inputValue]);
            setInputValue('');
        }
    }

    return (
        <div className="pt-28 min-h-screen">
            <div className="flex flex-col items-center justify-center lg:flex-row lg:gap-12 lg:px-16">

                {/* Left Column */}
                <div className="w-full lg:w-1/2 flex flex-col items-center">
                    <h1 className="text-3xl sm:text-4xl font-semibold">Your BucketList</h1>
                    <div className="mt-4 flex flex-col rounded-lg max-w-md w-11/12 sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl">
                        <form onSubmit={handleSubmit}>
                            <div className="flex items-center p-2 gap-2">
                                <input 
                                    type="text"
                                    required
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Something you'd like to do"
                                    className="shadow-md text-sm flex-grow p-2 border rounded-md focus:outline-none"
                                />
                                <button type="submit" className="shadow-md p-2 bg-sky-600 text-white rounded-md hover:bg-sky-400 ease-in duration-100">Add to List</button>
                            </div>
                        </form>
                        <div className="mt-12 m-3 flex gap-6 font-semibold border-b-2 border-gray-600">
                            <h3>No.</h3>
                            <h3>Bucket Item</h3>
                        </div>
                        <ul className="p-2">
                            {items.map((item, index) => (
                                <li className="flex gap-6 items-center" key={index}>
                                    <span className="w-8 text-center">{index + 1}</span>
                                    <span className="flex-grow">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Column */}
                <div className="pt-24 lg:pt-0 w-full lg:w-1/2 flex flex-col items-center">
                    
                </div>
            </div>
        </div>
    );
}