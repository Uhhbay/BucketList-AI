import React, { useState, useEffect } from 'react';
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Dashboard() {
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/bucket', {
                    method: 'GET',
                    credentials: 'include', 
                });

                if (response.ok) {
                    const data = await response.json();
                    setItems(data.items); 
                } else {
                    console.error('Failed to fetch items');
                }
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;

        try {
            const response = await fetch('http://localhost:3001/api/bucket/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', 
                body: JSON.stringify({ description: inputValue }),
            });

            if (response.ok) {
                const newItem = await response.json();
                setItems((prevItems) => [...prevItems, newItem]); // Add new item to list
                setInputValue(''); // Clear input field
            } else {
                console.error('Failed to add item');
            }
        } catch (error) {
            console.error('Error adding item:', error);
        }
    }

    const handleCompleteToggle = async (itemId, completed) => {
        try {
            const response = await fetch(`http://localhost:3001/api/bucket/items/${itemId}/completed`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Ensure cookies are sent
                body: JSON.stringify({ completed: !completed }),
            });

            if (response.ok) {
                setItems((prevItems) =>
                    prevItems.map((item) =>
                        item.id === itemId ? { ...item, completed: !completed } : item
                    )
                );
            } else {
                console.error('Failed to update item');
            }
        } catch (error) {
            console.error('Error updating item:', error);
        }
    }

    const handleDelete = async (itemId) => {
        try {
            const response = await fetch(`http://localhost:3001/api/bucket/items/${itemId}`, {
                method: 'DELETE',
                credentials: 'include', // Ensure cookies are sent
            });

            if (response.ok) {
                setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
            } else {
                console.error('Failed to delete item');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
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
                            <h3 className="flex-grow">BucketList Item</h3>
                            <h3 className="text-right">Actions</h3>
                        </div>
                        <ul className="p-2">
                            {items.map((item, index) => (
                                <li className="flex gap-6 items-center" key={item.id}>
                                    <button onClick={() => handleCompleteToggle(item.id, item.completed)} className="ml-1 text-center">
                                        {item.completed ? <MdCheckBox size={24} /> : <MdCheckBoxOutlineBlank size={24} />}
                                    </button>
                                    <span className={`flex-grow ${item.completed ? 'line-through' : ''}`}>{item.description}</span>
                                    <div>
                                        <button onClick={() => handleDelete(item.id)} className="mr-1"><FaRegTrashAlt size={22} /></button>
                                    </div>
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