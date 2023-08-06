import { useState, useContext, createContext, useEffect } from "react";

const SelectedOrderContext = createContext();

const SelectedOrderProvider = ({ children }) => {
  const [selectedOrder, setSelectedOrder] = useState([]);

  useEffect(() => {
    let existingCartItem = localStorage.getItem("selectedOrder");
    if (existingCartItem) setSelectedOrder(JSON.parse(existingCartItem));
  }, []);

  return (
    <SelectedOrderContext.Provider value={[selectedOrder, setSelectedOrder]}>
      {children}
    </SelectedOrderContext.Provider>
  );
};

// custom hook
const useSelectedOrder = () => useContext(SelectedOrderContext);

export { useSelectedOrder, SelectedOrderProvider };
