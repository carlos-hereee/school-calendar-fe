/* eslint-disable */

import React, { useContext, useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import clsx from "clsx"
import { AuthContext } from "../../contexts/auth/authState"

const Navbar = ({ drawerWidth }) => {
  const { signOut } = useContext(AuthContext)

  const useStyles = makeStyles(theme => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    toolBar: {
      backgroundColor: "#21242C",
    },
    title: {
      flexGrow: 1,
    },
  }))

  const classes = useStyles()
  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Typography variant={"h6"} className={classes.title}>
            Makata
          </Typography>
          <Button color="inherit" onClick={signOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
