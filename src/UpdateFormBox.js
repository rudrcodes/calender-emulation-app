import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import { addData, deleteData, updateData } from "./Features/data";
export default function UpdateFormBox(props) {
  const initialMeetState = {
    meetName: "",
    meetStartTime: "",
    meetEndTime: "",
    description: "",
  };
  const [meetingData, setMeetingData] = useState(initialMeetState);
  const dispatch = useDispatch();
  const data = useSelector((storeState) => storeState.data.data);

  const [open, setOpen] = React.useState(false);
  const scheduleMeet = () => {
    setOpen(false);
    // setMeetingData();
    if (meetingData.meetStartTime > meetingData.meetEndTime) {
      alert("not okay");
      return;
    }
    alert("okay");
    dispatch(
      addData({
        id: data[data.length - 1] ? data[data.length - 1].id + 1 : 0,
        date: props.value.toString(),
        meetName: meetingData.meetName,
        meetStartTime: meetingData.meetStartTime,
        meetEndTime: meetingData.meetEndTime,
        description: meetingData.description,
      })
    );
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const addDataMethod = () => {
    handleClickOpen();
  };
  const updateMeet = (dataId) => {
    handleClickOpen();

    dispatch(
      updateData({
        id: dataId,
        // date: ,
        meetName: meetingData.meetName,
        meetStartTime: meetingData.meetStartTime,
        meetEndTime: meetingData.meetEndTime,
        description: meetingData.description,
      })
    );
    console.log(data.meetName);
  };
  return (
    <div>
      {/* <h1>DATE DATA : </h1>
      <button onClick={addDataMethod}>
        Add Meeting for : {props.value.toDateString()}{" "}
      </button> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Meeting Details</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter Meet Details</DialogContentText>
          <label>Meet name</label>
          <TextField
            autoFocus
            margin="dense"
            id="meetName"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setMeetingData((prev) => ({ ...prev, meetName: e.target.value }))
            }
          />
          <label>Start Time</label>

          <TextField
            autoFocus
            margin="dense"
            id="meetStartTime"
            type="time"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setMeetingData((prev) => ({
                ...prev,
                meetStartTime: e.target.value,
              }))
            }
          />
          <label>End name</label>

          <TextField
            autoFocus
            margin="dense"
            id="meetEndTime"
            type="time"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setMeetingData((prev) => ({
                ...prev,
                meetEndTime: e.target.value,
              }))
            }
          />
          <label>Meet Description</label>

          <TextField
            autoFocus
            margin="dense"
            id="description"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setMeetingData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateMeet}>Update Meeting</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
