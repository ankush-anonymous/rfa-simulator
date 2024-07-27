import React from "react";
import DraggableComponent from "./DraggableComponent";
import bulbImage from "../DraggableComponents/images/light-bulb.png";

const DraggableBulb = ({ initialPosition, onDrop, disabled }) => {
  return (
    <DraggableComponent
      initialPosition={initialPosition}
      onDrop={onDrop}
      disabled={disabled}
    >
      <img src={bulbImage} alt="Bulb" width={50} height={50} />
    </DraggableComponent>
  );
};

export default DraggableBulb;
