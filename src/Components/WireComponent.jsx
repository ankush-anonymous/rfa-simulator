import React from "react";

const Wire = ({ x1, y1, x2, y2 }) => {
  // Calculate the dimensions of the wire based on the coordinates
  const width = Math.abs(x2 - x1);
  const height = Math.abs(y2 - y1);
  const left = Math.min(x1, x2);
  const top = Math.min(y1, y2);

  // Determine if the wire is vertical, horizontal, or needs an L-shape
  const isVertical = x1 === x2;
  const isHorizontal = y1 === y2;

  // Base style for the wire
  const wireStyle = {
    position: "absolute",
    backgroundColor: "black",
  };

  if (isVertical) {
    return (
      <div
        style={{
          ...wireStyle,
          left: `${left}px`,
          top: `${top}px`,
          width: "2px",
          height: `${height}px`,
        }}
      />
    );
  } else if (isHorizontal) {
    return (
      <div
        style={{
          ...wireStyle,
          left: `${left}px`,
          top: `${top}px`,
          width: `${width}px`,
          height: "2px",
        }}
      />
    );
  } else {
    const midX = x1;
    const midY = y2;

    return (
      <>
        <div
          style={{
            ...wireStyle,
            left: `${Math.min(x1, x2)}px`,
            top: `${midY}px`,
            width: `${Math.abs(midX - x2)}px`,
            height: "2px",
          }}
        />
        <div
          style={{
            ...wireStyle,
            left: `${midX}px`,
            top: `${Math.min(y1, y2)}px`,
            width: "2px",
            height: `${Math.abs(y1 - y2)}px`,
          }}
        />
      </>
    );
  }
};

export default Wire;
