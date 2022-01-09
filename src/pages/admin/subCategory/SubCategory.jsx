import React, { useEffect, useState } from "react";
import AdminDrawer from "../Drawer/AdminDrawer";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Badge from '@mui/material/Badge';
import { DataGrid } from '@mui/x-data-grid';
import "../Dashboard/dashboard.css";
import {
    Button


} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import "./subCategory.css";
import SubCatModal from "./SubCatModal";
import { getAllSubCategory, removeSubCategory } from "../../../function/subCategory";
import AlertBox from "../compoent/AlertBox";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const SubCategory = () => {
    const user = useSelector((state) => state.user);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    // for open alert
    const [openAlert, setOpenAlert] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false)

    //   for delete 
    const [slugForDeleteItem, setSlugForDeleteItem] = useState('')
    const [titleForDeleteItem, setTitleForDeleteItem] = useState('')

    // for edit 
    const [edit, setEdit] = useState(false)
    const [dataForEdit, setDtaForEdit] = useState('')

    const [subCategory, setSubCategory] = useState([])
    const [loading, setLoading] = useState(true)

    const loadSubCategory = async () => {
        getAllSubCategory().then((res) => setSubCategory((res.data.subCategory).map((cat, index) => {
            setLoading(false);
            let category;
            let catSlug;
          if(cat.category !== null){
             category= (cat.category.name);
             catSlug = (cat.category.slug);
          } else {
              category = "no category";
              catSlug = "no slug";
          }
             return { ...cat, id: index + 1, category, catSlug };
        })));

    }


    useEffect(() => {
        loadSubCategory();
    }, [])


    const iconStyle = {
        deleteIconStyle: {
            border: '1px solid red',
            fontSize: 25,
            borderRadius: '5px',
        },
        editIconStyle: {
            border: '1px solid #1976D2',
            fontSize: 25,
            borderRadius: '5px'

        }
    }


    const deleteCategry = async (row) => {
        setTitleForDeleteItem(row.name);
        setOpenAlert(true);
        setSlugForDeleteItem(row.slug);
    }

    useEffect(() => {
        if (confirmDelete) {
            setConfirmDelete(false);
            removeSubCategory(slugForDeleteItem, user.accessToken).then((res) => {
                loadSubCategory();
                return toast.success(`${res.data.msg}`)
            }).catch((err) => toast.error(`subCategory cannot be delete at this moment !`)
            );
        }
    }, [confirmDelete])

    const update = (row) => {
        setEdit(true);
        setDtaForEdit(row);
    }
    const ActionIcon = ({ row }) => {
        return (
            <div className="action" >
                <span className="deleteIcon"><DeleteForeverIcon onClick={ () => deleteCategry(row) } sx={ iconStyle.deleteIconStyle } /></span>
                <span className="editIcon"><EditIcon onClick={ (() => update(row)) } sx={ iconStyle.editIconStyle } /></span>
            </div>
        );
    }

    const StatusIocn = ({ status }) => {
        return (
            <span className={(status === 'active') ? 'activeBadge':'inactiveBadge'}>
                {status}
            </span>
           
        );
    }


    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'name', headerName: 'Title', width: 150 },
        { field: 'category', headerName: 'Category', width: 150 },
        {
            field: 'status',
            headerName: 'Status',
            renderCell: (params) => <StatusIocn  status={ params.row.status } />,
            width: 150,
        },
        {
            field: 'action',
            headerName: 'Action',
            renderCell: (params) => <ActionIcon row={ params.row } />,
            width: 120,
        },

    ];

    const rows = subCategory;

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
                                <SubCatModal open={ open } setOpen={ setOpen } user={ user } edit={ edit } dataForEdit={ dataForEdit } setEdit={ setEdit } loadSubCategory={ loadSubCategory } />
                            </div>

                            <div className="alertCotainer">
                                <AlertBox type={ "SubCategory" } openAlert={ openAlert } setOpenAlert={ setOpenAlert }titleForDeleteItem ={titleForDeleteItem}  setConfirmDelete={ setConfirmDelete } />
                            </div>

                            <div className="tableConteiner">
                                <div className="tableConteinera" style={ { height: 500, width: '60%' } }>
                                    <DataGrid sx={ { fontSize: 15,boxShadow: 3 } }
                                        rows={ rows }
                                        columns={ columns }
                                        pageSize={ 7 }
                                        
                                        rowsPerPageOptions={ [7] }
                                        loading={ loading }
                                        size="large"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        </div>
    );
};

export default SubCategory;
