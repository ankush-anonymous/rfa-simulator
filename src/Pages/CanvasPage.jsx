import React, { useState, useRef, useEffect } from "react";
import LayoutComponent from "../Components/LayoutComponent";
import DraggableBattery from "../Components/DraggableComponents/BatteryComponents";
import DraggableFan from "../Components/DraggableComponents/FanComponent";
import DraggableSwitch from "../Components/DraggableComponents/SwitchComponent";
import DraggableBulb from "../Components/DraggableComponents/BulbComponent";
import HelperNavComponent from "../Components/HelperNavComponent";
import { Typography } from "@mui/material";
import { initialProperties } from "../constants/componentProperties"; // Import initial properties
import Wire from "../Components/WireComponent"; // Import the Wire component

const initialJSON = {
  nodes: [],
  connections: [],
};

const Canvas = () => {
  const [components, setComponents] = useState([]);
  const [jsonStructure, setJsonStructure] = useState(initialJSON);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [selectedTool, setSelectedTool] = useState("hand");
  const [selectedComponents, setSelectedComponents] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log(jsonStructure);
    console.log(selectedComponents);
  }, [jsonStructure, selectedComponents]);

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

  const handleComponentSelect = (componentType) => {
    const id = `${componentType.toLowerCase()}${components.length + 1}`;
    const newComponent = {
      id,
      type: componentType,
      position: { x: 100, y: 100 },
      properties: initialProperties[componentType] || {}, // Initialize properties
    };
    setComponents([...components, newComponent]);

    // Update JSON structure
    const newNode = {
      id,
      type: componentType.toLowerCase(),
      position: { x: 100, y: 100 }, // Store the initial position
      properties: initialProperties[componentType],
    };
    setJsonStructure((prevJson) => ({
      ...prevJson,
      nodes: [...prevJson.nodes, newNode],
    }));
  };

  const handleDrop = (position, index) => {
    const updatedComponents = [...components];
    updatedComponents[index].position = position;
    setComponents(updatedComponents);

    // Update the JSON structure with new positions
    setJsonStructure((prevJson) => {
      const updatedNodes = prevJson.nodes.map((node) =>
        node.id === updatedComponents[index].id ? { ...node, position } : node
      );
      return { ...prevJson, nodes: updatedNodes };
    });
  };

  const handleComponentClick = (id) => {
    if (selectedTool === "cursor") {
      setSelectedComponents((prevSelected) => {
        const isSelected = prevSelected.includes(id);
        if (isSelected) {
          return prevSelected.filter((compId) => compId !== id);
        } else {
          return [...prevSelected, id];
        }
      });
    }
  };

  const handleConnect = () => {
    if (selectedComponents.length === 2) {
      const [fromId, toId] = selectedComponents;
      const fromComponent = components.find((comp) => comp.id === fromId);
      const toComponent = components.find((comp) => comp.id === toId);

      if (fromComponent && toComponent) {
        const connectionExists = jsonStructure.connections.some(
          (connection) =>
            (connection.from === fromId && connection.to === toId) ||
            (connection.from === toId && connection.to === fromId)
        );

        if (!connectionExists) {
          const connection = {
            from: fromId,
            to: toId,
          };

          setJsonStructure((prevJson) => ({
            ...prevJson,
            connections: [...prevJson.connections, connection],
          }));
        } else {
          alert("A connection already exists between these two components.");
        }
      }

      // Reset selected components after adding connection
      setSelectedComponents([]);
    } else {
      alert("Select exactly two nodes to connect.");
    }
  };

  return (
    <LayoutComponent onSelect={handleComponentSelect}>
      <HelperNavComponent
        selectedTool={selectedTool}
        onToolChange={setSelectedTool}
        onConnect={handleConnect}
      />

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
          const isSelected = selectedComponents.includes(comp.id);

          const Component = (() => {
            switch (comp.type) {
              case "Battery":
                return DraggableBattery;
              case "Fan":
                return DraggableFan;
              case "Switch":
                return DraggableSwitch;
              case "Bulb":
                return DraggableBulb;
              default:
                return null;
            }
          })();

          return Component ? (
            <Component
              key={index}
              initialPosition={comp.position}
              onDrop={(position) => handleDrop(position, index)}
              disabled={selectedTool === "cursor"}
              onClick={() => handleComponentClick(comp.id)}
              style={{
                border: isSelected ? "2px solid blue" : "none",
              }}
            />
          ) : null;
        })}

        {jsonStructure.connections.map((connection, index) => {
          const fromComponent = components.find(
            (comp) => comp.id === connection.from
          );
          const toComponent = components.find(
            (comp) => comp.id === connection.to
          );

          if (fromComponent && toComponent) {
            return (
              <Wire
                key={index}
                x1={fromComponent.position.x}
                y1={fromComponent.position.y}
                x2={toComponent.position.x}
                y2={toComponent.position.y}
              />
            );
          }

          return null;
        })}
      </div>
      <pre>{JSON.stringify(jsonStructure, null, 2)}</pre>
    </LayoutComponent>
  );
};

export default Canvas;
