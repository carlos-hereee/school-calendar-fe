/* eslint-disable */

import React, { useContext } from "react"
import moment from "moment"
import { Formik, Field } from "formik"
import * as Yup from "yup"
import { AuthContext } from "../../contexts/auth/authState"
import { CalendarContext } from "../../contexts/calendar/calendarState"

import {
  Button,
  CircularProgress,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core"
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker,
} from "@material-ui/pickers"
import MomentUtils from "@date-io/moment"
import { makeStyles } from "@material-ui/core/styles"
import { RRule, RRuleSet, rrulestr } from 'rrule';

const EditEvent = ({ open, handleClose }) => {
  const {
    isLoading,
    userCalendarEvent,
    setUserCalendarEvent,
    editUserCalendarEvent,
    deleteUserCalendarEvent,
  } = useContext(CalendarContext)

  const handleDeleteEvent = eventUuid => {
    deleteUserCalendarEvent(eventUuid)
    handleClose()
  }
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={userCalendarEvent}
        onSubmit={async (values, actions) => {
          values.startDate = moment(values.startDate).format("YYYY-MM-DD")
          values.endDate = moment(values.endDate).format("YYYY-MM-DD")

          values.startTime = values.isAllDayEvent
            ? null
            : moment(values.startDate)
                .hours(moment(values.startTime).hour())
                .minutes(moment(values.startTime).minute())
                .seconds(moment(values.startTime).second())
                .toISOString(true)
          values.endTime = values.isAllDayEvent
            ? null
            : moment(values.endDate)
                .hours(moment(values.endTime).hour())
                .minutes(moment(values.endTime).minute())
                .seconds(moment(values.endTime).second())
                .toISOString(true)

          editUserCalendarEvent(values.uuid, values)
          actions.resetForm()
          handleClose()
        }}
        render={formikProps => (
          <EditEventForm
            isLoading={isLoading}
            open={open}
            {...formikProps}
            handleClose={handleClose}
            handleDeleteEvent={handleDeleteEvent}
          />
        )}
        handleChange={() => {
          console.log("Change")
        }}
      />
    </>
  )
}

const useStyles = makeStyles(theme => ({
  createButton: {
    backgroundColor: "#F5945B",
    padding: theme.spacing(1, 3),
    borderRadius: "5px",
    border: "2px solid #F5945B",
    marginRight: theme.spacing(1),
  },
  buttonLabel: {
    textTransform: "none",
  },
  cancelButton: {
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(1, 3),
    border: "2px solid #F5945B",
    boxSizing: "border-box",
    borderRadius: "5px",
    color: "#F5945B",
  },
  deleteButton: {
    border: "2px solid black",
    borderRadius: "5px",
  },
  noteTextField: {
    background: "#F2D2BF",
    borderRadius: "5px",
  },

  dateTextField: {
    background: "#F2D2BF",
    borderRadius: "5px",
  },
  allDayCheckBoxContainer: {
    textAlign: "left",
  },
  dialogActions: {
    justifyContent: "space-between",
  },
}))

const EditEventForm = ({
  values,
  open,
  isLoading,
  handleChange,
  handleSubmit,
  handleBlur,
  handleClose,
  handleDeleteEvent,
}) => {
  const isAllDayEvent = values.isAllDayEvent

  const classes = useStyles()
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle style={{ background: "#21242C", color: "white" }}>
            Edit an Event
          </DialogTitle>
          <DialogContent>
            <Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ background: "#F2D2BF", borderRadius: "5px" }}
                  fullWidth
                  id="event-title"
                  label="Event Title"
                  margin="normal"
                  name="eventTitle"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.eventTitle}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ background: "#F2D2BF", borderRadius: "5px" }}
                  fullWidth
                  id="event-location"
                  label="Location"
                  margin="normal"
                  name="eventLocation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.eventLocation}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <>
                      <Grid item xs={3}>
                        <FormControl className={classes.dateTextField}>
                          <Field name="startDate" component={DatePickerField} />
                        </FormControl>
                      </Grid>
                      {!isAllDayEvent && (
                        <Grid item xs={2}>
                          <FormControl className={classes.dateTextField}>
                            <Field
                              name="startTime"
                              component={TimePickerField}
                            />
                          </FormControl>
                        </Grid>
                      )}
                      <Grid item xs={1} style={{ textAlign: "center" }}>
                        <Typography variant="h6">to</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <FormControl className={classes.dateTextField}>
                          <Field name="endDate" component={DatePickerField} />
                        </FormControl>
                      </Grid>
                      {!isAllDayEvent && (
                        <Grid item xs={2}>
                          <FormControl className={classes.dateTextField}>
                            <Field name="endTime" component={TimePickerField} />
                          </FormControl>
                        </Grid>
                      )}
                    </>
                  </MuiPickersUtilsProvider>
                  <Grid
                    item
                    xs={12}
                    className={classes.allDayCheckBoxContainer}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="isAllDayEvent"
                          checked={values.isAllDayEvent}
                          onChange={handleChange}
                        />
                      }
                      label="All Day"
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className={classes.noteTextField}
                  fullWidth
                  multiline
                  rows="4"
                  id="event-note"
                  label="Note"
                  margin="normal"
                  name="eventNote"
                  onChange={handleChange}
                  value={values.eventNote}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <div>
              <Button
                type="button"
                classes={{
                  root: classes.deleteButton,
                  label: classes.buttonLabel,
                }}
                onClick={() => handleDeleteEvent(values.uuid)}>
                Delete Event
              </Button>
            </div>
            <div>
              <Button
                classes={{
                  root: classes.createButton,
                  label: classes.buttonLabel,
                }}
                type="submit">
                {!isLoading ? (
                  "Save Changes"
                ) : (
                  <CircularProgress className={classes.progress} size={30} />
                )}
              </Button>
              <Button
                classes={{
                  root: classes.cancelButton,
                  label: classes.buttonLabel,
                }}
                onClick={handleClose}
                type="button">
                Cancel
              </Button>
            </div>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

const DatePickerField = ({ field, form }) => {
  return (
    <DatePicker
      clearable
      value={field.value}
      name={field.name}
      format="MM/DD/YYYY"
      onChange={selectedDate =>
        form.setFieldValue(field.name, selectedDate, false)
      }
    />
  )
}

const TimePickerField = ({ field, form }) => {
  return (
    <TimePicker
      clearable
      value={field.value}
      name={field.name}
      format="h:mma"
      onChange={selectedTime =>
        form.setFieldValue(field.name, selectedTime, false)
      }
    />
  )
}
export default EditEvent
