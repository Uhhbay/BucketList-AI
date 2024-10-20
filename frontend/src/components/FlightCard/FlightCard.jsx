import React, { useState } from 'react';
import { MdExpandMore, MdExpandLess } from "react-icons/md";

export default function FlightCard({ airline, departingDate, arrivingDate, departingAirport, arrivingAirport, price, details }) {
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
                        <p className="text-xl font-semibold">{departingAirport} - {arrivingAirport}</p>
                        <p className="text-sm text-gray-600">{airline.name}</p>
                    </div>
                </div>

                <div className="flex gap-1 sm:gap-10 md:gap-15 lg:gap-20 text-center">
                    <div>
                        <p className="text-md font-bold">{departingDate}</p>
                        <p className="text-sm text-gray-500">Departure</p>
                    </div>
                    <div>
                        <p className="text-md font-bold">{arrivingDate}</p>
                        <p className="text-sm text-gray-500">Arrival</p>
                    </div>
                </div>

                <div className="flex text-right">
                    <div>
                        <p className="text-lg font-semibold">${price}</p>
                        <p className="text-sm text-gray-500">Round Trip</p>
                    </div>
                    <div className="ml-2 mt-2">
                        {expanded ? (
                            <MdExpandLess size={28} />
                        ) : (
                            <MdExpandMore size={28} />
                        )}
                    </div>
                </div>

            </div>

            {/* Expandable section */}
            {expanded && (
                <div className="mt-4 border-t pt-4">
                    <p className="text-sm text-gray-70 font-bold flex items-center">Itinerary Details:</p>
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
