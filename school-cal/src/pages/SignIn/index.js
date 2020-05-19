/* eslint-disable */
import ReactGA from "react-ga"
import React, { useContext, useEffect } from "react"
import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"
import SignInForm from "../../components/SignIn"
import { AuthContext } from "../../contexts/auth/authState"
import SignNavbar from "../../components/Navbar/signinnav"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
}))

const SignIn = ({ history }) => {
  ReactGA.pageview(window.location.pathname + window.location.search)
  const { accessToken } = useContext(AuthContext)

  const classes = useStyles()

  useEffect(() => {
    if (accessToken) {
      history.push("/admin-dashboard")
    }
  }, [accessToken])

  return (
    <div className={classes.root}>
      <SignNavbar />
      <Grid container>
        <Grid item md={6} style={{ background: "#A35629" }}></Grid>
        <Grid item md={6}>
          <SignInForm path={history.location} />
        </Grid>
      </Grid>
    </div>
  )
}

export default SignIn
