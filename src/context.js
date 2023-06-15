import { createContext, useState } from "react";

const systemContext = createContext();

export const SystemProvider = ({ children }) => {
  const [system, setSystem] = useState({
    dates: [],
    notifications: [],
  });

  const contextValue = {
    system,
    setSystem,
    setDates(dates) {
      setSystem((prev) => {
        return { ...prev, dates };
      });
    },
    setNotification(notification) {
      setSystem((prev) => {
        return {
          ...prev,
          notifications: [...prev.notifications, notification],
        };
      });
    },
  };

  return (
    <systemContext.Provider value={contextValue}>
      {children}
    </systemContext.Provider>
  );
};

export default systemContext;
