import { useState, useEffect, useRef } from "react";

const useFooterVisibility = () => {
  const [isFooterVisible, setIsFooterVisible] = useState(true);
  const timeoutRef = useRef(null); // useRef to store timeout id

  useEffect(() => {
    const handleScroll = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current); // clear previous timeout

      timeoutRef.current = setTimeout(() => {
        const scrolledToBottom =
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100;
        setIsFooterVisible(scrolledToBottom);
      }, 100); // wait 100ms after scrolling stops
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timeoutRef.current); // clear the timeout when component unmounts
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isFooterVisible;
};

export default useFooterVisibility;
