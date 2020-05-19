import React, { useContext, useEffect, useState } from "react"
import { CalendarContext } from "../../contexts/calendar/calendarState"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import rrulePlugin from "@fullcalendar/rrule"
import { Button, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import AddIcon from "@material-ui/icons/Add"

import CreateEvent from "../Events/CreateEvent"
import EditEvent from "../Events/EditEvent"
import AddSubscribers from "../Events/addSubscriber"
import moment from "moment"

const useStyles = makeStyles(theme => ({
  headerContainer: {
    marginBottom: theme.spacing(3),
  },
  createButton: {
    backgroundColor: "#F5945B",
    marginRight: theme.spacing(3),
  },
  buttonLabel: {
    textTransform: "none",
  },
}))

const Calendar = props => {
  const classes = useStyles()
  const {
    userCalendarEvents,
    setUserCalendarEvent,
    editUserCalendarEvent,
  } = useContext(CalendarContext)

  const [createEvent, openCreateEvent] = useState(false)
  const [isAddSubscriberOpen, setAddSubscribers] = useState(false)
  const [editEvent, openEditEvent] = useState(false)

  const [events, setEvents] = useState([])

  const initialCreateEventProperty = {
    startTime: moment()
      .hours(6)
      .minutes(0)
      .seconds(0),
    endTime: moment()
      .hours(7)
      .minutes(0)
      .seconds(0),
    eventTitle: "",
    eventLocation: "",
    eventNote: "",
    rrule: "",
    isAllDayEvent: false,
  }
  useEffect(() => {
    if (userCalendarEvents.length > 0) {
      const formatted = userCalendarEvents.map(event => {
        return {
          id: event.uuid,
          start: event.startTime,
          end: event.endTime,
          title: event.eventTitle,
          location: event.eventLocation,
          note: event.eventNote,
          allDay: event.isAllDayEvent,
          backgroundColor: event.eventColor,
        }
      })
      setEvents(formatted)
    } else {
      setEvents([])
    }
  }, [userCalendarEvents])

  const handleEventClick = info => {
    const { id, start, end, title, allDay, extendedProps } = info.event

    setUserCalendarEvent({
      startTime: moment(start),
      endTime: moment(end),
      eventTitle: title,
      eventLocation: extendedProps.location,
      eventNote: extendedProps.note,
      isAllDayEvent: allDay,
      uuid: id,
    })
    openEditEvent(true)
  }

  const handleDateClick = info => {
    setUserCalendarEvent({
      startTime: moment(info.date).hours(6),
      endTime: moment(info.date).hours(7),
      eventTitle: "",
      eventLocation: "",
      eventNote: "",
      isAllDayEvent: false,
    })
    openCreateEvent(true)
  }

  const handleClosingCreateEvent = () => {
    setUserCalendarEvent(initialCreateEventProperty)
    openCreateEvent(false)
  }
  function eventDrop(info) {
    const { id, start, end } = info.event
    const eventOject = {
      startDate: moment(start).format("YYYY-MM-DD"),
      endDate: moment(end).format("YYYY-MM-DD"),
      startTime: moment(start).format(),
      endTime: moment(end).format(),
    }
    editUserCalendarEvent(id, eventOject)
  }
  return (
    <div>
      <Grid container className={classes.headerContainer}>
        <Grid item xs={12}>
          <Button
            classes={{
              root: classes.createButton,
              label: classes.buttonLabel,
            }}
            startIcon={<AddIcon />}
            onClick={() => openCreateEvent(true)}>
            Create Event
          </Button>
          <Button
            classes={{ root: classes.createButton, label: classes.buttonLabel }}
            startIcon={<AddIcon />}
            onClick={() => setAddSubscribers(true)}>
            Add Subscriber
          </Button>
        </Grid>
      </Grid>
      <FullCalendar
        header={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin, interactionPlugin, rrulePlugin]}
        // eventSources={[myCalendarEvents, ...subscribedCalendarEvents]}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        selectable={true}
        droppable={true}
        editable={true}
        eventDrop={eventDrop}
      />
      <CreateEvent open={createEvent} handleClose={handleClosingCreateEvent} />
      <EditEvent open={editEvent} handleClose={() => openEditEvent(false)} />
      <AddSubscribers
        open={isAddSubscriberOpen}
        handleClose={() => setAddSubscribers(false)}
      />
    </div>
  )
}

export default Calendar
