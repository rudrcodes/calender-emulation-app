import { createSlice } from "@reduxjs/toolkit";
const userInit =
  localStorage.getItem("user") != null
    ? JSON.parse(localStorage.getItem("user"))
    : JSON.stringify({id:0,userEmail: "test@gmail.com", userPass: "test1234test", userMeetings: [] });

const dataInt =
  localStorage.getItem("data") != null
    ? JSON.parse(localStorage.getItem("data"))
    : [];
// : [{ id: 0, value: "Empty data" }];

console.log(dataInt);
const initialState = {
  users: { ...userInit, userMeetings: dataInt },
  // data: dataInt,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addData: (state, action) => {
      console.log("added");
      state.users.userMeetings.push(action.payload);
      //   localStorage.setItem("data", state.data);
      localStorage.setItem("data", JSON.stringify(state.data));
    },
    deleteData: (state, action) => {
      console.log("deleted");
      state.users.userMeetings = state.user.userMeetings.filter(
        (data) => data.id !== action.payload
      );
      //   localStorage.setItem("data", state.data)
      localStorage.setItem("data", JSON.stringify(state.data));
    },
    updateData: (state, action) => {
      console.log("updated");
      // console.log(action.payload.id);
      //   console.log(action.payload.userName);
      //   meetName: "",
      //   meetStartTime: "",
      //   meetEndTime: "",
      //   description: "",
      state.users.userMeetings.map((data) => {
        if (data.id === action.payload.id) {
          data.meetName = action.payload.meetName;
          data.meetStartTime = action.payload.meetStartTime;
          data.meetEndTime = action.payload.meetEndTime;
          data.description = action.payload.description;
          console.log(data.meetName);
          console.log(data.meetStartTime);
          console.log(data.meetEndTime);
          console.log(data.description);
        }
      });
      // localStorage.setItem("users", JSON.stringify(state.users));
      // console.log(state.users.filter((user) => user.id !== action.payload.id));
    },
  },
});

export default dataSlice.reducer;
export const { addData, deleteData, updateData } = dataSlice.actions;
