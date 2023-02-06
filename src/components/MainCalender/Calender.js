import Calendar from "react-calendar";
import { useEffect, useState } from "react";
// import "react-calendar/dist/Calendar.css";
// import "./officialCalenderCss.css";
import "../../officialCalenderCss.css";
import { useSelector, useDispatch } from "react-redux";
import { addData, deleteData, updateData } from "../../Features/data";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormDialogBox from "../../FormDialogBox";
import UpdateFormBox from "../../UpdateFormBox";
import { signOut } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";


export const Calender = (props) => {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(users);
    };
    getUsers();
  }, []);

  const newUserBack = {
    backgroundColor: "purple",
    padding: "10px",
    margin: "5px",
    borderRadius: "10px",
    maxWidth: "400px",
    color: "#000",
  };
  const dispatch = useDispatch();
  const data = useSelector((storeState) => storeState.data.users);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [value, onChange] = useState(new Date());
  const initialMeetState = {
    meetName: "",
    meetStartTime: "",
    meetEndTime: "",
    description: "",
  };
  // const [meetingData, setMeetingData] = useState(initialMeetState);
  console.log(data);
  const addDataMethod = () => {
    handleClickOpen();
  };
  // const clickedDay=()=>{
  //   console.log(value)
  // }
  // const scheduleMeet = () => {
  //   setOpen(false);
  //   if (meetingData.meetStartTime > meetingData.meetEndTime) {
  //     alert("not okay");
  //     return;
  //   }
  //   alert("okay");
  //   dispatch(
  //     addData({
  //       id: data[data.length - 1] ? data[data.length - 1].id + 1 : 0,
  //       date: value.toString(),
  //       meetName: meetingData.meetName,
  //       meetStartTime: meetingData.meetStartTime,
  //       meetEndTime: meetingData.meetEndTime,
  //       description: meetingData.description,
  //     })
  //   );
  // };

  const deleteMeet = (dataId) => {
    dispatch(deleteData(dataId));

    // localStorage.key(userId);
    // console.log(count);
  };
  const tileContent = () => {
    return "meet on this day";
  };

  const updateMeet = (dataId) => {
    handleClickOpen();
    // dispatch(updateData({
    //   id:dataId,
    //   // date: ,
    //   meetName: meetingData.meetName,
    //   meetStartTime: meetingData.meetStartTime,
    //   meetEndTime: meetingData.meetEndTime,
    //   description: meetingData.description,
    // }))
    console.log(data.meetName);
  };
  const navigate = useNavigate();
  const signOutUser = () => {
    signOut(auth)
      .then((user) => {
        localStorage.setItem(
          "user",
          JSON.stringify({ userEmail: "", userPass: "" })
        );

        console.log(`user signed out -${user}`);
        navigate("/");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  return (
    <div className="App">
      <div className="calender_signOut">

      <h3>User Email : {props.userInfofromLoginComp.userEmail}</h3>
      {/* <h3>UserPass : {props.userInfofromLoginComp.userPass}</h3> */}
      <button onClick={signOutUser} >sign Out</button>
      </div>

      <div className="calenderContainer">
        <Calendar
          onChange={onChange}
          value={value}
          // onClick={clickedDay}
          // tileContent={tileContent}
        />
      </div>
      <FormDialogBox value={value} usersCollectionRef={usersCollectionRef} />
      <UpdateFormBox value={value} />
      {console.log(value)}
      {/* <h1>DATE DATA : </h1>
      <button onClick={addDataMethod}>
        Add Meeting for : {value.toDateString()}{" "}
      </button>
      <button onClick={addDataMethod}>
        Add Meeting for : {value.toString().substring(0, 15)}{" "}
      </button> */}
      {/* {data.map((data) => (
        <div key={data.id} style={newUserBack}>
          <div>{data.date}</div>
          <div>{data.meetName}</div>
          <div>{data.meetStartTime}</div>
          <div>{data.meetEndTime}</div>
          <div>{data.description}</div>
          <button onClick={() => deleteMeet(data.id)}>Delete Meeting</button>
          <button onClick={() => updateMeet(data.id)}>Update Meeting</button>
        </div>
      ))} */}
      {/* TODO: Taking data from firestore database */}
      {/* {users.map((user) => {
        return (
          <div key={user.id}>
            <h3>Meet name : {user.meetName}</h3>
            <h3>meetStartTime : {user.meetStartTime}</h3>
            <h3>meetEndTime : {user.meetEndTime}</h3>
            <h3>Meet description : {user.description}</h3>
          </div>
        );
      })} */}
      {/* <Dialog open={open} onClose={handleClose}>
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
          <Button onClick={scheduleMeet}>Schedule Meeting</Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
};
