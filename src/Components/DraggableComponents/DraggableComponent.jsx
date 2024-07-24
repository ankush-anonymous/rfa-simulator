import React, { useState } from "react";

const DraggableComponent = ({ initialPosition, onDrop, children }) => {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState(initialPosition);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setDragging(true);
    const offsetX = e.clientX - position.x;
    const offsetY = e.clientY - position.y;
    setOffset({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const newPosition = {
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      };
      setPosition(newPosition);
      onDrop(newPosition);
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      className="draggable-component"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        cursor: dragging ? "grabbing" : "grab",
      }}
    >
      {children}
    </div>
  );
};

export default DraggableComponent;
