import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

const AlertBox = ({
  type,
  openAlert,
  setOpenAlert,
  setConfirmDelete,
  titleForDeleteItem,
}) => {
  const closeAlertBox = () => {
    setOpenAlert(false);
    return setConfirmDelete(false);
  };
  const deleteItem = () => {
    setOpenAlert(false);
    return setConfirmDelete(true);
  };

  const alertStyle = {
    textTitle: {
      fontSize: 18,
      color: "black",
      display: "flex",
      alignItem: "center",
      justifyContent: "center",
      margin: "0 100px",
    },
    text: {
      fontSize: 12,
      color: "black",
      display: "flex",
      alignItem: "center",
      justifyContent: "center",
      marginTop: "10px",
    },
    buttonrRow: {
      display: "flex",
      alignItem: "center",
      justifyContent: "space-around",
    },
  };

  return (
    <Dialog
      sx={{ top: "-20%" }}
      open={openAlert}
      onClose={closeAlertBox}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'>
      <DialogContent>
        <DialogContentText
          sx={alertStyle.textTitle}
          id='alert-dialog-description'>
          Delete {type} ?
        </DialogContentText>
        <DialogContentText sx={alertStyle.text} id='alert-dialog-description'>
          {titleForDeleteItem}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={alertStyle.buttonrRow}>
        <Button
          variant='contained'
          sx={{ fontSize: 12 }}
          color='error'
          onClick={closeAlertBox}>
          CANCEL
        </Button>
        <Button
          variant='contained'
          sx={{ fontSize: 12 }}
          onClick={deleteItem}
          autoFocus>
          DELETE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertBox;
