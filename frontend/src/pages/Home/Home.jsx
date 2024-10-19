import React from 'react';
import { Link } from "react-router-dom";
import backgroundImg from "../../assets/airplanebg.jpeg";

export default function Home() {
    return (
        <div className="flex items-cetner justify-center min-h-screen"
             style={{ 
                backgroundImage: `url(${backgroundImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                zIndex: -2,
             }}
        >
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-3xl sm:text-5xl font-semibold">BucketList AI</h1>
                <h4 className="text-xl sm:text-3xl font-sm mt-1">Emphasis on smooth, optimized travel planning.</h4>

                <Link to="/login" className="mt-8 px-4 text-sm font-medium sm:font-semibold py-2 bg-sky-600 text-white rounded-xl hover:bg-sky-400 ease-in duration-100">
                    Click here to get started
                </Link>
            </div>
        </div>
    );
}