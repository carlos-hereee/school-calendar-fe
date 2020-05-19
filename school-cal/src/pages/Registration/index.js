/* eslint-disable */

import React, { useContext, useEffect } from "react"
import { Grid } from "@material-ui/core"
import { AuthContext } from "../../contexts/auth/authState"

import RegistrationForm from "../../components/Registration"

import { makeStyles } from "@material-ui/core/styles"
import { CssBaseline } from "@material-ui/core"
import SigninNavbar from "../../components/Navbar/signinnav"
import ReactGA from "react-ga"
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
}))

const Registration = ({ history }) => {
  ReactGA.pageview(window.location.pathname + window.location.search)
  const { accessToken } = useContext(AuthContext)

  const classes = useStyles()

  useEffect(() => {
    if (accessToken) {
      history.push("/admin-dashboard")
    }
  }, [accessToken])

  return (
    <>
      <div className={classes.root}>
        <SigninNavbar />
        <CssBaseline />
        <Grid container>
          <Grid item md={6} style={{ background: "#A35629" }}></Grid>
          <Grid item md={6}>
            <RegistrationForm path={history.location} />
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default Registration
