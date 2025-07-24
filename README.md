# Gardener App
This is the frontend application for managing your plant resources. It allows users to register, log in, update, and delete plant entries with real-time quantity management and status updates.

## Live Demo


The app is deployed on Vercel and is accessible here:
https://gardener-frontend.vercel.app

It communicates with the backend API deployed on Render:
https://gardener-backend-owo6.onrender.com

## Features
-User authentication (login/logout) with JWT token handling

-View a list of plants/resources with details: name, description, quantity, status, dates

-Update plant quantity live with plus/minus buttons (quantity cannot be negative)

-Delete plants with confirmation prompt

-Status automatically updates based on quantity:

    Out of stock if quantity is 0

    Low stock if quantity < 5

    Available if quantity ≥ 5

-Real-time update of last modified timestamp after quantity changes

-Protected routes and API communication with authorization headers

## Technologies
-React (functional components, hooks)

-Context API with useReducer for auth state management

-Fetch API for backend communication

-CSS modules for styling

## Running locally
Prerequisites

    Node.js and npm installed

    Access to the backend API
### Important:
When running the frontend locally, you won't have access to the deployed backend API or its database unless you configure a local or accessible backend server. To make the app fully functional locally, you need to:

    Set up and run the backend API server on your machine or a remote accessible server.

    Ensure the backend uses a MySQL database (e.g., locally or cloud-hosted) and is properly configured.

    Update the frontend's API base URL (BASE_URL) in the source code to point to your backend server's URL.

Without these steps, API requests (fetch calls) from the frontend will fail due to missing backend and database access.

### Instalation and starting
`git clone https://github.com/yourusername/plant-manager-frontend.git`
`cd plant-manager-frontend`
`npm install`
`npm run dev`

## Enviroment
The frontend is configured to communicate with the backend API hosted at:
https://gardener-backend-owo6.onrender.com

If you want to run your own backend, update the API base URL accordingly in the source code.

## Authentication Flow
-Users can register and login through the backend API

-Upon successful login, a JWT token is stored in localStorage

-This token is used in API calls to authenticate requests

-Logout clears the token and user state

## Plant Management
-Plants are fetched from the API per authenticated user

-Quantity updates trigger PUT requests to update the backend

-Deleting a plant sends a DELETE request to the API

-UI reflects latest changes immediately with local state updates
