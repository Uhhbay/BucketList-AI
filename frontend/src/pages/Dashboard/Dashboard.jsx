import React, { useState, useEffect } from 'react';
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import FlightCard from "../../components/FlightCard/FlightCard";

export default function Dashboard() {
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const flights = [
        {
            airline: { name: 'American Airlines', logo: 'https://external-preview.redd.it/noGVmHkGp3tV46SVyR3TSndGMlFp-2Vf3uLBm9UUZlY.png?auto=webp&s=fd18075339f5cf34ee0a7512ede6476c619a21cb' },
            departingDate: '01/21/2025',
            arrivingDate: '02/04/2025',
            departingAirport: 'SFO',
            arrivingAirport: 'NAS',
            price: 459,
            details: ['Pristine Beaches and Crystal Clear Waters: the Bahamas is home to some of the most beautiful beaches in the world, such as Pink Sands Beach, creating an exotic environment.', 
                'The Bahamas offers a variety of underwater experiences, including exploring vibrant coral reefs, blue holes, and shipwrecks, as well as being able to view beautiful marine life.',
                'There is a unique blend of African, European, and Caribbean influences, and visitors can explore its history at musems and even engage in colorful parades here.'
            ]
        },
        {
            airline: { name: 'JetBlue Airways', logo: 'https://api.getkoala.com/web/companies/jetblue.com/logo' },
            departingDate: '01/15/2025',
            arrivingDate: '01/23/2025',
            departingAirport: 'LAX',
            arrivingAirport: 'CDG',
            price: 475,
            details: ['Paris is home to some of the most famous landmarks, including the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral, the city streets are filled with elegant Haussmannian architecture as well.',
                'Paris is also a cultural hub, offering unparalleled art experiences. The Louvre houses masterpiece like the Mona Lisa and the Venus de Milo, while the Musee dOrsay showcases the finest collection of Impressionist art.',
                'From Michelin-starred restaurants to quaint street cafes, Paris is a paradise for food lovers. Try authentic croisants and baguettes at local bakeries and enjoy wine and cheese tastings, as well as French pastries.'
            ]
        },
        {
            airline: { name: 'Zipair', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoH_Yya4E1DPLbeNGNpJ0ZCHZlY1-h-aecQQ&s' },
            departingDate: '01/15/2025',
            arrivingDate: '02/12/2025',
            departingAirport: 'LAX',
            arrivingAirport: 'NRT',
            price: 715,
            details: ['Mount Fuji is Japans highest peak and one of its most iconic landmarks. Every summer, thousands of climbers ascend the mountain to catch the sunrise from the summit, known as Goraiko.',
                'The Fuji Five Lakes Area (Fujigoko) at the northern base of the mountain offers not only spectacular views of Mount Fuji, but also a range of traditional onsen hot springs. Places like Kawaguchiko and Hakone are famous for their views.',
                'Around Mount Fuji, you can enjoy boating, fishing, paddleboarding, or cycling around the lakes. Lake Kawaguchiko is especially popular for its seasonal flower festivals, including cherry blossoms in spring and autumn foliage.'
            ]
        },
        {
            airline: { name: 'Turkish Airlines', logo: 'https://as1.ftcdn.net/v2/jpg/03/92/12/10/1000_F_392121025_BZHVI0BBWH5eR75b7cNpRED7zt4YHtuJ.jpg' },
            departingDate: '01/09/2025',
            arrivingDate: '01/28/2025',
            departingAirport: 'SFO',
            arrivingAirport: 'CAI',
            price: 779,
            details: ['Egypt is home to some of the most iconic ancient wonders, such as the Pyramids of Giza, the Great Sphinx, and the Valley of the Kings.',
                'Experience the charm of camel riding through the Sahara Desert with views of the Pyramids of Giza, granting a unique way to explore the desert and feel connected to Egypts Bedouin culture.',
                'Take a Nile River cruise between Luxor and Aswan to see temples, tombs, and traditional villages along the way. For a more laid-back experience, head to Sharm El-Sheikh or Hurghada on the Red Sea coast.'
            ]
        },
        {
            airline: { name: 'Korean Air', logo: 'https://i.pinimg.com/originals/79/2b/c9/792bc9f5ca882dd26d13bc5b0ac3337a.jpg' },
            departingDate: '01/20/2025',
            arrivingDate: '02/03/2025',
            departingAirport: 'LAX',
            arrivingAirport: 'ICN',
            price: 821,
            details: ['South Korea offers a unique blend of ancient traditions and modern innovation. From traditional hanbok attire and ancient temples like Gyeongbokgung Palace, to the streets of Seoul with its K-pop influence, youll immerse yourself in a dynamic lifestyle.',
                'Korea boasts world-class public transportation, including an efficient subway system and high-speed trains (KTX). It is also one of the most tech-savvy countries, with excellent internet speeds and a high level of connectivity.',
                'Living in Koera provides access to a wide range of natural beauty, including scenic mountains, beaches, and islands. Cities like Busan offer a coastal lifestyle, while areas like Jeju Island and Seroaksan National Park are perfect for weekend getaways.'
            ]
        },
        {
            airline: { name: 'Turkish Airlines', logo: 'https://as1.ftcdn.net/v2/jpg/03/92/12/10/1000_F_392121025_BZHVI0BBWH5eR75b7cNpRED7zt4YHtuJ.jpg' },
            departingDate: '01/26/2025',
            arrivingDate: '02/06/2025',
            departingAirport: 'LAX',
            arrivingAirport: 'DEL',
            price: 860,
            details: ['India offers a unique blend of languages, traditions, and religions. From Taj Mahal in Agra, a symbol of love, to ancient temples like Varanasi and Hampi, the country is steeped in history.',
                'India boasts an incredibly diverse landscape, from the Himalayas in the north to the beaches of Goa and the backwaters of Kerala in the south. Adventure seekers can enjoy trekking, rafting, or skiing in the mountains.',
                'India is a paradise for food lovers, with each region offering its own specialties. From buttery North Indian curries like Butter Chicken and street food in Delhi to spicy South Indian dosas and seafood dishes from Kerala, the diversity of flavors is unmatched.'
            ]
        },
    ];

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
            <div className="flex flex-col items-center justify-center lg:flex-row lg:items-start lg:gap-12 lg:px-16">

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
                <div className="pt-20 lg:pt-0 w-full lg:w-1/2 flex flex-col items-center">
                    <h1 className="text-3xl sm:text-4xl font-semibold">Real-time Flight Data</h1>
                    <div className="mt-4 flex flex-col rounded-lg max-w-md w-11/12 sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl">
                        {flights.map((flight, index) => (
                            <FlightCard key={index} {...flight} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}