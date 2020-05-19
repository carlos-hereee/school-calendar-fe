import React, { useContext, useEffect, useState } from "react"
import { CalendarContext } from "../../contexts/calendar/calendarState"
import { clientWithAuth } from "../../utilities/api"
import {
  Button,
  CssBaseline,
  Card,
  CardActions,
  CardContent,
  Drawer,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core"
import ShareIcon from "@material-ui/icons/Share"
import { makeStyles } from "@material-ui/core/styles"

import Navbar from "../../components/Navbar"
import SubcribableLink from "../../components/Dialogs/SubscribableLink"
const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  toolbar: theme.mixins.toolbar,

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  privacySettings: {
    display: "flex",
    flexDirection: "column",
  },
  subscribableLinkContainer: {
    display: "flex",
    marginTop: theme.spacing(3),
  },
  getSubscribableLinkButton: {
    backgroundColor: "#F5945B",
  },
  buttonLabel: {
    textTransform: "none",
  },
  linkDisplay: {
    flexGrow: 4,
  },
  copyLinkButton: {
    marginTop: "16px",
    marginBottom: "8px",
    marginLeft: "16px",
    flexGrow: 1,
  },
}))

const CalendarSettings = () => {
  const classes = useStyles()
  const { userCalendar, editUserCalendar } = useContext(CalendarContext)
  const [subscribableLink, setSubsribableLink] = useState(null)
  const [subscribableLinkDialog, openSubscribableLinkDialog] = useState(false)

  const handleCalendarPrivacy = () => {
    editUserCalendar(userCalendar.uuid, { isPrivate: !userCalendar.isPrivate })
  }

  const getSubcribableLink = async () => {
    const link = await clientWithAuth(
      `/api/calendars/${userCalendar.uuid}/?subscribableLink=true`,
    )

    setSubsribableLink(link.data)
    openSubscribableLinkDialog(true)
  }
  return (
    <div className={classes.root}>
      <Grid container>
        <Navbar />

        <Grid item xs={3}>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}>
            <div className={classes.toolbar} />
            <List>
              <ListItem button>
                <ListItemIcon>
                  <ShareIcon />
                </ListItemIcon>
                <ListItemText>Calendar Privacy</ListItemText>
              </ListItem>
            </List>
          </Drawer>
        </Grid>
        <Grid item xs={5} className={classes.content}>
          <div className={classes.toolbar} />
          <Card>
            <CardContent className={classes.privacySettings}>
              <Typography>Calendar Privacy</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={!!+userCalendar.isPrivate}
                    onChange={handleCalendarPrivacy}
                  />
                }
                label={
                  !!+userCalendar.isPrivate
                    ? "The calendar is private"
                    : "The calendar is public"
                }
              />
              <div className={classes.subscribableLinkContainer}>
                {!!+userCalendar.isPrivate ? (
                  <Typography>
                    Turn off private calendar to make it subscribable
                  </Typography>
                ) : (
                  <Button
                    classes={{
                      root: classes.getSubscribableLinkButton,
                      label: classes.buttonLabel,
                    }}
                    onClick={getSubcribableLink}>
                    Get subscribable link
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <SubcribableLink
        open={subscribableLinkDialog}
        handleClose={() => openSubscribableLinkDialog(false)}
        link={subscribableLink}
      />
    </div>
  )
}

export default CalendarSettings
