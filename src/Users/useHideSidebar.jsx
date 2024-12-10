import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useHideSidebar = () => {
    const location = useLocation();
    const [hide, setHide] = useState(false); // Default to false to show sidebar

    useEffect(() => {
        // Check if the current path matches the workgroup ID pattern
        const isWorkgroupPage = /^\/workgroups\/\d+/.test(location.pathname);

        setHide(isWorkgroupPage); // Set hide based on the match
    }, [location]);

    return [hide, setHide];
};