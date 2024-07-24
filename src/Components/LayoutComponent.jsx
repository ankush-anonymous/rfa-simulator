import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import NavBarComponent from "./NavBarComponent"; // Default import
import SidebarComponent from "./SidebarComponent"; // Default import

const drawerWidth = 240;

export function LayoutComponent({ children, onSelect }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavBarComponent handleDrawerToggle={handleDrawerToggle} />
      <SidebarComponent
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        onSelect={onSelect}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default LayoutComponent;
