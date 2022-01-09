import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";

function DrawerList(icon, title) {
  return (
    <li className='drawerList'>
      {icon}
      <b className='drawerText'>{title}</b>
    </li>
  );
}

export default DrawerList;
