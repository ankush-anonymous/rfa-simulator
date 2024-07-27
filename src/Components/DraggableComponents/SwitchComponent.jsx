import React from "react";
import DraggableComponent from "./DraggableComponent";
import switchImage from "../DraggableComponents/images/switch-off.png";

const DraggableSwitch = ({ initialPosition, onDrop, disabled }) => {
  return (
    <DraggableComponent
      initialPosition={initialPosition}
      onDrop={onDrop}
      disabled={disabled}
    >
      <img src={switchImage} alt="Switch" width={50} height={50} />
    </DraggableComponent>
  );
};

export default DraggableSwitch;
