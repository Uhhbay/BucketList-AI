import React, { useState } from 'react';

export default function Dashboard() {
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() != '') {
            setItems([...items, inputValue]);
            setInputValue('');
        }
    }

    return (
        <div className="pt-28 min-h-screen">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-3xl sm:text-5xl font-semibold">Your BucketList</h1>
                <div className="mt-4 bg-gray-300 flex flex-col rounded-lg max-w-md w-11/12 sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl">
                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-between">
                            <div className="input ml-2">
                                <input 
                                    type="text"
                                    required
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Something you'd like to do"
                                    className="text-xs"
                                />
                            </div>
                            <button type="submit" className="submit-button p-3 bg-sky-600 mr-2 mt-2 text-white rounded-md">Add to list</button>
                        </div>
                    </form>
                    <ul className="m-4">
                        {items.map((item, index) => (
                            <li className="" key={index}>{item}</li>
                        ))}
                    </ul>

                </div>
            </div>
        </div>
    );
}