import React from "react";
import DraggableComponent from "./DraggableComponent";
import switchImage from "../DraggableComponents/images/switch-off.png";

const DraggableSwitch = ({
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
      <img src={switchImage} alt="Switch" width={50} height={50} />
    </DraggableComponent>
  );
};

export default DraggableSwitch;
