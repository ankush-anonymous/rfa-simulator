import React from "react";
import DraggableComponent from "./DraggableComponent";
import bulbImage from "../DraggableComponents/images/light-bulb.png";

const DraggableBulb = ({
  initialPosition,
  onDrop,
  onClick,
  disabled,
  style,
}) => {
  return (
    <DraggableComponent
      initialPosition={initialPosition}
      onDrop={onDrop}
      onClick={onClick} // Pass the onClick handler
      disabled={disabled}
      style={style} // Apply custom styles
    >
      <img src={bulbImage} alt="Bulb" width={50} height={50} />
    </DraggableComponent>
  );
};

export default DraggableBulb;
