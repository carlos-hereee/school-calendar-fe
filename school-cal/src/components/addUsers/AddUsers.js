/* eslint-disable */

import React, { useContext, useState } from "react"
import moment from "moment"
import { Formik, Field } from "formik"
import * as Yup from "yup"
import { AuthContext } from "../../contexts/auth/authState"

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core"
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers"
import MomentUtils from "@date-io/moment"
import Axios from "axios"

const AddUsers = ({ calendar, open, handleClose }) => {
  const { currentUser } = useContext(AuthContext)
  return (
    <>
      <Formik
        initialValues={{
          AdminId: "",
          UserId: ""
        }}
        onSubmit={async (values, actions) => {
            console.log(values)
          if (values.AdminId !== "") {
            try {
                console.log("trying to post admin")
                await Axios
                .post("https://school-calendar-mataka.herokuapp.com/api/calendars/:id/admins", values.AdminId)
                .then(actions.resetForm(),
                handleClose())
            } catch (error) {
                console.log("Unable to add Admin.")
            }
            } else {
                try {
                    console.log("trying to post user")
                    await Axios
                    .post("https://school-calendar-mataka.herokuapp.com/api/calendars/:id/subscribers", values.UserId)
                    .then(actions.resetForm(),
                    handleClose())
                } catch (error) {
                    console.log("Unable to add user.")
                } 
            }
        }

            }
        
        render={formikProps => (
          <AddUsersForm
            open={open}
            {...formikProps}
            handleClose={handleClose}
          />
        )}
      />
    </>
  )
}

const AddUsersForm = ({
  values,
  handleChange,
  handleSubmit,
  handleBlur,
  handleClose,
  open,
}) => {
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle style={{background:"#21242C", color:"white"}}>Add Users</DialogTitle>
          <DialogContent>
            <Grid>
              <Grid item xs={12}>
                <TextField style={{background:"#F2D2BF", borderRadius:"5px"}}
                  fullWidth
                  id="AdminId"
                  label="Admin ID"
                  margin="normal"
                  name="AdminId"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.adminid}
                />
              </Grid>
              <Grid item xs={12}>
                  <TextField style={{background:"#F2D2BF", borderRadius:"5px"}}
                  fullWidth
                  id="UserId"
                  label="User ID"
                  margin="normal"
                  name="UserId"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.userid}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} type="button">
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}


export default AddUsers
