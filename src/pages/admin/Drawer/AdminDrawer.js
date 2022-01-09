import { Button } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import SettingsIcon from "@mui/icons-material/Settings";

function AdminDrawer() {
  let navigate = useNavigate();

  return (
    <nav>
      <ul className='drawerListContainer'>
        <Link to='/admin/dashboard'>
          <li className='drawerList'>
            <DashboardIcon sx={{ fontSize: 25 }} className='drawerIcon' />
            <b className='drawerText'>Dashboard</b>
          </li>
        </Link>

        <Link to='/admin/dashboard/category'>
          <li className='drawerList'>
            <CategoryIcon sx={{ fontSize: 25 }} className='drawerIcon' />
            <b className='drawerText'>Category</b>
          </li>
        </Link>
        <Link to='/admin/dashboard/SubCategory'>
          <li className='drawerList'>
            <AccountTreeIcon sx={{ fontSize: 25 }} className='drawerIcon' />

            <b className='drawerText'>SubCategory</b>
          </li>
        </Link>

        <li className='drawerList'>
          <Inventory2Icon sx={{ fontSize: 25 }} className='drawerIcon' />

          <b className='drawerText'>Product</b>
        </li>
        <li className='drawerList'>
          <MoneyOffIcon sx={{ fontSize: 25 }} className='drawerIcon' />

          <b className='drawerText'>Coupon</b>
        </li>
        <li className='drawerList'>
          <SettingsIcon sx={{ fontSize: 25 }} className='drawerIcon' />

          <b className='drawerText'>Setting</b>
        </li>
      </ul>
    </nav>
  );
}

export default AdminDrawer;
