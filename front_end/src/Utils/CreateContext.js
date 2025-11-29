import { createContext, useContext, useState } from "react";

const AppDataContext = createContext();

export function AppDataProvider({ children }) {
  const [activeRoom, setActiveRoom] = useState(null);
  const [userData, setUserData] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [roomInfo, setRoomInfo] = useState("light");
  const [showOption, setShowOption] = useState(false);  
  const [showHam, setShowHam] = useState(false);



  return (
    <AppDataContext.Provider value={{
      activeRoom,
      setActiveRoom,
      userData,
      setUserData,
      selectedCourse,
      setSelectedCourse,
      roomInfo,
      setRoomInfo,
      showOption,
      setShowOption,
      showHam,
      setShowHam,
    }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  return useContext(AppDataContext);
}
