// DraggableComponent.js
import React from "react";
import Draggable from "react-draggable";

const DraggableComponent = ({
  initialPosition,
  onDrop,
  onClick, // Add onClick prop
  disabled,
  children,
}) => {
  const [position, setPosition] = React.useState(initialPosition);

  const handleDrag = (e, data) => {
    const newPosition = { x: data.x, y: data.y };
    setPosition(newPosition);
    onDrop(newPosition);
  };

  return (
    <Draggable position={position} onDrag={handleDrag} disabled={disabled}>
      <div
        onClick={onClick} // Handle click events
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
