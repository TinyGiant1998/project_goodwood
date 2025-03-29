import { useEffect } from "react";

const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, []);

  return null;
};
export default ScrollToTop;
