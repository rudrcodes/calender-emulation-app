import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import { addData, deleteData, updateData } from "./Features/data";
import { addDoc, deleteDoc, doc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import './formdialogbox.css'
export default function FormDialogBox(props) {
  const initialMeetState = {
    meetName: "",
    meetStartTime: "",
    meetEndTime: "",
    description: "",
  };

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(users);
    };
    getUsers();
  }, [users]);

  const [meetingData, setMeetingData] = useState(initialMeetState);
  const dispatch = useDispatch();
  const data = useSelector((storeState) => storeState.data.data);
  const addDataToFirebase = async (e) => {
    e.preventDefault();
    setOpen(false);
    // setMeetingData();
    if (meetingData.meetStartTime > meetingData.meetEndTime) {
      alert("Enter correct start and end time");
      return;
    }
    // alert("okay");
    await addDoc(props.usersCollectionRef, {
      // id: data[data.length - 1] ? data[data.length - 1].id + 1 : 0,
      date: props.value.toString(),
      meetName: meetingData.meetName,
      meetStartTime: meetingData.meetStartTime,
      meetEndTime: meetingData.meetEndTime,
      description: meetingData.description,
    });
  };

  const [open, setOpen] = React.useState(false);
  // const scheduleMeet = () => {
  //   setOpen(false);
  //   // setMeetingData();
  //   if (meetingData.meetStartTime > meetingData.meetEndTime) {
  //     alert("not okay");
  //     return;
  //   }
  //   alert("okay");
  //   dispatch(
  //     addData({
  //       id: data[data.length - 1] ? data[data.length - 1].id + 1 : 0,
  //       date: props.value.toString(),
  //       meetName: meetingData.meetName,
  //       meetStartTime: meetingData.meetStartTime,
  //       meetEndTime: meetingData.meetEndTime,
  //       description: meetingData.description,
  //     })
  //   );
  // };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const addDataMethod = () => {
    handleClickOpen();
  };
  const deleteMeet = async (dataId) => {
    const userDoc=doc(db,'users',dataId);
    await deleteDoc(userDoc)

    // dispatch(deleteData(dataId));
    // localStorage.key(userId);
    // console.log(count);
  };
  const updateMeet = async(dataId) => {
    // dispatch(deleteData(dataId));
    // localStorage.key(userId);
    // console.log(count);
  };
  return (
    <div className="main-cont">
      <h1>All the Meetings are mentioned here : </h1>
      <button onClick={addDataMethod} className="formdialogbox_addMeet">
        Add Meeting for : {props.value.toDateString()}{" "}
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Meeting Details</DialogTitle>
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
          <Button onClick={addDataToFirebase}>Schedule Meeting</Button>
          {/* <Button onClick={scheduleMeet}>Schedule Meeting</Button> */}
        </DialogActions>
      </Dialog>
      <div className="meetingContainer">

      {users.map((user) => {
        return (
          <div key={user.id} className="newUserBack">
            <p>Meet name : {user.meetName}</p>
            <p>meetStartTime : {user.meetStartTime}</p>
            <p>meetEndTime : {user.meetEndTime}</p>
            <p>Meet description : {user.description}</p>
            <button onClick={() => deleteMeet(user.id)}>Delete Meeting</button>
            <button onClick={() => updateMeet(user.id)}>Update Meeting</button>
          </div>
        );
      })}
      </div>

    </div>
  );
}
