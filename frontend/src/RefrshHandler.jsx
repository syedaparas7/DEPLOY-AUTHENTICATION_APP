import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefrshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();
    const isChecked = useRef(false); // Prevent multiple re-checks

    useEffect(() => {
        if (!isChecked.current && localStorage.getItem('token')) {
            isChecked.current = true; // Mark as checked
            setIsAuthenticated(true);

            if (['/', '/login', '/signup'].includes(location.pathname)) {
                navigate('/home', { replace: true });
            }
        }
    }, [location, navigate, setIsAuthenticated]);

    return null;
}

export default RefrshHandler;
