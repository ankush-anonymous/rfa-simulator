import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";

const DraggableComponent = ({
  initialPosition,
  onDrop,
  children,
  disabled,
}) => {
  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    console.log(`DraggableComponent is ${disabled ? "disabled" : "enabled"}`);
  }, [disabled]);

  const handleDrag = (e, data) => {
    const newPosition = { x: data.x, y: data.y };
    setPosition(newPosition);
    onDrop(newPosition);
  };

  return (
    <Draggable position={position} onDrag={handleDrag} disabled={disabled}>
      <div
        style={{
          cursor: disabled ? "default" : "grab",
        }}
      >
        {children}
      </div>
    </Draggable>
  );
};

export default DraggableComponent;
