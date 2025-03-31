import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation(); // Access current location object

  useEffect(() => {
    // Scroll to top whenever location changes
    window.scrollTo(0, 0);
    console.log("ScrollToTop triggered for:", location.pathname);
  }, [location]); // Run the effect when the location (route) changes

  return null; // This component doesn't render anything visible
};

export default ScrollToTop;
