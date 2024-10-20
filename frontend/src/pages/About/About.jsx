import React, { useState } from 'react';
import './About.css';
import Flowchart from '../../assets/Flowchart.png'
import johnPic from '../../assets/JohnVu.jpeg'
import AndrewPic from '../../assets/Andrew_Ho.jpeg'
import AbhayPic from '../../assets/AbhaySingh.jpg'


export default function About() {
    return (

        <div className="about-container">
            <h1 className="about-title">Built with the Power of Fetch.AI</h1>
            <p className="about-description">
            Welcome to BucketList AI! We aim to provide the best experiences for our users who are looking to explore the world while crossing things off their Bucket Lists.
            </p>
            <div className="about-image-container">
                <img 
                    src={Flowchart} 
                    alt="Flow Chart"
                    className="about-image"
                />
            </div>
            <p className="about-info">
            Our project aims to create a user-friendly interface that allows people to list their bucket list items and receive tailored itineraries when cheap flights to relevant
             destinations are available. To do this we trained three FetchAI agents built with OpenAI assigned different tasks and implemented to interact with each other to take in 
             flight information, bucket list data, create a connection to destinations, find cheap flights to destinations that could help a person complete their bucket list item, and alert the user about it.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-10">
                <div className="circle">
                    <img src={ johnPic } alt="Circle 1" />
                </div>
                <div className="circle">
                    <img src={ AndrewPic } alt="Circle 2" />
                </div>
                <div className="circle">
                    <img src="https://via.placeholder.com/150" alt="Circle 3" />
                </div>
                <div className="circle">
                    <img src={AbhayPic} alt="Circle 4" />
                </div>
            </div>
        </div>


    );
};