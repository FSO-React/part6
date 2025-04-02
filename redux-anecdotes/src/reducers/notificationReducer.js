import { createSlice } from "@reduxjs/toolkit";

const initialState = "..."

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotificationMessage(state, action) {
      return action.payload
    },
    cleanNotification() {
      return initialState
    }
  }
})

export const { setNotificationMessage, cleanNotification } = notificationSlice.actions

export const setNotification = (message, duration) => {
  return async dispatch => {
    dispatch(setNotificationMessage(message))
    setTimeout(() => {
      dispatch(cleanNotification())
    }, duration * 1000)
  }
}

export default notificationSlice.reducer