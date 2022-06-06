import React, { FC, useContext, useState } from "react";
import { SketchPicker } from "react-color";
import reactCSS from "reactcss";
import { TilesContext } from "../context/tiles-context";
import { ColorPickerProps } from "./color-picker";

const ColorPicker2: FC<ColorPickerProps> = ({ x, y }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState({
    r: "225",
    g: "155",
    b: "99",
    a: "2",
  });

  const { setColor, emitColorEvent } = useContext(TilesContext);

  const onClick = () => {
    setShowPicker(!showPicker);
  };

  const onClose = async (ev: React.MouseEvent<HTMLDivElement>) => {
    setShowPicker(false);
    const rgbString = `rgba(${currentColor.r},${currentColor.g},${currentColor.b}, ${currentColor.a})`;
    await setColor(rgbString, x, y);
    emitColorEvent(Math.random());
  };

  const onChange = (color: {
    rgb: React.SetStateAction<{ r: string; g: string; b: string; a: string }>;
  }) => {
    setCurrentColor(color.rgb);
  };

  const styles = reactCSS({
    default: {
      color: {
        width: "40px",
        height: "15px",
        borderRadius: "3px",
        background: `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${currentColor.a})`,
      },
      popover: {
        position: "absolute",
        zIndex: "3",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
      swatch: {
        padding: "6px",
        background: "#ffffff",
        borderRadius: "2px",
        cursor: "pointer",
        display: "inline-block",
        boxShadow: "0 0 0 1px rgba(0,0,0,.2)",
      },
    },
  });

  return (
    <div>
      <div style={styles.swatch} onClick={onClick}>
        <div style={styles.color} />
      </div>
      {showPicker ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={(ev) => onClose(ev)} />
          <SketchPicker color={currentColor} onChange={onChange} />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker2;
