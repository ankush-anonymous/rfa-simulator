import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import menuData from "../constants/navData"; // Adjust the import path as necessary

const drawerWidth = 240;

const iconComponents = {
  InboxIcon: <InboxIcon />,
  MailIcon: <MailIcon />,
};

export function SidebarComponent({ mobileOpen, handleDrawerToggle, onSelect }) {
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
              <ListItemButton
                key={subItem.title}
                sx={{ pl: 4 }}
                onClick={() => onSelect(subItem.title)}
              >
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
export default SidebarComponent;
