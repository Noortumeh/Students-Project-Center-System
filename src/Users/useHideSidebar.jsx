import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useHideSidebar = () => {
  const location = useLocation();
  const [hide, setHide] = useState(true);

  useEffect(() => {
    // Define the paths where you want to hide the sidebar
    const hideSidebarPaths = ['/workgroups/1']; // Add paths where the sidebar should be hidden

    if (hideSidebarPaths.includes(location.pathname)) {
      setHide(true);
    } else {
      setHide(false);
    }
  }, [location]);

  return [hide, setHide];
};