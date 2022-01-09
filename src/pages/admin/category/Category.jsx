import React, { useEffect, useState } from "react";
import AdminDrawer from "../Drawer/AdminDrawer";
import "../Dashboard/dashboard.css";
import {
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,

} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, styled } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import CancelIcon from "@mui/icons-material/Cancel";
import ImageIcon from '@mui/icons-material/Image';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import "./category.css";
import { createCategory, getAllCategory, removeCategory, updateCategory } from "../../../function/category";
import { useSelector } from "react-redux";

import { DataGrid } from '@mui/x-data-grid';
import { toast } from "react-toastify";


const Category = () => {
    const user = useSelector(state => state.user)
    const [name, setName] = useState('');

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [status, setStatus] = React.useState('');
    const [loading, setLoading] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [nameErrorText, setNameErrorText] = useState('')
    const [statusError, setStatusError] = useState(false)
    const [statusErrorText, setStatusErrorText] = useState('')
    const [categories, setCategory] = React.useState([]);
    const [edit, setEdit] = useState(false)
    const [slug, setSlug] = useState('');


    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    const loadCategory = () => {
        getAllCategory().then((res) => setCategory((res.data.category).map((cat, index) => {
            return { id: index + 1, ...cat };
        })));
    };
    useEffect(() => {
        loadCategory();
    }, [])

    const clearForm = () => {
        setLoading(false);
        setName('');
        setNameError(false);
        setNameErrorText('');
        setStatus('');
        setStatusError(false);
        setStatusErrorText('');
        setOpen(false)
        setEdit(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!name) {
            setNameError(true)
        setLoading(false);

        }
        if (name.length <= 3) {
            setNameError(true)
            setNameErrorText('To short Category Name')
        setLoading(false);

        }
        if (!status) {
        console.log(name);

            setStatusError('true')
            setStatusErrorText('required')
        setLoading(false);

        }

        if(!name ||name.length <= 3|| !status ){
            return;
        }

        setLoading(true);

        if(!edit){
            createCategory(name, status, user.accessToken).then((res) => {
                console.log(res.category.name);
                clearForm();
                toast.success(`${res.category.name} is created`);
                loadCategory();
    
            }).catch((err) => {
                setLoading(false);
    
                if (err.response.status === 400) {
                    console.log((err.response));
                    setNameError(true)
                    setNameErrorText('Duplicate Category name')
                }
                toast.error(`Oops! category cannot be created at this moment`)
    
            });
            //    try {
        } else {
             updateCategory(slug,name,status, user.accessToken).then((res) => {
               clearForm();
            handleClose()
            loadCategory();
            return toast.success(`Category Updated Successfully !`)
            
        }).catch((err) => {
            setLoading(false);
           return toast.error(`Oops! category cannot be updated at this moment`)
        });
        
      
     
        }
       

    }




    const style = {
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 700,
        bgcolor: "#fff",
        border: "2px solid #1976D2",
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
    };
    const imageIc = {
        fontSize: "30px",
        width: '100px',
        border: '1px solid  #1976D2',
        borderRadius: '5px',
        color: '#1976D2'
    }


    const Input = styled('input')({
        display: 'none',
    });

    // this is table section  /////


    const deleteCategry = (slug) => {

        removeCategory(slug, user.accessToken).then((res) => {
           loadCategory();
            return toast.success(`${res.data.msg}`)
        }).catch((err) => console.log('error', err));
    }

    const update = (row) => {
      
        setEdit(true)
        setName(row.name)
        setStatus(row.status)
        setSlug(row.slug)
        handleOpen();


    }
    const deleteIconStyle = {
        border: '1px solid red',
        fontSize: 25,
        borderRadius: '5px',


    }
    const editIconStyle = {
        border: '1px solid #1976D2',
        fontSize: 25,
        borderRadius: '5px'

    }
    const ActionIcon = ({ row, slug }) => {
        return (
            <div className="action" >
                <span className="deleteIcon"><DeleteForeverIcon onClick={ () => deleteCategry(slug) } sx={ deleteIconStyle } /></span>
                <span className="editIcon"><EditIcon onClick={ (() => update(row)) } sx={ editIconStyle } /></span>
            </div>
        );
    }
    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'name', headerName: 'Title', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 },
        { field: 'slug', headerName: 'Slug', width: 120 },

        {
            field: 'action',
            headerName: 'Action',
            renderCell: (params) => <ActionIcon row={ params.row } slug={ params.row.slug } />,
            width: 120,
        },

    ];

    const rows = categories;
    //   of table section 
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
                                <h4 className='pageTitle'>CATEGORY</h4>
                                <Button
                                    variant='contained'
                                    onClick={ handleOpen }
                                    endIcon={ <AddIcon /> }>
                                    Create
                                </Button>
                            </div>
                            <div className='modalContainer'>
                                <Modal
                                    open={ open }
                                    onClose={ handleClose }
                                    aria-labelledby='modal-modal-title'
                                    aria-describedby='modal-modal-description'>
                                    <Box sx={ style } className="modalbox">
                                        <IconButton
                                            onClick={ clearForm }
                                            class='closeModalIcon'
                                            color='error'
                                            component='span'>
                                            <CancelIcon sx={ { fontSize: 30 } } />
                                        </IconButton>
                                        <form noValidate onSubmit={ handleSubmit } >
                                            <div className='formRow'>
                                                <b className='textTitle'>Title *</b>
                                                <FormControl required sx={ { minWidth: 120 } }>
                                                    <TextField name="cat" error={ nameError }
                                                        label='Category Title '
                                                        id='custom-css-outlined-input' value={name} onChange={ e => setName(e.target.value) } helperText={ nameErrorText }
                                                    />

                                                </FormControl>
                                            </div>
                                            <div className='formRow'>

                                                <b className='textTitle' >status *</b>
                                                <FormControl required sx={ { minWidth: 120 } } error={ statusError }>
                                                    <InputLabel id="demo-simple-select-required-label">{ (!edit) ? 'Status' : status }</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-required-label"
                                                        id="demo-simple-select-required"
                                                        value={ status }
                                                        label="
                                                        Status *"
                                                        onChange={ handleChange }
                                                    >
                                                        <MenuItem value="">
                                                            <em>--Select Any One--</em>
                                                        </MenuItem>
                                                        <MenuItem value={ 'active' }   >Active</MenuItem>
                                                        <MenuItem value={ 'inactive' }>Inactive</MenuItem>

                                                    </Select>
                                                    <FormHelperText>{ statusErrorText }</FormHelperText>
                                                </FormControl>


                                            </div>
                                            <div className="formRow">
                                                <b className='textTitle' id="demo-simple-select-error-label">Image * </b>
                                                <label htmlFor="icon-button-file">
                                                    <Input accept="image/*" id="icon-button-file" type="file" />
                                                    <Button color="primary" aria-label="upload picture" component="span">
                                                        <ImageIcon sx={ imageIc } />
                                                    </Button>
                                                </label>
                                            </div>
                                            <div className="formRow">

                                                {/* <Button variant="contained" endIcon={ <SendIcon /> } loading={true}>
                                                    Send
                                                </Button> */}
                                                <LoadingButton type="submit"
                                                    loading={ loading }
                                                    loadingPosition="end"
                                                    endIcon={ <SendIcon /> }
                                                    variant="contained"
                                                >
                                                    { (!edit) ? "Save" : "Update" }
                                                </LoadingButton>
                                            </div>
                                        </form>
                                    </Box>
                                </Modal>
                            </div>
                            <div className="tableConteiner">
                                <div style={ { height: 500, width: '60%' } }>
                                    <DataGrid sx={ { fontSize: 15 } }
                                        rows={ rows }
                                        columns={ columns }
                                        pageSize={ 7 }
                                        rowsPerPageOptions={ [7] }

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

export default Category;
