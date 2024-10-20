import React, { useState } from 'react';
import { MdExpandMore, MdExpandLess } from "react-icons/md";

export default function FlightCard({ airline, time, duration, emissions, price, details }) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => setExpanded(!expanded);

    return (
        <div className="flight-card bg-gray-100 rounded-lg shadow-md p-4 my-2 w-full max-w-3xl cursor-pointer" onClick={toggleExpand}>
            {/* Top section with flight summary */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <img
                        src={airline.logo}
                        alt={airline.name}
                        className="w-12 h-12 rounded-md object-contain"
                    />
                    <div>
                        <p className="text-lg font-semibold">{time}</p>
                        <p className="text-sm text-gray-600">{airline.name}</p>
                    </div>
                </div>

                <div className="text-center">
                    <p className="font-medium">{duration}</p>
                    <p className="text-sm text-gray-500">Nonstop</p>
                </div>

                <div className="text-center">
                    <p className={`font-medium ${emissions.change > 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {emissions.value} kg CO₂e
                    </p>
                    <p className="text-sm">{emissions.label}</p>
                </div>

                <div className="text-right">
                    <p className="text-lg font-semibold">${price}</p>
                    <p className="text-sm text-gray-500">Round Trip</p>
                </div>

                <div className="ml-2">
                    {expanded ? (
                        <MdExpandLess size={28} />
                    ) : (
                        <MdExpandMore size={28} />
                    )}
                </div>
            </div>

            {/* Expandable section */}
            {expanded && (
                <div className="mt-4 border-t pt-4">
                    <p className="text-sm text-gray-700">Flight Details:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                        {details.map((detail, index) => (
                            <li key={index}>{detail}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
