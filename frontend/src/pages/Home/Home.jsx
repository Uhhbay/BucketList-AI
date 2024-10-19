import React from 'react';
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="flex items-cetner justify-center min-h-screen">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-3xl sm:text-5xl font-semibold">BucketList AI</h1>
                <h4 className="text-xl sm:text-3xl font-sm">Emphasis on smooth, optimized travel planning.</h4>

                <Link to="/login" className="mt-8 px-4 text-sm font-medium sm:font-semibold py-2 bg-blue-800 text-white rounded-xl hover:bg-blue-400 ease-in duration-100">
                    Login to get started
                </Link>
            </div>
        </div>
    );
}