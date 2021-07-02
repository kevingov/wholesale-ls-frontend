import { useState, useEffect } from "react";

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

export const numberWithCommas = (x) => {
  if (x === null) return "XXX,XXX";
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// attach the .equals method to Array's prototype to compare if 2 Arrays contain the same elements
Array.prototype.equals = function (array) {
  if (!array) return false;
  if (this.length != array.length) return false;

  return this.every((item) => array.includes(item));
};
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", { enumerable: false });
