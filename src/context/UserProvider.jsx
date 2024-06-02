import React, { useState } from "react";
import { UserContext } from "./UserContext";
import pressButtonSound from "assets/sounds/press-button.mp3";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [operationType, setOperationType] = useState("");
  const [startTime, setStartTime] = useState();
  const audio = new Audio(pressButtonSound);

  const playPressButtonSound = () => {
    audio.play();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        startTime,
        setStartTime,
        operationType,
        setOperationType,
        playPressButtonSound,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
