import React from "react";
import DraggableComponent from "./DraggableComponent";
import fanImage from "../DraggableComponents/images/fan.png";

const DraggableFan = ({ initialPosition, onDrop, disabled }) => {
  return (
    <DraggableComponent
      initialPosition={initialPosition}
      onDrop={onDrop}
      disabled={disabled}
    >
      <img src={fanImage} alt="Fan" width={50} height={50} />
    </DraggableComponent>
  );
};

export default DraggableFan;
