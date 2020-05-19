/* eslint-disable */

import React, { useEffect, useState } from "react"
import {
  Avatar,
  Button,
  CircularProgress,
  Divider,
  TextField,
  Link,
  Box,
  Grid,
  Typography,
} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import { makeStyles } from "@material-ui/core/styles"

const copyRight = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        School Calendar
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}
const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signInWithGoogle: {
    margin: theme.spacing(2, 0, 2),
  },
  progress: {
    margin: theme.spacing(1),
    color: "white",
  },
  link: {
    textAlign: "center",
  },
}))
const SignInForm = ({
  values,
  handleSubmit,
  handleChange,
  handleBlur,
  isLoading,
  signInError,
  errors,
  touched,
  path,
}) => {
  const classes = useStyles()

  const currentPage = path.pathname

  useEffect(() => {
    if (signInError) {
      if (signInError.code === "auth/invalid-email") {
      } else if (signInError.code === "auth/user-not-found") {
      } else if (signInError.code === "auth/wrong-password") {
      }
    }
  }, [signInError])
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={currentPage === "/sign-in" ? { minHeight: "100vh" } : null}>
        <Grid item xs={12} className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>

          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  style={{ background: "#F2D2BF" }}
                  variant="outlined"
                  required
                  fullWidth
                  id="userId"
                  label="UserId"
                  name="userId"
                  autoComplete="userId"
                  placeholder="Username or email"
                  value={values.userId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.userId ? errors.userId : ""}
                  error={touched.userId && Boolean(errors.userId)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ background: "#F2D2BF" }}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.password ? errors.password : ""}
                  error={touched.password && Boolean(errors.password)}
                />
              </Grid>
            </Grid>
            <Button
              style={{ background: "#F5945B", color: "#21242C" }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              {!isLoading ? (
                "Sign In"
              ) : (
                <CircularProgress className={classes.progress} size={30} />
              )}
            </Button>
            {currentPage === "/sign-in" ? (
              <div className={classes.link}>
                <Link href="/register" variant="body2">
                  Don't have an account? Register
                </Link>
              </div>
            ) : null}

            <Divider />
            {/* <Button
              style={{background: "#F5945B", color: "#21242C"}}
              className={classes.signInWithGoogle}
              color="primary"
              fullWidth
              onClick={signInWithGoogle}
              type="button"
              variant="contained">
              Sign In With Google
            </Button> */}
          </form>
          {/* <Box mt={5}>{copyRight}</Box> */}
        </Grid>
      </Grid>
    </>
  )
}

export default SignInForm
