import React, {  useState } from "react";
import AdminDrawer from "../Drawer/AdminDrawer";
import "../Dashboard/dashboard.css";
import {
    Button,
   

} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import "./subCategory.css";

import { useSelector } from "react-redux";


import SubCatModal from "./SubCatModal";


const SubCategory = () => {
    const user = useSelector(state => state.user)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);


    

    return (
        <div>
            <>
                <div className='container'>
                    <div className='drawerContainer'>
                        <AdminDrawer />
                    </div>
                    <div className='ContentContainer'>
                        <div className='categoryContainer'>
                            <div className='row'>
                                <h4 className='pageTitle'>SUB-CATEGORY</h4>
                                <Button
                                    variant='contained'
                                    onClick={ handleOpen }
                                    endIcon={ <AddIcon /> }>
                                    Create
                                </Button>
                            </div>
                            <div className='modalContainer'>
                                <SubCatModal open={open} setOpen={setOpen} />
                            </div>
                            <div className="tableConteiner">
                               
                            </div>
                        </div>

                    </div>
                </div>
            </>
        </div>
    );
};

export default SubCategory;
