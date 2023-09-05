import React from "react";
import { createContext, useContext } from "react";

import { useEffect, useState } from "react";

const VoicePortalContext = createContext();

export const VoicePortalContextProvider = ({ children }) => {
  const [isVoicePortalOpen, setIsVoicePortalOpen] = useState(false);

  return (
    <VoicePortalContext.Provider
      value={{ isVoicePortalOpen, setIsVoicePortalOpen }}>
      {children}
    </VoicePortalContext.Provider>
  );
};

export const useVoicePortalContext = () => {
  return useContext(VoicePortalContext);
};
