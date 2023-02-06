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
import { collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import "./formdialogbox.css";
export default function FormDialogBox(props) {
  const initialMeetState = {
    meetDate: "",
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
  const [updatedmeetingData, setUpdatedmeetingData] =
    useState(initialMeetState);
  const dispatch = useDispatch();
  const data = useSelector((storeState) => storeState.data.data);
  const addDataToFirebase = async (e) => {
    e.preventDefault();
    setOpen(false);
    // setMeetingData();
    // if (meetingData.meetStartTime > meetingData.meetEndTime) {
    //   alert("Enter correct start and end time");
    //   return;
    // }
    // alert("okay");
    if (
      // !meetingData.meetDate ||
      !meetingData.meetName ||
      !meetingData.meetStartTime ||
      !meetingData.meetEndTime ||
      !meetingData.description
    ) {
      alert("Some Fields are empty can't add meeting");
      return;
    }
    await addDoc(props.usersCollectionRef, {
      // id: data[data.length - 1] ? data[data.length - 1].id + 1 : 0,
      date: props.value.toString(),
      meetDate: props.value.toString(),
      meetName: meetingData.meetName,
      meetStartTime: meetingData.meetStartTime,
      meetEndTime: meetingData.meetEndTime,
      description: meetingData.description,
    });
    setMeetingData({
      meetDate: "",
      meetName: "",
      meetStartTime: "",
      meetEndTime: "",
      description: "",
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
    const userDoc = doc(db, "users", dataId);
    await deleteDoc(userDoc);
  };
  const updateMeetDate = async (e, dataId) => {
    e.preventDefault();
    if (!updatedmeetingData.meetDate) return;
    const userDoc = doc(db, "users", dataId);
    const newField = { meetDate: updatedmeetingData.meetDate };
    await updateDoc(userDoc, newField);
  };
  const updateMeetName = async (e, dataId) => {
    e.preventDefault();
    if (!updatedmeetingData.meetName) return;
    const userDoc = doc(db, "users", dataId);
    const newField = { meetName: updatedmeetingData.meetName };
    await updateDoc(userDoc, newField);
  };
  const updateMeetStartTime = async (e, dataId) => {
    e.preventDefault();
    if (!updatedmeetingData.meetStartTime) return;
    const userDoc = doc(db, "users", dataId);
    const newField = { meetStartTime: updatedmeetingData.meetStartTime };
    await updateDoc(userDoc, newField);
  };
  const updateMeetEndTime = async (e, dataId) => {
    e.preventDefault();
    if (!updatedmeetingData.meetEndTime) return;
    const userDoc = doc(db, "users", dataId);
    const newField = { meetEndTime: updatedmeetingData.meetEndTime };
    await updateDoc(userDoc, newField);
  };
  const updateMeetDescription = async (e, dataId) => {
    e.preventDefault();
    if (!updatedmeetingData.description) return;
    const userDoc = doc(db, "users", dataId);
    const newField = { description: updatedmeetingData.description };
    await updateDoc(userDoc, newField);
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
          <label>Meeting Title</label>
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
          <label>Meeting Description</label>
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
              <p>Meeting Date : {user.meetDate}</p>
              <p>Meeting Title : {user.meetName}</p>
              <p>meetStartTime : {user.meetStartTime}</p>
              <p>meetEndTime : {user.meetEndTime}</p>
              <p>Meet description : {user.description}</p>
              <button onClick={() => deleteMeet(user.id)}>
                Delete Meeting
              </button>
              <h3 className="updateHead">
                {"->"} Enter Details here to update the meeting {"<-"}{" "}
              </h3>
              <form>
                <div>
                  <input
                    className="form_input"
                    // placeholder="Enter new Meeting name"
                    type="date"
                    onChange={(e) =>
                      setUpdatedmeetingData((prev) => ({
                        ...prev,
                        meetDate: e.target.value,
                      }))
                    }
                  />
                  <button onClick={(e) => updateMeetDate(e, user.id)}>
                    Update Meeting Date
                  </button>
                </div>
                <div>
                  <input
                    className="form_input"
                    placeholder="Enter new Meeting name"
                    type="text"
                    onChange={(e) =>
                      setUpdatedmeetingData((prev) => ({
                        ...prev,
                        meetName: e.target.value,
                      }))
                    }
                  />
                  <button onClick={(e) => updateMeetName(e, user.id)}>
                    Update Meeting name
                  </button>
                </div>
                <div>
                  <input
                    className="form_input"
                    placeholder="Enter new Meeting Start Time"
                    type="time"
                    onChange={(e) =>
                      setUpdatedmeetingData((prev) => ({
                        ...prev,
                        meetStartTime: e.target.value,
                      }))
                    }
                  />
                  <button onClick={(e) => updateMeetStartTime(e, user.id)}>
                    Update Meeting Start Time
                  </button>
                </div>
                <div>
                  <input
                    className="form_input"
                    placeholder="Enter new Meeting End Time"
                    type="time"
                    onChange={(e) =>
                      setUpdatedmeetingData((prev) => ({
                        ...prev,
                        meetEndTime: e.target.value,
                      }))
                    }
                  />
                  <button onClick={(e) => updateMeetEndTime(e, user.id)}>
                    Update Meeting End Time
                  </button>
                </div>
                <div>
                  <input
                    className="form_input"
                    placeholder="Enter new Meeting Description"
                    type="text"
                    onChange={(e) =>
                      setUpdatedmeetingData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                  <button onClick={(e) => updateMeetDescription(e, user.id)}>
                    Update Meeting Description
                  </button>
                </div>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
