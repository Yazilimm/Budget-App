import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import { Drawer, List , ListItemButton, Toolbar, ListItemIcon , ListItemText, colors} from "@mui/material";
const sidebarItems = [
  {
    text: "Dashboard",
    path: "/",
    icon: <DashboardCustomizeOutlinedIcon />,
  },
  {
    text: "TransactionList",
    path: "/transactionList",
    icon: <TrendingDownOutlinedIcon />,
  },
  {
    text: "Add",
    path: "/add",
    icon: <AddCardOutlinedIcon />,
  },
];
const Sidebar = () => {
    const location = useLocation()
    const sidebarWidth= 300
    const [activeIndex, setActiveIndex] = useState(0)
    useEffect(() => {
        const activeItem = sidebarItems.findIndex((item) => window.location.pathname.split('/')[1] === item.path.split('/')[1]) 
        setActiveIndex(activeItem)
    }, [location])
  return (
    <Drawer container={window.document.body} variant="permanent" sx={{width:sidebarWidth, height:'100vh',boxShadow:'0px 1px 4px 1px rgb(0 0 0 / 12%)', '& .MuiDrawer-paper':{boxSizing:'border-box', width: sidebarWidth , borderRight:0}}} open={true}>
        <Toolbar/>
        <List>
            {
                sidebarItems.map((item, index) =>(
                    <ListItemButton key={`sidebar-key-${index}`} selected={index === activeIndex} component={Link} to={item.path} sx={{width:'calc(100% - 20px)', margin:'5px auto',
                    borderRadius:'10px', '&.Mui-selected':{color:colors.green['300']},'&.Mui-selected:hover':{backgroundColor:colors.blue['200']} }} >
                        <ListItemIcon sx={{color: index === activeIndex && colors.green['A700']}}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} sx={{'& span':{fontWeight: index === activeIndex && '500'}}}/>
                    </ListItemButton>
                ))
            }
        </List>
    </Drawer>
  );
};

export default Sidebar;
