import React from "react";
import DraggableComponent from "./DraggableComponent.jsx"; // Adjust path as necessary
import batteryImage from "../DraggableComponents/images/images/images/battery.png"; // Adjust path as necessary

const DraggableBattery = ({ initialPosition, onDrop, disabled }) => {
  return (
    <DraggableComponent
      initialPosition={initialPosition}
      onDrop={onDrop}
      disabled={disabled}
    >
      <img src={batteryImage} alt="Battery" width={50} height={50} />
    </DraggableComponent>
  );
};

export default DraggableBattery;
