import React, { useState, useRef } from "react";
import LayoutComponent from "../Components/LayoutComponent";
import DraggableBattery from "../Components/DraggableComponents/BatteryComponents";
import DraggableComponent from "../Components/DraggableComponents/DraggableComponent"; // Adjust path as necessary
import { Typography } from "@mui/material";

const Canvas = () => {
  const [components, setComponents] = useState([]);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  const handleMouseMove = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setCoordinates({ x, y });
    // setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  const handleComponentSelect = (component) => {
    const newComponent = {
      type: component,
      position: { x: 100, y: 100 },
    };
    setComponents([...components, newComponent]);
  };

  const handleDrop = (position, index) => {
    const updatedComponents = [...components];
    updatedComponents[index].position = position;
    setComponents(updatedComponents);
  };

  return (
    <LayoutComponent onSelect={handleComponentSelect}>
      <div
        className="graph-paper"
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Typography variant="h6" gutterBottom>
          Graph Paper Canvas
        </Typography>
        {tooltipVisible && (
          <div
            className="tooltip"
            style={{
              left: `${coordinates.x + 15}px`,
              top: `${coordinates.y + 15}px`,
            }}
          >
            x: {coordinates.x}, y: {coordinates.y}
          </div>
        )}
        {components.map((comp, index) => {
          switch (comp.type) {
            case "Battery":
              return (
                <DraggableBattery
                  key={index}
                  initialPosition={comp.position}
                  onDrop={(position) => handleDrop(position, index)}
                />
              );
            case "Circle":
              return (
                <DraggableComponent
                  key={index}
                  initialPosition={comp.position}
                  onDrop={(position) => handleDrop(position, index)}
                >
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      backgroundColor: "red",
                      borderRadius: "50%",
                    }}
                  />
                </DraggableComponent>
              );
            default:
              return null;
          }
        })}
      </div>
      <style jsx>{`
        .graph-paper {
          position: relative;
          width: 100%;
          height: 100vh;
          background-size: 1cm 1cm;
          background-image: linear-gradient(
              to right,
              lightgray 1px,
              transparent 1px
            ),
            linear-gradient(to bottom, lightgray 1px, transparent 1px);
        }
        .tooltip {
          position: absolute;
          background-color: rgba(0, 0, 0, 0.75);
          color: white;
          padding: 5px;
          border-radius: 3px;
          pointer-events: none;
          transform: translate(-50%, -100%);
        }
      `}</style>
    </LayoutComponent>
  );
};

export default Canvas;
