import React from "react";
import DraggableComponent from "./DraggableComponent";
import fanImage from "../DraggableComponents/images/fan.png";

const DraggableFan = ({
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
      <img src={fanImage} alt="Fan" width={50} height={50} />
    </DraggableComponent>
  );
};

export default DraggableFan;
