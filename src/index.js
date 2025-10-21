
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom'

import App from './App'
import './Pages/Dashboard/dashboard.css'
import UserProvider  from './Pages/Website/Context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <UserProvider>
            <App />
        </UserProvider>
    </Router>
);


