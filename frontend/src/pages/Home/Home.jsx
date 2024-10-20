import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import backgroundImg from "../../assets/airplanebg.jpeg";

export default function Home() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check session validity on component mount
        const checkSession = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/session', {
                    method: 'GET',
                    credentials: 'include',  // Ensure cookies are included
                });

                if (response.ok) {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error('Session check failed', error);
            }
        };

        checkSession();
    }, []);

    const handleGetStarted = () => {
        if (isLoggedIn) {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    }
    
    return (
        <div className="flex items-center justify-center min-h-screen"
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
                <h4 className="text-md sm:text-2xl font-sm mt-1">Emphasis on smooth, optimized travel planning.</h4>

                <button onClick={handleGetStarted} className="shadow-md mt-8 px-4 text-sm font-medium sm:font-semibold py-2 bg-sky-600 text-white rounded-xl hover:bg-sky-400 ease-in duration-100">
                    Click here to get started
                </button>
            </div>
        </div>
    );
}