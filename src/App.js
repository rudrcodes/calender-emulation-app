// import "./App.css";
// import Calendar from "react-calendar";
// import { useState } from "react";
// // import "react-calendar/dist/Calendar.css";
// import "./officialCalenderCss.css";
// import { useSelector, useDispatch } from "react-redux";
// import { addData, deleteData, updateData } from "./Features/data";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import FormDialogBox from "./FormDialogBox";
// import UpdateFormBox from "./UpdateFormBox";
// function App() {
//   const newUserBack = {
//     backgroundColor: "purple",
//     padding: "10px",
//     margin: "5px",
//     borderRadius: "10px",
//     maxWidth: "400px",
//     color: "#000",
//   };
//   const calenderContainer = {
//     height: "100vh",
//     width: "100vw",
//     backgroundColor: "purple",
//     padding: "10px",
//     margin: "5px",
//     borderRadius: "10px",
//     // maxWidth: "400px",
//     color: "#000",
//   };

//   const dispatch = useDispatch();
//   const data = useSelector((storeState) => storeState.data.data);
//   const [open, setOpen] = useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
//   const [value, onChange] = useState(new Date());
//   const initialMeetState = {
//     meetName: "",
//     meetStartTime: "",
//     meetEndTime: "",
//     description: "",
//   };
//   // const [meetingData, setMeetingData] = useState(initialMeetState);
//   console.log(data);
//   const addDataMethod = () => {
//     handleClickOpen();
//   };
//   // const clickedDay=()=>{
//   //   console.log(value)
//   // }
//   // const scheduleMeet = () => {
//   //   setOpen(false);
//   //   if (meetingData.meetStartTime > meetingData.meetEndTime) {
//   //     alert("not okay");
//   //     return;
//   //   }
//   //   alert("okay");
//   //   dispatch(
//   //     addData({
//   //       id: data[data.length - 1] ? data[data.length - 1].id + 1 : 0,
//   //       date: value.toString(),
//   //       meetName: meetingData.meetName,
//   //       meetStartTime: meetingData.meetStartTime,
//   //       meetEndTime: meetingData.meetEndTime,
//   //       description: meetingData.description,
//   //     })
//   //   );
//   // };

//   const deleteMeet = (dataId) => {
//     dispatch(deleteData(dataId));

//     // localStorage.key(userId);
//     // console.log(count);
//   };
//   const tileContent = () => {
//     return "meet on this day";
//   };

//   const updateMeet = (dataId) => {
//     handleClickOpen();
//     // dispatch(updateData({
//     //   id:dataId,
//     //   // date: ,
//     //   meetName: meetingData.meetName,
//     //   meetStartTime: meetingData.meetStartTime,
//     //   meetEndTime: meetingData.meetEndTime,
//     //   description: meetingData.description,
//     // }))
//     console.log(data.meetName);
//   };
//   return (
//     <div className="App">
//       <div>
//         <Calendar
//           style={calenderContainer}
//           onChange={onChange}
//           value={value}
//           // onClick={clickedDay}
//           tileContent={tileContent}
//         />
//       </div>
//       <FormDialogBox value={value} />
//       <UpdateFormBox value={value}/>
//       {console.log(value)}
//       {/* <h1>DATE DATA : </h1>
//       <button onClick={addDataMethod}>
//         Add Meeting for : {value.toDateString()}{" "}
//       </button>
//       <button onClick={addDataMethod}>
//         Add Meeting for : {value.toString().substring(0, 15)}{" "}
//       </button> */}
//       {data.map((data) => (
//         <div key={data.id} style={newUserBack}>
//           <div>{data.date}</div>
//           <div>{data.meetName}</div>
//           <div>{data.meetStartTime}</div>
//           <div>{data.meetEndTime}</div>
//           <div>{data.description}</div>
//           <button onClick={() => deleteMeet(data.id)}>Delete Meeting</button>
//           <button onClick={() => updateMeet(data.id)}>Update Meeting</button>
//         </div>
//       ))}
//       {/* <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Meeting Details</DialogTitle>
//         <DialogContent>
//           <DialogContentText>Enter Meet Details</DialogContentText>
//           <label>Meet name</label>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="meetName"
//             type="text"
//             fullWidth
//             variant="standard"
//             onChange={(e) =>
//               setMeetingData((prev) => ({ ...prev, meetName: e.target.value }))
//             }
//           />
//           <label>Start Time</label>

//           <TextField
//             autoFocus
//             margin="dense"
//             id="meetStartTime"
//             type="time"
//             fullWidth
//             variant="standard"
//             onChange={(e) =>
//               setMeetingData((prev) => ({
//                 ...prev,
//                 meetStartTime: e.target.value,
//               }))
//             }
//           />
//           <label>End name</label>

//           <TextField
//             autoFocus
//             margin="dense"
//             id="meetEndTime"
//             type="time"
//             fullWidth
//             variant="standard"
//             onChange={(e) =>
//               setMeetingData((prev) => ({
//                 ...prev,
//                 meetEndTime: e.target.value,
//               }))
//             }
//           />
//           <label>Meet Description</label>

//           <TextField
//             autoFocus
//             margin="dense"
//             id="description"
//             type="text"
//             fullWidth
//             variant="standard"
//             onChange={(e) =>
//               setMeetingData((prev) => ({
//                 ...prev,
//                 description: e.target.value,
//               }))
//             }
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={scheduleMeet}>Schedule Meeting</Button>
//         </DialogActions>
//       </Dialog> */}
//     </div>
//   );
// }

// export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Signup } from "./components/Signup/Signup";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { ProtectedRoute } from "./Pages/ProtectedRoute";
import { Calender } from "./components/MainCalender/Calender";
function App() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.email);
        setUserName(user.displayName);
        setUserEmail(user.email);
      } else setUserName("");
    });
  }, []);
  const [userInfofromLoginComp, setUserInfofromLoginComp] = useState({});
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home name={userName} />} />
          <Route path="/login" element={<Login  setUserInfofromLoginComp={setUserInfofromLoginComp}/>} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/calender"
            element={
              <ProtectedRoute user={userEmail}>
                <Calender user={userEmail} myVar="rudra" userInfofromLoginComp={userInfofromLoginComp}/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
