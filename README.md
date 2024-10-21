## Inspiration
Our inspiration for this project came from OpenAI's recent release of Swarms, which introduced us to the concept of using multiple AI agents to collaboratively accomplish tasks. We wanted to explore how AI agents could be applied in a practical, user-friendly way, particularly for tasks that require coordination and planning.

As college students, we often find ourselves excited about future plans, like traveling or exploring new places. However, with our busy schedules, these ideas often get pushed aside and forgotten. This is where Bucket List AI steps in. It’s designed to tackle this common problem by not only remembering the trips we want to take but actively helping us plan them. Using AI-driven recommendations and personalized itineraries, Bucket List AI simplifies the process of turning our aspirations into reality, ensuring we don't let those ideas wither away.

## What it does
Bucket List AI helps users turn their travel dreams into reality by intelligently planning trips based on their interests. First, it analyzes the items the user adds to their "bucket" list, such as destinations or activities. Then, it scans for flights from the user’s location and identifies options that are cheaper than usual.

Once potential flights are found, our AI agents step in to evaluate the quality of the trip, considering factors like whether the user's bucket list items will be fulfilled. After this evaluation, the information is passed to another agent that generates a detailed itinerary, which is then sent back to the user. This seamless process ensures that users not only discover affordable travel opportunities but also receive well-planned itineraries tailored to their personal goals.
## How we built it
We built Bucket List AI using the FaRM stack, which stands for FastAPI, React, and MongoDB. Our backend was developed in Python with FastAPI, providing a fast and scalable framework for handling requests and managing user data. For data storage, we utilized MongoDB, allowing us to store and manage complex, unstructured data like bucket list items and trip plans efficiently.

Our frontend was created with React for a dynamic and user-friendly interface, enabling users to easily interact with their bucket lists and receive travel recommendations. We styled the frontend using CSS to ensure a visually appealing and smooth user experience.

Additionally, we integrated Fetch.ai's agents, which allowed us to harness the power of decentralized AI. These agents work collaboratively to scan for flights, evaluate trip quality, and generate personalized itineraries. By leveraging Fetch.ai’s agent framework, we enabled seamless, automated task completion, ensuring that users receive high-quality, curated trip plans.

## Challenges we ran into
One of the key challenges we faced was implementing a multi-agent system with Fetch.ai. We encountered difficulties in establishing clear communication between the agents, despite following the guidelines and studying the documentation. The process of getting the agents to effectively collaborate and share data proved to be more complex than anticipated, and we weren’t able to fully implement the agents as we originally intended. We worked alongside the FetchAI software engineers but couldn't find a fix to the bug

## Accomplishments that we're proud of
We’re proud of several accomplishments in building Bucket List AI. First, successfully integrating the FaRM stack—FastAPI, React, and MongoDB—allowed us to create a full-stack application that delivers a smooth user experience. Despite not being able to fully use the Agents through Fetch.ai, we learned a lot about how these agents work and how to implement them.  The fact that we were able to generate trip recommendations based on user interests and flight prices is a major win as well as being able to use real time flight data to make trips.

## What we learned
Throughout the development of Bucket List AI, we gained valuable experience in working with AI agents and understanding the complexities of multi-agent systems. We deepened our knowledge of the FaRM stack, honing our skills in FastAPI, React, and MongoDB, while also improving our ability to handle database connectivity issues and optimize API performance. We learned the importance of collaborative problem-solving when overcoming technical hurdles and gained a better understanding of how AI-driven automation can enhance user experiences in real-world applications.

## What's next for BucketList AI
Following CalHacks, our team is excited to continue collaborating and perfecting our project. We aim to address the challenges we faced with Fetch.ai, enhancing and adding to the product to make it refined, impactful, and ready for users around the world to enjoy.

### Devpost Link ###
https://devpost.com/software/bucketlist-ai
