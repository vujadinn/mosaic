import React, { FC, useContext, useState } from "react";
import { TilesContext } from "../context/tiles-context";

export type ColorPickerProps = {
  x: number;
  y: number;
};

const makeStyles = (color: string) => ({
  backgroundColor: color,
  height: "15px",
  width: "15px",
  cursor: "pointer",
});

const containerStyles = {
  backgroundColor: "white",
  border: "1px solid #d7d7d7",
  display: "flex",
  padding: "5px",
  marginTop: "4px",
};

const ColorPicker: FC<ColorPickerProps> = ({ x, y }) => {
  const { setColor, emitColorEvent } = useContext(TilesContext);
  const colors = ["blue", "yellow", "red", "green", "orange", "gray"];

  return (
    <div className={"color-picker"} style={containerStyles}>
      {colors.map((color, index) => (
        <div
          key={index}
          className="color-option"
          data-color={color}
          style={makeStyles(color)}
          onClick={async (ev) => {
            const {
              currentTarget: {
                dataset: { color },
              },
            } = ev;
            await setColor(color, x, y);
            emitColorEvent(Math.random());
          }}
        ></div>
      ))}
    </div>
  );
};

export default ColorPicker;
