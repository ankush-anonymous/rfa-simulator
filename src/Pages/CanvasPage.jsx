import React, { useState, useRef } from "react";
import { Typography } from "@mui/material";
import LayoutComponent from "../Components/LayoutComponent";

const Canvas = () => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  const handleMouseMove = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left.toFixed(0);
    const y = event.clientY - rect.top.toFixed(0);
    setCoordinates({ x, y });
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return (
    <LayoutComponent>
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
              left: `${coordinates.x + 15}px`, // Offset the tooltip slightly to avoid overlapping the cursor
              top: `${coordinates.y + 15}px`,
            }}
          >
            x: {coordinates.x}, y: {coordinates.y}
          </div>
        )}
      </div>
      <style jsx>{`
        .graph-paper {
          position: relative;
          width: 100%;
          height: 100vh; /* Adjust the height as needed */
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
          pointer-events: none; // This ensures the tooltip doesn't interfere with mouse events
          transform: translate(
            -50%,
            -100%
          ); // Positioning the tooltip above the cursor
        }
      `}</style>
    </LayoutComponent>
  );
};

export default Canvas;
