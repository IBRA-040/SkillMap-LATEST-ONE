import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const SwapContext = createContext();

export const SwapProvider = ({ children }) => {
  const [swappedItems, setSwappedItems] = useState([]);

  // Function to add a swap and update count
  const addSwap = (post) => {
    setSwappedItems((prevItems) => {
      const isAlreadySwapped = prevItems.some((item) => item.title === post.title);
      if (!isAlreadySwapped) {
        return [...prevItems, post];
      }
      return prevItems;
    });
  };

  // Get total number of swaps
  const pathsCount = swappedItems.length;

  return (
    <SwapContext.Provider value={{ swappedItems, setSwappedItems, addSwap, pathsCount }}>
      {children}
    </SwapContext.Provider>
  );
};

// Custom Hook for easier access
export const useSwaps = () => {
  return useContext(SwapContext);
};

// PropTypes validation
SwapProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
