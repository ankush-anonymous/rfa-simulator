import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import menuData from "../constants/navData"; // Adjust the import path as necessary

const drawerWidth = 240;

const iconComponents = {
  InboxIcon: <InboxIcon />,
  MailIcon: <MailIcon />,
};

export function SidebarComponent({ mobileOpen, handleDrawerToggle }) {
  const [openItems, setOpenItems] = useState({});

  const handleClick = (index) => {
    setOpenItems((prevOpenItems) => ({
      ...prevOpenItems,
      [index]: !prevOpenItems[index],
    }));
  };

  const renderMenuItems = () => {
    return menuData.menu.map((menuItem, index) => (
      <React.Fragment key={menuItem.title}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleClick(index)}>
            <ListItemIcon>{iconComponents[menuItem.icon]}</ListItemIcon>
            <ListItemText primary={menuItem.title} />
            {openItems[index] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openItems[index]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {menuItem.subItems.map((subItem) => (
              <ListItemButton key={subItem.title} sx={{ pl: 4 }}>
                <ListItemIcon>{iconComponents[subItem.icon]}</ListItemIcon>
                <ListItemText primary={subItem.title} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </React.Fragment>
    ));
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>{renderMenuItems()}</List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
