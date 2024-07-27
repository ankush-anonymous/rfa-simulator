import React from "react";
import { AppBar, Toolbar, IconButton, Tooltip } from "@mui/material";
import PanToolIcon from "@mui/icons-material/PanTool";
import MouseIcon from "@mui/icons-material/Mouse";

const HelperNavComponent = ({ selectedTool, onToolChange }) => {
  return (
    <AppBar
      position="static"
      color="info"
      style={{
        backgroundColor: "#f0f0f0",
        boxShadow: "none",
        height: "50px",
      }}
    >
      <Toolbar
        style={{
          minHeight: "50px",
          display: "flex",
          gap: "16px",
        }}
      >
        <Tooltip title="Hand Tool">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="hand tool"
            onClick={() => onToolChange("hand")}
            style={{
              backgroundColor: selectedTool === "hand" ? "#ddd" : "inherit",
              marginRight: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <PanToolIcon style={{ color: "black" }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Cursor Tool">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="cursor tool"
            onClick={() => onToolChange("cursor")}
            style={{
              backgroundColor: selectedTool === "cursor" ? "#ddd" : "inherit",
              marginRight: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <MouseIcon style={{ color: "black" }} />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default HelperNavComponent;
