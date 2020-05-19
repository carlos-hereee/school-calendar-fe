import React, { useContext, useEffect, useState } from "react"
import queryString from "query-string"
import SignInForm from "../../components/SignIn"
import RegistrationForm from "../../components/Registration"
import { AuthContext } from "../../contexts/auth/authState"
import { CalendarContext } from "../../contexts/calendar/calendarState"
import {
  Dialog,
  DialogContent,
  Link,
  Typography,
  DialogActions,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  actions: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    textTransform: "none",
  },
}))
const Subscribe = props => {
  const classes = useStyles()

  const { accessToken } = useContext(AuthContext)
  const { setCalendarSubscriptionId } = useContext(CalendarContext)

  useEffect(() => {
    if (accessToken) {
      props.history.push("/admin-dashboard")
    }
  }, [accessToken])

  useEffect(() => {
    const values = queryString.parse(props.location.search)
    if (values && values.id) {
      setCalendarSubscriptionId(values.id)
    }
  }, [props.location.search])

  console.log("Location ", props.location.search)

  const [signIn, showSignIn] = useState(true)

  const handleFormChange = event => {
    event.preventDefault()
    showSignIn(!signIn)
  }

  return (
    <div>
      <Dialog open={true}>
        <DialogContent>
          {signIn ? (
            <SignInForm path={props.history.location} />
          ) : (
            <RegistrationForm path={props.history.location} />
          )}
        </DialogContent>
        <DialogActions className={classes.actions}>
          {signIn ? (
            <Typography>
              Do not have an account? &nbsp;
              <Link href="#" onClick={handleFormChange}>
                Register
              </Link>
            </Typography>
          ) : (
            <Typography>
              Already has an account? &nbsp;
              <Link href="#" onClick={handleFormChange}>
                Sign In
              </Link>
            </Typography>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Subscribe
