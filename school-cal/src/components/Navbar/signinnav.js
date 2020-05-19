import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { Link as RouterLink } from "react-router-dom"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: "0",
    zIndex: 100,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
}))

export default function SignNavbar() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "#21242C" }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            School Calendar
          </Typography>
          <Button>
            <RouterLink className={classes.link} to="/">
              Home
            </RouterLink>
          </Button>
          <Button>
            <RouterLink className={classes.link} to="/">
              About Us
            </RouterLink>
          </Button>
          <Button>
            <RouterLink className={classes.link} to="/sign-in">
              Sign In
            </RouterLink>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
