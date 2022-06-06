import React, { createContext, Dispatch, SetStateAction } from "react";

type TileContextProps = {
  setColor: (ev: string, x: number, y: number) => Promise<void>;
  emitColorEvent: Dispatch<SetStateAction<number>>;
};

export const TilesContext = createContext<TileContextProps>({
  setColor: (ev: string, x: number, y: number) => Promise.resolve(),
  emitColorEvent: () => undefined,
});
