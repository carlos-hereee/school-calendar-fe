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
import axios from "axios"

const AddSubscribers = ({ calendar, open, handleClose }) => {
  const { currentUser } = useContext(AuthContext)
  return (
    <>
      <Formik
        initialValues={{
          phone: ""
        }}
        onSubmit={async (values, actions) => {
            console.log(values)
            axios.post(`https://school-calendar-mataka.herokuapp.com/api/twilio`,{phone:values.phone})
            .then(res =>{
                console.log(res);
            })
            .then(()=> handleClose())
        }

            }
        
        render={formikProps => (
          <AddSubscribersForm
            open={open}
            {...formikProps}
            handleClose={handleClose}
          />
        )}
      />
    </>
  )
}

const AddSubscribersForm = ({
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
          <DialogTitle style={{background:"#21242C", color:"white"}}>Add Subscribers</DialogTitle>
          <DialogContent>
            <Grid>
              <Grid item xs={12}>
                <TextField style={{background:"#F2D2BF", borderRadius:"5px"}}
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  margin="normal"
                  name="phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
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


export default AddSubscribers