import React, { createContext, useEffect, useReducer } from "react"
import {
  IS_LOADING,
  GET_CALENDARS_SUCCESS,
  GET_CALENDARS_FAILURE,
  EDIT_USER_CALENDAR_SUCCESS,
  EDIT_USER_CALENDAR_FAILURE,
  SET_CALENDAR_SUBSCRIPTION_ID,
  SUBSCRIBE_TO_CALENDAR_SUCCESS,
  SUBSCRIBE_TO_CALENDAR_FAILURE,
  UNSUBSCRIBE_CALENDAR_SUCCESS,
  UNSUBSCRIBE_CALENDAR_FAILURE,
  GET_CALENDAR_EVENTS_SUCCESS,
  GET_CALENDAR_EVENTS_FAILURE,
  GET_SUBSCRIBED_CALENDAR_EVENTS_SUCCESS,
  GET_SUBSCRIBED_CALENDAR_EVENTS_FAILURE,
  RESET_SUBSCRIBED_CALENDAR_EVENTS,
  CREATE_CALENDAR_EVENT_SUCCESS,
  EDIT_CALENDAR_EVENT_SUCCESS,
  DELETE_CALENDAR_EVENT_SUCCESS,
  CRUD_OPS_CALENDAR_EVENT_FAILURE,
  SET_USER_CALENDAR,
  SET_USER_CALENDAR_EVENT,
} from "./types"

import calendarReducer from "./calendarReducer"
import { clientWithAuth } from "../../utilities/api"
import { loadState, saveState } from "../../utilities/localStorage"
import moment from "moment"
export const CalendarContext = createContext()

export const CalendarState = props => {
  const initialState = {
    isLoading: false,
    userCalendars: [], //empty calendar array
    userCalendarsError: null,
    userCalendar: null,
    userCalendarEvents: [],
    userCalendarEvent: {
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      eventTitle: "",
      eventLocation: "",
      eventNote: "",
      isAllDayEvent: false,
      isReoccuring: false,
      rrule: "",
      uuid: "",
    },
    userCalendarEventsError: null,
    calendarSubscriptionId: null,
    subscribedCalendars: [],
    subscribedCalendarsError: null,
  }

  const localState = loadState("calendar")

  const [state, dispatch] = useReducer(
    calendarReducer,
    localState || initialState,
  )

  useEffect(() => {
    saveState("calendar", state)
  }, [state])

  const getUserCalendars = async () => {
    dispatch({ type: IS_LOADING, payload: true })

    try {
      const calendars = await clientWithAuth("/users/calendars")
      dispatch({
        type: GET_CALENDARS_SUCCESS,
        payload: calendars.data.calendars,
      })
    } catch (error) {
      console.log(error)
      dispatch({ type: GET_CALENDARS_FAILURE, payload: error })
    }
  }

  const editUserCalendar = async (calendarUuid, changes) => {
    dispatch({ type: IS_LOADING, payload: true })

    try {
      const calendar = await clientWithAuth.put(
        `/api/calendars/${calendarUuid}`,
        changes,
      )

      dispatch({ type: EDIT_USER_CALENDAR_SUCCESS, payload: calendar.data })
    } catch (error) {
      console.log(error)
      dispatch({ type: EDIT_USER_CALENDAR_FAILURE, payload: error })
    }
  }

  const setCalendarSubscriptionId = calendarId => {
    dispatch({ type: SET_CALENDAR_SUBSCRIPTION_ID, payload: calendarId })
  }

  const subscribeToCalendar = async calendarId => {
    dispatch({ type: IS_LOADING, payload: true })

    try {
      const subscribedCalendar = await clientWithAuth.put(
        `/api/calendars/${calendarId}/?subscribe=true`,
      )

      dispatch({
        type: SUBSCRIBE_TO_CALENDAR_SUCCESS,
        payload: subscribedCalendar.data,
      })
    } catch (error) {
      console.log(error)
      dispatch({ type: SUBSCRIBE_TO_CALENDAR_FAILURE, payload: error })
    }
  }

  const unSubscribeCalendar = async calendarId => {
    dispatch({ type: IS_LOADING, payload: true })

    try {
      const unsubscribed = await clientWithAuth.put(
        `/api/calendars/${calendarId}/?subscribe=false`,
      )

      if (unsubscribed.data === 1) {
        dispatch({ type: UNSUBSCRIBE_CALENDAR_SUCCESS, payload: calendarId })
      }
    } catch (error) {
      console.log(error)
      dispatch({ type: UNSUBSCRIBE_CALENDAR_FAILURE, payload: error })
    }
  }

  const getUserCalendarEvents = async calendarUuid => {
    dispatch({ type: IS_LOADING, payload: true })

    try {
      const events = await clientWithAuth(
        `/api/calendars/${calendarUuid}/events`,
      )

      dispatch({
        type: GET_CALENDAR_EVENTS_SUCCESS,
        payload: events.data.events,
      })
    } catch (error) {
      console.log(error)
      dispatch({ type: GET_CALENDAR_EVENTS_FAILURE, payload: error })
    }
  }

  const getSubscribedCalendarEvents = async calendarUuid => {
    dispatch({ type: IS_LOADING, payload: true })
    const events = await clientWithAuth(`/api/calendars/${calendarUuid}/events`)

    dispatch({
      type: GET_SUBSCRIBED_CALENDAR_EVENTS_SUCCESS,
      payload: events.data,
    })
    try {
    } catch (error) {
      console.log(error)
      dispatch({ type: GET_SUBSCRIBED_CALENDAR_EVENTS_FAILURE, payload: error })
    }
  }

  const resetSubscribedCalendarEvents = calendarUuid => {
    dispatch({ type: RESET_SUBSCRIBED_CALENDAR_EVENTS, payload: calendarUuid })
  }

  const createUserCalendarEvent = async (calendarUuid, event) => {
    dispatch({ type: IS_LOADING, payload: true })

    try {
      const newEvent = await clientWithAuth.post(
        `/api/calendars/${calendarUuid}/events`,
        event,
      )
      dispatch({ type: CREATE_CALENDAR_EVENT_SUCCESS, payload: newEvent.data })
    } catch (error) {
      console.log(error)
      dispatch({ type: CRUD_OPS_CALENDAR_EVENT_FAILURE, payload: error })
    }
  }

  const editUserCalendarEvent = async (eventUuid, changes) => {
    dispatch({ type: IS_LOADING, payload: true })

    try {
      const updatedEvent = await clientWithAuth.put(
        `/api/events/${eventUuid}`,
        changes,
      )

      dispatch({
        type: EDIT_CALENDAR_EVENT_SUCCESS,
        payload: updatedEvent.data,
      })
    } catch (error) {
      console.log(error)
      dispatch({ type: CRUD_OPS_CALENDAR_EVENT_FAILURE, payload: error })
    }
  }

  const deleteUserCalendarEvent = async eventUuid => {
    dispatch({ type: IS_LOADING, payload: true })
    try {
      await clientWithAuth.delete(`/api/events/${eventUuid}`)

      dispatch({
        type: DELETE_CALENDAR_EVENT_SUCCESS,
        payload: eventUuid,
      })
    } catch (error) {
      console.log(error)
      dispatch({ type: CRUD_OPS_CALENDAR_EVENT_FAILURE, payload: error })
    }
  }

  const setUserCalendar = calendarUuid => {
    dispatch({ type: SET_USER_CALENDAR, payload: calendarUuid })
  }

  const setUserCalendarEvent = event => {
    dispatch({ type: SET_USER_CALENDAR_EVENT, payload: event })
  }

  return (
    <CalendarContext.Provider
      value={{
        isLoading: state.isLoading,
        userCalendar: state.userCalendar,
        userCalendars: state.userCalendars,
        userCalendarsError: state.userCalendarsError,
        userCalendarEvents: state.userCalendarEvents,
        userCalendarEvent: state.userCalendarEvent,
        calendarSubscriptionId: state.calendarSubscriptionId,
        subscribedCalendars: state.subscribedCalendars,
        subscribedCalendarsError: state.subscribedCalendarsError,
        getUserCalendars,
        editUserCalendar,
        setCalendarSubscriptionId,
        subscribeToCalendar,
        unSubscribeCalendar,
        getUserCalendarEvents,
        getSubscribedCalendarEvents,
        resetSubscribedCalendarEvents,
        createUserCalendarEvent,
        editUserCalendarEvent,
        deleteUserCalendarEvent,
        setUserCalendar,
        setUserCalendarEvent,
      }}>
      {props.children}
    </CalendarContext.Provider>
  )
}
