"use client";

import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import React, { createContext, useContext, useState } from "react";

type CommunityContextType = {
  activeSegment: string | null;
  setActiveSegment: Dispatch<SetStateAction<string | null>>;
};

const CommunityContext = createContext<CommunityContextType>({
  activeSegment: null,
  setActiveSegment: () => {},
});

export const CommunityProvider = ({ children }: PropsWithChildren<{}>) => {
  const [activeSegment, setActiveSegment] = useState<string | null>(null);

  return (
    <CommunityContext.Provider
      value={{
        activeSegment,
        setActiveSegment,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => useContext(CommunityContext);
