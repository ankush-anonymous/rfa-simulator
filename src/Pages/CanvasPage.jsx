import React, { useState, useRef } from "react";
import LayoutComponent from "../Components/LayoutComponent";
import DraggableBattery from "../Components/DraggableComponents/BatteryComponents";
import DraggableComponent from "../Components/DraggableComponents/DraggableComponent";
import HelperNavComponent from "../Components/HelperNavComponent";
import { Typography } from "@mui/material";
import DraggableFan from "../Components/DraggableComponents/FanComponent";
import DraggableSwitch from "../Components/DraggableComponents/SwitchComponent";
import DraggableBulb from "../Components/DraggableComponents/BulbComponent";

const Canvas = () => {
  const [components, setComponents] = useState([]);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [selectedTool, setSelectedTool] = useState("hand");
  const canvasRef = useRef(null);

  const handleMouseMove = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setCoordinates({ x, y });
    setTooltipVisible(true);
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
      <HelperNavComponent
        selectedTool={selectedTool}
        onToolChange={setSelectedTool}
      />
      <Typography
        variant="subtitle1"
        gutterBottom
        style={{ textAlign: "center", marginTop: "10px" }}
      >
        Selected Tool: {selectedTool}
      </Typography>
      <div style={{ position: "fixed", border: "1px solid black" }}>
        x: {coordinates.x.toFixed(0)}, y: {coordinates.y.toFixed(0)}
      </div>
      <div
        className="graph-paper"
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          backgroundSize: "1cm 1cm",
          backgroundImage:
            "linear-gradient(to right, lightgray 1px, transparent 1px), linear-gradient(to bottom, lightgray 1px, transparent 1px)",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Graph Paper Canvas
        </Typography>

        {components.map((comp, index) => {
          switch (comp.type) {
            case "Battery":
              return (
                <DraggableBattery
                  key={index}
                  initialPosition={comp.position}
                  onDrop={(position) => handleDrop(position, index)}
                  disabled={selectedTool === "cursor"}
                />
              );
            case "Fan":
              return (
                <DraggableFan
                  key={index}
                  initialPosition={comp.position}
                  onDrop={(position) => handleDrop(position, index)}
                  disabled={selectedTool === "cursor"}
                />
              );
            case "Switch":
              return (
                <DraggableSwitch
                  key={index}
                  initialPosition={comp.position}
                  onDrop={(position) => handleDrop(position, index)}
                  disabled={selectedTool === "cursor"}
                />
              );
            case "Bulb":
              return (
                <DraggableBulb
                  key={index}
                  initialPosition={comp.position}
                  onDrop={(position) => handleDrop(position, index)}
                  disabled={selectedTool === "cursor"}
                />
              );

            default:
              return null;
          }
        })}
      </div>
    </LayoutComponent>
  );
};

export default Canvas;
