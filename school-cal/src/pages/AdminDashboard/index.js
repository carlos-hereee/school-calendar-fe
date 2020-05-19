/* eslint-disable */
import React, { useContext, useEffect } from "react"

//adding components
import Navbar from "../../components/Navbar"
import SideMenu from "../../components/SideMenu"
import Calendar from "../../components/Calendar"

// styling/css

import { CssBaseline, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import "../../components/AdminDashboard/adminDash.css"
import ReactGA from "react-ga"

import { CalendarContext } from "../../contexts/calendar/calendarState"

// setting styles
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}))

const AdminDashBoard = props => {
  ReactGA.pageview(window.location.pathname + window.location.search)
  const {
    getUserCalendars,
    calendarSubscriptionId,
    subscribeToCalendar,
  } = useContext(CalendarContext)

  // get all user calendars calls calendars and sets it to userCalendar array in state
  useEffect(() => {
    getUserCalendars()
  }, [])

  // subscribe to calendar if subscribeCalendarId is not null

  useEffect(() => {
    if (calendarSubscriptionId) {
      subscribeToCalendar(calendarSubscriptionId)
    }
  }, [calendarSubscriptionId])

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container>
        <Navbar />
        <Grid item xs={3}>
          {/* <SideMenu /> */}
        </Grid>
        <Grid item xs={9} className={classes.content}>
          <div className={classes.toolbar} />
          <Calendar />
        </Grid>
      </Grid>
    </div>
  )
}

export default AdminDashBoard
