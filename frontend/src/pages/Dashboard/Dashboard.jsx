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
                <div className="mt-4 bg-gray-300 flex flex-col rounded-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="flex">
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
                            <button type="submit" className="submit-button ml-5 p-3 bg-sky-600 mr-2 mt-2 text-white rounded-md">Add to list</button>
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