import React, { useEffect, useState } from "react";
import {
  FormControl,
  Button,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";
import { Box } from "@mui/system";
// , styled
import SendIcon from "@mui/icons-material/Send";
// import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import CancelIcon from "@mui/icons-material/Cancel";
// import ImageIcon from "@mui/icons-material/Image";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import EditIcon from "@mui/icons-material/Edit";
import "./subCategory.css";
import { getAllCategory } from "../../../function/category";
import {
  createSubCategory,
  updateSubCategory,
} from "../../../function/subCategory";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const SubCatModal = ({
  setOpen,
  open,
  edit,
  setEdit,
  dataForEdit,
  loadSubCategory,
  user,
}) => {
  const handleClose = () => setOpen(false);
  let error = {};
  const [name, setName] = useState("");
  const [parentCat, setParentCat] = useState("");
  const [loadParentCat, setLoadParentCat] = useState([]);
  const [status, setStatus] = useState("");
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getParentCatgory();
  }, []);

  useEffect(() => {
    if (edit) {
      setName(dataForEdit.name);
      setParentCat(dataForEdit.catSlug);
      setStatus(dataForEdit.status);
      setOpen(true);
    }
  }, [edit]);

  const getParentCatgory = () => {
    getAllCategory()
      .then((res) => setLoadParentCat(res.data.category))
      .catch((err) => console.log(err));
  };

  const style = {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "45%",
    bgcolor: "#fff",
    border: "2px solid #1976D2",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const c = {
    position: "absolute",
    top: "5px",
    right: "1%",
  };

  const clearForm = () => {
    setName("");
    setParentCat("");
    setStatus("");
    setFormError("");
    setEdit(false);
    setLoading(false);

    error.nameError = false;
    error.parentCatError = false;
    error.statusError = false;
  };

  const closeAndClearModal = () => {
    handleClose();
    clearForm();
  };

  /** create update and validate form  */
  const hadleForm = (e) => {
    e.preventDefault();
    if (name.length < 3) {
      error.nameError = true;
      error.name = "to short";
    }

    if (!name || name.length === 0) {
      error.nameError = true;
      error.name = "required";
    }
    if (!parentCat) {
      error.parentCatError = true;
    }
    if (!status) {
      error.statusError = true;
    }
    setFormError(error);

    if (
      !name ||
      name.length < 3 ||
      name.length === 0 ||
      !parentCat ||
      !status
    ) {
      return false;
    }
    setLoading(true);
    if (!edit) {
      createSubCategory(name, status, parentCat, user.accessToken)
        .then((res) => {
          setLoading(true);
          closeAndClearModal();
          toast.success(`${res.subCategory.name} is created`);
          loadSubCategory();
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.status === 400) {
            error.nameError = true;
            error.name = "Duplicate Category name";
            setFormError(error);
            setName("");
          }
          toast.error(`Oops! category cannot be created at this moment`);
        });
    } else {
      updateSubCategory(
        dataForEdit.slug,
        name,
        status,
        parentCat,
        user.accessToken
      )
        .then((res) => {
          closeAndClearModal();
          toast.success(`${res.data.subCategory.name} is created`);
          loadSubCategory();
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.status === 400) {
            error.nameError = true;
            error.name = "Duplicate Category name";
            setFormError(error);
            setName("");
          }

          toast.error(`Oops! category cannot be updated at this moment`);
        });
    }
  };

  /** end of  create update and validate form */
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      <Box sx={style} className='sub-cat-modal-box'>
        <IconButton
          onClick={closeAndClearModal}
          className='closeIcon'
          sx={c}
          color='error'
          component='span'>
          <CancelIcon sx={{ fontSize: 30 }} />
        </IconButton>
        <form noValidate onSubmit={hadleForm}>
          <div className='formRow'>
            <b className='textTitle'>Title *</b>
            <FormControl required sx={{ minWidth: 120 }}>
              <TextField
                name='cat'
                label='Sub Category Title '
                // id='custom-css-outlined-input'
                value={name}
                error={formError.nameError}
                onChange={(e) => setName(e.target.value)}
                helperText={formError.name || "Required"}
              />
            </FormControl>
          </div>
          <div className='formRow'>
            <b className='textTitle'>Parent Category *</b>
            <FormControl
              required
              sx={{ minWidth: 120 }}
              error={formError.parentCatError}>
              <InputLabel id='select-parent-category'>
                Select Parent Category
              </InputLabel>
              <Select
                labelId='select-parent-category'
                id='demo-select-parent-category'
                value={parentCat}
                label=' select-parent-category *'
                onChange={(e) => {
                  setParentCat(e.target.value);
                }}>
                <MenuItem value=''>
                  <em>--Select Any One--</em>
                </MenuItem>

                {loadParentCat.map((c) => (
                  <MenuItem key={c._id} value={c.slug}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{"Required"}</FormHelperText>
            </FormControl>
          </div>
          <div className='formRow'>
            <b className='textTitle'>status *</b>
            <FormControl
              required
              sx={{ minWidth: 120 }}
              error={formError.statusError}>
              <InputLabel id='status'>Status</InputLabel>
              <Select
                labelId='status'
                // id='demo-simple-select-required'
                value={status}
                label='
        Status *'
                onChange={(e) => {
                  setStatus(e.target.value);
                }}>
                <MenuItem value=''>
                  <em>--Select Any One--</em>
                </MenuItem>
                <MenuItem value={"active"}>Active</MenuItem>
                <MenuItem value={"inactive"}>Inactive</MenuItem>
              </Select>
              <FormHelperText>{"Required"}</FormHelperText>
            </FormControl>
          </div>

          <div className='formRow'>
            <LoadingButton
              type='submit'
              loading={loading}
              loadingPosition='end'
              onClick={() => hadleForm}
              endIcon={<SendIcon />}
              variant='contained'>
              {edit ? "update" : "save"}
            </LoadingButton>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default SubCatModal;
